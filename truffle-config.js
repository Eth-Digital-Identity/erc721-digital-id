var HDWalletProvider = require("truffle-hdwallet-provider");
var fs = require('fs');
var Web3 = require("web3");
var web3 = new Web3();

//Load sercrets.json to read mnumonic private key from JSON key-value pair
var rawdata = fs.readFileSync('secrets.json');
var secrets = JSON.parse(rawdata);

module.exports = {
  compilers: {
    solc: {
      version: "0.6.12",
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200     // Default: 200
        }
      }
    },
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(secrets.mnemonic, "https://ropsten.infura.io/v3/"+secrets.infuraApiKey);
      },
      network_id: '3',
      gasPrice: web3.utils.toWei('85', 'gwei'), //gas price
      gas: 8000000,  //gas limit. Block limit is 8000000
      timeoutBlocks: 200,
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(secrets.mnemonic, "https://kovan.infura.io/v3/"+secrets.infuraApiKey, 0); //3rd argument, index of account in mnemonic
      },
      network_id: '42'
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(secrets.mnemonic, "https://rinkeby.infura.io/v3/"+secrets.infuraApiKey);
      },
      network_id: '4'
    },
    live: {
      provider: function() {
        return new HDWalletProvider(secrets.mnemonic, "https://mainnet.infura.io/v3/"+secrets.infuraApiKey);
      },
      network_id: '1',
      gasPrice: web3.utils.toWei('85', 'gwei'),
      timeoutBlocks: 200,
    }
  }
};
