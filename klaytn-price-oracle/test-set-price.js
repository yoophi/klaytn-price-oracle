const fs = require("fs");

const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651");

const keystore = fs.readFileSync(
  "./keystore-0x2dcfc4c4b5800e6518615fb7cbccf3195c71dfef-2021-5-7.json",
  "utf8"
);

// Decrypt keystore
const keyring = caver.wallet.keyring.decrypt(keystore, process.env.KEYSTORE_PASSWORD);
console.log(keyring);

// Add to caver.wallet
caver.wallet.add(keyring);

const contractAddress = fs
  .readFileSync("./deployAddress", "utf8")
  .replace(/\r|\n/g, "");
const DEPLOYED_ABI = fs.readFileSync("./deployABI", "utf8");

const contractInstance = new caver.contract(
  JSON.parse(DEPLOYED_ABI),
  contractAddress
);

contractInstance.methods
  .setPrice('BTC', 42)
  .send({ from: keyring.address, gas: "0x4bfd200" })
  .then((receipt) => console.log({ receipt }));
