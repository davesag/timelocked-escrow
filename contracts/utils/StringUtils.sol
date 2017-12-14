pragma solidity ^0.4.18;


library StringUtils {
    function isEmptyString(string s) internal pure returns (bool) {
        return (keccak256(s) == keccak256(''));
    }
}
