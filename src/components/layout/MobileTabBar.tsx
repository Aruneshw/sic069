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
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe"
      style={{
        background: "rgba(5, 10, 16, 0.85)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderTop: "1px solid var(--border-subtle)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.3)",
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
              className="flex flex-col items-center justify-center w-full h-full gap-1 no-underline transition-colors"
              style={{
                color: isActive ? "var(--gold-400)" : "var(--text-muted)",
              }}
            >
              <div
                className="relative flex items-center justify-center p-1 rounded-full transition-all"
                style={{
                  background: isActive ? "rgba(200, 165, 92, 0.10)" : "transparent",
                }}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] ${isActive ? "font-semibold" : "font-medium"}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
