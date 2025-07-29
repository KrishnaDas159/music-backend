// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MetaTxRelayer {
    mapping(address => uint256) public nonces;

    event MetaTxExecuted(address user, address target, bytes data);

    function executeMetaTx(
        address user,
        address target,
        bytes calldata data,
        uint256 nonce,
        bytes calldata signature
    ) external {
        require(nonce == nonces[user], "Invalid nonce");

        bytes32 hash = keccak256(abi.encodePacked(user, target, data, nonce));
        bytes32 ethSignedHash = _toEthSignedMessageHash(hash);
        require(
            _recoverSigner(ethSignedHash, signature) == user,
            "Invalid signature"
        );

        nonces[user]++;

        (bool success, ) = target.call{value: 0}(abi.encodePacked(data, user));
        require(success, "MetaTx failed");

        emit MetaTxExecuted(user, target, data);
    }

    function _toEthSignedMessageHash(
        bytes32 hash
    ) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
            );
    }

    function _recoverSigner(
        bytes32 hash,
        bytes memory signature
    ) internal pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = _splitSignature(signature);
        return ecrecover(hash, v, r, s);
    }

    function _splitSignature(
        bytes memory sig
    ) internal pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "Invalid signature length");

        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }
}
