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
  ChevronDown,
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
            background: isScrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,1)",
            backdropFilter: isScrolled ? "blur(16px) saturate(1.2)" : "none",
            WebkitBackdropFilter: isScrolled ? "blur(16px) saturate(1.2)" : "none",
            borderColor: isScrolled ? "rgba(226,232,240,0.6)" : "rgba(226,232,240,0.4)",
            boxShadow: isScrolled
              ? "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)"
              : "0 8px 32px rgba(0,0,0,0.06)",
            padding: isScrolled ? "6px 20px" : "12px 28px",
            width: "100%",
            maxWidth: isScrolled ? 1080 : 1200,
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 no-underline shrink-0"
            onClick={closeMobileMenu}
          >
            <div
              className="flex items-center justify-center rounded-xl shadow-lg shrink-0"
              style={{
                width: isScrolled ? 32 : 38,
                height: isScrolled ? 32 : 38,
                background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1), height 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <Compass size={isScrolled ? 18 : 22} color="white" strokeWidth={2} />
            </div>
            <div className="flex flex-col shrink-0">
              <span
                className="font-bold leading-tight tracking-tight whitespace-nowrap"
                style={{
                  color: "var(--navy-900)",
                  fontSize: isScrolled ? 13 : 15,
                  transition: "font-size 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                Zero Gravity
              </span>
              <span
                className="font-semibold uppercase leading-tight text-blue-600 whitespace-nowrap"
                style={{
                  fontSize: isScrolled ? 9 : 10,
                  letterSpacing: "0.12em",
                  transition: "font-size 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                Tours
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
                  className={`relative whitespace-nowrap rounded-full no-underline font-medium ${
                    isActive
                      ? "text-navy-700"
                      : "text-slate-500 hover:text-navy-700 hover:bg-slate-50"
                  }`}
                  style={{
                    padding: isScrolled ? "6px 10px" : "8px 14px",
                    fontSize: isScrolled ? 12 : 13,
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full"
                      style={{ background: "var(--navy-700)" }}
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
          <div className="flex items-center gap-2 ml-3 shrink-0">
            {/* Notification Bell */}
            <button
              onClick={toggleNotificationPanel}
              className="relative p-2 rounded-full hover:bg-slate-100/60 transition-colors duration-200"
              aria-label="Notifications"
            >
              <Bell size={isScrolled ? 17 : 19} className="text-slate-600" style={{ transition: "all 0.3s ease" }} />
              {unreadCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex items-center justify-center text-[10px] font-bold text-white rounded-full shadow-md"
                  style={{
                    width: 18,
                    height: 18,
                    background: "var(--danger)",
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Avatar / Login */}
            {user ? (
              <div className="relative group hidden md:flex items-center gap-2 p-1 rounded-full hover:bg-slate-100/50 transition-colors cursor-pointer">
                <img
                  src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.user_metadata?.full_name || "User"}&background=2563eb&color=fff`}
                  alt="Profile"
                  className="rounded-full object-cover shadow-md border border-white"
                  style={{
                    width: isScrolled ? 28 : 34,
                    height: isScrolled ? 28 : 34,
                    transition: "width 0.4s ease, height 0.4s ease",
                  }}
                />
                {/* Dropdown Menu on hover */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden z-[60]">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-bold text-navy-900 truncate">{user.user_metadata?.full_name || 'Explorer'}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                  <Link href="/account/enquiries" className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors no-underline">
                    My Account
                  </Link>
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-bold text-danger hover:bg-danger-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="hidden md:flex items-center gap-2 p-1 rounded-full hover:bg-slate-100/50 transition-colors no-underline">
                <div
                  className="flex items-center justify-center rounded-full text-white font-semibold shadow-md"
                  style={{
                    width: isScrolled ? 28 : 34,
                    height: isScrolled ? 28 : 34,
                    fontSize: 13,
                    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                    transition: "width 0.4s ease, height 0.4s ease",
                  }}
                >
                  <User size={isScrolled ? 14 : 16} />
                </div>
              </Link>
            )}

            {/* Enquire Now CTA */}
            <div className="hidden xl:block w-px h-5 bg-slate-200 mx-1" />
            <div className="hidden xl:block">
              <GlowingButton href="/about#contact" className="px-5 py-1.5 text-[12px]">
                Enquire Now
              </GlowingButton>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={22} className="text-slate-700" />
              ) : (
                <Menu size={22} className="text-slate-700" />
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
            style={{ top: 72 }}
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={closeMobileMenu}
            />
            <div className="relative bg-white border-t border-slate-100 shadow-xl rounded-b-3xl mx-4 overflow-hidden">
              <div className="py-4 px-4 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`px-4 py-3 rounded-xl text-[15px] font-medium transition-colors no-underline ${
                        isActive
                          ? "bg-navy-50 text-navy-700"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="mt-3 pt-3 border-t border-slate-100 flex justify-center">
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
