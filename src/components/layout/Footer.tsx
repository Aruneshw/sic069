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
    <div className="px-4 pb-8 md:px-8 md:pb-12 pt-16 relative z-10 bg-[#FBF9F5]">
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl"
      >
        {/* Givingli Bento Grid Footer Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Cell 1: Brand Manifesto (2 cols span) */}
          <div className="lg:col-span-2 p-8 rounded-[2.5rem] bg-[#FDE8EC] border border-pink-200 flex flex-col justify-between shadow-sm">
            <div>
              <Link href="/" className="flex items-center gap-3 no-underline mb-4 group">
                <div className="w-11 h-11 rounded-2xl bg-[#780116] border border-[#F7B538]/40 flex items-center justify-center text-[#F7B538] shadow-md group-hover:scale-105 transition-transform">
                  <Compass size={24} strokeWidth={2.4} className="group-hover:rotate-45 transition-transform duration-500" />
                </div>
                <div>
                  <span className="text-xl font-extrabold text-[#150408] tracking-tight">Zero Gravity</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#780116] block">Tours</span>
                </div>
              </Link>
              <p className="font-script text-2xl md:text-3xl text-[#780116] mb-3 leading-tight">
                &ldquo;Life is not meant to be in one place.&rdquo;
              </p>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed max-w-md font-medium">
                Pioneering radical transparency for budget and experiential travellers worldwide. Live group limits, verified inclusions, and deterministic itinerary discovery.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 pt-6 border-t border-pink-300/40 text-xs text-slate-700 font-bold">
              <div className="flex items-center gap-1.5">
                <MapPin size={15} className="text-[#780116]" />
                <span>Global Expedition Hub</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-emerald-700" />
                <span>100% Inclusions Verified</span>
              </div>
            </div>
          </div>

          {/* Cell 2: Expeditions (Champagne) */}
          <div className="p-8 rounded-[2.5rem] bg-[#FAF0DF] border border-amber-200 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[#7E5105] mb-4">
                Expeditions
              </h3>
              <ul className="space-y-2.5 list-none p-0 m-0">
                {footerSections[0].links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="text-xs text-slate-700 hover:text-[#780116] transition-colors no-underline font-bold block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cell 3: Philosophy (Sage) */}
          <div className="p-8 rounded-[2.5rem] bg-[#EBF5EE] border border-emerald-200 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-emerald-800 mb-4">
                Philosophy
              </h3>
              <ul className="space-y-2.5 list-none p-0 m-0">
                {footerSections[1].links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="text-xs text-slate-700 hover:text-emerald-900 transition-colors no-underline font-bold block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cell 4: VIP Explorer Newsletter (Full Width on Desktop) */}
          <div className="lg:col-span-4 p-8 rounded-[2.5rem] bg-white border border-[#780116]/10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-[#D49018]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#780116]">Curated Dispatches</span>
              </div>
              <h4 className="text-xl font-extrabold text-[#150408]">Join the Explorer&apos;s Circle</h4>
              <p className="text-xs text-slate-600 max-w-md mt-1 font-medium">
                Receive secret departure schedules, seasonal local insights, and early access to regional bundle drops.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex items-center w-full md:w-auto max-w-md gap-2">
              <div className="relative flex-1">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full bg-[#FBF9F5] border border-slate-200 rounded-full py-3 pl-11 pr-4 text-xs font-semibold text-[#150408] placeholder-slate-400 focus:outline-none focus:border-[#F7B538] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#780116] text-[#F7B538] font-black text-xs uppercase tracking-wider hover:bg-[#9B0822] transition-colors shrink-0 shadow-md flex items-center gap-1.5"
              >
                Join <ArrowRight size={14} />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Metadata Bar */}
        <div className="mt-8 pt-6 border-t border-[#780116]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Zero Gravity Tours. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-700 font-bold">
            <span>Crafted with</span>
            <Heart size={13} className="text-[#780116] fill-[#780116]" />
            <span>for authentic regional wanderers worldwide.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[#780116] transition-colors no-underline">Privacy</Link>
            <Link href="/about" className="hover:text-[#780116] transition-colors no-underline">Terms</Link>
            <Link href="/about" className="hover:text-[#780116] transition-colors no-underline">Sitemap</Link>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
