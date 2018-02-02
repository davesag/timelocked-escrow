pragma solidity ^0.4.19;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';


/**
 *  A dummy ERC20 token used for testing.
 */
contract MockKEY is StandardToken {
    string public constant name = 'SelfKey'; //solhint-disable-line const-name-snakecase
    string public constant symbol = 'KEY'; //solhint-disable-line const-name-snakecase
    uint256 public constant decimals = 18; //solhint-disable-line const-name-snakecase

    /**
     *  Give an address an amount of tokens.
     *  @param punter — the address to give tokens to.
     *  @param amount — the amount of tokens to give.
     */
    function freeMoney(address punter, uint amount) external {
        require(punter != 0x0);
        balances[punter] = amount;
    }
}
