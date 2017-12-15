pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';


contract TimelockedEscrow is Ownable {

    uint public timelockPeriod;
    mapping(address => bool) private whitelisted;

    modifier valid(address serviceProvider) {
      require(serviceProvider != 0x0);
      _;
    }

    event EscrowCreated(address escrow, uint period);
    event ServiceProviderWhitelisted(address serviceProvider);
    event ServiceProviderUnwhitelisted(address serviceProvider);

    function TimelockedEscrow(uint _timelockPeriod) public {
        require(_timelockPeriod > 0);
        timelockPeriod = _timelockPeriod;
    }

    function whitelist(address serviceProvider) external onlyOwner valid(serviceProvider) {
        whitelisted[serviceProvider] = true;
        ServiceProviderWhitelisted(serviceProvider);
    }

    function unwhitelist(address serviceProvider) external onlyOwner valid(serviceProvider) {
        assert(whitelisted[serviceProvider]);
        whitelisted[serviceProvider] = false;
        ServiceProviderUnwhitelisted(serviceProvider);
    }

    function isWhitelisted(address serviceProvider) external view valid(serviceProvider) returns (bool) {
      return whitelisted[serviceProvider];
    }
}
