token1
0x609b6b8d5aB0dA7f965687a9C99CF47439d49e3b
token2
0xeFD80dB35106cea37De63Ac60c33f392B1b7b88b
tokenSwap 
0x0899EAB6df70eA7cab3587aB5C6999C108Cb9817


but in order to verify tokenSwap proxy contract, need to verified real tokenSwap contract
use the following command to verify

npx hardhat verify --network rinkeby --contract contracts/TokenSwap.sol:TokenSwap 0xd589f94e11c6d0124f259185f3e7329985542d4b

then use upgrade.js to upgrade the contract
