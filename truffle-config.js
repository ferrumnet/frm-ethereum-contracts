var HDWalletProvider = require("truffle-hdwallet-provider");
var path = require("path");
// var mnemonic = process.env.NMONIC;
// var rinkebyClientUrl = process.env.RINKEBY_CLIENT_URL;

var mnemonic =
  "snake december custom citizen fire useful glimpse forest advance original avoid vital";
var rinkebyClientUrl =
  "https://rinkeby.infura.io/v3/6a43b00591fa422da11c6a3b8b31bc1f";

module.exports = {
  plugins: ["truffle-security"],

  contracts_build_directory: path.join(__dirname, "/src/abi"),

  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, rinkebyClientUrl);
      },
      network_id: 4,
      gas: 4712388,
      gasPrice: 10000000000 // Gas limit used for deploys
    }
  }
};
