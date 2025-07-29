// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/userIdentityManager.sol";

contract DeployIdentityManager is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerKey);
        UserIdentityManager id = new UserIdentityManager();
        console.log("Deployed to:", address(id));
        vm.stopBroadcast();
    }
}
