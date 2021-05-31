const fs = require("fs");

fs.writeFileSync(
  ".env",
  `DEPLOYED_ADDRESS=${JSON.stringify(
    fs.readFileSync("../klaytn-price-oracle/deployAddress", "utf8").replace(/\n|\r/g, "")
  )}\nDEPLOYED_ABI=${
    fs.existsSync("../klaytn-price-oracle/deployABI") && fs.readFileSync("../klaytn-price-oracle/deployABI", "utf8")
  }`,
  "utf-8"
);
