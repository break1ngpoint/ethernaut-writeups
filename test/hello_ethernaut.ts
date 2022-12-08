import { TransactionResponse } from "@ethersproject/providers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Hello Ethernaut", function () {
  it("Pwn", async function () {
    const ABI = [
      "function info() pure returns (string)",
      "function info1() pure returns (string)",
      "function info2(string) pure returns (string)",
      "function infoNum() view returns (uint8)",
      "function info42() pure returns (string)",
      "function theMethodName() view returns (string)",
      "function method7123949() pure returns (string)",
      "function password() view returns (string)",
      "function authenticate(string)",
      "function getCleared() view returns (bool)",
    ];
    const ADDRESS = "0x1dDCE9f8E30e3DAB056ba20D47707cE5CEff3685";
    const contract = await ethers.getContractAt(ABI, ADDRESS);

    console.log(`info(): ${await contract.info()}`);
    console.log(`info1(): ${await contract.info1()}`);
    console.log(`info2(): ${await contract.info2("hello")}`);
    console.log(`infoNum(): ${await contract.infoNum()}`);
    console.log(`info42(): ${await contract.info42()}`);
    console.log(`theMethodName(): ${await contract.theMethodName()}`);
    console.log(`method7123949(): ${await contract.method7123949()}`);
    console.log(`password(): ${await contract.password()}`);
    console.log("Authenticating...");
    const tx: TransactionResponse = await contract.authenticate("ethernaut0");
    await tx.wait();
    const getCleared: boolean = await contract.getCleared();
    console.log(`getCleared(): ${getCleared}`);
    expect(getCleared).to.be.true;
  });
});
