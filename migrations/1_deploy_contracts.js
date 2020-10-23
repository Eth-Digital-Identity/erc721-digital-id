const DigitalIdIssuer = artifacts.require("DigitalIdIssuer");

module.exports = function(deployer) {
  deployer.deploy(DigitalIdIssuer);
};