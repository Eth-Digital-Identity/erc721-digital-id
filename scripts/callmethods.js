const { ethers, Wallet } = require("ethers");
const fs = require("fs");
var rawdata = fs.readFileSync('secrets.json');
var secrets = JSON.parse(rawdata);
var path = require('path');
var appDir = path.dirname(require.main.filename);

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

let overrides = {
    gasLimit: 800000
};

function CreateErc721(signer){
    let tokenUnpacked = unpackArtifact(__dirname+"/../artifacts/GameItem.json"); //Unpack GameItem contract details. create with 'npx buidler compile'
    var contractAddress = "0x678f19065f9dA7364EaDc78e843C845D68a07CED"; //Deployed address to request GameItem
    var myAddress = "0x66D56D0B0Bc2Ff5e9d553D83B9f91227CF46aAd0"; //User address
    const erc721_rw = new ethers.Contract(contractAddress, tokenUnpacked.abi, signer); //Get instance of GameItem contract
    erc721_rw.name().then(console.log); //Get name of contract
    erc721_rw.awardItem(myAddress,"Some Data") //Call contract to send GameItem to my address
    .then(console.log).catch(console.log);
}

function issueId(signer){
    let tokenUnpacked = unpackArtifact(__dirname+"/../artifacts/DigitalIdIssuer.json"); //Unpack DigitalIdIssuer contract details. create with 'npx buidler compile'
    var contractAddress = "0xC5a94B4DB4A87a6713a97cBE3C828704918bCa6c"; //Deployed address to request DigitalIdIssuer
    var myAddress = "0x66D56D0B0Bc2Ff5e9d553D83B9f91227CF46aAd0"; //User address
    const digitalIdIssuerContract = new ethers.Contract(contractAddress, tokenUnpacked.abi, signer); //Get instance of DigitalIdIssuer contract
    digitalIdIssuerContract.name().then(console.log); //Get name of contract
    var verifiedPersonIdNumber = digitalIdIssuerContract.issueId(myAddress, "Philip Rego", "JSONMetadataURI", overrides).then(console.log).catch(console.log); //Call contract to send DigitalIdIssuer to my address
    //digitalIdIssuerContract.getVerifiedName(2).then(console.log).catch(console.log);
}

var signer = connectWallet("ropsten"); //Connect to ropsten testnet
issueId(signer);


