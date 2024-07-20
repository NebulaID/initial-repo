// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NebulaID is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _identityIds;

    struct Identity {
        uint256 id;
        address user;
        string ipfsHash;  // Link to encrypted identity data on IPFS
        bool verified;
        address[] verifiers;
    }

    mapping(uint256 => Identity) public identities;
    mapping(address => uint256) public userToIdentity;

    event IdentityCreated(uint256 id, address indexed user, string ipfsHash);
    event IdentityVerified(uint256 id, address indexed verifier);

    function registerIdentity(string memory ipfsHash) external {
        require(userToIdentity[msg.sender] == 0, "Identity already registered.");

        _identityIds.increment();
        uint256 newId = _identityIds.current();

        identities[newId] = Identity({
            id: newId,
            user: msg.sender,
            ipfsHash: ipfsHash,
            verified: false,
            verifiers: new address 
        });

        userToIdentity[msg.sender] = newId;

        emit IdentityCreated(newId, msg.sender, ipfsHash);
    }

    function verifyIdentity(uint256 identityId) external onlyOwner {
        require(identityId > 0 && identityId <= _identityIds.current(), "Invalid identity ID.");
        Identity storage identity = identities[identityId];

        require(identity.user != address(0), "Identity does not exist.");
        require(!identity.verified, "Identity already verified.");

        identity.verified = true;
        identity.verifiers.push(msg.sender);

        emit IdentityVerified(identityId, msg.sender);
    }

    function getIdentity(uint256 identityId) external view returns (Identity memory) {
        return identities[identityId];
    }

    function isIdentityVerified(uint256 identityId) external view returns (bool) {
        return identities[identityId].verified;
    }
}
