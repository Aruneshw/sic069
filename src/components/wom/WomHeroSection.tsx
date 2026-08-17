"use client";

import { motion } from "framer-motion";
import { MessageCircle, Sparkles, Users, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BentoCard } from "@/components/ui/BentoGrid";

export default function WomHeroSection() {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden bg-[#FBF9F5] border-t border-[#780116]/10 px-4 md:px-8">
      <div className="container-main max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDE8EC] border border-[#780116]/20 text-xs font-black text-[#780116] uppercase tracking-widest mb-4">
            <Users size={14} /> Word-of-Mouth Intelligence
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-[#150408] leading-tight mb-2">
            Ask Someone Who&apos;s{" "}
            <span className="font-script text-4xl md:text-6xl text-[#780116]">
              Actually Been There.
            </span>
          </h2>

          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Travel advice is everywhere. <strong className="text-[#150408] font-bold">Good travel advice isn&apos;t.</strong>{" "}
            Get verified local knowledge, honest reality checks, and what experienced travelers actually recommend.
          </p>

          {/* Givingli Bento Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-left max-w-3xl mx-auto">
            <BentoCard
              variant="blush"
              title="Ask a Verified Local"
              description="Get unfiltered answers to 'Where do locals eat?', 'What should I avoid?', and best secret vantage points."
            >
              <div className="mt-4 pt-4 border-t border-pink-200/60 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#780116]">Instant Answers</span>
                <Link
                  href="/ask-local"
                  className="px-5 py-2.5 rounded-full bg-[#780116] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md no-underline"
                >
                  <MessageCircle size={14} /> Ask Now <ArrowRight size={14} />
                </Link>
              </div>
            </BentoCard>

            <BentoCard
              variant="champagne"
              title="Intelligent Escape"
              description="Tell us how you want to feel (Peace, Adventure, Freedom) and let our algorithm match your exact Travel DNA."
            >
              <div className="mt-4 pt-4 border-t border-amber-200/60 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#7E5105]">Intuition Engine</span>
                <Link
                  href="/escape"
                  className="px-5 py-2.5 rounded-full bg-[#F7B538] text-[#150408] text-xs font-black flex items-center gap-1.5 shadow-md no-underline"
                >
                  <Sparkles size={14} /> Find Escape <ArrowRight size={14} />
                </Link>
              </div>
            </BentoCard>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#10B981]" /> Verified local knowledge</div>
            <div className="flex items-center gap-1.5"><Users size={14} className="text-[#780116]" /> Real traveler experiences</div>
            <div className="flex items-center gap-1.5"><Sparkles size={14} className="text-[#D49018]" /> Zero hallucinated facts</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
