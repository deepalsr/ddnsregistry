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

````
2. **Install dependencies**
```shell
npm install
# or
yarn install
````

3. **Start Ganache**

   ```shell
   ```

ganache-cli --port 7545

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

### License

MIT © 2025 Deepal Sharma

---

## 🌐 ddnswithipfs (Frontend & IPFS Client)

**GitHub:** [https://github.com/deepalsr/ddnswithipfs](https://github.com/deepalsr/ddnswithipfs)

### Overview

`ddnswithipfs` is a static web client enabling users to register, resolve, and update domains on the decentralized DNS system. It uses the Pinata SDK to upload and pin site assets to IPFS, and interacts with the `ddnsregistry` smart contract via an Ethereum RPC endpoint.

### Features

* **Register Domains**: Upload a local folder to Pinata → get IPFS hash → send registration tx.
* **Resolve Domains**: Query the blockchain for the current content hash and preview live content.
* **Update Content**: Pin new assets to IPFS and update the on‑chain record.

### Prerequisites

* **Node.js** >= 14.x and **npm** or **yarn**
* **Pinata account** (API Key & Secret)
* **Pinata SDK** (`@pinata/sdk`)
* **HTTP server** (e.g., `http-server`)
* **Access** to an Ethereum RPC endpoint (Ganache, Infura, etc.)

### Installation & Configuration

1. **Clone the repo**

   ```shell
   ```

git clone [https://github.com/deepalsr/ddnswithipfs.git](https://github.com/deepalsr/ddnswithipfs.git)
cd ddnswithipfs

````
2. **Install dependencies**
```shell
npm install
# or
yarn install
````

3. **Set environment variables**

   ```shell
   ```

export PINATA\_API\_KEY="\<YOUR\_PINATA\_API\_KEY>"
export PINATA\_SECRET\_API\_KEY="\<YOUR\_PINATA\_SECRET\_API\_KEY>"

````
4. **Configure contract connection**
In `contract.js`:
```js
const rpcEndpoint = "http://127.0.0.1:7545";
const registryAddress = "<DEPLOYED_CONTRACT_ADDRESS>";
````

### Running Locally

```shell
npx http-server -c-1 .
```

Then open your browser to `http://localhost:8080`.

### Usage

```shell
# 1. Register a domain and pin content via Pinata SDK
node register.js <domain> <path-to-site>

# 2. Resolve a domain and get IPFS hash
node resolve.js <domain>

# 3. Update a domain with new content
node update.js <domain> <path-to-new-site>
```

### Contributing

```shell
git fork <repo>
git checkout -b fix/your-fix
git commit -am "Fix issue"
git push origin fix/your-fix
```

Then submit a Pull Request.


