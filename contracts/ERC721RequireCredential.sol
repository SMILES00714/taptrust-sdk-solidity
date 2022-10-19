// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./TapTrust.sol";

/**
 * @dev Extension of {ERC721} that allows requiring a credential before a mint or transfer
 */
contract ERC721RequireCredential is TapTrust, ERC721 {

    constructor() ERC721("Example ERC721", "ERC721") {}

    function _transfer(address from, address to, uint256 tokenId) internal override virtual {
        TapTrust.requireCredential('kyc', to);
        return super._transfer(from, to, tokenId);
    }

    function _mint(address to, uint256 tokenId) internal override virtual {
        TapTrust.requireCredential('kyc', to);
        return super._mint(to, tokenId);
    }
}