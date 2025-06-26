# README

This repository contains two separate projects for implementing a decentralized DNS system using Blockchain and IPFS (via Pinata). Each subrepository has its own README below:

---

## 📦 ddnsregistry (Smart Contracts & Backend)

**GitHub:** [https://github.com/deepalsr/ddnsregistry](https://github.com/deepalsr/ddnsregistry)

### Overview

`ddnsregistry` provides a Solidity-based name registry smart contract that maps human‑readable domains to IPFS content hashes. It supports registration, renewal, transfer, and lookup, and is designed for deployment on an Ethereum‑compatible network (e.g., Ganache, testnets, or mainnet).

### Features

* **Domain Registration**: Lock ownership of domains for a configurable duration.
* **Renewal & Expiration**: Extend registration periods and enforce expiry.
* **Ownership Transfer**: Secure on‑chain transfers between addresses.
* **Lookup**: Retrieve the latest IPFS hash for any registered domain.

### Prerequisites

* **Node.js** >= 14.x and **npm** or **yarn**
* **Ganache CLI** or **Ganache GUI**
* **Hardhat** (Ethereum development environment)
* **Solidity compiler** (solc) >= 0.8.x

### Installation & Deployment

1. **Clone the repo**

   ```shell
   git clone [https://github.com/deepalsr/ddnsregistry.git](https://github.com/deepalsr/ddnsregistry.git)
   cd ddnsregistry
 ```


2. **Install dependencies**
```shell
npm install
# or
yarn install


3. **Start Ganache**

   ```shell
   ganache-cli --port 7545
   ```



# or launch Ganache GUI and set workspace to port 7545

````
4. **Compile & Deploy**
- Update `hardhat.config.js` to point at `http://127.0.0.1:7545`
- Run:
  ```shell
npx hardhat compile
npx hardhat run --network localhost scripts/deploy.js
  ```
- Note the deployed contract address for your front end.

### Usage
Interact via Hardhat scripts or programmatically:
```js
// Example: lookup in a script
const registry = await ethers.getContractAt(
"DDNSRegistry",
"<DEPLOYED_ADDRESS>"
);
const hash = await registry.resolve("example.eth");
console.log("IPFS Hash:", hash);
````

### Testing

```shell
npx hardhat test
```

### Contributing

```shell
git fork <repo>
git checkout -b feature/your-feature
git commit -am "Add new feature"
git push origin feature/your-feature
```

Then open a Pull Request on GitHub.

