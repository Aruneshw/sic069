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
import { BentoCard } from "./BentoGrid";

const FEELINGS = [
  { id: "Escape", label: "I NEED TO ESCAPE", icon: Compass, color: "bg-[rgba(12,22,38,0.85)] text-[#C8A55C] border-pink-300" },
  { id: "Peace", label: "I NEED PEACE", icon: ShieldCheck, color: "bg-[rgba(12,22,38,0.85)] text-[#C8A55C] border-amber-300" },
  { id: "Adventure", label: "I WANT ADVENTURE", icon: Zap, color: "bg-[rgba(12,22,38,0.85)] text-[#34D399] border-emerald-300" },
  { id: "Spontaneous", label: "SURPRISE ME", icon: Sparkles, color: "bg-[rgba(12,22,38,0.85)] text-[#7DD3FC] border-indigo-300" },
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
    <section className="py-20 md:py-24 relative overflow-hidden bg-transparent border-t border-[rgba(255,255,255,0.06)] px-4 md:px-8 text-white">
      <div className="container-main max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(12,22,38,0.85)] border border-[rgba(200,165,92,0.20)] text-xs font-black uppercase tracking-widest text-[#C8A55C] mb-3">
            <Sparkles size={14} className="text-[#C8A55C]" /> Intelligent Escape Engine
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2">
            You don&apos;t have to know where to go.<br />
            <span className="font-script text-4xl md:text-6xl text-[#C8A55C]">
              Just tell us how you want to feel.
            </span>
          </h2>
          <p className="text-slate-200 text-sm md:text-base font-medium max-w-xl mx-auto">
            Zero Gravity matches your travel intuition with curated micro-expeditions using your Travel DNA.
          </p>
        </div>

        {/* Feeling Pills Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FEELINGS.map((f) => {
            const Icon = f.icon;
            const isSelected = selectedFeeling === f.id;
            return (
              <button
                key={f.id}
                onClick={() => handleFeelingSelect(f.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-black text-xs uppercase tracking-wider transition-all border ${
                  isSelected
                    ? "bg-[#C8A55C] text-[#05070B] border-[#780116] shadow-md scale-105"
                    : "bg-white border-black/10 text-[#94A3B8] hover:bg-[rgba(12,22,38,0.85)]"
                }`}
              >
                <Icon size={16} />
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* Surprise Mystery Mode */}
        {isSurpriseMode ? (
          <div className="max-w-xl mx-auto p-8 rounded-[2.5rem] bg-[rgba(12,22,38,0.85)] border border-pink-300 text-center space-y-5 shadow-lg relative overflow-hidden">
            <div className="text-xs font-black text-[#C8A55C] uppercase tracking-widest flex items-center justify-center gap-1.5">
              <HelpCircle size={16} /> Mystery Escape Mode Activated
            </div>

            {!isRevealed ? (
              <div className="py-6 space-y-4">
                <div className="text-3xl md:text-4xl font-black text-[#C8A55C] tracking-wider">
                  CLASSIFIED EXPEDITION
                </div>
                <div className="flex justify-center gap-4 text-xs font-bold text-[#94A3B8]">
                  <span>Terrain: <strong className="text-[#C8A55C]">{surprisePackage.tierBadge || "Mountain"}</strong></span>
                  <span>Duration: <strong className="text-[#C8A55C]">{surprisePackage.duration || "3 Days"}</strong></span>
                  <span>Est: <strong className="text-[#C8A55C]">{formatInr(surprisePackage.bundlePrice || 6499)}</strong></span>
                </div>
                <button
                  onClick={() => setIsRevealed(true)}
                  className="mt-4 px-8 py-3.5 bg-[#C8A55C] text-[#05070B] font-black rounded-full text-xs uppercase tracking-widest shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto"
                >
                  <Eye size={16} /> Reveal My Escape
                </button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-4 space-y-3">
                <span className="px-3.5 py-1 bg-white text-[#34D399] rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
                  94% COMPATIBILITY MATCH
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">{surprisePackage.name}</h3>
                <p className="text-slate-200 text-xs">{surprisePackage.tagline || surprisePackage.description}</p>
                <div className="pt-3 flex justify-center gap-3">
                  <Link
                    href="/packages"
                    className="px-6 py-2.5 bg-[#C8A55C] text-[#05070B] font-black rounded-full text-xs uppercase tracking-wider shadow-md no-underline"
                  >
                    View Expedition
                  </Link>
                  <button
                    onClick={() => setIsRevealed(false)}
                    className="px-6 py-2.5 bg-white text-[#94A3B8] font-bold rounded-full text-xs uppercase hover:bg-slate-100"
                  >
                    Hide
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          /* Normal Givingli Escape Bento Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topMatches.map((pkg: any, idx: number) => {
              const variants = ["blush", "sage", "champagne", "lavender", "sky", "white"] as const;
              const v = variants[idx % variants.length];

              return (
                <div
                  key={pkg.id}
                  className={`bento-card-base bento-${v} rounded-[2rem] p-0 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}
                >
                  {/* Image Header */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={pkg.imageUrl || "/images/packages/hidden-valley-trek.jpeg"}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <CompatibilityBadge item={pkg} onRejectClick={() => setRejectionItem(pkg)} />
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-black text-white shadow-sm">
                      {formatInr(pkg.bundlePrice)}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-black text-[#C8A55C] uppercase tracking-widest mb-1">{pkg.tierBadge}</div>
                      <h3 className="text-lg font-extrabold text-white mb-1.5">{pkg.name}</h3>
                      <p className="text-xs text-slate-200 line-clamp-2 mb-4 leading-relaxed font-medium">{pkg.description}</p>
                    </div>

                    <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                      <button
                        onClick={() => setGuideTripName(pkg.name)}
                        className="text-xs font-bold text-[#C8A55C] hover:underline flex items-center gap-1"
                      >
                        <Compass size={13} /> Local Secrets
                      </button>
                      <Link
                        href="/packages"
                        className="text-xs font-black uppercase tracking-wider text-white bg-[#C8A55C] hover:bg-[#A8883A] px-4 py-1.5 rounded-full transition-all flex items-center gap-1 no-underline shadow-xs"
                      >
                        Explore <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer DNA Recalibrate CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={openOnboarding}
            className="px-6 py-3 bg-white border border-[#780116]/15 text-[#C8A55C] font-black rounded-full text-xs uppercase tracking-wider hover:bg-[rgba(12,22,38,0.85)] transition-all shadow-sm flex items-center gap-2 mx-auto"
          >
            <Sparkles size={14} className="text-[#C8A55C]" /> Recalibrate Travel DNA
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
