const hre = require("hardhat");

async function main() {
  const NftMint = await hre.ethers.getContractFactory("NftMint");
  const nftMint = await NftMint.deploy("Hello, Hardhat!");

  await nftMint.deployed();

  console.log("NftMint deployed to:", nftMint.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
