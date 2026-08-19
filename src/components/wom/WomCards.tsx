"use client";

import { Star, Check, X, Sparkles, TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import { WomScore, RealityCheck, WorthItResult, LocalPulse } from "@/lib/wordOfMouth";

export function WomScoreCard({ score }: { score: WomScore }) {
  const levelColor = (l: string) =>
    l === "HIGH"
      ? "text-[#34D399] font-extrabold"
      : l === "MEDIUM"
      ? "text-amber-800 font-bold"
      : "text-rose-700 font-bold";

  return (
    <div className="p-6 rounded-[2rem] border border-[#780116]/15 bg-[rgba(12,22,38,0.85)] space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-black text-[#C8A55C] uppercase tracking-widest">
          <TrendingUp size={16} /> Word-of-Mouth Score
        </div>
        <div className="text-3xl font-black text-[#C8A55C] font-mono">
          {score.overall}
          <span className="text-sm text-slate-300"> / 100</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5 text-xs">
        <div className="flex justify-between p-2.5 bg-[rgba(12,22,38,0.85)] backdrop-blur-md rounded-xl border border-pink-100">
          <span className="text-slate-200 font-medium">Locals recommend</span>
          <span className={levelColor(score.localRecommend)}>{score.localRecommend}</span>
        </div>
        <div className="flex justify-between p-2.5 bg-[rgba(12,22,38,0.85)] backdrop-blur-md rounded-xl border border-pink-100">
          <span className="text-slate-200 font-medium">Repeat travelers</span>
          <span className={levelColor(score.repeatTravelers)}>{score.repeatTravelers}</span>
        </div>
        <div className="flex justify-between p-2.5 bg-[rgba(12,22,38,0.85)] backdrop-blur-md rounded-xl border border-pink-100">
          <span className="text-slate-200 font-medium">Tourist hype</span>
          <span className={levelColor(score.touristHype)}>{score.touristHype}</span>
        </div>
        <div className="flex justify-between p-2.5 bg-[rgba(12,22,38,0.85)] backdrop-blur-md rounded-xl border border-pink-100">
          <span className="text-slate-200 font-medium">Value for money</span>
          <span className={levelColor(score.valueForMoney)}>{score.valueForMoney}</span>
        </div>
      </div>
      <div className="text-[10px] text-slate-300 text-center font-medium">
        Score based on verified local knowledge and traveler experiences
      </div>
    </div>
  );
}

export function RealityCheckCard({ check }: { check: RealityCheck }) {
  return (
    <div className="p-6 rounded-[2rem] border border-[#F7B538]/30 bg-[rgba(12,22,38,0.85)] space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-black text-[#C8A55C] uppercase tracking-widest">
          <Activity size={16} /> Travel Reality Check
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-slate-200 font-bold mr-1">Online Hype:</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                className={i < Math.round(check.onlineImpression) ? "fill-[#D49018] text-[#C8A55C]" : "text-slate-300"}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="text-xs font-extrabold text-white">What the trail is actually like:</div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 bg-[rgba(12,22,38,0.85)] backdrop-blur-md rounded-xl border border-amber-100 flex justify-between">
          <span className="text-slate-200">Walking</span>
          <span className="font-bold text-white">{check.walkingLevel}</span>
        </div>
        <div className="p-2.5 bg-[rgba(12,22,38,0.85)] backdrop-blur-md rounded-xl border border-amber-100 flex justify-between">
          <span className="text-slate-200">Crowds</span>
          <span className="font-bold text-white">{check.crowdLevel}</span>
        </div>
        <div className="p-2.5 bg-[rgba(12,22,38,0.85)] backdrop-blur-md rounded-xl border border-amber-100 flex justify-between">
          <span className="text-slate-200">Time needed</span>
          <span className="font-bold text-white">{check.timeRequired}</span>
        </div>
        <div className="p-2.5 bg-[rgba(12,22,38,0.85)] backdrop-blur-md rounded-xl border border-amber-100 flex justify-between">
          <span className="text-slate-200">Hidden cost</span>
          <span className="font-bold text-white">{check.hiddenCost}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[rgba(255,255,255,0.06)]/50">
        <div>
          <div className="text-[10px] text-[#34D399] font-extrabold uppercase tracking-wider mb-1">Best for</div>
          {check.bestFor.map((b) => (
            <div key={b} className="text-[11px] text-[#94A3B8] flex items-center gap-1">
              <Check size={10} className="text-emerald-600 shrink-0" />
              <span>{b}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="text-[10px] text-rose-800 font-extrabold uppercase tracking-wider mb-1">Not ideal for</div>
          {check.notIdealFor.map((b) => (
            <div key={b} className="text-[11px] text-[#94A3B8] flex items-center gap-1">
              <X size={10} className="text-rose-600 shrink-0" />
              <span>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LocalPulseCard({ pulse }: { pulse: LocalPulse }) {
  return (
    <div className="p-6 rounded-[2rem] border border-blue-200 bg-[rgba(12,22,38,0.85)] space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-xs font-black text-blue-900 uppercase tracking-widest">
          ⚡ Live Local Pulse
        </div>
        <div className="text-xs font-bold text-blue-700 bg-white px-3 py-1 rounded-full shadow-xs">
          {pulse.updatedLabel}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 bg-[rgba(12,22,38,0.85)] backdrop-blur-md rounded-xl border border-blue-100 space-y-1">
          <div className="text-[10px] text-slate-300 font-bold uppercase">Trail Weather</div>
          <div className="font-extrabold text-white">{pulse.weather}</div>
        </div>
        <div className="p-3 bg-[rgba(12,22,38,0.85)] backdrop-blur-md rounded-xl border border-blue-100 space-y-1">
          <div className="text-[10px] text-slate-300 font-bold uppercase">Crowd Level</div>
          <div className="font-extrabold text-white">{pulse.crowd}</div>
        </div>
        <div className="p-3 bg-[rgba(12,22,38,0.85)] backdrop-blur-md rounded-xl border border-blue-100 space-y-1">
          <div className="text-[10px] text-slate-300 font-bold uppercase">Local Activity</div>
          <div className="font-extrabold text-white">{pulse.localActivity}</div>
        </div>
      </div>
    </div>
  );
}

export function WorthItCard({ result, destination }: { result: WorthItResult; destination: string }) {
  return (
    <div
      className={`p-6 rounded-[2rem] border space-y-4 shadow-sm ${
        result.forYou
          ? "border-[rgba(255,255,255,0.06)] bg-[rgba(12,22,38,0.85)]"
          : "border-slate-200 bg-[rgba(12,22,38,0.85)]"
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest ${
            result.forYou ? "text-[#34D399]" : "text-[#C8A55C]"
          }`}
        >
          <Sparkles size={16} /> Is It Worth It?
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-lg font-black ${
              result.forYou ? "text-[#34D399]" : "text-[#C8A55C]"
            }`}
          >
            {result.forYou ? "YES" : "MAYBE"}
          </span>
          <span className="text-xs font-bold text-slate-200 bg-white px-2 py-0.5 rounded-full">
            {result.matchPercent}% match
          </span>
        </div>
      </div>

      <div className="space-y-1">
        {result.reasons.map((r, i) => (
          <div key={i} className="text-xs text-[#94A3B8] flex items-start gap-1.5 font-medium">
            <Check size={13} className="text-emerald-600 shrink-0 mt-0.5" />
            <span>{r}</span>
          </div>
        ))}
      </div>

      {result.skipIf && result.skipIf.length > 0 && (
        <div className="pt-2 border-t border-black/5">
          <div className="text-[10px] font-bold text-rose-800 uppercase mb-1">Skip if:</div>
          {result.skipIf.map((s, i) => (
            <div key={i} className="text-xs text-slate-200 flex items-start gap-1.5">
              <X size={12} className="text-rose-600 shrink-0 mt-0.5" />
              <span>{s}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
