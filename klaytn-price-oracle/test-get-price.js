const fs = require("fs");

const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651");

const contractAddress = fs
  .readFileSync("./deployAddress", "utf8")
  .replace(/\r|\n/g, "");

const KlaytnPriceOracle = require("./build/contracts/PriceOracle.json");

const priceOracleContract = new caver.klay.Contract(
  KlaytnPriceOracle.abi,
  contractAddress
);
priceOracleContract.methods
  .prices('BTC')
  .call()
  .then((value) => console.log(`ETH: ${value}`));

priceOracleContract.methods
  .lastModifiedAccount()
  .call()
  .then((value) => console.log(`lastModifiedAccount: ${value}`));

//   console.log(

// priceOracleContract.methods
//   .prices('ETH')
//   )