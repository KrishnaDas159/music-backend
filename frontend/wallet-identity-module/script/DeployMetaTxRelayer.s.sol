// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/MetaTxForwarder.s.sol";

contract DeployMetaTxRelayer is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerKey);
        MetaTxRelayer relayer = new MetaTxRelayer();
        console.log("Relayer deployed at:", address(relayer));
        vm.stopBroadcast();
    }
}
