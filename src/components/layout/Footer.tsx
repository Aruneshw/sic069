"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Mail, Phone, MapPin } from "lucide-react";

const footerSections = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Trips", href: "/trips" },
      { label: "Community", href: "/community" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/about#contact" },
      { label: "FAQ", href: "/about#faq" },
      { label: "Cancellation Policy", href: "#" },
      { label: "Safety Guidelines", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <div className="px-4 pb-8 md:px-8 md:pb-12 pt-12 relative z-10 bg-transparent">
      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border"
        style={{
          background: "linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.7) 100%)",
          borderColor: "var(--border-default)",
          boxShadow: "0 20px 60px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 1)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="p-8 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 no-underline mb-4">
                <div
                  className="flex items-center justify-center rounded-xl shadow-sm"
                  style={{
                    width: 42,
                    height: 42,
                    background: "var(--navy-700)",
                  }}
                >
                  <Compass size={24} color="white" strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-[17px] font-bold leading-tight tracking-tight"
                    style={{ color: "var(--navy-700)" }}
                  >
                    Zero Gravity
                  </span>
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.14em] leading-tight"
                    style={{ color: "var(--slate-400)" }}
                  >
                    Tours
                  </span>
                </div>
              </Link>
              <p
                className="text-[14px] leading-relaxed mb-6 max-w-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Providing live schedules, transparent group sizes, and clear inclusions for budget travellers everywhere.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-[13px]" style={{ color: "var(--text-secondary)" }}>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                    <MapPin size={14} className="text-slate-500" />
                  </div>
                  <span>Sydney, AU — Global Operations</span>
                </div>
                <div className="flex items-center gap-3 text-[13px]" style={{ color: "var(--text-secondary)" }}>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                    <Mail size={14} className="text-slate-500" />
                  </div>
                  <span>hello@zerogravitytours.com</span>
                </div>
                <div className="flex items-center gap-3 text-[13px]" style={{ color: "var(--text-secondary)" }}>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                    <Phone size={14} className="text-slate-500" />
                  </div>
                  <span>+61 2 8000 1234</span>
                </div>
              </div>
            </div>

            {/* Link Columns */}
            {footerSections.map((section) => (
              <div key={section.title} className="mt-2 sm:mt-0">
                <h4
                  className="text-[13px] font-semibold uppercase tracking-wider mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  {section.title}
                </h4>
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[14px] font-medium no-underline transition-colors duration-200 hover:text-navy-700"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright Bar */}
        <div
          className="border-t py-6 px-8 md:px-12 lg:px-16 bg-white/40"
          style={{ borderColor: "rgba(0,0,0,0.06)" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              className="text-[13px] m-0 font-medium"
              style={{ color: "var(--text-tertiary)" }}
            >
              © {new Date().getFullYear()} Zero Gravity Tours. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
              <Link
                href="#"
                className="text-[13px] font-medium no-underline transition-colors hover:text-navy-700"
                style={{ color: "var(--text-tertiary)" }}
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-[13px] font-medium no-underline transition-colors hover:text-navy-700"
                style={{ color: "var(--text-tertiary)" }}
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-[13px] font-medium no-underline transition-colors hover:text-navy-700"
                style={{ color: "var(--text-tertiary)" }}
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
