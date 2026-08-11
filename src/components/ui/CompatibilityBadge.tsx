"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Info, Check, ThumbsDown } from "lucide-react";
import { calculateCompatibility } from "@/lib/travelDna";
import { useAppStore } from "@/store/useAppStore";

interface CompatibilityBadgeProps {
  item: any;
  onRejectClick?: () => void;
  size?: "sm" | "md" | "lg";
}

export default function CompatibilityBadge({ item, onRejectClick, size = "md" }: CompatibilityBadgeProps) {
  const { travelDna, travelState, openOnboarding } = useAppStore();
  const [showExplanation, setShowExplanation] = useState(false);

  const comp = calculateCompatibility(item, travelDna, travelState);

  return (
    <div className="relative inline-block">
      {/* Badge Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowExplanation(!showExplanation);
        }}
        className={`group flex items-center gap-1.5 font-extrabold rounded-full transition-all border shadow-lg ${
          size === "sm"
            ? "px-2.5 py-0.5 text-[11px]"
            : size === "lg"
            ? "px-4 py-2 text-sm"
            : "px-3 py-1 text-xs"
        } ${
          comp.score >= 85
            ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-navy-950 border-teal-300 shadow-teal-500/20"
            : "bg-navy-900/90 text-teal-300 border-teal-500/40 hover:bg-navy-800"
        }`}
        title="Click to view Travel DNA compatibility details"
      >
        <Sparkles size={size === "sm" ? 12 : 14} className="animate-pulse" />
        <span>{comp.percentageText}</span>
        <Info size={size === "sm" ? 10 : 12} className="opacity-70 group-hover:opacity-100 transition-opacity" />
      </button>

      {/* Explanation Popup */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute left-0 top-full mt-2 z-50 w-72 bg-navy-950 border border-teal-500/40 rounded-2xl p-4 shadow-2xl text-white text-xs"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
              <div className="flex items-center gap-1.5 font-bold text-teal-300">
                <Sparkles size={14} /> WHY THIS MATCHES YOU
              </div>
              <span className="font-mono text-teal-400 font-extrabold">{comp.score}%</span>
            </div>

            <p className="text-slate-300 mb-3 leading-relaxed">{comp.explanation}</p>

            <ul className="space-y-1.5 mb-4">
              {comp.matchedTraits.map((trait, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-slate-200">
                  <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{trait}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px]">
              <button
                onClick={() => {
                  setShowExplanation(false);
                  openOnboarding();
                }}
                className="text-teal-400 font-bold hover:underline"
              >
                Edit Travel DNA
              </button>
              {onRejectClick && (
                <button
                  onClick={() => {
                    setShowExplanation(false);
                    onRejectClick();
                  }}
                  className="text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                >
                  <ThumbsDown size={12} /> Reject Match
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
