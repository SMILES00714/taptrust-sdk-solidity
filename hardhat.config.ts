import { task } from "hardhat/config"
import "@nomiclabs/hardhat-waffle"
import dotenv from "dotenv"
import { Contract, ContractFactory } from "ethers"
import * as fs from "fs"
dotenv.config({path: __dirname + '/.env'});

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()
  for (const account of accounts) {
    console.log(account.address)
  }
})

task("faucet", "Sends 1 ETH to an address")
  .addPositionalParam("receiver", "The address that will receive them")
  .setAction(async (taskArgs, hre) => {
    if (hre.network.name === "hardhat") {
      console.warn(
        "You are running the faucet task with Hardhat network, which " +
          "is automatically created and destroyed every time. Use the Hardhat" +
          " option '--network localhost'"
      )
    }

    const [sender] = await hre.ethers.getSigners()
    const receiver = taskArgs.receiver

    const tx = await sender.sendTransaction({
      to: receiver,
      value: hre.ethers.constants.WeiPerEther
    })
    await tx.wait()
    console.log(`Transferred 1 ETH to ${receiver}`)
  })

/**
 * @type import('hardhat/config').HardhatUserConfig
 * The chainId here is a workaround for MetaMask, which assumes chainId 1337 while hardhat uses 31337
 */

export default {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      chainId: 5,
      url: process.env.GOERLI_RPC_URL,
      accounts:
        // quick hack to get around changeme being an invalid private key
        process.env.TESTNET_PRIVATE_KEY !== "changeme"
          ? [process.env.TESTNET_PRIVATE_KEY]
          : []
    }
  }
}
