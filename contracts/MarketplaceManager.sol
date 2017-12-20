pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/token/ERC20.sol';

import './TimelockedEscrow.sol';

/**
 *  The MarketplaceManager creates new TimelockedEscrow contracts.
 */
contract MarketplaceManager is Ownable {
    uint private constant TIMELOCK_UPPER_LIMIT = 365 * 5; // five years

    // the KEY token. It's an injected variable to allow for testing with a MockKEY.
    ERC20 private token;

    /**
     *  Don't allow Zero addresses.
     *  @param anAddress — the address which must not be zero.
     */
    modifier nonZeroAddress(address anAddress) {
        require(anAddress != 0x0);
        _;
    }

    /**
     *  Require that the number of days is greater than 0 and less than or equal to 5 years.
     *  Note: Negative value sent from a wallet become massive positive numbers.
     *  @param number — the number of days.
     */
    modifier validNumberOfDays(uint number) {
        require(number > 0);
        require(number <= TIMELOCK_UPPER_LIMIT);
        _;
    }

    /**
     *  Emitted when the MarketplaceManager is created.
     *  @param manager — The MarketplaceManager that was created.
     *  @param token — The ERC20 token being used. (injected to simplify testing)
     */
    event MarketplaceManagerCreated(MarketplaceManager manager, ERC20 token);

    /**
     *  Emitted when the Escrow is created.
     *  @param escrow — The created Escrow
     *  @param period — The timelock period (in days) of the created Escrow
     *  @param token — The ERC20 token being used (injected to simplify testing)
     */
    event EscrowCreated(TimelockedEscrow escrow, uint period, ERC20 token);

    /**
     *  MarketplaceManager constructor.
     *  @param _token — The ERC20 token to use as currency. (Injected to ease testing)
     */
    function MarketplaceManager(ERC20 _token)
        public
        nonZeroAddress(_token)
    {
        token = _token;
        MarketplaceManagerCreated(this, token);
    }

    /**
     *  Deploy a new TimelockedEscrow contract with the given timelockPeriod.
     *  @param timelockPeriod — The number of days the Escrow is to lock the user's KEY for.
     */
    function createEscrow(uint timelockPeriod)
        external
        onlyOwner
        validNumberOfDays(timelockPeriod)
    {
        TimelockedEscrow escrow = new TimelockedEscrow(timelockPeriod, token);
        EscrowCreated(escrow, timelockPeriod, token);
    }
}
