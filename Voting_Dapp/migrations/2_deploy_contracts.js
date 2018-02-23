var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(Voting, ['Akanksha', 'Vaibhav', 'Nikhil', 'Akhilesh']);
};
