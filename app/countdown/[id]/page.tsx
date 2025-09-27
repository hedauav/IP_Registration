"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "../countdown.module.css";
import { usePathname, useRouter } from "next/navigation";
import { JsonRpcProvider } from "ethers";
import { IPRecord } from "@/app/page";
import Link from "next/link";

interface Props {
  params: {
    slug: string;
  };
}

const CountdownPage = ({ params }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const slug = pathname.split("/")[2]; // Get IP ID from URL

  const [ipData, setIpData] = useState<any>(null);
  const [currentBlock, setCurrentBlock] = useState<number>(0);
  const [targetBlock, setTargetBlock] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [prevTime, setPrevTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Add a reference for the countdown interval
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  // Add a reference for total seconds remaining
  const secondsRemainingRef = useRef<number>(0);

  // Check local storage for IP data when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log("Looking for IP with slug:", slug);
      
      const savedIPs = JSON.parse(localStorage.getItem('registered_ips') || '[]');
      console.log("All saved IPs:", savedIPs);
      
      // Try both number and string comparison
      const currentIP = savedIPs.find((ip: IPRecord) => {
        return ip.id === Number(slug);
      });
      
      console.log("Found IP:", currentIP);
      
      if (currentIP) {
        setIpData(currentIP);
        setTargetBlock(parseInt(currentIP.targetBlock));
        
        // Initial calculation based on block height
        if (currentIP.currentBlock && currentIP.targetBlock) {
          // Initialize but don't start the countdown yet
          initializeTimeFromBlocks(parseInt(currentIP.currentBlock), parseInt(currentIP.targetBlock));
        }
        
        setIsLoading(false);
      } else {
        console.error("IP not found in localStorage for slug:", slug);
        setError("IP not found");
        setIsLoading(false);
      }
    }
  }, [slug]);

  // Check current block height periodically
  useEffect(() => {
    const checkBlockHeight = async () => {
      try {
        const provider = new JsonRpcProvider("https://api.calibration.node.glif.io/rpc/v1");
        const blockNumber = await provider.getBlockNumber();
        setCurrentBlock(blockNumber);
        
        // Update time calculation based on blocks remaining
        if (targetBlock > 0) {
          initializeTimeFromBlocks(blockNumber, targetBlock);
        }
        
        // If target block reached, decrypt content
        if (blockNumber >= targetBlock && targetBlock > 0) {
          decryptContent();
        }
      } catch (err) {
        console.error("Error checking block height:", err);
      }
    };

    // Check immediately and then every 15 seconds
    checkBlockHeight();
    const blockCheckInterval = setInterval(checkBlockHeight, 15000);
    
    return () => {
      clearInterval(blockCheckInterval);
      // Also clear the countdown interval if it exists
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [targetBlock]);

  // Function to initialize the time calculation from blocks
  const initializeTimeFromBlocks = (currentBlock: number, targetBlock: number) => {
    const blocksRemaining = Math.max(0, targetBlock - currentBlock);
    const totalSeconds = blocksRemaining * 30; // 30 seconds per block
    
    // Store the total seconds for the countdown
    secondsRemainingRef.current = totalSeconds;
    
    // Initial calculation
    updateTimeDisplay(totalSeconds);
    
    // Clear existing interval if any
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }
    
    // Start the countdown if there's time remaining
    if (totalSeconds > 0) {
      countdownIntervalRef.current = setInterval(() => {
        // Decrease the time by 1 second
        secondsRemainingRef.current -= 1;
        
        // Update the display
        updateTimeDisplay(secondsRemainingRef.current);
        
        // If we've reached zero, clear the interval and trigger decryption
        if (secondsRemainingRef.current <= 0) {
          if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
          }
          decryptContent();
        }
      }, 1000);
    }
  };
  
  // Function to update the time display
  const updateTimeDisplay = (totalSeconds: number) => {
    // Save previous time for animation
    setPrevTime(timeLeft);
    
    // Calculate new times
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    
    // Update state
    setTimeLeft({
      days,
      hours,
      minutes,
      seconds
    });
  };

  // Function to decrypt content when block height is reached
  const decryptContent = async () => {
    try {
      if (!ipData) return;
      
      // Here you would call your decryption function 
      console.log("Decrypting content with requestId:", ipData.requestId);
      
      // Simulate successful decryption
      setIsDecrypted(true);
      setMediaUrl(ipData.mediaUrl);
      
      // In a real implementation, you would call your decryption API
      // For example:
      // const decryptedUrl = await decryptWithLighthouse(ipData.requestId);
      // setMediaUrl(decryptedUrl);
    } catch (err) {
      console.error("Error decrypting content:", err);
      setError("Failed to decrypt content");
    }
  };

  // Check if each unit has changed
  const hasChanged = {
    days: prevTime.days !== timeLeft.days && prevTime.days !== 0,
    hours: prevTime.hours !== timeLeft.hours && prevTime.hours !== 0,
    minutes: prevTime.minutes !== timeLeft.minutes && prevTime.minutes !== 0,
    seconds: prevTime.seconds !== timeLeft.seconds && prevTime.seconds !== 0,
  };

  // Function to handle back to dashboard
  const handleBackToDashboard = () => {
    router.push('/');
  };

  // Show loading state
  if (isLoading) {
    return <div className={styles.container}>Loading...</div>;
  }

  // Show error state
  if (error) {
    return <div className={styles.container}>Error: {error}</div>;
  }

  // If decrypted, show the media
  if (isDecrypted && mediaUrl) {
    return (
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.releaseText}>
            {ipData.title} - Now Available!
          </h1>
          
          <div className={styles.mediaContainer}>
            {ipData.type.startsWith('video') ? (
              <video controls className={styles.mediaPlayer}>
                <source src={mediaUrl} type={ipData.type} />
                Your browser does not support the video tag.
              </video>
            ) : ipData.type.startsWith('audio') ? (
              <audio controls className={styles.mediaPlayer}>
                <source src={mediaUrl} type={ipData.type} />
                Your browser does not support the audio tag.
              </audio>
            ) : (
              <img src={mediaUrl} alt={ipData.title} className={styles.mediaImage} />
            )}
          </div>
          
          <div className={styles.mediaInfo}>
            <h2>{ipData.title}</h2>
            <p>{ipData.description}</p>
          </div>
          
          <div className={styles.buttonContainer}>
            <a 
              href={ipData.explorerUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.storyButton}
            >
              VIEW ON STORY
            </a>
            <button onClick={handleBackToDashboard} className={styles.dashboardButton}>
              BACK TO DASHBOARD
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default view: countdown
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Left side - Record */}
        <div className={styles.recordSection}>
          <div className={styles.stylusWrapper}>
            <Image
              src="/images/stylus.png"
              alt="Record player stylus"
              width={250}
              height={400}
              className={styles.stylusImage}
              priority
            />
          </div>
          <div className={styles.vinylWrapper}>
            <Image
              src="/images/records.png"
              alt="Vinyl record"
              width={565}
              height={565}
              className={styles.vinylImage}
              priority
            />
          </div>
        </div>

        {/* Black overlay rectangle */}
        <div className={styles.overlayRect}>
          {/* Right side - Countdown and info */}
          <div className={styles.contentWrapper}>
            <div className={styles.countdownSection}>
              <h2 className={styles.releaseText}>
                <span className={styles.newMusic}>{ipData?.title}</span> RELEASING IN
              </h2>

              <div className={styles.countdown}>
                <div className={styles.timeUnit}>
                  <div className={styles.numberWrapper}>
                    <div
                      className={`${styles.number} ${
                        hasChanged.days ? styles.flipAnimation : ""
                      }`}
                    >
                      {String(timeLeft.days).padStart(2, "0")}
                    </div>
                  </div>
                  <div className={styles.label}>DAYS</div>
                </div>

                <div className={styles.timeUnit}>
                  <div className={styles.numberWrapper}>
                    <div
                      className={`${styles.number} ${
                        hasChanged.hours ? styles.flipAnimation : ""
                      }`}
                    >
                      {String(timeLeft.hours).padStart(2, "0")}
                    </div>
                  </div>
                  <div className={styles.label}>HOURS</div>
                </div>

                <div className={styles.timeUnit}>
                  <div className={styles.numberWrapper}>
                    <div
                      className={`${styles.number} ${
                        hasChanged.minutes ? styles.flipAnimation : ""
                      }`}
                    >
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </div>
                  </div>
                  <div className={styles.label}>MINUTES</div>
                </div>

                <div className={styles.timeUnit}>
                  <div className={styles.numberWrapper}>
                    <div
                      className={`${styles.number} ${
                        hasChanged.seconds ? styles.flipAnimation : ""
                      }`}
                    >
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </div>
                  </div>
                  <div className={styles.label}>SECONDS</div>
                </div>
              </div>

              <div className={styles.blockInfo}>
                <p>Current Block: {currentBlock}</p>
                <p>Target Block: {targetBlock}</p>
                <p>Blocks Remaining: {Math.max(0, targetBlock - currentBlock)}</p>
                <p className={styles.blockNote}>
                  Time based on block height (30 seconds per block)
                </p>
              </div>

              <div className={styles.pulsingDot}>
                <div className={styles.dot}></div>
                <div className={styles.ripple}></div>
              </div>
            </div>
            
            <div className={styles.buttonContainer}>
              <a 
                href={ipData?.explorerUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.storyButton}
              >
                VIEW ON STORY
              </a>
              <button onClick={handleBackToDashboard} className={styles.dashboardButton}>
                BACK TO DASHBOARD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownPage;