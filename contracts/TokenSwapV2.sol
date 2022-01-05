// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

import "./MyToken.sol";

contract TokenSwapV2 {

    MyToken public punToken;
    MyToken public purToken;
    uint public rate;

//    constructor(MyToken _token1, MyToken _token2) {
//        punToken = _token1;
//        purToken = _token2;
//    }

    function initialize(MyToken _token1, MyToken _token2, uint _rate) external {
        punToken = _token1;
        purToken = _token2;
        rate = _rate;
    }

    function deposit(uint _amount) public {
        require(punToken.balanceOf(msg.sender) >= _amount);

        uint purTokenAmount = _amount * rate;

        require(purToken.balanceOf(address(this)) >= purTokenAmount);

        punToken.transferFrom(msg.sender, address(this), _amount);
        purToken.transfer(msg.sender, purTokenAmount);
    }

    function withdraw(uint _amount) public {
        require(purToken.balanceOf(msg.sender) >= _amount);

        //Calculate the amount of pundix to redeem
        uint punAmount = _amount / rate;
        require(punToken.balanceOf(address(this)) >= punAmount);

        purToken.transferFrom(msg.sender, address(this), _amount);
        punToken.transfer(msg.sender, punAmount);
    }
}
