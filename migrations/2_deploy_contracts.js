const GameItem = artifacts.require("try/GameItem");

module.exports = function(deployer) {
  //Deploy Migrations then if succesful deploy CartelFinance
  deployer.deploy(GameItem);
};