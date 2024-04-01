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
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
      {!isConnected && (
        <button
          className="px-4 py-2 bg-[rgba(75,192,192,1)] text-white rounded-md hover:bg-[rgba(52,134,134,1)] disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={connectWallet}
          disabled={!web3}
        >
          Connect Wallet
        </button>
      )}
      {isConnected && (
        <div className="flex items-center mb-4">
          <p className="mr-4">Connected account: {accounts[0]}</p>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={disconnectWallet}
          >
            Disconnect Wallet
          </button>
        </div>
      )}
      {error && <p className="text-red-500 font-bold">{error}</p>}
    </div>
  );
};

export default WalletConnector;
