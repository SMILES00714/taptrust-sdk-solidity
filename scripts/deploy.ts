// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Contract, ContractFactory } from "ethers"
import * as hre from "hardhat"
const Taptrustaddress = "0xAF30CEaf6C35f610d547cbDFff53cAc14c743B4d"

async function main() {
  if (hre.network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    )
  }

  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const [deployer] = await hre.ethers.getSigners()
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  )

  console.log("Account balance:", (await deployer.getBalance()).toString())

    // deploy ERC20RequireCredential
    const ERC20RequireCredentialFactory: ContractFactory = await hre.ethers.getContractFactory(
      "ERC20RequireCredential"
    )
    const ERC20RequireCredentialContract: Contract = await ERC20RequireCredentialFactory.deploy()
    await ERC20RequireCredentialContract.deployed()
    console.log("ERC20RequireCredential address:", ERC20RequireCredentialContract.address);
    await ERC20RequireCredentialContract.setTapTrustAddress(Taptrustaddress)
    console.log("Taptrust address is set as this: ", Taptrustaddress)


    // deploy ERC721RequireCredential
    // const ERC721RequireCredentialFactory: ContractFactory = await hre.ethers.getContractFactory(
    //   "ERC721RequireCredential"
    // )
    // const ERC721RequireCredentialContract: Contract = await ERC721RequireCredentialFactory.deploy()
    // await ERC721RequireCredentialContract.deployed()
    // console.log("ERC721RequireCredential address:", ERC721RequireCredentialContract.address);

  
}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
