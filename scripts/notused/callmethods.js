const { ethers, Wallet } = require("ethers");
const fs = require("fs");
var rawdata = fs.readFileSync('secrets.json');
var secrets = JSON.parse(rawdata);

function unpackArtifact(artifactPath){
    let contractData = JSON.parse(fs.readFileSync(artifactPath));
    const contractBytecode = contractData.bytecode;
    const contractABI = contractData.abi;
    const constructorArgs = contractABI.filter((itm) => {
        return itm.type == 'constructor';
    });
    let constructorStr;
    if(constructorArgs.length < 1) {
        constructorStr = "    -- No constructor arguments -- ";
    }
    else {
        constructorJSON = constructorArgs[0].inputs;
        constructorStr = JSON.stringify(constructorJSON.map((c) => {
            return {
                name: c.name,
                type: c.type
            };
        }));
    }
    return {
        abi: contractABI,
        bytecode: contractBytecode,
        description:`  ${contractData.contractName}\n    ${constructorStr}`
    };
}

function connectWallet(network){
    var wallet;
    var connectedWallet;
    const provider = ethers.getDefaultProvider(network, {
        etherscan: secrets.etherscanApiKey,
        infura: secrets.infuraApiKey,
    });
    if(secrets.mnemonic != "") {
        wallet = Wallet.fromMnemonic(secrets.mnemonic);
        connectedWallet = wallet.connect(provider);
        return connectedWallet;
    }
    return null;
}

var signer = connectWallet("ropsten");
console.log(__dirname);
let tokenUnpacked = unpackArtifact("/home/phil/workspace/CFIToken/build/contracts/GameItem.json");
const erc721_rw = new ethers.Contract(tokenUnpacked.address, tokenUnpacked.abi, signer);
