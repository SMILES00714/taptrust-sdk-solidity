import { expect } from "chai"
import { Contract, Wallet } from "ethers"
import { ethers } from "hardhat"

describe("ERC20RequireCredential", function () {
  // create a wallet to generate a private key for signing verification results
  const mnemonic =
    "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
  const signer: Wallet = ethers.Wallet.fromMnemonic(mnemonic)

  // get a random subject address that will be used for verified subject tests
  let registeredAddress: string
  let notRegisteredAddress: string;
  it("Should find a random address to use as a subject to verifiy", async function () {
    const addresses = await ethers.getSigners()
    registeredAddress = await addresses[addresses.length - 1].getAddress()
    notRegisteredAddress = await addresses[addresses.length - 2].getAddress()
  })

  // deploy the contract, which makes this test provider the contract's owner
  let erc20RequireCredentialContract: Contract
  let mintAddress: string
  it("Should deploy example ERC-20 contract", async function () {
    const deployer = await ethers.getContractFactory("ERC20RequireCredential")
    erc20RequireCredentialContract = await deployer.deploy(100)
    await erc20RequireCredentialContract.deployed()
    mintAddress = registeredAddress
    await erc20RequireCredentialContract.mint(mintAddress)
    expect(await erc20RequireCredentialContract.mint(mintAddress)).to.be.false;
  })

  it("Should set TapTrust address", async function () {
    const TapTrustAddress = "0x578d8fb36041413a7e3A31e802625dD7c7ca8386"
    const setTapTrustAddressTx = await erc20RequireCredentialContract.setTapTrustAddress(TapTrustAddress); 
    await setTapTrustAddressTx.wait();
  })
  it("Should mint ERC-20 token", async function() {
    await erc20RequireCredentialContract.mint(mintAddress)
    expect(await erc20RequireCredentialContract.balanceOf(mintAddress)).to.equal(1);
  })

  it("Should transfer tokens", async function () {
    const transferTx = await erc20RequireCredentialContract.transfer(registeredAddress, 10);
    await transferTx.wait();
  })

  it("Should fail at transferring tokens to unregistered address", async function () {
    const transferTx = erc20RequireCredentialContract.transfer(notRegisteredAddress, 10);
    await expect(transferTx).to.throw;
  })


})
