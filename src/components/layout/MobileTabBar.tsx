"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, MessageSquare, User } from "lucide-react";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/trips", label: "Trips", icon: Compass },
  { href: "/account/enquiries", label: "Enquiries", icon: MessageSquare },
  { href: "/account/profile", label: "Profile", icon: User },
];

export default function MobileTabBar() {
  const pathname = usePathname();

  // Don't show tab bar on operator routes
  if (pathname.startsWith("/operator")) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t pb-safe"
      style={{
        borderColor: "var(--slate-200)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href));
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 no-underline transition-colors ${
                isActive ? "text-navy-700" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <div
                className={`relative flex items-center justify-center p-1 rounded-full transition-all ${
                  isActive ? "bg-navy-50" : "bg-transparent"
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? "text-navy-700 font-semibold" : ""}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
