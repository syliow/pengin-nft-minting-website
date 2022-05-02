const hre = require("hardhat");

async function main() {

  const PenginNFT = await hre.ethers.getContractFactory("PenginNFT");
  const penginNFT = await PenginNFT.deploy();

  await penginNFT.deployed();

  console.log("Greeter deployed to:", penginNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
