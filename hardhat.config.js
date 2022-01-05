require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.2",
  networks: {
    rinkeby: {
      url: `https://speedy-nodes-nyc.moralis.io/f0a34b1022ae72f23e3b7e35/eth/rinkeby`,
      accounts: [process.env.PRI_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};