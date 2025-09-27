"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, ArrowLeft, Copy, Check, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Confirmation() {
  const [copied, setCopied] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    ipId: "",
    txHash: "",
    explorerUrl: ""
  });
  const [timestamp, setTimestamp] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [encryptionDetails, setEncryptionDetails] = useState({
    requestId: "",
    currentBlock: 0,
    targetBlock: 0,
    lighthouseUrl: ""
  });

  const router = useRouter();

  useEffect(() => {
    // Get registration data from localStorage
    const storedData = localStorage.getItem('registration_response');

    const encryptionData = localStorage.getItem('encryption_details');
    if (storedData) {
      const data = JSON.parse(storedData);
      setRegistrationData(data);
      
      if (encryptionData) {
        const encData = JSON.parse(encryptionData);
        setEncryptionDetails(encData);
      }
      // Store timestamp in state after client-side rendering
      setTimestamp(new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      }));
      
      // Trigger animation after a short delay
      setTimeout(() => setShowContent(true), 100);
    } else {
      // If no data, redirect to registration page
      router.push("/register");
    }
  }, [router]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(registrationData.ipId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#121212] text-white flex items-center justify-center">
      <div className="w-full max-w-lg px-6 py-10">
        {/* Header */}
        <div className={`flex justify-between items-center mb-10 transition-all duration-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          <Link href="/" className="flex items-center gap-2 text-[#fa5f02] hover:text-[#fa5f02]/80 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
        </div>

        {/* Content */}
        <div className={`bg-[#1a1a1a] rounded-2xl p-8 shadow-lg border border-[#333] transition-all duration-700 ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="text-center space-y-8">
            {/* Success Icon with Animation */}
            <div className="relative inline-flex">
              <div className={`w-24 h-24 rounded-full bg-[#fa5f02]/10 flex items-center justify-center transition-all duration-1000 ${showContent ? "scale-100" : "scale-0"}`}>
                <CheckCircle2 className={`w-12 h-12 text-[#fa5f02] transition-all duration-1000 delay-500 ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-0"}`} />
              </div>
              <div className="absolute -inset-1 rounded-full border-2 border-[#fa5f02]/30 animate-pulse" />
              <div className={`absolute inset-0 rounded-full border-2 border-[#fa5f02] transition-all duration-1000 ${showContent ? "scale-150 opacity-0" : "scale-100 opacity-100"}`} />
            </div>
            
            {/* Message with Animation */}
            <div className="space-y-4">
              <h1 className={`text-3xl font-bold tracking-tight transition-all duration-700 delay-300 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>Registration Successful</h1>
              <p className={`text-gray-400 text-lg transition-all duration-700 delay-400 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>Your intellectual property has been securely registered on Story Protocol.</p>
            </div>
            
            {/* Details with Animation */}
            <div className={`bg-[#252525] rounded-lg p-4 text-left transition-all duration-700 delay-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">IPA ID</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#fa5f02] text-sm truncate max-w-[180px]">{registrationData.ipId}</span>
                  <button 
                    onClick={copyToClipboard}
                    className="p-1.5 rounded-md bg-[#333] hover:bg-[#444] transition-colors"
                    aria-label="Copy IPA ID"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Timestamp</span>
                <span className="font-mono text-sm">{timestamp}</span>
              </div>
            </div>

            {/* Encryption Details with Animation */}
            {encryptionDetails.requestId && (
              <div className={`bg-[#252525] rounded-lg p-4 text-left mt-4 transition-all duration-700 delay-600 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Encryption Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Request ID</span>
                    <span className="font-mono text-sm truncate max-w-[180px]">{encryptionDetails.requestId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Current Block</span>
                    <span className="font-mono text-sm">{encryptionDetails.currentBlock}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Unlock at Block</span>
                    <span className="font-mono text-sm">{encryptionDetails.targetBlock}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Blocks Remaining</span>
                    <span className="font-mono text-sm">{Number(encryptionDetails.targetBlock) - Number(encryptionDetails.currentBlock)}</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Action buttons with Animation */}
            <div className={`pt-4 flex flex-col gap-3 transition-all duration-700 delay-600 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <a 
                href={registrationData.explorerUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-6 py-3 bg-[#fa5f02] text-white rounded-lg font-medium hover:bg-[#fa5f02]/90 transition-colors w-full group"
              >
                View IP <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              
              <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-[#252525] text-white rounded-lg font-medium hover:bg-[#333] transition-colors">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
        
        {/* Footer with Animation */}
        <div className={`mt-8 text-center transition-all duration-700 delay-700 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="/register" className="text-gray-400 hover:text-white transition-colors text-sm">Register Another</Link>
          </div>
        </div>
      </div>
    </div>
  );
}