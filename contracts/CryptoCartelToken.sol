//SPDX-License-Identifier: MIT
pragma solidity ^0.6.9;
 
import "./ConvertLib.sol";
import "./EIP20Interface.sol";

//Based on https://github.com/ConsenSys/Tokens. 
contract CryptoCartelToken is EIP20Interface {
 	mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;

	string public name = "Crypto Cartel Token";  //fancy name
    uint8 public decimals = 8;                   //How many decimals to show.
    string public symbol = "CRCT";               //ticker
    uint256 constant private MAX_UINT256 = 2**256 - 1;

	constructor() public {
		balances[tx.origin] = 50000; // Give the creator all initial tokens TODO: airdrop to list of addresses
		totalSupply = 50000; //Set total supply
	}

    //Simple transfer
	function transfer(address _to, uint256 _value) override public  returns (bool success) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    //Get balance of address
    function balanceOf(address _owner) override public view returns (uint256 balance) {
        return balances[_owner];
    }  
    
    //Caller approves _spender to claim _value tokens?
    function approve(address _spender, uint256 _value) override public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }
 
    //Money _owner approved to give spender?
    function allowance(address _owner, address _spender) override public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

    //Transfer if _to was given an allowance?
    function transferFrom(address _from, address _to, uint256 _value) override public returns (bool success) {
        uint256 allowance = allowed[_from][msg.sender];
        require(balances[_from] >= _value && allowance >= _value);
        balances[_to] += _value;
        balances[_from] -= _value;
        if (allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
        emit Transfer(_from, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    //Not needed
	function getBalanceInEth(address addr) public view returns(uint){
		//Saying 1 coin = 2 eth
		return ConvertLib.convert(balanceOf(addr),2);
	}
}