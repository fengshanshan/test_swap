const { ethers, upgrades } = require("hardhat");

const PROXY = "0x0899EAB6df70eA7cab3587aB5C6999C108Cb9817";

async function main() {
    const TokenSwapV2 = await ethers.getContractFactory("TokenSwapV2");
    console.log("Upgrading TokenSwapV2...");
    await upgrades.upgradeProxy(PROXY, TokenSwapV2);
    console.log("TokenSwapV2 upgraded");
}

main();