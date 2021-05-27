pragma solidity ^0.5.6;

contract PriceOracle {
  mapping(string => int) public prices;
  address public lastModifiedAccount;
  
  function setPrice(string memory name, int price) public {
    prices[name] = price;
    lastModifiedAccount = msg.sender;
  }
}