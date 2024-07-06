// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const NATIVE_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000";
  // Get the addresses for NIBS and USDC from environment variables
  const NIBS_ADDRESS = "0x7c6aa54Eaeea04Cf8950b1451faF0B21CB6037c2";
  const USDC_ADDRESS = "0x77721D19BDfc67fe8cc46ddaa3cc4C94e6826E3C";
  const STAKED_EDU_ADDRESS = '0xfeEd714CCA799FA57e6aE25f8FE009Dd4fA854e3';

  const Owner = "0x1B4AcaBA13f8B3B858c0796A7d62FC35A5ED3BA5"

  // We get the contract to deploy
  const funder = await ethers.getContractFactory("StakingProtocol");
  const greeter = await funder.deploy(STAKED_EDU_ADDRESS, NIBS_ADDRESS);


  console.log("Marketplace deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// npx hardhat verify --network opencampus 0x13CD9C7cb017E7FEDD554Cc2996E0d184aE586F4 "0xfeEd714CCA799FA57e6aE25f8FE009Dd4fA854e3" "0x7c6aa54Eaeea04Cf8950b1451faF0B21CB6037c2" "0x1B4AcaBA13f8B3B858c0796A7d62FC35A5ED3BA5"