const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ElevatorAttack", function () {
  let Elevator, elevator, ElevatorAttack, elevatorAttack;
  let owner, attacker, alice, signers;

  beforeEach(async function() {
    [owner, attacker, alice, signers] = await ethers.getSigners();
    Elevator = await ethers.getContractFactory("Elevator");
    elevator = await Elevator.deploy();
    ElevatorAttack = await ethers.getContractFactory("ElevatorAttack");
    elevatorAttack = await ElevatorAttack.connect(attacker).deploy();
  });

  describe("deployment", function () {
    it("should set the attacker and the isTop", async function () {
      expect(await elevatorAttack.attacker()).to.equal(attacker.address);
      expect(await elevatorAttack.isTop()).to.equal(true);
    });
  });

  describe("#attack", function () {
    it("should be reverted if non-attacker tries", async function () {
      await expect(
        elevatorAttack.connect(alice).attack(elevator.address)
      ).to.be.revertedWith(
        "ElevatorAttack: NOT_OWNER"
      );
    });

    it("should go top", async function () {
      await elevatorAttack.connect(attacker).attack(elevator.address);
      expect(await elevator.top()).to.equal(true);
      expect(await elevator.floor()).to.equal(100);
    });
  });
});
