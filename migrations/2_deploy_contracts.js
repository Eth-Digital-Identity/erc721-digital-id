const GameItem = artifacts.require("try/GameItem");

module.exports = function(deployer) {
  deployer.deploy(GameItem);
};