import React from 'react';

export default function DashboardPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-24 h-24 mb-6 relative">
        <div className="absolute inset-0 bg-[#b2f5d1]/20 rounded-full blur-xl animate-pulse"></div>
        <div className="relative w-full h-full bg-[#121214] border-2 border-white/10 rounded-full flex items-center justify-center shadow-2xl">
          <svg className="w-10 h-10 text-[#b2f5d1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">Dashboard V2 Coming Soon</h1>
      <p className="text-white/50 max-w-md mx-auto">
        We're working on a brand new dashboard experience. In the meantime, you can access your profile and balances from the 
        <span className="text-[#b2f5d1] font-semibold mx-1">Profile</span> 
        tab in the sidebar.
      </p>
    </div>
  );
}
