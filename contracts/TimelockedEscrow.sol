pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';


contract TimelockedEscrow is Ownable {

    uint private timelockPeriod;
    mapping(address => bool) private isWhitelisted;

    event EscrowCreated(address escrow, uint period);
    event Whitelisted(address serviceProvider);
    event Unwhitelisted(address serviceProvider);

    function TimelockedEscrow(uint _timelockPeriod) public {
        require(_timelockPeriod > 0);
        timelockPeriod = _timelockPeriod;
    }

    function whitelist(address serviceProvider) external onlyOwner {
        require(serviceProvider != 0x0);
        isWhitelisted[serviceProvider] = true;
        Whitelisted(serviceProvider);
    }

    function unwhitelist(address serviceProvider) external onlyOwner {
        require(serviceProvider != 0x0);
        assert(isWhitelisted[serviceProvider]);
        isWhitelisted[serviceProvider] = false;
        Unwhitelisted(serviceProvider);
    }
}
