usePlugin("@nomiclabs/buidler-truffle5");
usePlugin('buidler-log-remover');
usePlugin("@nomiclabs/buidler-etherscan");
//Load sercrets.json to read mnumonic private key from JSON key-value pair
var fs = require('fs');
var rawdata = fs.readFileSync('secrets.json');
var secrets = JSON.parse(rawdata);

module.exports = {
  solc: {
    version: "0.6.12",
  },
  defaultNetwork: "buidlerevm",
  networks: {
    buidlerevm: {
      allowUnlimitedContractSize: true,
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "istanbul" //byzantium, constantinople
       }
    },
    kovan: {
      url: "https://kovan.infura.io/v3/"+secrets.infuraApiKey,
      accounts: [secrets.pk]
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/"+secrets.infuraApiKey,
      accounts: [secrets.pk]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: secrets.etherscanApiKey
  }
};
