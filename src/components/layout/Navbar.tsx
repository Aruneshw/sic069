"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Menu,
  X,
  Bell,
  User,
  ShieldCheck,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { supabase } from "@/utils/supabase";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ask-local", label: "Ask a Local" },
  { href: "/escape", label: "Escape Engine" },
  { href: "/trips", label: "Trips" },
  { href: "/packages", label: "Packages" },
  { href: "/about", label: "About Us" },
  { href: "/community", label: "Community" },
  { href: "/trips/calendar", label: "Calendar" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { unreadCount, toggleNotificationPanel, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        style={{
          paddingTop: isScrolled ? 8 : 14,
          paddingLeft: 16,
          paddingRight: 16,
          transition: "padding 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
          transform: isHidden ? "translateY(-100px)" : "translateY(0)",
          opacity: isHidden ? 0 : 1,
        }}
      >
        <nav
          className="pointer-events-auto flex items-center rounded-full"
          style={{
            background: isScrolled ? "rgba(255,253,249,0.97)" : "rgba(255,253,249,0.98)",
            backdropFilter: "blur(20px) saturate(1.3)",
            WebkitBackdropFilter: "blur(20px) saturate(1.3)",
            border: "2px solid rgba(247,181,56,0.18)",
            boxShadow: isScrolled
              ? "6px 6px 22px rgba(120,1,22,0.08), -3px -3px 12px rgba(255,255,255,0.9), inset 1px 1px 4px rgba(255,255,255,0.6)"
              : "8px 8px 28px rgba(120,1,22,0.06), -4px -4px 14px rgba(255,255,255,0.95), inset 1px 1px 4px rgba(255,255,255,0.7)",
            padding: isScrolled ? "7px 20px" : "10px 26px",
            width: "100%",
            maxWidth: isScrolled ? 960 : 1060,
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 no-underline shrink-0 group"
            onClick={closeMobileMenu}
          >
            <div
              className="flex items-center justify-center rounded-2xl shadow-md shrink-0 border-2 border-[#F7B538]/40 group-hover:scale-105 transition-transform"
              style={{
                width: isScrolled ? 32 : 38,
                height: isScrolled ? 32 : 38,
                background: "linear-gradient(145deg, #8B021A 0%, #4A000E 60%, #F7B538 100%)",
                transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1), height 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "3px 3px 8px rgba(74,0,14,0.3), inset 1px 1px 3px rgba(247,181,56,0.15)",
              }}
            >
              <Compass size={isScrolled ? 17 : 21} className="text-[#F7B538] group-hover:rotate-45 transition-transform duration-500" strokeWidth={2.2} />
            </div>
            <div className="flex flex-col shrink-0 leading-none">
              <div className="flex items-baseline gap-1">
                <span
                  className="font-extrabold tracking-tight whitespace-nowrap text-[#150408]"
                  style={{
                    fontFamily: "var(--font-poppins), Poppins, sans-serif",
                    fontSize: isScrolled ? 13 : 15,
                    lineHeight: 1.2,
                    transition: "font-size 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  Zero Gravity
                </span>
                <span
                  className="font-black uppercase text-[#780116] whitespace-nowrap tracking-[0.12em]"
                  style={{
                    fontFamily: "var(--font-poppins), Poppins, sans-serif",
                    fontSize: 9,
                    lineHeight: 1,
                  }}
                >
                  Tours
                </span>
              </div>
              <span
                className="font-script text-[#D49018] leading-none"
                style={{
                  fontSize: isScrolled ? 11 : 12,
                  marginTop: -1,
                  transition: "font-size 0.4s ease",
                }}
              >
                The Art of Wanderlust
              </span>
            </div>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative whitespace-nowrap rounded-full no-underline transition-all ${
                    isActive
                      ? "text-[#780116] font-extrabold"
                      : "text-slate-600 font-semibold hover:text-[#780116] hover:bg-[#F7B538]/8"
                  }`}
                  style={{
                    fontFamily: "var(--font-poppins), Poppins, sans-serif",
                    padding: isScrolled ? "5px 10px" : "7px 13px",
                    fontSize: isScrolled ? 11 : 12,
                    letterSpacing: "0.01em",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-[#780116] via-[#F7B538] to-[#780116]"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Spacer */}
          <div className="flex-1 lg:hidden" />

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 ml-2 shrink-0">
            {/* Notification Bell */}
            <button
              onClick={toggleNotificationPanel}
              className="relative p-2 rounded-full hover:bg-[#F7B538]/10 text-slate-600 hover:text-[#780116] transition-colors duration-200"
              aria-label="Notifications"
            >
              <Bell size={isScrolled ? 17 : 19} />
              {unreadCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex items-center justify-center text-[9px] font-black text-white rounded-full shadow-md bg-[#780116] border border-[#F7B538]"
                  style={{ width: 16, height: 16 }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Avatar / Login */}
            {user ? (
              <div className="relative group hidden md:flex items-center gap-1 p-1 rounded-full hover:bg-[#F7B538]/10 transition-colors cursor-pointer">
                <img
                  src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.user_metadata?.full_name || "User"}&background=780116&color=F7B538`}
                  alt="Profile"
                  className="rounded-full object-cover border-2 border-[#F7B538]/50"
                  style={{
                    width: isScrolled ? 28 : 34,
                    height: isScrolled ? 28 : 34,
                    transition: "width 0.4s ease, height 0.4s ease",
                    boxShadow: "2px 2px 8px rgba(120,1,22,0.12)",
                  }}
                />
                {/* Dropdown */}
                <div className="absolute top-full right-0 mt-2 w-60 bg-white border-2 border-[#780116]/10 rounded-[1.5rem] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden z-[60]"
                  style={{
                    boxShadow: "8px 8px 24px rgba(120,1,22,0.1), -4px -4px 12px rgba(255,255,255,0.8), inset 1px 1px 3px rgba(255,255,255,0.5)"
                  }}
                >
                  <div className="px-4 py-3 border-b border-[#780116]/10 bg-[#FFFDF9]">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-extrabold text-[#150408] truncate" style={{ fontFamily: "var(--font-poppins)" }}>{user.user_metadata?.full_name || 'Explorer'}</p>
                      {user.email === "aruneshownsty1@gmail.com" && (
                        <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-[#F7B538]/20 text-[#780116] border border-[#F7B538]/50 rounded-full">
                          Admin
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </div>
                  
                  {user.email === "aruneshownsty1@gmail.com" && (
                    <Link
                      href="/admin"
                      className="flex items-center justify-between px-4 py-3 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#780116] to-[#4A000E] hover:from-[#9B0822] hover:to-[#600112] transition-colors no-underline border-b border-[#F7B538]/20"
                    >
                      <span className="flex items-center gap-1.5 text-[#F7B538]">
                        <ShieldCheck size={16} /> Admin Command Center
                      </span>
                    </Link>
                  )}

                  <Link href="/account/enquiries" className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-[#FAF3E7] hover:text-[#780116] transition-colors no-underline">
                    My Account
                  </Link>
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      window.location.href = "/login";
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-bold text-[#780116] hover:bg-[#780116]/10 transition-colors border-t border-[#780116]/10"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="hidden md:flex items-center gap-1.5 p-1 rounded-full hover:bg-[#F7B538]/10 transition-colors no-underline">
                <div
                  className="flex items-center justify-center rounded-full text-[#150408] font-bold"
                  style={{
                    width: isScrolled ? 28 : 34,
                    height: isScrolled ? 28 : 34,
                    fontSize: 12,
                    background: "linear-gradient(145deg, #F9C862, #D49018)",
                    transition: "width 0.4s ease, height 0.4s ease",
                    boxShadow: "3px 3px 8px rgba(168,110,12,0.2), inset 1px 1px 3px rgba(255,255,255,0.4)",
                  }}
                >
                  <User size={isScrolled ? 14 : 16} />
                </div>
              </Link>
            )}

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-[#F7B538]/10 transition-colors text-[#150408]"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ top: 76 }}
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={closeMobileMenu}
            />
            <div
              className="relative bg-[#FFFDF9] border-2 border-[#F7B538]/25 rounded-b-[2rem] mx-4 overflow-hidden"
              style={{
                boxShadow: "8px 8px 24px rgba(120,1,22,0.08), inset 1px 1px 4px rgba(255,255,255,0.6)",
              }}
            >
              <div className="py-4 px-4 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`px-4 py-3 rounded-xl text-[15px] no-underline transition-colors ${
                        isActive
                          ? "bg-[#780116]/10 text-[#780116] font-extrabold"
                          : "text-slate-700 font-semibold hover:bg-[#F7B538]/10"
                      }`}
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="mt-3 pt-3 border-t border-[#780116]/10 flex justify-center">
                  <Link
                    href="/about#contact"
                    onClick={closeMobileMenu}
                    className="btn-primary w-full text-center no-underline"
                  >
                    Enquire Now
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
