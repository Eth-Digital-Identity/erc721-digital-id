var cartelFinance = artifacts.require("CartelFinance");
var migrations = artifacts.require("Migrations");
//const erc721 = require("@0xcert/ethereum-erc721/build/nf-token-enumerable.json");

contract('Simple test', ([address]) => {
    it("should run", async () => {
        console.log("Tests run");
    });
    it("should construct", async () => {
        console.log("should construct");
        //cartelFinance.deployed();
        cartelFinance.new({ from: address });        
    });

    it("should show erc721 functions", async () => {
        console.log();
      
    });
});

























// module.exports = function(callback) {

//     cartelFinance.web3.eth.getGasPrice(function(error, result){ 
//         var gasPrice = Number(result);
//         console.log("Gas Price is " + gasPrice + " wei"); // "10000000000000"

//         var cartelFinanceContract = new web3.eth.Contract(cartelFinance._json.abi);
//         var contractData = cartelFinanceContract.new.getData({data: cartelFinance._json.bytecode});
//         var gas = Number(web3.eth.estimateGas({data: contractData}));


//         console.log("gas estimation = " + gas + " units");
//         console.log("gas cost estimation = " + (gas * gasPrice) + " wei");
//         console.log("gas cost estimation = " + cartelFinance.web3.fromWei((gas * gasPrice), 'ether') + " ether");

//     });
// };

// Run unit tests to populate my contract
// ...
// ...
/* 
// getGasPrice returns the gas price on the current network
TestContract.web3.eth.getGasPrice(function(error, result){ 
    var gasPrice = Number(result);
    console.log("Gas Price is " + gasPrice + " wei"); // "10000000000000"

    // Get Contract instance
    TestContract.deployed().then(function(instance) {

        // Use the keyword 'estimateGas' after the function name to get the gas estimation for this particular function 
        return instance.giveAwayDividend.estimateGas(1);

    }).then(function(result) {
        var gas = Number(result);

        console.log("gas estimation = " + gas + " units");
        console.log("gas cost estimation = " + (gas * gasPrice) + " wei");
        console.log("gas cost estimation = " + TestContract.web3.fromWei((gas * gasPrice), 'ether') + " ether");
    });
}); */