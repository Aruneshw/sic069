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
    <header className="h-16 border-b border-white/5 bg-navy-950/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
      {/* Mobile Toggle */}
      <button className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
        <Menu size={20} />
      </button>

      {/* Global Search */}
      <div className="hidden md:flex items-center relative flex-1 max-w-md ml-4 lg:ml-0">
        <Search size={16} className="absolute left-3 text-slate-500" />
        <input
          type="text"
          placeholder="Search members, packages, bookings... (⌘ K)"
          className="w-full bg-navy-900 border border-white/5 rounded-full py-1.5 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all shadow-inner"
        />
        <div className="absolute right-3 px-1.5 py-0.5 rounded border border-white/10 bg-navy-800 text-[10px] font-bold text-slate-400">
          ⌘K
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 ml-auto">
        <button className="relative p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
        </button>

        <div className="h-6 w-px bg-white/10 mx-2" />

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-semibold text-white leading-tight">
              {user?.user_metadata?.full_name || "Admin"}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 leading-tight">
              SUPER ADMIN
            </span>
          </div>
          <img
            src={user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user?.user_metadata?.full_name || "Admin"}&background=0d1b2a&color=2dd4bf`}
            alt="Admin"
            className="w-8 h-8 rounded-full border border-white/10 shadow-lg object-cover"
          />
        </div>
      </div>
    </header>
  );
}
