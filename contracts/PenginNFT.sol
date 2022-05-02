//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PenginNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;

    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;

    //withdraw from contract wallet
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721("PenginNFT", "PENGIN") {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 3333;
        maxPerWallet = 333;
        //set withdraw wallet address
    }

    //only the owner of the contract can call this function
    function setIsPublicMintEnabled(bool _isPublicMintEnabled)
        external
        onlyOwner
    {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    //function that Opensea calls to get the NFT images
    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        //Return error if token does not exists
        require(_exists(_tokenId), "Token does not exists.");
        //Allow opensea to get the url of NFT images
        return
            string(
                abi.encodePacked(
                    baseTokenUri,
                    Strings.toString(_tokenId),
                    ".json"
                )
            );
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}(
            ""
        );
        require(success, "Withdraw failed.");
    }

    //payable ensures the contract can receive/send ether
    function mint(uint256 _quantity) public payable {
        require(isPublicMintEnabled, "Public mint is disabled.");
        require(
            totalSupply + _quantity <= maxSupply,
            "Max supply reached, Pengin NFT Sold out."
        );
        require(msg.value == _quantity * mintPrice, "Invalid mint value.");
        require(
            walletMints[msg.sender] + _quantity <= maxPerWallet,
            "Max per wallet reached."
        );

        for (uint256 i = 0; i < _quantity; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            //call _safeMint from ERC721
            //pass in the address that will receive the NFT and the tokenId
            _safeMint(msg.sender, newTokenId);
        }
    }
}
