# taptrust-sdk-solidity

This package contains an interface to require credentials from a Solidity contract.

Refer to the [taptrust-contracts](https://github.com/taptrust/taptrust-contracts) repository for the implementation of the TapTrust registries used for credential verification.

### Getting Started


1. To install required dependencies, run the following command:

```sh
npm install
```

### Running a local Ethereum node

Running an Ethereum node is easily accomplished by using our built-in scripts for running a [HardHat](https://hardhat.org) node.

1. To start a local Ethereum node, simply run:

```sh
npm run hardhat:node
```

Now you have a local Ethereum node running. This process is long-lived and should remain open in it's own terminal tab.

2. Next, you will need to deploy the smart contracts to the local Ethereum network.

```sh
npm run hardhat:deploy
```


### Testing

Run tests by running

```sh
npm run hardhat:test
```

## Example Usage

Refer to the [ERC-20](https://github.com/taptrust/taptrust-sdk-solidity/blob/master/contracts/ERC20RequireCredential.sol) and [ERC-721](https://github.com/taptrust/taptrust-sdk-solidity/blob/master/contracts/ERC721RequireCredential.sol) example implementations.

