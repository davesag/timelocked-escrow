pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/token/ERC20.sol';


contract TimelockedEscrow is Ownable {

    uint public timelockPeriod;
    ERC20 private token;
    mapping(address => bool) private whitelisted;
    mapping(address => uint) private expiry;
    mapping(address => uint) private balances;

    modifier nonZeroAddress(address serviceProvider) {
        require(serviceProvider != 0x0);
        _;
    }

    modifier positiveNumber(uint number) {
        require(number > 0);
        _;
    }

    modifier senderCanAfford(uint amount) {
        require(token.balanceOf(msg.sender) >= amount);
        _;
    }

    event EscrowCreated(address escrow, uint period, ERC20 token);
    event ServiceProviderWhitelisted(address serviceProvider);
    event ServiceProviderUnwhitelisted(address serviceProvider);
    event KEYDeposited(address by, uint amount);

    function TimelockedEscrow(uint _timelockPeriod, ERC20 _token)
        public positiveNumber(_timelockPeriod) nonZeroAddress(_token)
    {
        timelockPeriod = _timelockPeriod;
        token = _token;
        EscrowCreated(this, timelockPeriod, token);
    }

    function whitelist(address serviceProvider)
        external onlyOwner nonZeroAddress(serviceProvider)
    {
        whitelisted[serviceProvider] = true;
        ServiceProviderWhitelisted(serviceProvider);
    }

    function unwhitelist(address serviceProvider)
        external onlyOwner nonZeroAddress(serviceProvider)
    {
        assert(whitelisted[serviceProvider]);
        whitelisted[serviceProvider] = false;
        ServiceProviderUnwhitelisted(serviceProvider);
    }

    function deposit(uint amount)
        external positiveNumber(amount) senderCanAfford(amount)
    {
        token.transferFrom(msg.sender, this, amount);
        balances[msg.sender] += amount;
        expiry[msg.sender] += timelockPeriod;
        KEYDeposited(msg.sender, amount);
    }

    function isWhitelisted(address serviceProvider)
        external view nonZeroAddress(serviceProvider) returns (bool)
    {
        return whitelisted[serviceProvider];
    }
}
