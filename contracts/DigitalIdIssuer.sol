// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DigitalIdIssuer is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _idNumber;
    mapping (uint256 => string) private _verifiedNames;

    constructor() public ERC721("Digital ID", "ID") {}

    function issueId(address verifiedPerson, string memory verifiedName, string memory tokenURI)
        public
        returns (uint256)
    {
        _idNumber.increment();

        uint256 verifiedPersonIdNumber = _idNumber.current();
        _setVerifiedName(verifiedName, verifiedPersonIdNumber);

        _mint(verifiedPerson, verifiedPersonIdNumber);
        _setTokenURI(verifiedPersonIdNumber, tokenURI);

        return verifiedPersonIdNumber;
    }

    function _setVerifiedName(string memory name, uint256 idNumber)
        internal {
        _verifiedNames[idNumber] = name; 
    }

    function getVerifiedName(uint256 idNumber) public view returns (string memory) {
        require(_exists(idNumber), "Digital ID number does not exsit");

        string memory _verifiedName = _verifiedNames[idNumber];
        return _verifiedName;
    }
}