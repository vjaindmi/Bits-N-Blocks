var Voting = artifacts.require("./Voting.sol");
module.exports = function(deployer) {
  deployer.deploy(Voting, ['Akanksha', 'Vaibhav', 'Nikhil', 'Akhilesh']);
};