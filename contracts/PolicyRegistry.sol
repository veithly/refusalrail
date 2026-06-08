// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PolicyRegistry {
    struct Policy {
        bool noSellPrincipal;
        bool allowDistributionSweep;
        uint256 maxExposureBps;
        uint256 stalePriceSeconds;
        string fallbackRoute;
        bytes32 policyHash;
    }

    Policy private current;
    address public owner;

    event PolicyUpdated(bytes32 indexed policyHash, uint256 maxExposureBps, uint256 stalePriceSeconds);

    modifier onlyOwner() {
        require(msg.sender == owner, "NOT_OWNER");
        _;
    }

    constructor() {
        owner = msg.sender;
        current = _buildPolicy(true, true, 2500, 90, "claim_distribution_and_sweep_proceeds");
        emit PolicyUpdated(current.policyHash, current.maxExposureBps, current.stalePriceSeconds);
    }

    function setPolicy(
        bool noSellPrincipal,
        bool allowDistributionSweep,
        uint256 maxExposureBps,
        uint256 stalePriceSeconds,
        string calldata fallbackRoute
    ) external onlyOwner {
        current = _buildPolicy(noSellPrincipal, allowDistributionSweep, maxExposureBps, stalePriceSeconds, fallbackRoute);
        emit PolicyUpdated(current.policyHash, current.maxExposureBps, current.stalePriceSeconds);
    }

    function getPolicy() external view returns (Policy memory) {
        return current;
    }

    function policyHash() external view returns (bytes32) {
        return current.policyHash;
    }

    function _buildPolicy(
        bool noSellPrincipal,
        bool allowDistributionSweep,
        uint256 maxExposureBps,
        uint256 stalePriceSeconds,
        string memory fallbackRoute
    ) internal pure returns (Policy memory) {
        bytes32 hash = keccak256(
            abi.encode(noSellPrincipal, allowDistributionSweep, maxExposureBps, stalePriceSeconds, fallbackRoute)
        );
        return Policy(noSellPrincipal, allowDistributionSweep, maxExposureBps, stalePriceSeconds, fallbackRoute, hash);
    }
}
