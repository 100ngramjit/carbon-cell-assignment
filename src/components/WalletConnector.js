import React, { useState, useEffect } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

const WalletConnector = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWeb3 = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        const web3Instance = new Web3(provider);
        setWeb3(web3Instance);
      } else {
        setError("MetaMask extension is not installed.");
      }
    };

    loadWeb3();
  }, []);

  const connectWallet = async () => {
    if (!web3) {
      setError("Web3 instance is not initialized. Please try again.");
      return;
    }

    try {
      const accounts = await web3.eth.requestAccounts();
      setAccounts(accounts);
      setIsConnected(true);
      setError("");
    } catch (error) {
      setError("Error connecting wallet: " + error.message);
    }
  };

  const disconnectWallet = () => {
    setAccounts([]);
    setIsConnected(false);
  };

  return (
    <div>
      {!isConnected && (
        <button onClick={connectWallet} disabled={!web3}>
          Connect Wallet
        </button>
      )}
      {isConnected && (
        <div>
          <p>Connected account: {accounts[0]}</p>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default WalletConnector;
