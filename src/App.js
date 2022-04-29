import "./App.css";
import NftMint from "./nftMintAbi.json";
import { ethers, BigNumber } from "ethers";

import { useEffect, useState } from "react";

const nftMintAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

function App() {
  // Track accounts state
  const [accounts, setAccounts] = useState([]);

  // Request user to connect to metamask, if they did not
  async function connectAccounts() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  // When browser loads, first thing to execute is connectAccounts()
  useEffect(() => {
    connectAccounts();
  });

  // Track mint amount
  const [mintAmount, setMintAmount] = useState(1);

  // Create function to handle mint process
  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(nftMintAddress, NftMint.abi, signer);

      try {
        const response = await contract.mint(BigNumber.from(mintAmount));
        console.log("Response: ", response);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  return (
    <div className="App">
      Connect to be able to mint
      {accounts.length && (
        <div>
          <button onClick={() => setMintAmount(mintAmount - 1)}>-</button>
          {mintAmount}
          <button onClick={() => setMintAmount(mintAmount + 1)}>+</button>
          <button onClick={handleMint}>Mint</button>
        </div>
      )}
    </div>
  );
}

export default App;
