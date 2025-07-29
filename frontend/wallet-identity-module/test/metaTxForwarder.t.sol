// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/MetaTxForwarder.s.sol";

contract MetaTxRelayerTest is Test {
    MetaTxRelayer relayer;
    address user;
    uint256 userPrivateKey;

    address target;
    DummyTarget dummy;

    function setUp() public {
        relayer = new MetaTxRelayer();

        userPrivateKey = 0xA11CE;
        user = vm.addr(userPrivateKey);

        dummy = new DummyTarget();
        target = address(dummy);
    }

    function testExecuteMetaTx() public {
        uint256 nonce = relayer.nonces(user);
        bytes memory callData = abi.encodeWithSignature("doSomething()");

        // Compute meta-tx hash
        bytes32 hash = keccak256(abi.encodePacked(user, target, callData, nonce));
        bytes32 ethSignedHash = getEthSignedMessageHash(hash);

        // Sign with private key
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(userPrivateKey, ethSignedHash);
        bytes memory signature = abi.encodePacked(r, s, v);

        // Call metaTx
        relayer.executeMetaTx(user, target, callData, nonce, signature);

        // Check that dummy function was called
        assertEq(dummy.called(), true);
        assertEq(relayer.nonces(user), 1);
    }

    function getEthSignedMessageHash(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }
}

// Dummy contract that the relayer will call
contract DummyTarget {
    bool public wasCalled = false;

    function doSomething() external {
        wasCalled = true;
    }

    function called() external view returns (bool) {
        return wasCalled;
    }
}
