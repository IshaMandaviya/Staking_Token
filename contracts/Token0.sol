pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token0 is ERC20 {
    constructor() ERC20("Token0", "TKN0") {
        _mint(msg.sender, 1000000 * 10**18);
    }
}