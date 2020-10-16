// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FerrumXToken is ERC20, ERC20Burnable {
    constructor() ERC20("Ferrum X Token", "FRMX") public {
        _mint(msg.sender, 33000 * 10 ** 18);
    }
}
