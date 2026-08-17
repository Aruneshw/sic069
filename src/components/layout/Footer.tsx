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
    <div className="px-4 pb-8 md:px-8 md:pb-12 pt-16 relative z-10 bg-[#FFFDF9]">
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#150408] via-[#0B0204] to-[#1F070C] text-white border border-[#F7B538]/25 shadow-2xl p-8 md:p-12 lg:p-14 relative"
      >
        {/* Ambient background glow orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#780116]/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F7B538]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          
          {/* Cell 1: Brand Manifesto (2 cols span) */}
          <div className="lg:col-span-2 p-6 md:p-8 rounded-[2rem] bg-white/[0.04] border border-white/10 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-3 no-underline mb-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#780116] to-[#4A000E] border border-[#F7B538]/40 flex items-center justify-center text-[#F7B538] shadow-lg group-hover:scale-105 transition-transform">
                  <Compass size={26} strokeWidth={2.2} className="group-hover:rotate-45 transition-transform duration-500" />
                </div>
                <div>
                  <span className="text-xl font-black text-white tracking-tight">Zero Gravity</span>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#F7B538] block">Tours</span>
                </div>
              </Link>
              <p className="font-script text-2xl text-[#F7B538] mb-3">
                &ldquo;Life is not meant to be in one place.&rdquo;
              </p>
              <p className="text-sm text-slate-300 leading-relaxed max-w-md font-normal">
                Pioneering radical transparency for budget and experiential travellers worldwide. Live group limits, verified inclusions, and deterministic itinerary discovery.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 pt-6 border-t border-white/10 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-[#F7B538]" />
                <span>Global Expedition Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-[#10B981]" />
                <span>100% Inclusions Verified</span>
              </div>
            </div>
          </div>

          {/* Cell 2 & 3: Navigation Links */}
          {footerSections.map((section, idx) => (
            <div key={idx} className="p-6 md:p-8 rounded-[2rem] bg-white/[0.04] border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-[#F7B538] mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2.5 list-none p-0 m-0">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-300 hover:text-[#F7B538] transition-colors no-underline font-medium block py-0.5"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Cell 4: VIP Explorer Newsletter (Full Width on Desktop) */}
          <div className="lg:col-span-4 p-6 md:p-8 rounded-[2rem] bg-gradient-to-r from-[#780116]/40 via-[#150408] to-[#F7B538]/10 border border-[#F7B538]/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-[#F7B538]" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#F7B538]">Curated Dispatches</span>
              </div>
              <h4 className="text-xl font-extrabold text-white">Join the Explorer&apos;s Circle</h4>
              <p className="text-xs text-slate-300 max-w-md mt-1">Receive secret departure schedules, seasonal local insights, and early access to regional bundle drops.</p>
            </div>

            <form onSubmit={handleSubscribe} className="flex items-center w-full md:w-auto max-w-md gap-2">
              <div className="relative flex-1">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full bg-black/40 border border-white/20 rounded-full py-3 pl-11 pr-4 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#F7B538] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#F7B538] text-[#150408] font-extrabold text-xs uppercase tracking-wider hover:bg-[#F9C862] transition-colors shrink-0 shadow-lg shadow-[#F7B538]/20 flex items-center gap-1.5"
              >
                Join <ArrowRight size={14} />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Metadata Bar */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 relative z-10">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Zero Gravity Tours. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <span>Crafted with</span>
            <Heart size={13} className="text-[#780116] fill-[#780116]" />
            <span>for authentic regional wanderers worldwide.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[#F7B538] transition-colors no-underline">Privacy</Link>
            <Link href="/about" className="hover:text-[#F7B538] transition-colors no-underline">Terms</Link>
            <Link href="/about" className="hover:text-[#F7B538] transition-colors no-underline">Sitemap</Link>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
