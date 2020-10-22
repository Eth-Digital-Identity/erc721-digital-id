var digitalId = artifacts.require("DigitalId");
var migrations = artifacts.require("Migrations");
//const erc721 = require("@0xcert/ethereum-erc721/build/nf-token-enumerable.json");

contract('Simple test', ([address]) => {
    it("should run", async () => {
        console.log("Tests run");
    });
    it("should construct", async () => {
        console.log("should construct");
        //digitalId.deployed();
        //digitalId.new({ from: address });        
    });

    it("should show erc721 functions", async () => {
        console.log();
      
    });
});
