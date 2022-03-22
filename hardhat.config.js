require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-ethers");
 const API_URL = "https://ropsten.infura.io/v3/f052024f72cc46c993109616626d7294";
 
 const PRIVATE_KEY  = "44a1b639fa4d90b75804cd9dc78cedd65ed0bc4d0e6eefb78b590ebad063a78a";
 module.exports = {
  // defaultNetwork: "ropsten",
  networks: {
    
    ropsten: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      gas: 2100000,
     gasPrice: 8000000000
    },
  },
  solidity: {
    
    compilers: [
      {
        version: "0.5.0",
      },
      {
        version: "0.5.12",
      },
      {
        version: "0.5.16",
      },
      
      {
        version: "0.6.6",
      },
      {
        version: "0.7.5",
      },
      {
        version: "0.7.6",
      },
      {
        version: "0.8.0",
        settings: {},
      },
      {
        version: "0.8.1",
      },
    ],
  },
 
};