pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";

contract FerrumToken is ERC20Burnable {
    string public name = "Ferrum Network Token";
    string public symbol = "FRM";
    uint8 public decimals = 6;
    uint public INITIAL_SUPPLY = 331718750 * 1000000;

    constructor() public {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
