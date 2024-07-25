# NebulaID Smart Contracts

We'll use **Solidity** to write the smart contracts for managing digital identities on the **Ethereum blockchain**. The main features we aim to implement are identity registration and verification, with optional support for zero-knowledge proofs (ZKP) and cross-chain compatibility.:

### Main Features

1. **Identity Registration**: Allow users to register their digital identity.
2. **Identity Verification**: Verifiers can attest to the validity of a user’s identity.
3. **Zero-Knowledge Proofs (ZKP) Integration**: Optional support for advanced privacy-preserving features.
4. **Cross-Chain Compatibility**: To facilitate future integrations with other EVM-compatible blockchains.

### Features Developed

- **Identity Registration**: Users register their digital identity linked to an IPFS hash.
- **Identity Verification**: An `onlyOwner` function that allows specific entities to verify an identity. This can be adjusted to use a decentralized or multi-sig approach.
- **IPFS Integration**: To store encrypted identity data.  

### Pending Development Tasks

- Revocation feature development
- Identity Recovery feature integration
- Zero-Knowledge Proofs verification to verify user identity and other details

# Running the Project

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network sepolia scripts/deploy.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
