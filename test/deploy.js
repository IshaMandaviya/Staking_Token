const { expect } = require("chai");
const hre = require("hardhat");
// const { ethers } = require("hardhat");
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe("stacking of Tokens", function () {
let token0Contract;
let stackingContract;
let rewardTokenContract;
let stk;
let tkn0;
let RewardsDistributionContract;
// let stkaddress;
  it("deploy Contract", async function () {
    
    const [deployer,FactoryRouterDeployer,_] = await hre.ethers.getSigners();
    const Token0 = await hre.ethers.getContractFactory("Token0");
    token0Contract = await Token0.deploy();
     tkn0 = await token0Contract.deployed();
    console.log("Token0 address",tkn0.address);
    // console.log("Token0 address",token0Contract.address);
    // await token0Contract.wait()
    // await sleep(30000);
    const RewardToken = await hre.ethers.getContractFactory("RewardToken");
    rewardTokenContract = await RewardToken.deploy();
    const rwrd = await rewardTokenContract.deployed();
    console.log("rewardToken address",rwrd.address);
    
    
    // const Proxy = await hre.ethers.getContractFactory("Proxy");
    // ProxyContract = await Proxy.deploy(deployer.address);
    // const prx = await ProxyContract.deployed();
    // console.log("rewardToken address",prx.address);
    // ProxyContract.setTarget(rewardTokenContract.address);

    
    // const Proxyable = await hre.ethers.getContractFactory("Proxyable");
    // ProxyableContract = await Proxyable.deploy(rewardTokenContract.address);
    // const prxable = await ProxyProxyableContract.deployed();
    // console.log("rewardToken address",prxable.address);
    
    // const ProxyERC20 = await hre.ethers.getContractFactory("ProxyERC20");
    // ProxyERC20Contract = await ProxyERC20.deploy(deployer.address);
    // const prxerc = await ProxyERC20Contract.deployed();
    // ProxyERC20Contract.setTarget(rewardTokenContract.address);
    // console.log("rewardToken address",prxerc.address);

    const RewardsDistribution = await hre.ethers.getContractFactory("RewardsDistribution");
    RewardsDistributionContract = await RewardsDistribution.deploy(deployer.address,deployer.address,rewardTokenContract.address,deployer.address,deployer.address);
    const rwrdd = await RewardsDistributionContract.deployed();
    console.log("RewardsDistribution address",rwrdd.address);
    
    const StackingContract = await hre.ethers.getContractFactory("StakingRewards");
    const stackingContract = await StackingContract.deploy(deployer.address,RewardsDistributionContract.address,rewardTokenContract.address,token0Contract.address);
     stk = await stackingContract.deployed();
     const stkAddress= stk.address;
    console.log("Stacking contract address:", stk.address);
    // await tkn0.setApprovalForAll(NFTStakingContractAddress,true);
    const amount=10000000;

    await token0Contract.approve(stackingContract.address,amount);
    await rewardTokenContract.transfer(RewardsDistributionContract.address,amount);
    const b=await rewardTokenContract.balanceOf((RewardsDistributionContract.address));
    console.log(b)
    await rewardTokenContract.transfer(stackingContract.address,amount);
    // await rewardTokenContract.approve(RewardsDistributionContract.address,amount);
    await stackingContract.stake(100000);
    await RewardsDistributionContract.addRewardDistribution(deployer.address,1000);
    await RewardsDistributionContract.distributeRewards(100000);
    // await stackingContract.notifyRewardAmount(100000);
    await stackingContract.getReward();
    await stackingContract.withdraw(90000);
   

    
  }).timeout(300000000);
  
})