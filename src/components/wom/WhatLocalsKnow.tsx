"use client";

import { useState } from "react";
import { ShieldCheck, AlertTriangle, Lightbulb, Clock, Star, MapPin, Utensils, CloudRain, DollarSign, Users, Footprints, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from "lucide-react";
import { WomInsight, getInsightTypeLabel, getFreshnessEmoji } from "@/lib/wordOfMouth";

const TYPE_CONFIG: Record<string, { icon: any; color: string; bg: string; border: string }> = {
  BEST_TIME: { icon: Clock, color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  AVOID_TIME: { icon: AlertTriangle, color: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200" },
  COST_REALITY: { icon: DollarSign, color: "text-[#780116]", bg: "bg-[#FDE8EC]", border: "border-pink-200" },
  CROWD: { icon: Users, color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
  LOCAL_FOOD: { icon: Utensils, color: "text-amber-800", bg: "bg-[#FAF0DF]", border: "border-amber-200" },
  TOURIST_MISTAKE: { icon: AlertTriangle, color: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200" },
  HIDDEN_GEM: { icon: Star, color: "text-[#780116]", bg: "bg-[#FAF0DF]", border: "border-amber-200" },
  BETTER_ALTERNATIVE: { icon: MapPin, color: "text-indigo-700", bg: "bg-[#F0EEFA]", border: "border-indigo-200" },
  SAFETY_NOTE: { icon: ShieldCheck, color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
  WEATHER_CONTEXT: { icon: CloudRain, color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
  VALUE_FOR_MONEY: { icon: DollarSign, color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  LOCAL_EXPERIENCE: { icon: Lightbulb, color: "text-purple-700", bg: "bg-[#F0EEFA]", border: "border-purple-200" },
  LOCAL_CUSTOM: { icon: Lightbulb, color: "text-indigo-700", bg: "bg-[#F0EEFA]", border: "border-indigo-200" },
  TRANSPORT_TIP: { icon: Footprints, color: "text-teal-700", bg: "bg-teal-50", border: "border-teal-200" },
};

function InsightCard({ insight, onConfirm }: { insight: WomInsight; onConfirm?: (id: string, confirmed: boolean) => void }) {
  const [showEvidence, setShowEvidence] = useState(false);
  const cfg = TYPE_CONFIG[insight.type] || TYPE_CONFIG.BEST_TIME;
  const Icon = cfg.icon;

  return (
    <div className={`p-5 rounded-[1.75rem] border ${cfg.border} ${cfg.bg} space-y-3 shadow-sm hover:shadow-md transition-all`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl bg-white shadow-xs ${cfg.color}`}><Icon size={16} /></div>
          <span className={`text-[10px] font-black uppercase tracking-widest ${cfg.color}`}>
            {getInsightTypeLabel(insight.type)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold">
          <span>{getFreshnessEmoji(insight.freshness)}</span>
          <span>{insight.lastVerified}</span>
        </div>
      </div>

      <h4 className="text-sm font-extrabold text-[#150408] leading-snug">{insight.title}</h4>
      <p className="text-xs text-slate-700 leading-relaxed font-normal">{insight.content}</p>

      <div className="flex items-center justify-between pt-2 border-t border-black/5">
        <button
          onClick={() => setShowEvidence(!showEvidence)}
          className="text-[10px] text-[#780116] font-bold flex items-center gap-1 hover:underline transition-colors"
        >
          Why we verify this {showEvidence ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
        {onConfirm && (
          <div className="flex items-center gap-2">
            <button onClick={() => onConfirm(insight.id, true)} className="p-1.5 rounded-lg bg-white hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 transition-all" title="Confirm this insight">
              <ThumbsUp size={12} />
            </button>
            <button onClick={() => onConfirm(insight.id, false)} className="p-1.5 rounded-lg bg-white hover:bg-rose-100 text-slate-600 hover:text-rose-700 transition-all" title="This doesn't match my experience">
              <ThumbsDown size={12} />
            </button>
            <span className="text-[10px] text-slate-500 font-semibold">{insight.confirmations} confirmed</span>
          </div>
        )}
      </div>

      {showEvidence && (
        <div className="p-3 rounded-xl bg-white border border-black/5 text-[11px] text-slate-600 space-y-1.5 animate-in fade-in duration-200">
          <div className="font-bold text-[#150408] flex items-center gap-1">
            <ShieldCheck size={13} className="text-emerald-600" /> Evidence Basis:
          </div>
          <p>{insight.content}</p>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1">
            <span>Confidence: <strong className="text-slate-700">{insight.confidenceScore}%</strong></span>
            <span>•</span>
            <span>Source: <strong className="text-slate-700">{insight.sourceName || insight.source}</strong></span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WhatLocalsKnow({ destination, insights }: { destination: string; insights: WomInsight[] }) {
  const [filter, setFilter] = useState<string>("ALL");

  const filterTypes = [
    { id: "ALL", label: "All Insights" },
    { id: "TIMING", label: "Timing & Crowds", types: ["BEST_TIME", "AVOID_TIME", "CROWD", "WEATHER_CONTEXT"] },
    { id: "SECRETS", label: "Gems & Food", types: ["HIDDEN_GEM", "LOCAL_FOOD", "LOCAL_EXPERIENCE", "LOCAL_CUSTOM"] },
    { id: "WARNINGS", label: "Avoid & Save", types: ["TOURIST_MISTAKE", "COST_REALITY", "SAFETY_NOTE", "BETTER_ALTERNATIVE", "TRANSPORT_TIP"] },
  ];

  const filtered = insights.filter((i) => {
    if (filter === "ALL") return true;
    const current = filterTypes.find((f) => f.id === filter);
    return current?.types?.includes(i.type);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#780116]">Community Truth</span>
          <h3 className="text-xl md:text-2xl font-extrabold text-[#150408]">What Locals Know About {destination}</h3>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
          {filterTypes.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                filter === f.id
                  ? "bg-[#780116] text-[#F7B538] shadow-sm"
                  : "bg-white border border-[#780116]/10 text-slate-700 hover:bg-[#FAF0DF]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  );
}
