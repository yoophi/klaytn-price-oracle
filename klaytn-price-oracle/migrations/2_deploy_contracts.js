const fs = require("fs");
const PriceOracle = artifacts.require("./PriceOracle.sol");

module.exports = function (deployer) {
  deployer.deploy(PriceOracle).then(() => {
    if (PriceOracle._json) {
      try {
        fs.writeFileSync(
          "deployABI",
          JSON.stringify(PriceOracle._json.abi),
          "utf-8"
        );
        console.log("success deployABI");
      } catch (err) {
        throw err;
      }
    }

    try {
      fs.writeFileSync("deployAddress", PriceOracle.address);
      console.log("success deployAddress");
    } catch (err) {
      throw err;
    }
  });
};
