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
  ChevronRight,
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
    <aside className="fixed top-0 left-0 bottom-0 w-64 bg-navy-950 border-r border-white/5 flex flex-col z-50 overflow-y-auto hide-scrollbar">
      {/* Brand Header */}
      <div className="p-6 sticky top-0 bg-navy-950/90 backdrop-blur-md z-10 border-b border-white/5">
        <Link href="/admin" className="flex items-center gap-3 no-underline group">
          <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-[0_0_15px_rgba(45,212,191,0.3)] group-hover:shadow-[0_0_20px_rgba(45,212,191,0.5)] transition-all shrink-0 w-10 h-10">
            <Compass size={22} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-bold tracking-wide text-white uppercase leading-tight">
              Command
            </span>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-teal-400 uppercase leading-tight">
              Center
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-4 space-y-8">
        {navigationGroups.map((group) => (
          <div key={group.title}>
            <h3 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
              {group.title}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group no-underline ${
                        isActive
                          ? "text-teal-300 bg-white/5"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <item.icon
                        size={18}
                        className={isActive ? "text-teal-400" : "text-slate-500 group-hover:text-slate-300 transition-colors"}
                      />
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-teal-400 rounded-r-full shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                        />
                      )}
                      
                      {item.label === "Approvals" && (
                        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-[10px] font-bold text-amber-500 border border-amber-500/20">
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
      <div className="p-4 border-t border-white/5 mt-auto">
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = "/login";
          }}
          className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-danger/10 hover:text-danger transition-colors group"
        >
          <LogOut size={18} className="text-slate-500 group-hover:text-danger transition-colors" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
