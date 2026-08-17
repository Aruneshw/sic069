"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Compass,
  LayoutDashboard,
  Package,
  ClipboardCheck,
  Users,
  CreditCard,
  MessageSquare,
  Star,
  Dna,
  MapPin,
  Bot,
  Bell,
  BarChart3,
  ShieldAlert,
  Settings,
  UserCog,
  LogOut,
  Zap,
} from "lucide-react";
import { supabase } from "@/utils/supabase";

const navigationGroups = [
  {
    title: "OVERVIEW",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "COMMERCE",
    items: [
      { href: "/admin/packages", label: "Packages", icon: Package },
      { href: "/admin/approvals", label: "Approvals", icon: ClipboardCheck },
      { href: "/admin/bookings", label: "Bookings", icon: CreditCard },
      { href: "/admin/payments", label: "Payments", icon: Zap },
    ],
  },
  {
    title: "CUSTOMERS",
    items: [
      { href: "/admin/members", label: "Members", icon: Users },
      { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
      { href: "/admin/reviews", label: "Reviews", icon: Star },
    ],
  },
  {
    title: "INTELLIGENCE",
    items: [
      { href: "/admin/travel-dna", label: "Travel DNA", icon: Dna },
      { href: "/admin/local-guide", label: "Local Guide", icon: Compass },
      { href: "/admin/ai", label: "AI Control", icon: Bot },
    ],
  },
  {
    title: "CONTENT",
    items: [
      { href: "/admin/destinations", label: "Destinations", icon: MapPin },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      { href: "/admin/notifications", label: "Notifications", icon: Bell },
      { href: "/admin/reports", label: "Reports", icon: BarChart3 },
      { href: "/admin/audit", label: "Audit Logs", icon: ShieldAlert },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { href: "/admin/users", label: "Admin Users", icon: UserCog },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-64 bg-[#0B0204] border-r border-[#F7B538]/15 flex flex-col z-50 overflow-y-auto hide-scrollbar">
      {/* Brand Header */}
      <div className="p-6 sticky top-0 bg-[#0B0204]/95 backdrop-blur-md z-10 border-b border-[#F7B538]/15">
        <Link href="/admin" className="flex items-center gap-3 no-underline group">
          <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#780116] to-[#4A000E] border border-[#F7B538]/40 shadow-[0_0_15px_rgba(247,181,56,0.25)] group-hover:scale-105 transition-all shrink-0 w-10 h-10">
            <Compass size={22} className="text-[#F7B538]" strokeWidth={2.4} />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-extrabold tracking-wide text-white uppercase leading-tight">
              Admin Portal
            </span>
            <span className="text-[10px] font-black tracking-[0.2em] text-[#F7B538] uppercase leading-tight">
              Command Center
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-4 space-y-7">
        {navigationGroups.map((group) => (
          <div key={group.title}>
            <h3 className="px-3 text-[10px] font-extrabold text-[#F7B538]/60 uppercase tracking-widest mb-2.5">
              {group.title}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group no-underline ${
                        isActive
                          ? "text-[#F7B538] bg-[#780116]/40 border border-[#F7B538]/30 shadow-md"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <item.icon
                        size={17}
                        className={isActive ? "text-[#F7B538]" : "text-slate-500 group-hover:text-slate-300 transition-colors"}
                      />
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#F7B538] rounded-r-full shadow-[0_0_10px_rgba(247,181,56,0.6)]"
                        />
                      )}
                      
                      {item.label === "Approvals" && (
                        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#F7B538]/20 text-[10px] font-black text-[#F7B538] border border-[#F7B538]/40">
                          7
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-[#F7B538]/15 mt-auto">
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = "/login";
          }}
          className="flex w-full items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-[#F7B538] hover:bg-[#780116]/30 transition-colors group"
        >
          <LogOut size={17} className="text-slate-500 group-hover:text-[#F7B538] transition-colors" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
