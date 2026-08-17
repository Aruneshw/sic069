"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/utils/supabase";
import {
  MessageSquare,
  CalendarCheck,
  Heart,
  Settings,
  Gift,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  LogOut,
} from "lucide-react";

export default function AccountSidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUser(session.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAdmin = user?.email === "aruneshownsty1@gmail.com";
  const fullName = user?.user_metadata?.full_name || (isAdmin ? "Aruneshwaran K" : "Global Explorer");
  const initials = fullName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase() || "EX";

  const accountLinks = [
    { href: "/account/enquiries", label: "My Enquiries", icon: MessageSquare },
    { href: "/account/dna", label: "My Travel DNA", icon: Sparkles },
    { href: "/account/knowledge", label: "My Travel Knowledge", icon: MessageSquare },
    { href: "/account/bookings", label: "Bookings", icon: CalendarCheck },
    { href: "/account/referrals", label: "Refer & Earn", icon: Gift },
    { href: "/account/saved", label: "Saved Trips", icon: Heart },
    { href: "/account/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-full md:w-64 lg:w-72 shrink-0">
      <div className="bg-white p-6 rounded-[2rem] border border-[#780116]/12 sticky top-[calc(var(--nav-height)+2rem)] shadow-xl">
        {/* Profile Header */}
        <div className="flex items-center gap-4 pb-6 mb-6 border-b border-[#780116]/10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#780116] to-[#4A000E] border border-[#F7B538]/40 flex items-center justify-center text-[#F7B538] text-base font-extrabold shadow-md shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-extrabold text-[#150408] truncate text-sm">{fullName}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  isAdmin
                    ? "bg-[#F7B538]/20 text-[#780116] border border-[#F7B538]/50"
                    : "bg-[#FAF3E7] text-slate-600"
                }`}
              >
                {isAdmin ? "Admin Operator" : "Explorer"}
              </span>
            </div>
          </div>
        </div>

        {/* Admin Shortcut Banner */}
        {isAdmin && (
          <div className="mb-4">
            <Link
              href="/admin"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-[#780116] via-[#600112] to-[#4A000E] text-white shadow-md hover:shadow-[#780116]/30 border border-[#F7B538]/40 transition-all no-underline group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#F7B538]/20 border border-[#F7B538]/40 flex items-center justify-center text-[#F7B538] group-hover:scale-105 transition-transform">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="text-xs font-black text-[#F7B538] leading-tight">Admin Command</p>
                  <p className="text-[10px] text-slate-200 leading-tight">Package & Trip CMS</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#F7B538] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}

        {/* Nav Links */}
        <nav className="space-y-1">
          {accountLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all no-underline ${
                  isActive
                    ? "bg-[#780116] text-[#F7B538] shadow-sm"
                    : "text-slate-600 hover:bg-[#FAF3E7] hover:text-[#780116]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className={isActive ? "text-[#F7B538]" : "text-slate-400"} />
                  <span>{link.label}</span>
                </div>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#F7B538]" />}
              </Link>
            );
          })}
        </nav>

        {/* Sign Out */}
        <div className="pt-6 mt-6 border-t border-[#780116]/10">
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/login";
            }}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#780116] hover:bg-[#780116]/10 transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
