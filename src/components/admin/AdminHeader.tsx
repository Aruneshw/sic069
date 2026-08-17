"use client";

import { useState, useEffect } from "react";
import { Search, Bell, Menu } from "lucide-react";
import { supabase } from "@/utils/supabase";

export default function AdminHeader() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });
  }, []);

  return (
    <header className="h-16 border-b border-[#F7B538]/15 bg-[#0B0204]/90 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
      {/* Mobile Toggle */}
      <button className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
        <Menu size={20} />
      </button>

      {/* Global Search */}
      <div className="hidden md:flex items-center relative flex-1 max-w-md ml-4 lg:ml-0">
        <Search size={16} className="absolute left-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search members, packages, bookings... (⌘ K)"
          className="w-full bg-[#150408] border border-[#F7B538]/20 rounded-full py-1.5 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F7B538] focus:ring-1 focus:ring-[#F7B538]/40 transition-all"
        />
        <div className="absolute right-3 px-1.5 py-0.5 rounded border border-[#F7B538]/30 bg-[#0B0204] text-[10px] font-extrabold text-[#F7B538]">
          ⌘K
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 ml-auto">
        <button className="relative p-2 text-slate-400 hover:text-[#F7B538] rounded-full hover:bg-white/5 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#780116] border border-[#F7B538] shadow-[0_0_8px_rgba(247,181,56,0.8)] animate-pulse" />
        </button>

        <div className="h-6 w-px bg-white/10 mx-2" />

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-xs font-bold text-white leading-tight">
              {user?.user_metadata?.full_name || "Aruneshwaran K"}
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#F7B538] leading-tight">
              SUPER ADMIN
            </span>
          </div>
          <img
            src={user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user?.user_metadata?.full_name || "Admin"}&background=780116&color=F7B538`}
            alt="Admin"
            className="w-8 h-8 rounded-full border-2 border-[#F7B538]/50 shadow-lg object-cover"
          />
        </div>
      </div>
    </header>
  );
}
