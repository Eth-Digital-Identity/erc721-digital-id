const CartelFinance = artifacts.require("CartelFinance");
const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  //Deploy Migrations then if succesful deploy CartelFinance
  deployer.deploy(Migrations).then(function() {
    return deployer.deploy(CartelFinance);
  });
};