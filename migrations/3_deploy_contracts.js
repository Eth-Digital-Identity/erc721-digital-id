const Campaign = artifacts.require("try/Campaign");
const CampaignFacotory = artifacts.require("try/CampaignFacotory");

module.exports = function(deployer) {
  //deployer.deploy(Campaign);
  deployer.deploy(CampaignFacotory);
};