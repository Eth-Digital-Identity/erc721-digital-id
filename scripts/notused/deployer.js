const fs = require("fs")
const HDWalletProvider = require('truffle-hdwallet-provider');;
const solc = require("solc");
const Web3 = require("web3");

//Load sercrets.json to read mnumonic private key from JSON key-value pair
var rawdata = fs.readFileSync('secrets.json');
var secrets = JSON.parse(rawdata);



/* const provider = new HDWalletProvider(
  secrets.mnemonic,
  'https://ropsten.infura.io/v3/'+secrets.infuraApiKey
);
const web3 = new Web3(provider); */
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545/")); //Connect to Ganache
//var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/"+secrets.infuraApiKey));
//web3.eth.personal.currentProvider


var cDir = fs.readdirSync("./contracts"); //Contracts directory
console.log(cDir); //Print contracts directory 

//Read files and put into contracts array
var contracts = cDir.reduce(function (acc, file) {
    acc[file] = fs.readFileSync("./contracts/" + file, { encoding: "utf8" });
    return acc;
}, {});

var solcInput = {
    language: 'Solidity',
    sources: {
        'test.sol': {
          content: 'contract C { function f() public { } }'
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

//Compile the contracts
solcInput = JSON.stringify(solcInput);
var output = solc.compile(solcInput);
output = JSON.parse(output);
console.log(output);

//Print all warnings/errors
console.log("Errors/Warnings");
console.log(output.errors);

//If error compiling then throw error
if ((output.errors || []).some(x => x.severity === "error")) {
    throw output.errors;
}

// web3.eth.accounts.privateKeyToAccount("56217220e2f2cedbb288623d064dce571b222bdaced3846dbdc0e2fb12d7b524"); //Get account 0x9AC27F32dC59760586e60aA29bd73073AdD98B16
// web3.eth.getAccounts().then(function(result){console.log(result)});
// web3.eth.getAccounts().then(console.log);
//web3.eth.getAccounts().then(x=>ad=x[0])

var owner;
web3.eth.getAccounts().then(x=>owner=x[0]); 
web3.eth.defaultAccount = owner; //Make owner defaut account
var contracts = []; //Clear already compiled contracts
console.log(owner);
console.log(web3.eth.defaultAccount);
/* 
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
  
    console.log('Attempting to deploy from account',accounts[0]);
  
}; */

web3.eth.personal.unlockAccount(owner, "", 120000, function (err, success) { //unlock account
    Object.keys(output.contracts).forEach(function (name) {
        var contract = output.contracts[name];
        contract.interface = JSON.parse(contract.interface);
        deployContract(contract, name).then(res => {
            console.log(name, " Address: ", res);
        });
    });
});

function deployContract(contract, fileName) {
    return new Promise((resolve, reject) => {
        web3.eth.contract(contract.interface).new({
            data: "0x" + contract.bytecode,
            gas: 900000, // If you get gas issue please change this value according error
            // privateFor: [],
            from: owner,
        }, function (err, myContract) {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (!err) {
                if (!myContract.address) {
                    console.log(fileName + " : " + myContract.transactionHash); // The hash of the transaction, which deploys the contract
                } else {
                    contract.address = myContract.address;
                    fs.writeFileSync("./compiled/" + fileName + ".json", JSON.stringify(contract, null, 4));
                    //cb(null, myContract.address); // the contract address
                    resolve(myContract.address);
                }

            }
        });
    });
}
deploy();