// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import {ERC20, ERC20Votes, EIP712, IVotes} from "./ERC20Bundle.sol";

contract KSIPT is ERC20Votes {

    constructor() ERC20("KSIPT", "K") EIP712("KSIPT", "1") {}

    function decimals() public pure virtual override returns(uint8) {
        return 10;
    }
    // функция перевода токенов
    // from - от кого, to - кому, amount - сколько 
    function transfer(address from, address to, uint amount) public {
        _transfer(from, to, amount);
    }
    // функция выпуска  токенов
    function mint(address to, uint amount) public  {
        _mint(to, amount);
    }
}

contract GerdaCoin is ERC20Votes {

    constructor() ERC20("GerdaCoin", "GERDA") EIP712("GerdaCoin", "1") {
        
      
    }

    function decimals() public pure virtual override returns(uint8) {
        return 8;
    }
    // функция перевода токенов
    function transfer(address from, address to, uint amount) public {
        _transfer(from, to, amount);
    }
    // возвращает стоимость токена
    function price() public pure returns(uint) {
        return 0.5 ether;
    }

    uint constant maxSypply = 35_000_000e8; // ограничение по выпуску токенов
    // функция выпуска  токенов
    function mint(address to, uint amount) public  {
        require(maxSypply >= totalSupply() + amount, "limit supply");
        _mint(to, amount);
    }
}