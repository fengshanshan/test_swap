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
    const tokenContract = await ethers.getContractFactory("MyToken");
    //const tokenContract2 = await ethers.getContractFactory("MyToken");
    token1 = await tokenContract.deploy("mPUNDIX", "PUX");
    token2 = await tokenContract.deploy("mPURSE", "PUR");

    const Swap = await ethers.getContractFactory("TokenSwap");
    console.log("Deploying Swap...");

    console.log("Deploying token1...", token1.address);
    console.log("Deploying token2...", token2.address);

    const tokenSwap = await upgrades.deployProxy(Swap, [token1.address, token2.address, 1], {
        initializer: "initialize",
    });

    await tokenSwap.deployed();
    console.log("tokenSwap deployed to:", tokenSwap.address);

}

main();