***Digital ID Issuer***
  
**Highlights**  
*-Deploys a contract that generates Digital IDs as ERC-721 non-fungible tokens*
*-Ability for issuer to invalidate IDs like if experation date is met or users account is compromised.*  
*-Uses Truffle for build and deployments. Can compile with Buidler and uses Buidler to run Mocha for test cases in VS Code with breakpoints.*   
  
**To Do**  


**Setup:**  
1. `npm install`  (install dependencies)  
2. `npm install -g truffle` (install truffle globally)  
3. Install VS Code and install *juanblanco.solidity* extension using Solidity *version v0.6.9+commit.3e3065ac.js* https://ethereum.stackexchange.com/a/63102/28140  
  
**Local Setup:**  
1. Install Ganache (https://www.trufflesuite.com/ganache) and setup environment at 127.0.0.1 port 7545  
2. `truggle migrate`  (deploy contracts)
3. `truffle console`  (console to run commands. Try these commands with contract name instead of MetaCoin https://www.trufflesuite.com/docs/truffle/quickstart#interacting-with-the-contract)  
  
**Ropsten/Kovan/Live Setup:**  
1. Create secrets.json in this directory:  
```javascript
{  
    "mnemonic":"MNEMONIC PRIVATE KEY HERE"  
    "infuraApiKey":"INFURA API KEY"
    "pk":"OPTIONAL PRIVATE KEY FOR BUIDLER"
    "etherscanApiKey": "OPTIONAL VERIFY CONTRACT TO ETHERSCAN"
}  
```
2. `truffle migrate --network ropsten`  
3. `truffle console --network ropsten`  
  
**Call contract to create Digital ID**  
Run callmethods.js in VS Code. Calling the CreateErc721() function. 
  
**Misc Setup**
Open extension (Ctrl+Shift+X) jshint. Go to extension settings and set esversion to 8.  
```
   "jshint.options": {
      "esversion":8
   }
```  
To flatten a contract so all dependencies are in a single file use:  
```npx truffle-flattener ./contracts/try/GameItem.sol > flat.sol```  
Note you'll need to remove all SPDX-License-Identifier's or AND all licenses as one on the top of the contract for the contract to deploy/verify sucessfully.  