pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20.sol';


library KeyUtils {
    // TODO: populate this at migration time.
    // https://kyc-chain.atlassian.net/browse/KEY-9
    address constant private KEY_ADDRESS = 0x0;

    function getKEY() internal pure returns (ERC20) {
        return ERC20(KEY_ADDRESS);
    }
}
