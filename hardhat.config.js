require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: { version: "0.7.5", settings: { optimizer: { enabled: true, runs: 200 } } },
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