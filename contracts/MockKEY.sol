pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/StandardToken.sol';


contract MockKEY is StandardToken {
    string public constant name = 'SelfKey'; //solhint-disable-line const-name-snakecase
    string public constant symbol = 'KEY'; //solhint-disable-line const-name-snakecase
    uint256 public constant decimals = 18; //solhint-disable-line const-name-snakecase

    function freeMoney(address punter, uint amount) external {
        require(punter != 0x0);
        balances[punter] = amount;
    }
}
