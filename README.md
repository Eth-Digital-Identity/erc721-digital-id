***Unbranded***
  
**Highlights**  
*-Compliant ERC-20 token following best practices. Uses Solidity version 6.9.*  
*-Uses Truffle for build and deployments. Can compile with Buidler and uses Buidler to run Mocha for test cases in VS Code with breakpoints.*   
  
**To Do**  
-Learn enough to be able to fork the next cool project that comes along.  
-Write script to deploy the contracts. Use @nomiclabs/truffle-flattener if it helps.  
-Link to an airdrop library or add airdrop function.  
-Write more test cases.  
-Create nonfungible token that represents someones physical identity or authenticates an art piece.    
-Learn how to connect contract with frontend: https://codesandbox.io/s/github/NoahZinsmeister/web3-react/tree/v6/example  
   
**Roadmap (tentative)**  
-Brand coin  
-Deploy website  
-Uniswap listing  
-Bamboo Relay Exchange listing  
-Layer 2 Exchange listing  
-Add logo to Uniswap  
-Add etherscan details  
  
**Setup:**  
1. `npm install`  (install dependencies)  
2. `npm install -g truffle` (install truffle globally)  
3. Install VS Code and install *juanblanco.solidity* extension using Solidity *version v0.6.9+commit.3e3065ac.js* https://ethereum.stackexchange.com/a/63102/28140  
  
**Local Setup:**  
1. Install Ganache (https://www.trufflesuite.com/ganache) and setup environment at 127.0.0.1 port 7545  
2. `truggle migrate`  (deploy contracts)
3. `truffle console`  (console to run commands. Try these commands using CryptoCartel instead of MetaCoin https://www.trufflesuite.com/docs/truffle/quickstart#interacting-with-the-contract)  
  
**Ropsten/Kovan/Live Setup:**  
1. Create secrets.json in this directory:  
```javascript
{  
    "mnemonic":"MNEMONIC PRIVATE KEY HERE"  
    "infuraApiKey":"INFURA API KEY"
    "pk":"OPTIONAL PRIVATE KEY FOR BUIDLER"
    "etherscanApiKey": "OPTIONAL VERIFY CONTRACT TO ETHERSCAN" //I tried and it wasn't able to verify using @nomiclabs/buidler-etherscan. Use truffle-flattener instead.
}  
```
2. `truffle migrate --network ropsten`  
3. `truffle console --network ropsten`  
  
**Call contract to send tokens**  
`truffle console --network ropsten`  
```
var instance = await CartelFinance.deployed()  
instance.transfer("<YOURADDRESS>", 500000000) //50000 total supply with 4 decimals 
```
Metamask won't show the tokens, but you should see them in your address on etherscan.  
  
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