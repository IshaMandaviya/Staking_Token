const { expect } = require("chai");
const hre = require("hardhat");
// const { ethers } = require("hardhat");


describe("stacking of Tokens", function () {
let token0Contract;
let stackingContract;
let rewardTokenContract;
let stk;
let tkn0;
let RewardDistributionContract;
// let stkaddress;
  it("deploy Contract", async function () {
    
    const [deployer,FactoryRouterDeployer,_] = await hre.ethers.getSigners();
    const Token0 = await hre.ethers.getContractFactory("Token0");
    token0Contract = await Token0.deploy();
     tkn0 = await token0Contract.deployed();
    console.log("Token0 address",tkn0.address);
    // console.log("Token0 address",token0Contract.address);

    const RewardToken = await hre.ethers.getContractFactory("Token0");
    rewardTokenContract = await RewardToken.deploy();
    const rwrd = await rewardTokenContract.deployed();
    console.log("rewardToken address",rwrd.address);

    // const RewardDistribution = await hre.ethers.getContractFactory("RewardDistribution");
    // RewardDistributionContract = await RewardDistribution.deploy();
    // const rwrdd = await RewardDistributionContract.deployed();
    // console.log("rewardToken address",rwrdd.address);
    
    const StackingContract = await hre.ethers.getContractFactory("StakingRewards");
    const stackingContract = await StackingContract.deploy(deployer.address,deployer.address,rewardTokenContract.address,token0Contract.address);
     stk = await stackingContract.deployed();
     const stkAddress= stk.address;
    console.log("Stacking contract address:", stk.address);
    // await tkn0.setApprovalForAll(NFTStakingContractAddress,true);
    const amount=1000000000;

    await token0Contract.approve(stackingContract.address,amount);
    await rewardTokenContract.approve(stackingContract.address,amount);
    await stackingContract.stake(100000);
    await stackingContract.notifyRewardAmount(100000);
    await stackingContract.getReward();
    await stackingContract.withdraw(90000);
   

    
  }).timeout(300000000);
  
})