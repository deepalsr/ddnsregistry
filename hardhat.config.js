require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Loads .env file

const GANACHE_URL = process.env.GANACHE_RPC;
const GANACHE_PK = process.env.PRIVATE_KEY;

if (!GANACHE_URL || !GANACHE_PK) {
  throw new Error("❌ Missing GANACHE_RPC or PRIVATE_KEY in .env");
}

module.exports = {
  solidity: "0.8.20",
  networks: {
    ganache: {
      url: GANACHE_URL,
      accounts: [GANACHE_PK],
    },
  },
};

