const { ethers, upgrades } = require("hardhat");

// async function main() {
//     const Box = await ethers.getContractFactory("Box");
//     console.log("Deploying Box...");
//     const box = await upgrades.deployProxy(Box, [42], {
//         initializer: "initialize",
//     });
//     await box.deployed();
//     console.log("Box deployed to:", box.address);
// }

async function main() {

    // await run("verify:verify", {
    //     constructorArguments: ["mPUNDIX", "PUX"],
    //     contract: "contracts/MyToken.sol:MyToken",
    //     address: "0x609b6b8d5aB0dA7f965687a9C99CF47439d49e3b"
    // });
    //
    // await run("verify:verify", {
    //     constructorArguments: ["mPURSE", "PUR"],
    //     contract: "contracts/MyToken.sol:MyToken",
    //     address: "0xeFD80dB35106cea37De63Ac60c33f392B1b7b88b"
    // });

    await run("verify:verify", {
        contract: "contracts/TokenSwap.sol:TokenSwap",
        address: "0x0899EAB6df70eA7cab3587aB5C6999C108Cb9817"
    });
}

main();