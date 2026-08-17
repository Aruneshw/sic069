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
      <div className="card-elevated bg-white p-6 rounded-2xl border border-slate-200 sticky top-[calc(var(--nav-height)+2rem)] shadow-sm">
        {/* Profile Header */}
        <div className="flex items-center gap-4 pb-6 mb-6 border-b border-slate-100">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-navy-800 to-teal-500 flex items-center justify-center text-white text-lg font-bold shadow-md shrink-0 border-2 border-white">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-navy-900 truncate">{fullName}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isAdmin
                    ? "bg-teal-500/10 text-teal-700 border border-teal-500/30"
                    : "bg-slate-100 text-slate-600"
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
              className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-navy-900 to-navy-950 text-white shadow-md hover:shadow-teal-500/20 hover:border-teal-500/40 border border-white/10 transition-all no-underline group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300 group-hover:scale-105 transition-transform">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-white leading-tight">Admin Portal</p>
                  <p className="text-[10px] text-teal-300/80 leading-tight">Command Center</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-teal-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1">
          {accountLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between p-3 rounded-xl transition-colors no-underline group ${
                  isActive
                    ? "bg-teal-50 text-teal-900 font-bold border border-teal-100"
                    : "text-slate-600 hover:bg-slate-50 hover:text-navy-900 font-medium"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={isActive ? "text-teal-600" : "text-slate-400 group-hover:text-teal-600 transition-colors"}
                  />
                  <span className="text-sm">{link.label}</span>
                </div>
                <ChevronRight
                  size={16}
                  className={`transition-all ${
                    isActive
                      ? "text-teal-600 opacity-100"
                      : "text-slate-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/login";
            }}
            className="w-full flex items-center gap-2.5 p-3 rounded-xl text-sm font-bold text-danger hover:bg-danger-50 transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
