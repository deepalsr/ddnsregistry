const hre = require("hardhat");

async function main() {
  // Compile if needed
  await hre.run("compile");

  // Get contract factory
  const DNSRegistry = await hre.ethers.getContractFactory("DNSRegistry");

  // Deploy contract
  const dns = await DNSRegistry.deploy();

  // Wait for deployment to be mined
  await dns.waitForDeployment();

  // Show deployed address
  console.log(`✅ Contract deployed at: ${dns.target}`);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
