// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/UserIdentityManager.sol";

contract UserIdentityManagerTest is Test {
    UserIdentityManager manager;
    address user = address(0xABCD);

    function setUp() public {
        manager = new UserIdentityManager();
    }

    function testNonceStartsAtZero() public view {
        uint256 nonce = manager.getNonce(user);
        assertEq(nonce, 0);
    }

    function testIncrementNonce() public {
        manager.incrementNonce(user);
        assertEq(manager.getNonce(user), 1);
    }

    function testVerifyCreator() public {
        manager.verifyCreator(user);
        assertTrue(manager.isCreatorVerified(user));
    }
}
