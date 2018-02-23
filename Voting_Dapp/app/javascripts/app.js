// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";
 
// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
 
// Import our contract artifacts and turn them into usable abstractions.
import voting_artifacts from '../../build/contracts/Voting.json'
 
 
var Voting = contract(voting_artifacts);
let candidates = {"Akanksha": "candidate-1", "Vaibhav": "candidate-2", "Nikhil": "candidate-3", "Akhilesh": "candidate-4"}
 
window.App = {
  start: function() {
    var self = this;
    Voting.setProvider(web3.currentProvider);
    let candidateNames = Object.keys(candidates);
    for (var i = 0; i < candidateNames.length; i++) {
      let name = candidateNames[i];
      Voting.deployed().then(function(contractInstance) {
        contractInstance.totalVotesFor.call(name).then(function(v) {
          $("#" + candidates[name]).html(v.toString());
          console.log()
        });
      })
    }
  },
 
  voteForCandidate : function(cntrl) {
    var cnt = $(cntrl).parent().parent().find('td')[0];
    var candidateName = $(cnt).text();
    try {
      if($("#candidate").val()==''){
        $("#msg").html("Please enter the name")
      }
      /* Voting.deployed() returns an instance of the contract. Every call
      * in Truffle returns a promise which is why we have used then()
      * everywhere we have a transaction call
      */
      Voting.deployed().then(function(contractInstance) {
        contractInstance.voteForCandidate(candidateName, {gas: 140000, from: web3.eth.accounts[0]}).then(function() {
          let div_id = candidates[candidateName];
          return contractInstance.totalVotesFor.call(candidateName).then(function(v) {
            $("#" + div_id).html(v.toString());
            $("#msg").html("");
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
    }
    
};
 
window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  
 
  App.start();
});