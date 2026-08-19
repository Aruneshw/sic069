"use client";

import { motion } from "framer-motion";
import { MessageCircle, Sparkles, Users, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BentoCard } from "@/components/ui/BentoGrid";

export default function WomHeroSection() {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden bg-transparent border-t border-[rgba(255,255,255,0.06)] px-4 md:px-8">
      <div className="container-main max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(12,22,38,0.85)] border border-[rgba(255,255,255,0.08)] text-xs font-black text-[#C8A55C] uppercase tracking-widest mb-4">
            <Users size={14} /> Word-of-Mouth Intelligence
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-2">
            Ask Someone Who&apos;s{" "}
            <span className="font-script text-4xl md:text-6xl text-[#C8A55C]">
              Actually Been There.
            </span>
          </h2>

          <p className="text-base md:text-lg text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Travel advice is everywhere. <strong className="text-white font-bold">Good travel advice isn&apos;t.</strong>{" "}
            Get verified local knowledge, honest reality checks, and what experienced travelers actually recommend.
          </p>

          {/* Givingli Bento Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-left max-w-3xl mx-auto">
            <BentoCard
              variant="blush"
              title="Ask a Verified Local"
              description="Get unfiltered answers to 'Where do locals eat?', 'What should I avoid?', and best secret vantage points."
            >
              <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]/60 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#C8A55C]">Instant Answers</span>
                <Link
                  href="/ask-local"
                  className="px-5 py-2.5 rounded-full bg-[#C8A55C] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md no-underline"
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
              <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]/60 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#C8A55C]">Intuition Engine</span>
                <Link
                  href="/escape"
                  className="px-5 py-2.5 rounded-full bg-[#F7B538] text-white text-xs font-black flex items-center gap-1.5 shadow-md no-underline"
                >
                  <Sparkles size={14} /> Find Escape <ArrowRight size={14} />
                </Link>
              </div>
            </BentoCard>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#10B981]" /> Verified local knowledge</div>
            <div className="flex items-center gap-1.5"><Users size={14} className="text-[#C8A55C]" /> Real traveler experiences</div>
            <div className="flex items-center gap-1.5"><Sparkles size={14} className="text-[#C8A55C]" /> Zero hallucinated facts</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
