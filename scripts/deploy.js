const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account: ", deployer.address
  );

  console.log("Account balance: ", (await deployer.getBalance()).toString());

  const Elevator = await ethers.getContractFactory("Elevator");
  const elevator = await Elevator.deploy();
  console.log("Elevator address: ", await elevator.address);
  console.log("Account balance after Elevator deploy: ", (await deployer.getBalance()).toString());

  const ElevatorAttack = await ethers.getContractFactory("ElevatorAttack");
  const elevatorAttack = await ElevatorAttack.deploy();
  console.log("ElevatorAttack address:", await elevatorAttack.address);
  console.log("Account balance after ElevatorAttack deploy: ", (await deployer.getBalance().toString()));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
