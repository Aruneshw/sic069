"use client";

import { motion } from "framer-motion";
import { MessageCircle, Sparkles, Users, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WomHeroSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-teal-500/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/6 rounded-full blur-[80px] pointer-events-none" />

      <div className="container-main relative z-10 max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/15 border border-teal-500/25 text-xs font-bold text-teal-300 uppercase tracking-widest mb-6">
            <Users size={14} /> Word-of-Mouth Intelligence
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6">
            Ask Someone Who&apos;s{" "}
            <span className="bg-gradient-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent">Been There.</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Travel advice is everywhere. <span className="text-white font-semibold">Good travel advice isn&apos;t.</span>{" "}
            Get verified local knowledge, honest reality checks, and what experienced travelers actually recommend.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/ask-local" className="px-8 py-4 bg-gradient-to-r from-teal-400 to-teal-500 text-navy-950 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-shadow">
              <MessageCircle size={18} /> Ask a Local <ArrowRight size={16} />
            </Link>
            <Link href="/escape" className="px-8 py-4 bg-white/5 border border-white/15 text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-white/10 transition-colors">
              <Sparkles size={18} /> Find My Escape
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-400" /> Verified local knowledge</div>
            <div className="flex items-center gap-1.5"><Users size={14} className="text-teal-400" /> Real traveler experiences</div>
            <div className="flex items-center gap-1.5"><Sparkles size={14} className="text-amber-400" /> No hallucinated facts</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
