# Elevator
Smart Contract Security Practice | Lv11 Elevator

```
!!! DON'T TRY ON MAINNET !!!
```

## Summary
The goal of this level is to let the `elevator` to reach the `top` of your `building`.

### Things might help:
- Sometimes solidity is not good at keeping promises.
- This `Elevator` expects to be used from a `Building`.

### What you will learn:
- Interface, Abstract contract

## Smart Contract Code
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface Building {
  function isLastFloor(uint) external returns (bool);
}


contract Elevator {
  bool public top;
  uint public floor;

  function goTo(uint _floor) public {
    Building building = Building(msg.sender);

    if (! building.isLastFloor(_floor)) {
      floor = _floor;
      top = building.isLastFloor(floor);
    }
  }
}
```

## Solidity Concepts
### `Interface`
Contract interfaces specities the **WHAT**, but not **HOW**.
Interfaces allow different contracts to talk to each other. They force contracts to communicate in the same languate and data structure.

However interfaces do not prescribe the logic inside the funcitons, leaving the developer to implement it.
Interfaces are often used for token contracts. DIfferent contracts can then work with the same language

### `Abstract Contract`
Contracts need to be marked as abstract when at least one of their functions is not implemented. Contracts may be marked as abstract even though all functions are implemented.
Such abstract contracts can not be instantiated directly. This is also true, if an abstract contract itself does implement all defined functions.

### `Interface` vs `Abstract Contract`
An interface cannot inherit other interfaces or contracts, and cannot implement `ANY` of its functions.
In addition, an interface may not define a constructor, structs, enums or variables.

An abstract contract, on the other hand, has only one requirement, which is that at least one of the functions defined cannot be implemented.

See more from Solidity official website - [Abstract Contracts](https://docs.soliditylang.org/en/v0.8.11/contracts.html#abstract-contracts) and [Interface](https://docs.soliditylang.org/en/v0.8.11/contracts.html#interfaces).

## Security Consideration
### Security risk in the contract
`Building` interface has `isLastFloor()` function, but no implementation found which means the hacker contract can implement the function in the way it likes.
Even the `isLastFloor()` is not view function you can define a bool state variable(like coinflip) first return false, and then true.
At a glance, the `Elevator` contract looks like not allowing to be at top, but with the above issues it can.

### How can we improve the contract
At least `Elevator` needs to know who is `Building` contract and how its `isLastFloor()` function looks like.
Maybe we can check `msg.sender` if `Building` is thought to be a specific contract deployed.

### What we can say
Interfaces guarantee a shared language to interact with other contracts, but not implementation. Just because another contract uses the same interface, doesn't mean it will behave in the same/good manner.

## Deploy & Test
### Installation
```console
npm install
npx hardhat node
```

### Deployment
```console
npx hardhat run --network [NETWORK-NAME] scripts/deploy.js
```

### Test
You have to see top of the `Elevator` contract set to `true`.

```console
npx hardhat test
```

```console
dev@ubuntu:~/Documents/practice/elevator$ npx hardhat test


  ElevatorAttack
    deployment
      ✓ should set the attacker and the isTop
    #attack
      ✓ should be reverted if non-attacker tries
      ✓ should go top (66ms)


  3 passing (897ms)
```

If you're familiar with hardhat console, you can test the `Elevator` on your local node by using `npx hardhat node` and `npx hardhat console`.
