// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DemoRWAAsset {
    string public name = "Demo RWA ETF";
    string public symbol = "dRWA";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event DistributionClaimed(address indexed account, uint256 amount);

    constructor(address initialHolder, uint256 initialSupply) {
        totalSupply = initialSupply;
        balanceOf[initialHolder] = initialSupply;
        emit Transfer(address(0), initialHolder, initialSupply);
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "INSUFFICIENT_BALANCE");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function claimDistribution(uint256 amount) external {
        balanceOf[msg.sender] += amount;
        totalSupply += amount;
        emit DistributionClaimed(msg.sender, amount);
        emit Transfer(address(0), msg.sender, amount);
    }
}
