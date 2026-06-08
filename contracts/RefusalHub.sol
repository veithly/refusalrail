// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./PolicyRegistry.sol";
import "./RefusalReceipt.sol";

contract RefusalHub {
    enum ActionType {
        SellPrincipal,
        ClaimDistribution
    }

    enum ShockCode {
        None,
        MarketHalt,
        StalePrice,
        MaxExposure
    }

    PolicyRegistry public immutable policyRegistry;
    RefusalReceipt public immutable receiptBook;

    event ActionRefused(
        address indexed owner,
        bytes32 calldataHash,
        bytes32 policyHash,
        uint8 reasonCode,
        bytes32 shockHash,
        uint256 receiptId
    );

    event SafeActionExecuted(
        address indexed owner,
        bytes32 calldataHash,
        bytes32 policyHash,
        uint256 receiptId
    );

    constructor(PolicyRegistry registry, RefusalReceipt receipts) {
        policyRegistry = registry;
        receiptBook = receipts;
    }

    function tryAction(
        ActionType actionType,
        ShockCode shock,
        bytes calldata attemptedCalldata
    ) external returns (uint256 receiptId) {
        PolicyRegistry.Policy memory policy = policyRegistry.getPolicy();
        bytes32 calldataHash = keccak256(attemptedCalldata);
        bytes32 shockHash = keccak256(abi.encode(shock, block.chainid, block.timestamp / 60));

        (bool refused, uint8 reasonCode) = _verdict(policy, actionType, shock);
        receiptId = receiptBook.writeReceipt(
            msg.sender,
            calldataHash,
            policy.policyHash,
            shockHash,
            reasonCode,
            refused,
            policy.fallbackRoute
        );

        if (refused) {
            emit ActionRefused(msg.sender, calldataHash, policy.policyHash, reasonCode, shockHash, receiptId);
        } else {
            emit SafeActionExecuted(msg.sender, calldataHash, policy.policyHash, receiptId);
        }
    }

    function previewVerdict(ActionType actionType, ShockCode shock) external view returns (bool refused, uint8 reasonCode) {
        PolicyRegistry.Policy memory policy = policyRegistry.getPolicy();
        return _verdict(policy, actionType, shock);
    }

    function _verdict(
        PolicyRegistry.Policy memory policy,
        ActionType actionType,
        ShockCode shock
    ) internal pure returns (bool refused, uint8 reasonCode) {
        if (actionType == ActionType.SellPrincipal && policy.noSellPrincipal && shock != ShockCode.None) {
            return (true, uint8(shock));
        }
        if (actionType == ActionType.ClaimDistribution && !policy.allowDistributionSweep) {
            return (true, 4);
        }
        return (false, 0);
    }
}
