const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
    const [deployer] = await ethers.getSigners();
    const [deployer,FactoryRouterDeployer,_] = await ethers.getSigners();
    const [deployer,FactoryRouterDeployer,_] = await ethers.getSigners();
    console.log(deployer.address);
    const Token0 = await ethers.getContractFactory("Token0");
    let token0Contract = await Token0.deploy();
    let tkn0 = await token0Contract.deployed();
    console.log("Token0 address",tkn0);

    const RewardToken = await hre.ethers.getContractFactory("RewardToken");
    const rewardTokenContract = await RewardToken.deploy();
    console.log("rewardToken address",rewardTokenContract);
    
    const StackingContract = await ethers.getContractFactory("StackingOfTokens");
    const stackingContract = await StackingContract.deploy("0x08a5c13f863a21579A5087697cA052B0bD63A555",rewardTokenContract.address,token0Contract.address);
    console.log("Stacking contract address:", stackingContract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });