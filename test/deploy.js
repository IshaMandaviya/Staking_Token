const { expect } = require("chai");
const hre = require("hardhat");
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
    
    const ProxyERC20 = await hre.ethers.getContractFactory("ProxyERC20");
    ProxyERC20Contract = await ProxyERC20.deploy(deployer.address);
    const prxerc = await ProxyERC20Contract.deployed();
    console.log("Proxy address",prxerc.address);

    const RewardToken = await hre.ethers.getContractFactory("RewardToken");
    rewardTokenContract = await RewardToken.deploy();
    const rwrd = await rewardTokenContract.deployed();
    console.log("rewardToken address",rwrd.address);
    ProxyERC20Contract.setTarget(rewardTokenContract.address);

    await sleep(10000);
    
    const RewardsDistribution = await hre.ethers.getContractFactory("RewardsDistribution");
    RewardsDistributionContract = await RewardsDistribution.deploy(deployer.address,deployer.address,ProxyERC20Contract.address,deployer.address,deployer.address);
    const rwrdd = await RewardsDistributionContract.deployed();
    console.log("RewardsDistribution address",rwrdd.address);
    await sleep(90000);

    const StackingContract = await hre.ethers.getContractFactory("StakingRewards");
    const stackingContract = await StackingContract.deploy(deployer.address,RewardsDistributionContract.address,ProxyERC20Contract.address,token0Contract.address);
    stk = await stackingContract.deployed();
    const stkAddress= stk.address;
    console.log("Stacking contract address:", stk.address);
    
    const amount=10000000;
    await token0Contract.approve(stackingContract.address,amount);
    await rewardTokenContract.transfer(RewardsDistributionContract.address,amount);
    await rewardTokenContract.transfer(ProxyERC20Contract.address,amount);
    const b=await rewardTokenContract.balanceOf((RewardsDistributionContract.address));
    console.log(b)
    
    await rewardTokenContract.approve(RewardsDistributionContract.address,amount);
    await stackingContract.stake(100000);

    await RewardsDistributionContract.addRewardDistribution(deployer.address,1000);
    await sleep(50000);
    const tx=await RewardsDistributionContract.distributeRewards(100000);
    console.log(tx)

    await stackingContract.getReward();
    await stackingContract.withdraw(90000);
   
    const c=await rewardTokenContract.balanceOf((RewardsDistributionContract.address));
    console.log(c)
    
  }).timeout(300000000);
  
})