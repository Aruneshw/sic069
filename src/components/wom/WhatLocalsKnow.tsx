"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, AlertTriangle, Lightbulb, Clock, Star, MapPin, Utensils, CloudRain, DollarSign, Users, Footprints, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from "lucide-react";
import { WomInsight, getInsightTypeLabel, getFreshnessEmoji, getConfidenceLabel } from "@/lib/wordOfMouth";

const TYPE_CONFIG: Record<string, { icon: any; color: string; bg: string; border: string }> = {
  BEST_TIME: { icon: Clock, color: "text-emerald-300", bg: "bg-emerald-500/15", border: "border-emerald-500/30" },
  AVOID_TIME: { icon: AlertTriangle, color: "text-rose-300", bg: "bg-rose-500/15", border: "border-rose-500/30" },
  COST_REALITY: { icon: DollarSign, color: "text-amber-300", bg: "bg-amber-500/15", border: "border-amber-500/30" },
  CROWD: { icon: Users, color: "text-sky-300", bg: "bg-sky-500/15", border: "border-sky-500/30" },
  LOCAL_FOOD: { icon: Utensils, color: "text-orange-300", bg: "bg-orange-500/15", border: "border-orange-500/30" },
  TOURIST_MISTAKE: { icon: AlertTriangle, color: "text-rose-300", bg: "bg-rose-500/15", border: "border-rose-500/30" },
  HIDDEN_GEM: { icon: Star, color: "text-amber-300", bg: "bg-amber-500/15", border: "border-amber-500/30" },
  BETTER_ALTERNATIVE: { icon: MapPin, color: "text-teal-300", bg: "bg-teal-500/15", border: "border-teal-500/30" },
  SAFETY_NOTE: { icon: ShieldCheck, color: "text-red-300", bg: "bg-red-500/15", border: "border-red-500/30" },
  WEATHER_CONTEXT: { icon: CloudRain, color: "text-blue-300", bg: "bg-blue-500/15", border: "border-blue-500/30" },
  VALUE_FOR_MONEY: { icon: DollarSign, color: "text-emerald-300", bg: "bg-emerald-500/15", border: "border-emerald-500/30" },
  LOCAL_EXPERIENCE: { icon: Lightbulb, color: "text-purple-300", bg: "bg-purple-500/15", border: "border-purple-500/30" },
  LOCAL_CUSTOM: { icon: Lightbulb, color: "text-indigo-300", bg: "bg-indigo-500/15", border: "border-indigo-500/30" },
  TRANSPORT_TIP: { icon: Footprints, color: "text-cyan-300", bg: "bg-cyan-500/15", border: "border-cyan-500/30" },
};

function InsightCard({ insight, onConfirm }: { insight: WomInsight; onConfirm?: (id: string, confirmed: boolean) => void }) {
  const [showEvidence, setShowEvidence] = useState(false);
  const cfg = TYPE_CONFIG[insight.type] || TYPE_CONFIG.BEST_TIME;
  const Icon = cfg.icon;

  return (
    <div className={`p-5 rounded-2xl border ${cfg.border} ${cfg.bg} backdrop-blur-sm space-y-3`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl bg-navy-950/50 ${cfg.color}`}><Icon size={16} /></div>
          <span className={`text-[10px] font-extrabold uppercase tracking-widest ${cfg.color}`}>
            {getInsightTypeLabel(insight.type)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
          <span>{getFreshnessEmoji(insight.freshness)}</span>
          <span>{insight.lastVerified}</span>
        </div>
      </div>

      <h4 className="text-sm font-bold text-white leading-snug">{insight.title}</h4>
      <p className="text-xs text-slate-300 leading-relaxed">{insight.content}</p>

      <div className="flex items-center justify-between pt-2 border-t border-white/10">
        <button onClick={() => setShowEvidence(!showEvidence)} className="text-[10px] text-teal-400 font-bold flex items-center gap-1 hover:text-teal-300 transition-colors">
          Why we say this {showEvidence ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
        {onConfirm && (
          <div className="flex items-center gap-2">
            <button onClick={() => onConfirm(insight.id, true)} className="p-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 transition-all" title="Confirm this insight">
              <ThumbsUp size={12} />
            </button>
            <button onClick={() => onConfirm(insight.id, false)} className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-all" title="This doesn't match my experience">
              <ThumbsDown size={12} />
            </button>
            <span className="text-[10px] text-slate-500">{insight.confirmations} confirmed</span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showEvidence && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="p-3 bg-navy-950/50 rounded-xl text-[11px] text-slate-400 space-y-1.5 mt-1">
              <div className="font-bold text-teal-400 uppercase tracking-widest text-[10px]">Why We Say This</div>
              <div>✓ {getConfidenceLabel(insight.confidence)}</div>
              <div>✓ Source: {insight.sourceName}</div>
              <div>✓ Confidence: {insight.confidenceScore}%</div>
              {insight.confirmations > 0 && <div>✓ {insight.confirmations} traveler{insight.confirmations > 1 ? "s" : ""} confirmed</div>}
              {insight.contradictions > 0 && <div className="text-amber-400">⚠ {insight.contradictions} report{insight.contradictions > 1 ? "s" : ""} disagree</div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function WhatLocalsKnow({ destination, insights }: { destination: string; insights: WomInsight[] }) {
  const [expanded, setExpanded] = useState(false);
  const visibleInsights = expanded ? insights : insights.slice(0, 4);

  const handleConfirm = async (insightId: string, confirmed: boolean) => {
    try {
      await fetch("/api/word-of-mouth/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ insightId, confirmed }),
      });
    } catch {}
  };

  if (!insights.length) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Lightbulb size={20} className="text-amber-400" /> What Locals Know
          </h3>
          <p className="text-xs text-slate-400 mt-1">{insights.length} verified insights for {destination}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleInsights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} onConfirm={handleConfirm} />
        ))}
      </div>

      {insights.length > 4 && (
        <button onClick={() => setExpanded(!expanded)} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-teal-400 hover:bg-white/10 transition-colors">
          {expanded ? "Show Less" : `Show All ${insights.length} Insights`}
        </button>
      )}
    </section>
  );
}
