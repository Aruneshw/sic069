"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Mail, MapPin, ArrowRight, ShieldCheck, Sparkles, Heart } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const footerSections = [
  {
    title: "Expeditions",
    links: [
      { label: "Bespoke Packages", href: "/packages" },
      { label: "Curated Trips", href: "/trips" },
      { label: "Escape Discovery", href: "/escape" },
      { label: "Word-of-Mouth Map", href: "/ask-local" },
      { label: "Expedition Calendar", href: "/trips/calendar" },
    ],
  },
  {
    title: "Philosophy",
    links: [
      { label: "About Our Story", href: "/about" },
      { label: "Community Voices", href: "/community" },
      { label: "Radical Transparency", href: "/about#mission" },
      { label: "Contact Concierge", href: "/about#contact" },
      { label: "FAQs & Insights", href: "/about#faq" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Welcome to the Zero Gravity Explorer Club!");
    setEmail("");
  };

  return (
    <div className="relative z-10 mt-24">
      {/* Section divider */}
      <div className="section-divider" />

      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-7xl px-6 md:px-8 pt-20 pb-12"
      >
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-3 no-underline mb-6 group">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                style={{
                  background: "linear-gradient(145deg, var(--gold-600), var(--gold-800))",
                  border: "1px solid rgba(200,165,92,0.30)",
                  boxShadow: "0 4px 12px rgba(200,165,92,0.20)",
                }}
              >
                <Compass size={24} strokeWidth={2} className="group-hover:rotate-45 transition-transform duration-500" style={{ color: "var(--gold-100)" }} />
              </div>
              <div>
                <span className="text-xl font-bold block" style={{ color: "var(--text-primary)" }}>Zero Gravity</span>
                <span className="text-[10px] font-bold uppercase tracking-widest block" style={{ color: "var(--gold-500)" }}>Tours</span>
              </div>
            </Link>
            <p className="font-serif text-2xl md:text-3xl mb-4 leading-snug" style={{ color: "var(--text-primary)" }}>
              &ldquo;Life is not meant to be in one place.&rdquo;
            </p>
            <p className="text-sm leading-relaxed max-w-md mb-8" style={{ color: "var(--text-secondary)" }}>
              Pioneering radical transparency for budget and experiential travellers worldwide. Live group limits, verified inclusions, and deterministic itinerary discovery.
            </p>

            <div className="flex flex-wrap gap-5 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              <div className="flex items-center gap-1.5">
                <MapPin size={14} style={{ color: "var(--gold-500)" }} />
                <span>Global Expedition Hub</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} style={{ color: "var(--success)" }} />
                <span>100% Inclusions Verified</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section, idx) => (
            <div key={idx} className="lg:col-span-2">
              <h3 className="text-eyebrow mb-5">{section.title}</h3>
              <ul className="space-y-3 list-none p-0 m-0">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="text-sm no-underline block transition-colors duration-200"
                      style={{ color: "var(--text-secondary)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--gold-400)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} style={{ color: "var(--gold-500)" }} />
              <span className="text-eyebrow">Curated Dispatches</span>
            </div>
            <h4 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              Join the Explorer&apos;s Circle
            </h4>
            <p className="text-xs mb-5 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Receive secret departure schedules, seasonal local insights, and early access to regional bundle drops.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="input-glass pl-11 pr-4 py-3 text-sm w-full"
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-1.5"
              >
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{
            borderTop: "1px solid var(--border-subtle)",
            color: "var(--text-muted)",
          }}
        >
          <span>&copy; {new Date().getFullYear()} Zero Gravity Tours. All rights reserved.</span>

          <div className="flex items-center gap-1.5 font-medium" style={{ color: "var(--text-muted)" }}>
            <span>Crafted with</span>
            <Heart size={12} className="fill-current" style={{ color: "var(--gold-500)" }} />
            <span>for authentic regional wanderers worldwide.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/about" className="no-underline transition-colors" style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--gold-400)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            >Privacy</Link>
            <Link href="/about" className="no-underline transition-colors" style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--gold-400)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            >Terms</Link>
            <Link href="/about" className="no-underline transition-colors" style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--gold-400)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            >Sitemap</Link>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
