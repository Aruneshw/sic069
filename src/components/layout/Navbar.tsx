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
import GlowingButton from "@/components/ui/GlowingButton";
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

      // Hide if scrolling down and past 200px, show if scrolling up
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

  // Don't render the public navbar on admin routes
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        style={{
          paddingTop: isScrolled ? 8 : 16,
          paddingLeft: 16,
          paddingRight: 16,
          transition: "padding 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
          transform: isHidden ? "translateY(-100px)" : "translateY(0)",
          opacity: isHidden ? 0 : 1,
        }}
      >
        <nav
          className="pointer-events-auto flex items-center rounded-full border shadow-xl"
          style={{
            background: isScrolled ? "rgba(255,253,249,0.96)" : "rgba(255,253,249,0.98)",
            backdropFilter: "blur(20px) saturate(1.3)",
            WebkitBackdropFilter: "blur(20px) saturate(1.3)",
            borderColor: "rgba(247,181,56,0.28)",
            boxShadow: isScrolled
              ? "0 8px 30px rgba(120,1,22,0.12), 0 0 15px rgba(247,181,56,0.15)"
              : "0 12px 36px rgba(120,1,22,0.08)",
            padding: isScrolled ? "8px 22px" : "12px 28px",
            width: "100%",
            maxWidth: isScrolled ? 1120 : 1240,
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 no-underline shrink-0 group"
            onClick={closeMobileMenu}
          >
            <div
              className="flex items-center justify-center rounded-2xl shadow-md shrink-0 border border-[#F7B538]/40 group-hover:scale-105 transition-transform"
              style={{
                width: isScrolled ? 34 : 40,
                height: isScrolled ? 34 : 40,
                background: "linear-gradient(135deg, #780116 0%, #4A000E 60%, #F7B538 100%)",
                transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1), height 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <Compass size={isScrolled ? 19 : 23} className="text-[#F7B538] group-hover:rotate-45 transition-transform duration-500" strokeWidth={2.2} />
            </div>
            <div className="flex flex-col shrink-0">
              <div className="flex items-baseline gap-1">
                <span
                  className="font-extrabold leading-tight tracking-tight whitespace-nowrap text-[#150408]"
                  style={{
                    fontSize: isScrolled ? 14 : 16,
                    transition: "font-size 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  Zero Gravity
                </span>
                <span
                  className="font-black uppercase leading-tight text-[#780116] whitespace-nowrap text-[10px] tracking-widest"
                >
                  Tours
                </span>
              </div>
              <span className="font-script text-[13px] text-[#D49018] leading-none -mt-0.5">
                The Art of Wanderlust
              </span>
            </div>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative whitespace-nowrap rounded-full no-underline font-bold transition-all ${
                    isActive
                      ? "text-[#780116]"
                      : "text-slate-600 hover:text-[#780116] hover:bg-[#F7B538]/10"
                  }`}
                  style={{
                    padding: isScrolled ? "6px 12px" : "8px 15px",
                    fontSize: isScrolled ? 12 : 13,
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-[#780116] via-[#F7B538] to-[#780116]"
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
          <div className="flex items-center gap-2.5 ml-3 shrink-0">
            {/* Notification Bell */}
            <button
              onClick={toggleNotificationPanel}
              className="relative p-2 rounded-full hover:bg-[#F7B538]/10 text-slate-700 hover:text-[#780116] transition-colors duration-200"
              aria-label="Notifications"
            >
              <Bell size={isScrolled ? 18 : 20} />
              {unreadCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex items-center justify-center text-[10px] font-black text-white rounded-full shadow-md bg-[#780116] border border-[#F7B538]"
                  style={{
                    width: 18,
                    height: 18,
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Avatar / Login */}
            {user ? (
              <div className="relative group hidden md:flex items-center gap-2 p-1 rounded-full hover:bg-[#F7B538]/10 transition-colors cursor-pointer">
                <img
                  src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.user_metadata?.full_name || "User"}&background=780116&color=F7B538`}
                  alt="Profile"
                  className="rounded-full object-cover shadow-md border-2 border-[#F7B538]/50"
                  style={{
                    width: isScrolled ? 30 : 36,
                    height: isScrolled ? 30 : 36,
                    transition: "width 0.4s ease, height 0.4s ease",
                  }}
                />
                {/* Dropdown Menu on hover */}
                <div className="absolute top-full right-0 mt-2 w-60 bg-white border border-[#780116]/15 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden z-[60]">
                  <div className="px-4 py-3 border-b border-[#780116]/10 bg-[#FFFDF9]">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-extrabold text-[#150408] truncate">{user.user_metadata?.full_name || 'Explorer'}</p>
                      {user.email === "aruneshownsty1@gmail.com" && (
                        <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#F7B538]/20 text-[#780116] border border-[#F7B538]/50 rounded-full">
                          Admin
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                  
                  {/* Admin Access Quick Link */}
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
              <Link href="/login" className="hidden md:flex items-center gap-2 p-1 rounded-full hover:bg-[#F7B538]/10 transition-colors no-underline">
                <div
                  className="flex items-center justify-center rounded-full text-[#150408] font-bold shadow-md"
                  style={{
                    width: isScrolled ? 30 : 36,
                    height: isScrolled ? 30 : 36,
                    fontSize: 13,
                    background: "linear-gradient(135deg, #F7B538, #D49018)",
                    transition: "width 0.4s ease, height 0.4s ease",
                  }}
                >
                  <User size={isScrolled ? 15 : 17} />
                </div>
              </Link>
            )}

            {/* Enquire Now CTA */}
            <div className="hidden xl:block w-px h-5 bg-[#780116]/15 mx-1" />
            <div className="hidden xl:block">
              <GlowingButton href="/about#contact" className="px-5 py-2 text-[12px]">
                Enquire Now
              </GlowingButton>
            </div>

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
            <div className="relative bg-[#FFFDF9] border border-[#F7B538]/30 shadow-2xl rounded-b-[2rem] mx-4 overflow-hidden">
              <div className="py-4 px-4 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`px-4 py-3 rounded-xl text-[15px] font-bold transition-colors no-underline ${
                        isActive
                          ? "bg-[#780116]/10 text-[#780116]"
                          : "text-slate-700 hover:bg-[#F7B538]/10"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="mt-3 pt-3 border-t border-[#780116]/10 flex justify-center">
                  <GlowingButton href="/about#contact" onClick={closeMobileMenu}>
                    Enquire Now
                  </GlowingButton>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
