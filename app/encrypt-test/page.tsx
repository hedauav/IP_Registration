"use client";

import { useState, useEffect } from "react";
import { ethers, BrowserProvider, Contract, JsonRpcProvider } from "ethers";
import { Blocklock, encodeCiphertextToSolidity } from "blocklock-js";
import { AbiCoder } from "ethers";
import { CONTRACT_ABI } from "../../contract/contractDetails";
import lighthouse from '@lighthouse-web3/sdk';

export default function RegisterWithEncryption() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [encryptedData, setEncryptedData] = useState<any>(null);
  const [decryptedUrl, setDecryptedUrl] = useState<string | null>(null);
  const [currentBlock, setCurrentBlock] = useState<number>(0);

  // Check if decryption is available
  useEffect(() => {
    if (!encryptedData) return;
    
    const checkForDecryption = async () => {
      try {
        // Use Filecoin Calibration provider
        const provider = new JsonRpcProvider("https://api.calibration.node.glif.io/rpc/v1");
        
        // Get current block number
        const blockNumber = await provider.getBlockNumber();
        setCurrentBlock(blockNumber);
        
        // If we've reached the target block, check for decrypted URL
        if (blockNumber >= Number(encryptedData.blockHeight)) {
          const contract = new Contract(
            "0xcF04a63AedF2B4d83f3fFA40b523694df0e8F6C9",
            CONTRACT_ABI,
            provider
          );
          
          // Try to get the decrypted message
          const message = await contract.userMessage(encryptedData.requestId);
          if (message && message !== "") {
            setDecryptedUrl(message);
          }
        }
      } catch (error) {
        console.error("Error checking for decryption:", error);
      }
    };
    
    // Initial check
    checkForDecryption();
    
    // Set up polling interval
    const interval = setInterval(checkForDecryption, 10000); // Check every 10 seconds
    
    return () => clearInterval(interval);
  }, [encryptedData]);

  const uploadToLighthouse = async (file: File) => {
    const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_STORAGE_KEY;
  
    if (!apiKey) {
      throw new Error("Lighthouse API key is missing in environment variables.");
    }
  
    const res = await lighthouse.upload([file], apiKey);
    const cid = res.data.Hash;
    return `https://gateway.lighthouse.storage/ipfs/${cid}`;
  };

  const encryptAndStoreURL = async (file: File) => {
    setLoading(true);
    setStatusMessage("Uploading to Lighthouse...");
    
    try {
      // First upload the file to Lighthouse
      const lighthouseUrl = await uploadToLighthouse(file);
      console.log("File uploaded to Lighthouse:", lighthouseUrl);
      setStatusMessage("Encrypting URL with Blocklock...");
      
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("Please install MetaMask!");
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      // Create BrowserProvider and Signer
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Create Contract Instance
      const contract = new Contract(
        "0xcF04a63AedF2B4d83f3fFA40b523694df0e8F6C9", // Update with your contract address
        CONTRACT_ABI,
        signer
      );

      // Calculate block height for 2 minutes from now
      // Assuming average block time of 12 seconds, 10 blocks ≈ 2 minutes
      const currentBlock = await provider.getBlockNumber();
      const blockHeight = BigInt(currentBlock + 10);
      console.log("Current block:", currentBlock);
      console.log("Target unlock block:", blockHeight);

      // Encode the Lighthouse URL as bytes
      const msgBytes = AbiCoder.defaultAbiCoder().encode(["string"], [lighthouseUrl]);
      const encodedMessage = ethers.getBytes(msgBytes);

      // Encrypt the encoded URL
      const blocklockjs = new Blocklock(
        accounts,
        "0xfF66908E1d7d23ff62791505b2eC120128918F44" // Update with your blocklock service address
      );

      const ciphertext = blocklockjs.encrypt(encodedMessage, blockHeight);
      console.log("URL encrypted successfully");
      
      // Call `createTimelockRequest` on the contract
      setStatusMessage("Storing encrypted URL on-chain...");
      const tx = await contract.createTimelockRequest(
        blockHeight, 
        encodeCiphertextToSolidity(ciphertext)
      );

      const receipt = await tx.wait(1);
      console.log("Transaction receipt:", receipt);

      if (!receipt) {
        throw new Error("Transaction has not been mined");
      }

      // Get the request ID
      const requestId = await contract.userRequestId(accounts[0]);
      console.log("Encryption complete! Request ID:", requestId);
      console.log("URL will decrypt at block:", blockHeight);
      
      setEncryptedData({
        requestId,
        blockHeight,
        lighthouseUrl, // Only keeping for demonstration
        status: "Encrypted URL stored on-chain"
      });
      
    } catch (error) {
      console.error("Error during encryption:", error);
      setStatusMessage("Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Simple form for testing
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Encrypt Lighthouse URL Test</h1>
      
      <div className="mb-4">
        <input 
          type="file" 
          onChange={(e) => e.target.files && encryptAndStoreURL(e.target.files[0])}
          disabled={loading}
          className="block w-full text-sm border p-2 rounded"
        />
      </div>
      
      {loading && (
        <div className="p-4 bg-blue-100 text-blue-800 rounded">
          {statusMessage || "Processing..."}
        </div>
      )}
      
      {encryptedData && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
          <h2 className="font-bold">Encryption Successful!</h2>
          <p>Request ID: {encryptedData.requestId.toString()}</p>
          <p>Unlocks at block: {encryptedData.blockHeight.toString()}</p>
          <p>Current block: {currentBlock}</p>
          <p className="text-sm opacity-70">Original URL (only shown for testing): {encryptedData.lighthouseUrl}</p>
          
          {/* Display encrypted URL */}
          <div className="mt-3 p-3 bg-yellow-50 rounded-md">
            <p className="font-semibold">Encrypted URL:</p>
            <p className="break-all text-sm">Encrypted data stored on-chain with request ID: {encryptedData.requestId.toString()}</p>
          </div>
          
          {/* Show decryption status */}
          {currentBlock >= Number(encryptedData.blockHeight) ? (
            decryptedUrl ? (
              <div className="mt-3 p-3 bg-blue-50 rounded-md">
                <p className="font-semibold">Decrypted URL:</p>
                <a 
                  href={decryptedUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {decryptedUrl}
                </a>
              </div>
            ) : (
              <div className="mt-3 p-3 bg-blue-50 rounded-md">
                <p>Target block reached. Waiting for on-chain decryption to complete...</p>
              </div>
            )
          ) : (
            <div className="mt-3 p-3 bg-orange-50 rounded-md">
              <p>URL will be decrypted when block {encryptedData.blockHeight.toString()} is reached.</p>
              <p className="text-sm">Blocks remaining: {Number(encryptedData.blockHeight) - currentBlock}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}