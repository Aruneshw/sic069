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
          paddingTop: isScrolled ? 8 : 16,
          paddingLeft: 16,
          paddingRight: 16,
          transition: "padding 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease",
          transform: isHidden ? "translateY(-100px)" : "translateY(0)",
          opacity: isHidden ? 0 : 1,
        }}
      >
        <nav
          className="pointer-events-auto flex items-center"
          style={{
            background: isScrolled
              ? "rgba(5, 10, 16, 0.72)"
              : "rgba(5, 10, 16, 0.20)",
            backdropFilter: "blur(18px) saturate(1.2)",
            WebkitBackdropFilter: "blur(18px) saturate(1.2)",
            border: `1px solid ${isScrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}`,
            boxShadow: isScrolled
              ? "0 8px 32px rgba(0,0,0,0.3)"
              : "none",
            borderRadius: isScrolled ? 16 : 20,
            padding: isScrolled ? "8px 20px" : "12px 28px",
            width: "100%",
            maxWidth: isScrolled ? 980 : 1100,
            transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 no-underline shrink-0 group"
            onClick={closeMobileMenu}
          >
            <div
              className="flex items-center justify-center rounded-xl shrink-0 group-hover:scale-105 transition-transform duration-300"
              style={{
                width: isScrolled ? 32 : 38,
                height: isScrolled ? 32 : 38,
                background: "linear-gradient(145deg, var(--gold-600), var(--gold-800))",
                border: "1px solid rgba(200, 165, 92, 0.30)",
                transition: "width 0.5s cubic-bezier(0.22, 1, 0.36, 1), height 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                boxShadow: "0 4px 12px rgba(200, 165, 92, 0.20)",
              }}
            >
              <Compass size={isScrolled ? 17 : 21} className="text-gold-100 group-hover:rotate-45 transition-transform duration-500" strokeWidth={2} />
            </div>
            <div className="flex flex-col shrink-0 leading-none">
              <div className="flex items-baseline gap-1.5">
                <span
                  className="font-bold tracking-tight whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-poppins), Poppins, sans-serif",
                    fontSize: isScrolled ? 14 : 16,
                    lineHeight: 1.2,
                    transition: "font-size 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                    color: "var(--text-primary)",
                  }}
                >
                  Zero Gravity
                </span>
                <span
                  className="font-bold uppercase whitespace-nowrap tracking-[0.14em]"
                  style={{
                    fontFamily: "var(--font-poppins), Poppins, sans-serif",
                    fontSize: 9,
                    lineHeight: 1,
                    color: "var(--gold-500)",
                  }}
                >
                  Tours
                </span>
              </div>
              <span
                className="font-script leading-none"
                style={{
                  fontSize: isScrolled ? 10 : 11,
                  marginTop: 0,
                  transition: "font-size 0.4s ease",
                  color: "var(--text-muted)",
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
                  className="relative whitespace-nowrap rounded-lg no-underline transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-poppins), Poppins, sans-serif",
                    padding: isScrolled ? "6px 10px" : "8px 14px",
                    fontSize: isScrolled ? 12 : 13,
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: "0.01em",
                    color: isActive ? "var(--gold-400)" : "var(--text-secondary)",
                    transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full"
                      style={{
                        background: "linear-gradient(to right, var(--gold-500), var(--gold-700))",
                      }}
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
          <div className="flex items-center gap-1.5 ml-3 shrink-0">
            {/* Notification Bell */}
            <button
              onClick={toggleNotificationPanel}
              className="relative p-2 rounded-lg transition-colors duration-200"
              style={{
                color: "var(--text-secondary)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--gold-400)";
                (e.currentTarget as HTMLElement).style.background = "rgba(200, 165, 92, 0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
              aria-label="Notifications"
            >
              <Bell size={isScrolled ? 17 : 19} />
              {unreadCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex items-center justify-center text-[9px] font-bold rounded-full shadow-md"
                  style={{
                    width: 16, height: 16,
                    background: "var(--gold-500)",
                    color: "var(--bg-primary)",
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Avatar / Login */}
            {user ? (
              <div className="relative group hidden md:flex items-center gap-1 p-1 rounded-lg transition-colors cursor-pointer"
                style={{ }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <img
                  src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.user_metadata?.full_name || "User"}&background=1a2940&color=C8A55C`}
                  alt="Profile"
                  className="rounded-full object-cover"
                  style={{
                    width: isScrolled ? 28 : 34,
                    height: isScrolled ? 28 : 34,
                    transition: "width 0.4s ease, height 0.4s ease",
                    border: "2px solid rgba(200, 165, 92, 0.35)",
                  }}
                />
                {/* Dropdown */}
                <div
                  className="absolute top-full right-0 mt-2 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden z-[60]"
                  style={{
                    background: "rgba(8, 17, 28, 0.95)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid var(--border-medium)",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-lg)",
                  }}
                >
                  <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold truncate" style={{ color: "var(--text-primary)", fontFamily: "var(--font-poppins)" }}>{user.user_metadata?.full_name || 'Explorer'}</p>
                      {user.email === "aruneshownsty1@gmail.com" && (
                        <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full"
                          style={{
                            background: "var(--warning-muted)",
                            color: "var(--gold-500)",
                            border: "1px solid rgba(200,165,92,0.20)",
                          }}
                        >
                          Admin
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>{user.email}</p>
                  </div>
                  
                  {user.email === "aruneshownsty1@gmail.com" && (
                    <Link
                      href="/admin"
                      className="flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider no-underline transition-colors"
                      style={{
                        color: "var(--gold-500)",
                        borderBottom: "1px solid var(--border-subtle)",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(200,165,92,0.06)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck size={16} /> Admin Command Center
                      </span>
                    </Link>
                  )}

                  <Link href="/account/enquiries" className="block px-4 py-3 text-sm font-medium no-underline transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    My Account
                  </Link>
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      window.location.href = "/login";
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-medium transition-colors"
                    style={{
                      color: "var(--danger)",
                      borderTop: "1px solid var(--border-subtle)",
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--danger-muted)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="hidden md:flex items-center gap-1.5 p-1 rounded-lg transition-colors no-underline"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(200,165,92,0.06)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <div
                  className="flex items-center justify-center rounded-full font-bold"
                  style={{
                    width: isScrolled ? 28 : 34,
                    height: isScrolled ? 28 : 34,
                    fontSize: 12,
                    background: "linear-gradient(145deg, var(--gold-500), var(--gold-700))",
                    color: "var(--bg-primary)",
                    transition: "width 0.4s ease, height 0.4s ease",
                    boxShadow: "0 4px 12px rgba(200,165,92,0.25)",
                  }}
                >
                  <User size={isScrolled ? 14 : 16} />
                </div>
              </Link>
            )}

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0"
              style={{ background: "rgba(5,7,11,0.85)", backdropFilter: "blur(8px)" }}
              onClick={closeMobileMenu}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-4 mt-20 overflow-hidden"
              style={{
                background: "rgba(8, 17, 28, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid var(--border-medium)",
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <div className="py-4 px-4 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className="block px-4 py-3 rounded-xl text-[15px] no-underline transition-colors"
                        style={{
                          fontFamily: "var(--font-poppins)",
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? "var(--gold-400)" : "var(--text-secondary)",
                          background: isActive ? "rgba(200,165,92,0.06)" : "transparent",
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <div className="mt-3 pt-3 flex justify-center" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                  <Link
                    href="/about#contact"
                    onClick={closeMobileMenu}
                    className="btn-primary w-full text-center no-underline"
                  >
                    Enquire Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
