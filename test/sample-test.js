const { expect } = require("chai");
const { ethers } = require("hardhat");

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();
//
//     expect(await greeter.greet()).to.equal("Hello, world!");
//
//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
//
//     // wait until the transaction is mined
//     await setGreetingTx.wait();
//
//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });

// require('chai')
//     .use(require('chai-as-promised'))
//     .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether')
}

describe('TokenSwap', function()  {
  let punToken, purToken, tokenSwap, accounts
  console.log('before 1')
  //var acc = "0xC35A32D77Fc4e7832A7A75b4388BCDEa3c237eCd"

  before(async ()=>{
    accounts = await web3.eth.getAccounts();
    //console.log(accounts)
    var acc = accounts[0]

    const Token = await ethers.getContractFactory("MyToken");
    const punToken = await Token.deploy("mPUNDIX", "PUX");
    await punToken.deployed();
    const purToken = await Token.deploy("mPURSE", "PUR");
    await purToken.deployed();
    //punToken = await Token1.new("mPUNDIX", "PUX")
    //purToken = await Token2.new("mPURSE", "PUR")
    //tokenSwap = await TokenSwap.new(punToken.address, purToken.address)
    //acc = acc

    const TokenSwap = await ethers.getContractFactory("TokenSwap");
    const tokenSwap = await TokenSwap.deploy(punToken.address, purToken.address, 1);
    await tokenSwap.deployed();

    console.log("swap address: ", tokenSwap.address)
    //await punToken.transfer(tokenSwap.address, tokens('10'))
    await purToken.transfer(tokenSwap.address, tokens('100'))
  })

  describe('mPUNDIXToken deployment', async () => {
    it('contract has a name', async() => {
      const name = await punToken.name()
      assert.equal(name, 'mPUNDIX')
    })
  })

  describe('TokenSwap deployment', async () => {
    it('contract has puntoken', async() => {
      let balance = await  punToken.balanceOf(tokenSwap.address)
      assert.equal(balance.toString(), tokens('0'))
      let balance2 = await  purToken.balanceOf(tokenSwap.address)
      assert.equal(balance2.toString(), tokens('100'))
    })
  })

  describe('TokenSwap deployment account balance', async () => {
    it('account has puntoken', async() => {
      let balance = await  punToken.balanceOf(acc)
      console.log('balance in other case', balance.toString())
      assert.equal(balance.toString(), tokens('100'))
    })
    it('account has purtoken', async() => {
      let balance = await  purToken.balanceOf(acc)
      assert.equal(balance.toString(), tokens('0'))
    })
  })

  describe('deposit()', async () => {
    let result
    before(async() => {
      let balance = await punToken.balanceOf(acc);
      // console.log('acc balance bef', balance.toString())
      await punToken.approve(tokenSwap.address, tokens('10000'))
      let allowance1 = await punToken.allowance(acc, tokenSwap.address);
      console.log('acc balance allowance', allowance1.toString())
      result = await tokenSwap.deposit(tokens('1'), {from: acc})
    })

    it('Allows user to deposit punToken and receive purToken', async() => {
      let accBalancePun = await punToken.balanceOf(acc)
      assert.equal(accBalancePun.toString(), tokens('99'))

      let accBalancePur = await purToken.balanceOf(acc)
      assert.equal(accBalancePur.toString(), tokens('1'))
    })
  })


  describe('withdraw()', async () => {
    let result
    before(async() => {
      let balance = await punToken.balanceOf(acc);
      // console.log('acc balance bef', balance.toString())
      await purToken.approve(tokenSwap.address, tokens('10000'))
      // let allowance1 = await punToken.allowance(acc, tokenSwap.address);
      // console.log('acc balance allowance', allowance1.toString())
      result = await tokenSwap.withdraw(tokens('1'), {from: acc})
    })

    it('Allows user to withdraw purToken and receive punToken', async() => {
      let accBalancePun = await punToken.balanceOf(acc)
      assert.equal(accBalancePun.toString(), tokens('100'))

      let accBalancePur = await purToken.balanceOf(acc)
      assert.equal(accBalancePur.toString(), tokens('0'))
    })
  })
})

