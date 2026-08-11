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
  { id: "Escape", label: "I NEED TO ESCAPE", icon: Compass, color: "from-teal-400 to-emerald-500" },
  { id: "Peace", label: "I NEED PEACE", icon: ShieldCheck, color: "from-sky-400 to-indigo-500" },
  { id: "Adventure", label: "I WANT ADVENTURE", icon: Zap, color: "from-amber-400 to-orange-500" },
  { id: "Spontaneous", label: "SURPRISE ME", icon: Sparkles, color: "from-fuchsia-400 to-pink-500" },
];

export default function EscapeEngineSection({ initialPackages = [] }: { initialPackages?: any[] }) {
  const { travelState, setTravelState, openOnboarding } = useAppStore();
  const [selectedFeeling, setSelectedFeeling] = useState(travelState.state || "Escape");
  const [isSurpriseMode, setIsSurpriseMode] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [rejectionItem, setRejectionItem] = useState<any>(null);
  const [guideTripName, setGuideTripName] = useState<string | null>(null);

  const activeFeelingObj = FEELINGS.find((f) => f.id === selectedFeeling) || FEELINGS[0];

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
    <section className="py-20 relative overflow-hidden bg-navy-950 text-white">
      {/* Glow ambient background matching design DNA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="container-main relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} className="text-teal-400" /> Intelligent Escape Engine
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            You don't have to know where to go.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-400 to-teal-200">
              Just tell us how you want to feel.
            </span>
          </h2>
          <p className="text-slate-400 text-lg font-light">
            Zero Gravity matches your travel intuition with curated micro-expeditions using your Travel DNA.
          </p>
        </div>

        {/* Feeling Pills selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FEELINGS.map((f) => {
            const Icon = f.icon;
            const isSelected = selectedFeeling === f.id;
            return (
              <button
                key={f.id}
                onClick={() => handleFeelingSelect(f.id)}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all border ${
                  isSelected
                    ? `bg-gradient-to-r ${f.color} text-navy-950 border-white/40 shadow-glow-cta scale-105`
                    : "bg-navy-900/90 border-white/10 text-slate-300 hover:bg-navy-800"
                }`}
              >
                <Icon size={18} />
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* Surprise Mode ("Don't Tell Me Where") */}
        {isSurpriseMode ? (
          <div className="max-w-xl mx-auto glass-panel p-8 rounded-3xl border border-fuchsia-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="text-xs font-bold text-fuchsia-400 uppercase tracking-widest flex items-center justify-center gap-2">
              <HelpCircle size={16} /> Mystery Escape Mode Activated
            </div>

            {!isRevealed ? (
              <div className="py-8 space-y-4">
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-300 tracking-wider">
                  CLASSIFIED DESTINATION
                </div>
                <div className="flex justify-center gap-6 text-sm text-slate-300">
                  <span>Terrain: <strong className="text-white">{surprisePackage.tierBadge || "Mountain"}</strong></span>
                  <span>Duration: <strong className="text-white">{surprisePackage.duration || "3 Days"}</strong></span>
                  <span>Est: <strong className="text-emerald-400">{formatInr(surprisePackage.bundlePrice || 6499)}</strong></span>
                </div>
                <button
                  onClick={() => setIsRevealed(true)}
                  className="mt-6 px-8 py-4 bg-gradient-to-r from-fuchsia-400 to-pink-500 text-navy-950 font-black rounded-2xl text-base uppercase tracking-widest shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto"
                >
                  <Eye size={20} /> Reveal My Escape
                </button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-4 space-y-4">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-500/40">
                  94% YOU MATCH FOUND
                </span>
                <h3 className="text-3xl font-extrabold text-white">{surprisePackage.name}</h3>
                <p className="text-slate-300 text-sm">{surprisePackage.tagline || surprisePackage.description}</p>
                <div className="pt-4 flex justify-center gap-4">
                  <Link
                    href={`/packages`}
                    className="px-6 py-3 bg-gradient-to-r from-teal-400 to-teal-500 text-navy-950 font-bold rounded-xl text-sm shadow-glow-cta"
                  >
                    View Escape Details
                  </Link>
                  <button
                    onClick={() => setIsRevealed(false)}
                    className="px-6 py-3 bg-white/10 text-slate-300 font-bold rounded-xl text-sm hover:bg-white/20"
                  >
                    Hide
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          /* Normal Escape Grid with "YOU %" Compatibility Badges */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topMatches.map((pkg: any) => (
              <div
                key={pkg.id}
                className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-teal-400/40 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col"
              >
                {/* Image & Badge Overlay */}
                <div className="relative h-48 overflow-hidden bg-navy-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pkg.imageUrl || "/images/packages/hidden-valley-trek.jpeg"}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <CompatibilityBadge item={pkg} onRejectClick={() => setRejectionItem(pkg)} />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-navy-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-extrabold text-emerald-400 border border-emerald-500/30">
                    {formatInr(pkg.bundlePrice)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-1">{pkg.tierBadge}</div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">{pkg.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">{pkg.description}</p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => setGuideTripName(pkg.name)}
                      className="text-xs font-bold text-teal-300 hover:text-teal-200 flex items-center gap-1"
                    >
                      <Compass size={14} /> Local Secrets
                    </button>
                    <Link
                      href="/packages"
                      className="text-xs font-bold text-white bg-white/10 hover:bg-teal-500 hover:text-navy-950 px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1"
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
            className="px-6 py-3.5 bg-white/10 border border-white/20 text-white font-bold rounded-2xl text-sm hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <Sparkles size={16} className="text-teal-400" /> Recalibrate Travel DNA
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
