import React from "react";
import Link from "next/link";
import { LayoutDashboard, Clock, Users, Settings, LogOut, Plus, Bell, HelpCircle } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 border-r border-white/10 bg-[#0f0f0f] flex flex-col justify-between shrink-0">
        <div>
          {/* Logo / Header */}
          <div className="h-16 flex flex-col justify-center px-5 border-b border-white/5 gap-0.5">
            <span className="text-sm font-bold text-white tracking-wide">SmartSplit Pro</span>
            <span className="text-[10px] font-semibold text-white/40 tracking-widest uppercase">Digital Command Center</span>
          </div>

          <div className="p-4">
            <Link href="/dashboard/expenses/new" className="w-full bg-[#b2f5d1] hover:bg-[#9de4c2] text-black rounded-lg py-2 flex items-center justify-center gap-2 text-sm font-bold transition-colors mb-5 shadow-[0_0_15px_rgba(178,245,209,0.3)]">
              <Plus className="w-4 h-4" /> Add Expense
            </Link>

            <nav className="flex flex-col gap-1.5">
              <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 text-white text-sm font-medium border border-white/5">
                <LayoutDashboard className="w-4 h-4 text-white/70" /> Dashboard
              </Link>
              <Link href="/dashboard/activity" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors">
                <Clock className="w-4 h-4" /> Recent Activity
              </Link>
              <Link href="/dashboard/groups" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors">
                <Users className="w-4 h-4" /> Groups
              </Link>
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-white/5 flex flex-col gap-1.5">
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors">
            <Settings className="w-4 h-4" /> Settings
          </Link>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 text-sm font-medium">
            <LogOut className="w-4 h-4" /> 
            <span className="flex-1 text-left">Logout</span>
            <div className="scale-[0.65] origin-right">
              <UserButton />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative bg-[#0a0a0a]">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-white/5 shrink-0 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-md z-10">
          <h1 className="text-lg font-semibold text-white/90">SmartSplit Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input type="text" placeholder="Search..." className="bg-white/5 border border-white/10 rounded-full py-1 pl-8 pr-3 text-xs text-white focus:outline-none focus:border-white/20 w-48" />
              <svg className="w-3.5 h-3.5 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            
            <button className="text-white/50 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <button className="text-white/50 hover:text-white transition-colors">
              <HelpCircle className="w-4 h-4" />
            </button>
            <button className="bg-[#b2f5d1]/20 hover:bg-[#b2f5d1]/30 text-[#b2f5d1] border border-[#b2f5d1]/30 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors">
              Quick Split
            </button>
            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
