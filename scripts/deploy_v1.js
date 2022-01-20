const { ethers} = require("hardhat");

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
    //const MemoriesContract = await ethers.getContractFactory("MemoriesERC20");
    const TreasuryContract = await ethers.getContractFactory("TimeTreasury");
    const TimeContract = await ethers.getContractFactory("TimeERC20Token");


    //memories = await MemoriesContract.deploy();
    times = await TimeContract.deploy();
    treasury = await TreasuryContract.deploy(times.address, "0x95b58a6bff3d14b7db2f5cb5f0ad413dc2940658", 3000, 26);

    console.log(times.address)
    console.log(treasury.address)
}

main();