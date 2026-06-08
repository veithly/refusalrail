// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract RefusalReceipt {
    struct Receipt {
        address owner;
        bytes32 calldataHash;
        bytes32 policyHash;
        bytes32 shockHash;
        uint8 reasonCode;
        bool refused;
        uint256 createdAt;
        string fallbackRoute;
    }

    address public hub;
    uint256 public nextReceiptId = 1;
    mapping(uint256 => Receipt) private receipts;

    event ReceiptCreated(
        uint256 indexed receiptId,
        address indexed owner,
        bytes32 calldataHash,
        bytes32 policyHash,
        uint8 reasonCode,
        bool refused
    );

    modifier onlyHub() {
        require(msg.sender == hub, "NOT_HUB");
        _;
    }

    constructor(address initialHub) {
        hub = initialHub;
    }

    function setHub(address nextHub) external {
        require(hub == address(0) || msg.sender == hub, "NOT_HUB");
        hub = nextHub;
    }

    function writeReceipt(
        address owner,
        bytes32 calldataHash,
        bytes32 policyHash,
        bytes32 shockHash,
        uint8 reasonCode,
        bool refused,
        string calldata fallbackRoute
    ) external onlyHub returns (uint256 receiptId) {
        receiptId = nextReceiptId++;
        receipts[receiptId] = Receipt({
            owner: owner,
            calldataHash: calldataHash,
            policyHash: policyHash,
            shockHash: shockHash,
            reasonCode: reasonCode,
            refused: refused,
            createdAt: block.timestamp,
            fallbackRoute: fallbackRoute
        });
        emit ReceiptCreated(receiptId, owner, calldataHash, policyHash, reasonCode, refused);
    }

    function getReceipt(uint256 receiptId) external view returns (Receipt memory) {
        return receipts[receiptId];
    }
}
