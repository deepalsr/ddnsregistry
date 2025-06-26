// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DNSRegistry {
    struct DomainRecord {
        address owner;
        string cid;
    }

    mapping(string => DomainRecord) private domains;

    event DomainRegistered(string name, address indexed owner, string cid);
    event CIDUpdated(string name, string newCid);
    event DomainTransferred(string name, address indexed newOwner);

    function registerDomain(string calldata name, string calldata cid) external {
        require(domains[name].owner == address(0), "Domain already registered");
        domains[name] = DomainRecord(msg.sender, cid);
        emit DomainRegistered(name, msg.sender, cid);
    }

    function updateCID(string calldata name, string calldata newCid) external {
        require(domains[name].owner == msg.sender, "Only the owner can update CID");
        domains[name].cid = newCid;
        emit CIDUpdated(name, newCid);
    }

    function transferDomain(string calldata name, address newOwner) external {
        require(domains[name].owner == msg.sender, "Only the owner can transfer");
        require(newOwner != address(0), "Invalid new owner");
        domains[name].owner = newOwner;
        emit DomainTransferred(name, newOwner);
    }

    function getCID(string calldata name) external view returns (string memory) {
        require(domains[name].owner != address(0), "Domain not registered");
        return domains[name].cid;
    }

    function getOwner(string calldata name) external view returns (address) {
        return domains[name].owner;
    }
}
