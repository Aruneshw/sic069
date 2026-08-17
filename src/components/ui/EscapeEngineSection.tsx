"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, HelpCircle, Eye, ChevronRight, ShieldCheck, Zap, Compass, MapPin } from "lucide-react";
import CompatibilityBadge from "./CompatibilityBadge";
import RejectionLearningModal from "./RejectionLearningModal";
import LocalGuideModal from "./LocalGuideModal";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import { formatInr } from "@/lib/trips";

const FEELINGS = [
  { id: "Escape", label: "I NEED TO ESCAPE", icon: Compass, color: "from-[#F7B538] to-[#D49018]" },
  { id: "Peace", label: "I NEED PEACE", icon: ShieldCheck, color: "from-[#FAF3E7] to-[#F5E8D3]" },
  { id: "Adventure", label: "I WANT ADVENTURE", icon: Zap, color: "from-[#780116] to-[#4A000E]" },
  { id: "Spontaneous", label: "SURPRISE ME", icon: Sparkles, color: "from-[#F7B538] to-[#780116]" },
];

export default function EscapeEngineSection({ initialPackages = [] }: { initialPackages?: any[] }) {
  const { travelState, setTravelState, openOnboarding } = useAppStore();
  const [selectedFeeling, setSelectedFeeling] = useState(travelState.state || "Escape");
  const [isSurpriseMode, setIsSurpriseMode] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [rejectionItem, setRejectionItem] = useState<any>(null);
  const [guideTripName, setGuideTripName] = useState<string | null>(null);

  const handleFeelingSelect = (id: string) => {
    setSelectedFeeling(id);
    setTravelState({ state: id });
    if (id === "Spontaneous") {
      setIsSurpriseMode(true);
      setIsRevealed(false);
    } else {
      setIsSurpriseMode(false);
    }
  };

  const topMatches = initialPackages.slice(0, 6);
  const surprisePackage = initialPackages[0] || { name: "Hidden Valley Trek", bundlePrice: 6499, tierBadge: "HIGH-ALTITUDE", duration: "3 Days" };

  return (
    <section className="py-24 relative overflow-hidden bg-[#0B0204] text-white">
      {/* Glow ambient background matching design DNA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#780116]/25 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-[#F7B538]/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="container-main relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#F7B538]/30 text-[#F7B538] text-xs font-black uppercase tracking-widest mb-4 backdrop-blur-md">
            <Sparkles size={14} className="text-[#F7B538]" /> Intelligent Escape Engine
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
            You don&apos;t have to know where to go.<br />
            <span className="font-script text-4xl md:text-5xl text-[#F7B538]">
              Just tell us how you want to feel.
            </span>
          </h2>
          <p className="text-slate-300 text-sm md:text-base font-light max-w-xl mx-auto">
            Zero Gravity matches your travel intuition with curated micro-expeditions using your Travel DNA.
          </p>
        </div>

        {/* Feeling Pills selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {FEELINGS.map((f) => {
            const Icon = f.icon;
            const isSelected = selectedFeeling === f.id;
            return (
              <button
                key={f.id}
                onClick={() => handleFeelingSelect(f.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full font-black text-xs uppercase tracking-wider transition-all border ${
                  isSelected
                    ? `bg-gradient-to-r ${f.color} ${f.id === 'Adventure' ? 'text-white' : 'text-[#150408]'} border-[#F7B538] shadow-lg shadow-[#F7B538]/20 scale-105`
                    : "bg-[#150408] border-white/10 text-slate-300 hover:bg-[#1F070C] hover:border-[#F7B538]/30"
                }`}
              >
                <Icon size={16} />
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* Surprise Mode ("Don't Tell Me Where") */}
        {isSurpriseMode ? (
          <div className="max-w-xl mx-auto p-8 rounded-[2.5rem] bg-[#150408] border border-[#F7B538]/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="text-xs font-extrabold text-[#F7B538] uppercase tracking-widest flex items-center justify-center gap-2">
              <HelpCircle size={16} /> Mystery Escape Mode Activated
            </div>

            {!isRevealed ? (
              <div className="py-8 space-y-4">
                <div className="text-3xl md:text-4xl font-black text-white tracking-wider">
                  CLASSIFIED EXPEDITION
                </div>
                <div className="flex justify-center gap-6 text-xs text-slate-300">
                  <span>Terrain: <strong className="text-[#F7B538]">{surprisePackage.tierBadge || "Mountain"}</strong></span>
                  <span>Duration: <strong className="text-white">{surprisePackage.duration || "3 Days"}</strong></span>
                  <span>Est: <strong className="text-[#F7B538]">{formatInr(surprisePackage.bundlePrice || 6499)}</strong></span>
                </div>
                <button
                  onClick={() => setIsRevealed(true)}
                  className="mt-6 px-8 py-3.5 bg-gradient-to-r from-[#F7B538] to-[#D49018] text-[#150408] font-black rounded-full text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto"
                >
                  <Eye size={18} /> Reveal My Escape
                </button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-4 space-y-4">
                <span className="px-3.5 py-1 bg-[#F7B538]/20 text-[#F7B538] rounded-full text-xs font-black uppercase tracking-wider border border-[#F7B538]/40">
                  94% COMPATIBILITY MATCH
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">{surprisePackage.name}</h3>
                <p className="text-slate-300 text-xs">{surprisePackage.tagline || surprisePackage.description}</p>
                <div className="pt-4 flex justify-center gap-4">
                  <Link
                    href="/packages"
                    className="px-6 py-2.5 bg-gradient-to-r from-[#F7B538] to-[#D49018] text-[#150408] font-black rounded-full text-xs uppercase tracking-wider shadow-lg no-underline"
                  >
                    View Expedition
                  </Link>
                  <button
                    onClick={() => setIsRevealed(false)}
                    className="px-6 py-2.5 bg-white/10 text-slate-300 font-bold rounded-full text-xs uppercase hover:bg-white/20"
                  >
                    Hide
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          /* Normal Escape Bento Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topMatches.map((pkg: any) => (
              <div
                key={pkg.id}
                className="bento-card bento-card-dark rounded-[2rem] overflow-hidden border border-[#F7B538]/20 hover:border-[#F7B538]/60 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                {/* Image & Badge Overlay */}
                <div className="relative h-48 overflow-hidden bg-[#150408]">
                  <img
                    src={pkg.imageUrl || "/images/packages/hidden-valley-trek.jpeg"}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0204]/90 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <CompatibilityBadge item={pkg} onRejectClick={() => setRejectionItem(pkg)} />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#0B0204]/90 backdrop-blur-md px-3.5 py-1 rounded-xl text-xs font-black text-[#F7B538] border border-[#F7B538]/30">
                    {formatInr(pkg.bundlePrice)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-black text-[#F7B538] uppercase tracking-widest mb-1">{pkg.tierBadge}</div>
                    <h3 className="text-lg font-extrabold text-white mb-2 group-hover:text-[#F7B538] transition-colors">{pkg.name}</h3>
                    <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed font-light">{pkg.description}</p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => setGuideTripName(pkg.name)}
                      className="text-xs font-bold text-[#F7B538] hover:text-[#F9C862] flex items-center gap-1.5"
                    >
                      <Compass size={14} /> Local Secrets
                    </button>
                    <Link
                      href="/packages"
                      className="text-xs font-black uppercase tracking-wider text-[#150408] bg-[#F7B538] hover:bg-[#F9C862] px-4 py-1.5 rounded-full transition-all flex items-center gap-1 no-underline"
                    >
                      Explore <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer CTAs */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={openOnboarding}
            className="px-6 py-3 bg-white/10 border border-[#F7B538]/30 text-white font-bold rounded-full text-xs uppercase tracking-wider hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <Sparkles size={16} className="text-[#F7B538]" /> Recalibrate Travel DNA
          </button>
        </div>
      </div>

      {/* Rejection Learning Modal */}
      {rejectionItem && (
        <RejectionLearningModal
          isOpen={!!rejectionItem}
          onClose={() => setRejectionItem(null)}
          itemId={rejectionItem.id}
          itemTitle={rejectionItem.name}
        />
      )}

      {/* Local Guide Modal */}
      {guideTripName && (
        <LocalGuideModal
          isOpen={!!guideTripName}
          onClose={() => setGuideTripName(null)}
          tripName={guideTripName}
        />
      )}
    </section>
  );
}
