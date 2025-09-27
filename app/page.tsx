"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import {
  Search,
  Home,
  FileText,
  FileKey,
  Users,
  BarChart2,
  Shield,
  Settings,
  HelpCircle,
  Heart,
  Play,
  Plus,
  Menu,
  X,
  Wallet,
} from "lucide-react";
import Link from "next/link";
// Sidebar Item Component
import { WalletConnect } from "@/components/walletConnect";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function SidebarItem({ icon, label, active = false }: SidebarItemProps) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-md ${active ? "bg-[#1a1a1a]" : "hover:bg-[#1a1a1a]/50"}`}>
      <div className="w-5 h-5 text-[#888888]">{icon}</div>
      <span className={active ? "font-medium" : "text-[#888888]"}>{label}</span>
    </div>
  );
}

export interface IPRecord {
  id: number;
  title: string;
  description: string;
  image: string;
  mediaUrl: string;
  requestId: string;
  currentBlock: number;
  targetBlock: string;
  releaseDate: string;
  releaseTime: string;
  type: string;
  explorerUrl: string;
}

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [registeredIPs, setRegisteredIPs] = useState<IPRecord[]>([]);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Load registered IPs from localStorage
    if (typeof window !== 'undefined') {
      // For debugging: see what's in localStorage
      console.log("Getting IPs from localStorage");
      const savedIPs = JSON.parse(localStorage.getItem('registered_ips') || '[]');
      console.log("Saved IPs:", savedIPs);
      setRegisteredIPs(savedIPs);
    }
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (sidebarOpen && !target.closest('.sidebar') && !target.closest('.sidebar-toggle')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  const navigateToCountdown = (ipId: number) => {
    console.log("Navigating to IP:", ipId);
    router.push(`/countdown/${ipId}`);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-black text-white min-h-screen">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50 sidebar-toggle">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-[#1a1a1a]"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar (Fixed Left) - Full width on mobile when open */}
      <div className={`
        sidebar w-full lg:w-64 border-r border-[#333] p-4 fixed left-0 top-0 h-screen z-40
        transition-all duration-300 ease-in-out bg-black
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="mb-6 flex justify-center">
          <div className="text-xl font-bold text-[#fa5f02]">IP REGISTER</div>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-3 py-2 bg-[#1a1a1a] rounded-md text-sm border border-[#333] focus:outline-none focus:border-[#fa5f02]"
          />
        </div>

        <div className="space-y-1">
          <Link href="/">
            <SidebarItem icon={<Home />} label="Dashboard" active={true} />
          </Link>
          <Link href="/register">
            <SidebarItem icon={<FileText />} label="Register IP"  />
          </Link>
          <SidebarItem icon={<FileKey />} label="Generate ZPK" />
          <SidebarItem icon={<Users />} label="Collaborations" />
          <SidebarItem icon={<BarChart2 />} label="Analytics" />
          <Link href="/credentials">
            <SidebarItem icon={<Shield />} label="Credentials" />
          </Link>
          <SidebarItem icon={<Settings />} label="Settings" />
          <SidebarItem icon={<HelpCircle />} label="Help" />
        </div>
        
        {/* Connect Wallet Button in Sidebar */}
        <div className="mt-auto pt-6">
          <div className="md:hidden">
            <WalletConnect />
          </div>

        </div>
      </div>

      {/* Main Content - Properly adjust margins to avoid content being hidden */}
      <div className="flex-1 lg:ml-64 lg:mr-96 p-4 md:p-8 mt-12 lg:mt-0 overflow-x-hidden">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-medium">Hello, Michael!</h1>
          
          {/* Connect Wallet Button in Header for Mobile/Medium screens */}
          {/* WalletConnect Button (Reusable + Styled) */}
          <div className="mt-auto pt-6">
            <WalletConnect />
          </div>          

        </div>

        {/* Featured Content */}
        <div className="relative mb-10 overflow-hidden rounded-3xl bg-[#ea623a] p-6 lg:p-12 flex flex-col lg:flex-row justify-between items-center h-auto lg:h-80">
          {/* Left Content */}
          <div className="space-y-4 lg:space-y-6 max-w-full lg:max-w-[60%]">
            <div className="text-sm font-medium">Recent IP</div>
            <h2 className="text-4xl lg:text-6xl font-bold">DIE FOR YOU</h2>
            <div className="text-sm space-y-2">
              <p>Genre: R&B Music</p>
              <p>Collaborations:</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-6 lg:mt-12">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span className="font-medium">50,851 Likes</span>
              </div>
              <span className="sm:ml-8 font-medium">2.1 M Monthly Listeners</span>
            </div>
          </div>

          {/* Right Image */}
          <div className="h-full mt-6 lg:mt-0 flex justify-end">
            <img
              src="/images/week.png"
              alt="DIE FOR YOU Cover"
              className="h-40 lg:h-full w-auto object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Register IP button below featured section in responsive mode */}
        <div className="lg:hidden w-full mb-10">
          <Link href="/register">
            <button className="px-8 py-3 font-medium rounded-full bg-[#fb9a28] text-black w-full">Register IP</button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          <StatCard 
            color="green" 
            number={registeredIPs.length} 
            label="Registered IP assets" 
          />
          <StatCard color="purple" number="3" label="Creator Credentials" />
          <StatCard color="blue" number="1254" label="Profile Views" />
        </div>

        {/* Registered IPs*/}
        <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Your Registered IPs</h2>
        {registeredIPs.length === 0 ? (
          <p className="text-gray-500">No registered IPs yet. Create your first one!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {registeredIPs.map((ip, index) => (
              <div 
                key={index} 
                className="bg-[#1a1a1a] rounded-lg p-4 cursor-pointer hover:bg-[#2a2a2a] transition"
                onClick={() => navigateToCountdown(ip.id)}
              >
                <div className="w-full h-40 rounded overflow-hidden mb-3">
                  {ip.image ? (
                    <img src={ip.image} alt={ip.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#333] flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-lg">{ip.title}</h3>
                <p className="text-sm text-gray-500 mb-2 truncate">{ip.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#fa5f02]">
                    Release: {new Date(`${ip.releaseDate}T${ip.releaseTime}`).toLocaleDateString()}
                  </span>
                  <span className="text-xs bg-[#333] px-2 py-1 rounded">
                    {ip.type.split('/')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

        {/* Creator Credentials Section */}
        <h2 className="text-2xl font-semibold mb-4">Creator Credentials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10">
          <div className="flex justify-center sm:justify-start">
            <ImageCard src="/images/copper.png" />
          </div>
          <div className="flex justify-center sm:justify-start">
            <ImageCard src="/images/silver.png" />
          </div>
          <div className="flex justify-center sm:justify-start">
            <ImageCard src="/images/gold.png" />
          </div>
        </div>

        {/* Right Sidebar Content (moves below on small screens) */}
        <div className="lg:hidden w-full mb-10">
          <h3 className="text-lg font-medium mb-4">Latest Album</h3>
          <TrackItem number="00" title="Random Access Memories" artist="Daft Punk" image="/images/m1.png" isPlaying />
          <TrackItem number="01" title="Glow On" artist="Turnstile" image="/images/m2.png" />
          <TrackItem number="02" title="Dopethrone" artist="Electric Wizard" image="/images/m3.png" />
          <TrackItem number="03" title="The Narcotic Story" artist="Oxbow" image="/images/m4.png" />
          <h3 className="text-lg font-medium mt-6 mb-4">Latest Singles</h3>
          <TrackItem number="00" title="Feel Good Inc." artist="Gorillaz" image="/images/m5.png" />
          <TrackItem number="01" title="Get Lucky" artist="Daft Punk" image="/images/m6.png" />
          <TrackItem number="02" title="Ace of Spades" artist="Motörhead" image="/images/m7.png" />
          <TrackItem number="03" title="My War" artist="Black Flag" image="/images/m8.png" />
        </div>
      </div>

      {/* Right Sidebar (Fixed on large screens, below content on small) */}
      <div className="hidden lg:block w-96 p-6 border-l border-[#333333] fixed right-0 top-0 h-screen overflow-y-auto">
        <div className="flex flex-col gap-4 mb-6">
          <Link href="/register">
            <button className="px-8 py-3 font-medium rounded-full bg-[#fb9a28] text-black w-full">
              Register IP
            </button>
          </Link>
          
          {/* Connect Wallet Button for desktop */}
          
        </div>
        
        <h3 className="text-lg font-medium mb-4">Latest Album</h3>
        <TrackItem number="00" title="Random Access Memories" artist="Daft Punk" image="/images/m1.png" isPlaying />
        <TrackItem number="01" title="Glow On" artist="Turnstile" image="/images/m2.png" />
        <TrackItem number="02" title="Dopethrone" artist="Electric Wizard" image="/images/m3.png" />
        <TrackItem number="03" title="The Narcotic Story" artist="Oxbow" image="/images/m4.png" />
        <h3 className="text-lg font-medium mt-6 mb-4">Latest Singles</h3>
        <TrackItem number="00" title="Feel Good Inc." artist="Gorillaz" image="/images/m5.png" />
        <TrackItem number="01" title="Get Lucky" artist="Daft Punk" image="/images/m6.png" />
        <TrackItem number="02" title="Ace of Spades" artist="Motörhead" image="/images/m7.png" />
        <TrackItem number="03" title="My War" artist="Black Flag" image="/images/m8.png" />
      </div>
    </div>
  );
}

/* Navigation Item */
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-md ${active ? "bg-[#1a1a1a]" : "hover:bg-[#1a1a1a]/50"}`}>
      <div className="w-5 h-5 text-[#888888]">{icon}</div>
      <span className={`${active ? "font-medium" : "text-[#888888]"}`}>{label}</span>
    </div>
  );
}

/* Statistics Card */
interface StatCardProps {
  color: string;
  number: string | number;
  label: string;
}

function StatCard({ color, number, label }: StatCardProps) {
  const bgColorClass = {
    green: "bg-green-600",
    purple: "bg-purple-600",
    blue: "bg-blue-600",
  }[color] || "bg-gray-600";

  const bgImage = {
    green: "/images/card1.png",
    purple: "/images/card2.png",
    blue: "/images/card3.png",
  }[color] || "/images/card1.png";

  return (
    <div className={`relative overflow-hidden rounded-2xl p-8 h-36 text-center`}>
      <div 
        className="absolute inset-0 bg-cover bg-center "
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="relative z-10">
        <div className="text-4xl font-bold mb-2">{number}</div>
        <div className="text-sm">{label}</div>
      </div>
    </div>
  );
}

/* Image Card */
interface ImageCardProps {
  src: string;
}

function ImageCard({ src }: ImageCardProps) {
  return (
    <div className="w-[175px] h-[202px] rounded-lg overflow-hidden">
      <img src={src} alt="Creator" className="w-full h-full object-cover" />
    </div>
  );
}

/* Track Item */
interface TrackItemProps {
  number: string;
  title: string;
  artist: string;
  image: string;
  isPlaying?: boolean;
}

function TrackItem({ number, title, artist, image, isPlaying = false }: TrackItemProps) {
  return (
    <div className="flex items-center gap-4 mb-3">
      <div className="w-6 text-right text-sm text-[#888888]">{number}</div>
      {isPlaying ? (
        <div className="w-6 h-6 flex items-center justify-center">
          <Play className="w-4 h-4" />
        </div>
      ) : (
        <div className="w-6 h-6 flex items-center justify-center">
          <Plus className="w-4 h-4" />
        </div>
      )}
      <img src={image} alt={title} className="w-8 h-8 rounded-full object-cover" />
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-[#888888]">{artist}</div>
      </div>
    </div>
  );
}