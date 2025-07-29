// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UserIdentityManager {
    mapping(address => uint256) public nonces;
    mapping(address => bool) public isVerifiedCreator;

    event NonceIncremented(address indexed user, uint256 newNonce);
    event CreatorVerified(address indexed user);

    function incrementNonce(address user) external {
        nonces[user] += 1;
        emit NonceIncremented(user, nonces[user]);
    }

    function verifyCreator(address user) external {
        isVerifiedCreator[user] = true;
        emit CreatorVerified(user);
    }

    function getNonce(address user) external view returns (uint256) {
        return nonces[user];
    }

    function isCreatorVerified(address user) external view returns (bool) {
        return isVerifiedCreator[user];
    }
}
