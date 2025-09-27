"use client"

import { useState, useEffect } from "react"
import { Search, Home, FileText, FileKey, Users, BarChart2, Shield, Settings, HelpCircle, Menu } from "lucide-react"
import Link from "next/link"

export default function Credentials() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClickOutside = (e: MouseEvent) => {
    if (isMobileMenuOpen && e.target instanceof HTMLElement) {
      const sidebar = document.getElementById('sidebar');
      const sidebarToggle = document.getElementById('sidebar-toggle');
      if (sidebar && !sidebar.contains(e.target) && !sidebarToggle?.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  if (!mounted) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar - Now static */}
      <div
        id="sidebar"
        className="w-64 border-r border-[#333] p-4 bg-black h-screen sticky top-0"
      >
        <div className="mb-6 flex justify-center">
          <div className="text-xl font-bold text-[#fa5f02]">IP REGISTER</div>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-[#1a1a1a] rounded-md text-sm border border-[#333] focus:outline-none focus:border-[#fa5f02]"
          />
        </div>

        <div className="space-y-1">
          {/* Navigation Items */}
          <Link href="/">
            <NavItem icon={<Home />} label="Dashboard" />
          </Link>
          <Link href="/register">
            <NavItem icon={<FileText />} label="Register IP" />
          </Link>
          <NavItem icon={<FileKey />} label="Generate ZPK" />
          <NavItem icon={<Users />} label="Collaborations" />
          <NavItem icon={<BarChart2 />} label="Analytics" />
          <Link href="/credentials">
            <NavItem icon={<Shield />} label="Credentials" active />
          </Link>
          <NavItem icon={<Settings />} label="Settings" />
          <NavItem icon={<HelpCircle />} label="Help" />
        </div>
      </div>

      {/* Mobile Menu - Overlay for small screens only */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Mobile Sidebar - Shown only on small screens when menu is open */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-40 w-64 border-r border-[#333] p-4 bg-black transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-6 flex justify-center">
          <div className="text-xl font-bold text-[#fa5f02]">IP REGISTER</div>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-[#1a1a1a] rounded-md text-sm border border-[#333] focus:outline-none focus:border-[#fa5f02]"
          />
        </div>

        <div className="space-y-1">
          {/* Navigation Items */}
          <Link href="/">
            <NavItem icon={<Home />} label="Dashboard" />
          </Link>
          <Link href="/register">
            <NavItem icon={<FileText />} label="Register IP" />
          </Link>
          <NavItem icon={<FileKey />} label="Generate ZPK" />
          <NavItem icon={<Users />} label="Collaborations" />
          <NavItem icon={<BarChart2 />} label="Analytics" />
          <Link href="/credentials">
            <NavItem icon={<Shield />} label="Credentials" active />
          </Link>
          <NavItem icon={<Settings />} label="Settings" />
          <NavItem icon={<HelpCircle />} label="Help" />
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        id="sidebar-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#1a1a1a] hover:bg-[#222] transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <div className="flex-1 p-4 pt-16 lg:pt-8 lg:p-8">
        <div className="max-w-3xl mx-auto w-full">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-medium">
              <span className="text-[#fa5f02]">CREATOR</span> CREDENTIALS
            </h1>
          </div>

          {/* Credentials Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10 justify-center">
            <div className="flex justify-center">
              <img src="/images/copper.png" alt="Copper Badge" className="w-full max-w-[150px] h-auto" />
            </div>
            <div className="flex justify-center">
              <img src="/images/silver.png" alt="Silver Badge" className="w-full max-w-[150px] h-auto" />
            </div>
            <div className="flex justify-center">
              <img src="/images/gold.png" alt="Gold Badge" className="w-full max-w-[150px] h-auto" />
            </div>
            <div className="flex justify-center">
              <img src="/images/locked.png" alt="Locked Badge" className="w-full max-w-[150px] h-auto" />
            </div>
          </div>

          {/* Credential Details */}
          <div className="p-4 sm:p-6 border border-[#444444] rounded-tl-[42px] rounded-tr-[42px] rounded-bl-[32px] rounded-br-[32px] bg-[#0a0a0a]">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
              <div className="w-full">
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6">
                  {/* Badge Image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center overflow-hidden rounded-lg bg-[#121212]">
                    <img src="/images/Diamond.png" alt="Copper Badge" className="w-full h-full object-cover" />
                  </div>

                  {/* Credential Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl sm:text-[27px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#b87333] via-[#d99a6c] to-[#a45a2a]" style={{ textShadow: "0px 1.264px 25.11px rgba(255, 255, 255, 0.25), 0px 1.264px 21.09px rgba(203, 218, 230, 0.50)", fontFamily: 'DM Sans' }}>
                      Copper Creator
                    </h3>
                    <p className="text-xs text-[#888888]">25+ IP Assets Registered</p>
                    <p className="text-xs text-[#888888]">Earned on January 15, 2025</p>
                  </div>
                </div>

                {/* Verification Information */}
                <div className="space-y-3 mt-6 text-left">
                  <div>
                    <h4 className="text-sm font-medium">Verification Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mt-2">
                      <div>
                        <p className="text-[#888888]">Issuer:</p>
                        <p>Privado ID</p>
                      </div>
                      <div>
                        <p className="text-[#888888]">Verification Method:</p>
                        <p>Story Protocol API</p>
                      </div>
                      <div>
                        <p className="text-[#888888]">Date Issued:</p>
                        <p>January 15, 2025</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Transaction Hash</h4>
                    <p className="text-xs font-mono text-[#888888] break-all mt-1 bg-[#121212] p-2 rounded">
                      0x72f9eb41a099fd3f5c45f716a3dcc37464a293f863bd4cff6fa1e9f831b74e43
                    </p>
                  </div>
                </div>
              </div>

              {/* Verify Button */}
              <div className="flex items-start w-full sm:w-auto mt-4 lg:mt-0">
                <button className="w-full sm:w-auto px-6 py-2 text-sm font-semibold text-[#fa5f02] border border-[#fa5f02] rounded-full hover:bg-[#fa5f02]/10 transition-colors">
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Sidebar Navigation Item Component
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-md ${active ? "bg-[#1a1a1a]" : "hover:bg-[#1a1a1a]/50"}`}>
      <div className="w-5 h-5 text-[#888888]">{icon}</div>
      <span className={active ? "font-medium" : "text-[#888888]"}>{label}</span>
    </div>
  )
}