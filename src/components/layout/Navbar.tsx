"use client";

import { useState, useEffect } from "react";
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

const navLinks = [
  { href: "/", label: "Home" },
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll state
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300">
        <nav
          className={`pointer-events-auto transition-all duration-300 flex items-center justify-between rounded-full border shadow-xl ${
            isScrolled
              ? "bg-white/95 backdrop-blur-lg border-white/40 shadow-slate-200/50 py-2 px-6 w-full max-w-5xl"
              : "bg-white/70 backdrop-blur-md border-white/30 py-3 px-8 w-full max-w-6xl"
          }`}
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
                width: 38,
                height: 38,
                background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              }}
            >
              <Compass size={22} color="white" strokeWidth={2} />
            </div>
            <div className="flex flex-col shrink-0">
              <span
                className="text-[15px] font-bold leading-tight tracking-tight whitespace-nowrap"
                style={{ color: "var(--navy-900)" }}
              >
                Zero Gravity
              </span>
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.12em] leading-tight text-blue-600 whitespace-nowrap"
              >
                Tours
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-[14px] font-medium rounded-full transition-colors duration-200 no-underline ${
                    isActive
                      ? "text-navy-700"
                      : "text-slate-600 hover:text-navy-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                      style={{ background: "var(--navy-700)" }}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <button
                onClick={toggleNotificationPanel}
                className="relative p-2 rounded-full hover:bg-slate-100/50 transition-colors"
                aria-label="Notifications"
              >
                <Bell size={20} className="text-slate-700" />
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

              {/* User Avatar */}
              <button className="hidden md:flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100/50 transition-colors">
                <div
                  className="flex items-center justify-center rounded-full text-white text-[13px] font-semibold shadow-md"
                  style={{
                    width: 34,
                    height: 34,
                    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                  }}
                >
                  AT
                </div>
                <ChevronDown size={14} className="text-slate-500" />
              </button>
            </div>

            {/* Enquire Now CTA */}
            <div className="hidden lg:block w-px h-6 bg-slate-200" />
            <Link
              href="/about#contact"
              className="hidden lg:inline-flex bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full text-[13px] px-6 py-2 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] transition-all"
            >
              Enquire Now
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ top: "var(--nav-height)" }}
          >
            <div
              className="absolute inset-0 bg-black/20"
              onClick={closeMobileMenu}
            />
            <div className="relative bg-white border-t border-slate-100 shadow-xl">
              <div className="container-main py-4 flex flex-col gap-1">
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
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <Link
                    href="/about#contact"
                    onClick={closeMobileMenu}
                    className="btn-primary w-full text-center"
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
