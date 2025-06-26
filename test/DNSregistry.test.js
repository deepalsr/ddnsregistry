const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DNSRegistry", function () {
  let DNSRegistry, dns, owner, user1;

  beforeEach(async () => {
    // Get contract factory and accounts
    DNSRegistry = await ethers.getContractFactory("DNSRegistry");
    [owner, user1] = await ethers.getSigners();

    // Deploy new instance before each test
    dns = await DNSRegistry.deploy();
    await dns.waitForDeployment();
  });

  it("should register a new domain", async () => {
    await dns.connect(owner).registerDomain("nepal.eth", "Qm123");
    const cid = await dns.getCID("nepal.eth");
    expect(cid).to.equal("Qm123");
  });

  it("should not allow duplicate domain registration", async () => {
    await dns.registerDomain("nepal.eth", "Qm123");
    await expect(
      dns.registerDomain("nepal.eth", "Qm456")
    ).to.be.revertedWith("Domain already registered");
  });

  it("should allow only owner to update CID", async () => {
    await dns.registerDomain("nepal.eth", "Qm123");
    await dns.updateCID("nepal.eth", "Qm456");
    const updated = await dns.getCID("nepal.eth");
    expect(updated).to.equal("Qm456");

    // Another user can't update
    await expect(
      dns.connect(user1).updateCID("nepal.eth", "Qm789")
    ).to.be.revertedWith("Only the owner can update CID");
  });

  it("should transfer domain ownership", async () => {
    await dns.registerDomain("nepal.eth", "Qm123");
    await dns.transferDomain("nepal.eth", user1.address);
    const newOwner = await dns.getOwner("nepal.eth");
    expect(newOwner).to.equal(user1.address);
  });

  it("should not allow non-owner to transfer domain", async () => {
    await dns.registerDomain("nepal.eth", "Qm123");
    await expect(
      dns.connect(user1).transferDomain("nepal.eth", user1.address)
    ).to.be.revertedWith("Only the owner can transfer");
  });
});
