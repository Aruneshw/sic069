"use client";

import { Star, Check, X, Sparkles, TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import { WomScore, RealityCheck, WorthItResult } from "@/lib/wordOfMouth";

export function WomScoreCard({ score }: { score: WomScore }) {
  const levelColor = (l: string) => l === "HIGH" ? "text-emerald-400" : l === "MEDIUM" ? "text-amber-400" : "text-rose-400";
  return (
    <div className="p-6 rounded-2xl border border-teal-500/30 bg-teal-500/10 backdrop-blur-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-extrabold text-teal-300 uppercase tracking-widest">
          <TrendingUp size={16} /> Word-of-Mouth Score
        </div>
        <div className="text-3xl font-black text-teal-300 font-mono">{score.overall}<span className="text-sm text-teal-400/60"> / 100</span></div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="flex justify-between p-2.5 bg-navy-950/40 rounded-xl"><span className="text-slate-400">Locals recommend</span><span className={`font-bold ${levelColor(score.localRecommend)}`}>{score.localRecommend}</span></div>
        <div className="flex justify-between p-2.5 bg-navy-950/40 rounded-xl"><span className="text-slate-400">Repeat travelers</span><span className={`font-bold ${levelColor(score.repeatTravelers)}`}>{score.repeatTravelers}</span></div>
        <div className="flex justify-between p-2.5 bg-navy-950/40 rounded-xl"><span className="text-slate-400">Tourist hype</span><span className={`font-bold ${levelColor(score.touristHype)}`}>{score.touristHype}</span></div>
        <div className="flex justify-between p-2.5 bg-navy-950/40 rounded-xl"><span className="text-slate-400">Value for money</span><span className={`font-bold ${levelColor(score.valueForMoney)}`}>{score.valueForMoney}</span></div>
      </div>
      <div className="text-[10px] text-slate-500 text-center">Score based on verified local knowledge and traveler experiences</div>
    </div>
  );
}

export function RealityCheckCard({ check }: { check: RealityCheck }) {
  return (
    <div className="p-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm space-y-4">
      <div className="flex items-center gap-2 text-xs font-extrabold text-amber-300 uppercase tracking-widest">
        <Activity size={16} /> Travel Reality Check
      </div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-sm text-slate-400">Online impression:</span>
        <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className={i < Math.round(check.onlineImpression) ? "fill-amber-400 text-amber-400" : "text-slate-600"} />)}</div>
      </div>
      <div className="text-xs font-bold text-slate-300 mb-3">What the experience is actually like:</div>
      <div className="grid grid-cols-2 gap-2.5 text-xs">
        <div className="p-2.5 bg-navy-950/40 rounded-xl flex justify-between"><span className="text-slate-400">Walking</span><span className="font-bold text-white">{check.walkingLevel}</span></div>
        <div className="p-2.5 bg-navy-950/40 rounded-xl flex justify-between"><span className="text-slate-400">Crowds</span><span className="font-bold text-white">{check.crowdLevel}</span></div>
        <div className="p-2.5 bg-navy-950/40 rounded-xl flex justify-between"><span className="text-slate-400">Time needed</span><span className="font-bold text-white">{check.timeRequired}</span></div>
        <div className="p-2.5 bg-navy-950/40 rounded-xl flex justify-between"><span className="text-slate-400">Hidden cost</span><span className="font-bold text-white">{check.hiddenCost}</span></div>
      </div>
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div><div className="text-[10px] text-emerald-400 font-bold mb-1">Best for</div>{check.bestFor.map((b) => <div key={b} className="text-[11px] text-slate-300 flex items-center gap-1"><Check size={10} className="text-emerald-400" />{b}</div>)}</div>
        <div><div className="text-[10px] text-rose-400 font-bold mb-1">Not ideal for</div>{check.notIdealFor.map((b) => <div key={b} className="text-[11px] text-slate-300 flex items-center gap-1"><X size={10} className="text-rose-400" />{b}</div>)}</div>
      </div>
    </div>
  );
}

export function WorthItCard({ result, destination }: { result: WorthItResult; destination: string }) {
  return (
    <div className={`p-6 rounded-2xl border backdrop-blur-sm space-y-4 ${result.forYou ? "border-emerald-500/30 bg-emerald-500/10" : "border-slate-500/30 bg-slate-500/10"}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest" style={{ color: result.forYou ? "#6ee7b7" : "#94a3b8" }}>
          <Sparkles size={16} /> Is It Worth It?
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-lg font-black ${result.forYou ? "text-emerald-400" : "text-slate-400"}`}>{result.forYou ? "YES" : "MAYBE"}</span>
          <span className="text-xs font-mono font-bold text-teal-400">— {result.matchPercent}%</span>
        </div>
      </div>
      <div className="text-xs font-bold text-slate-300">For you, based on your Travel DNA:</div>
      <div className="space-y-1.5">
        {result.reasons.map((r) => <div key={r} className="text-xs text-slate-200 flex items-start gap-2"><Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />{r}</div>)}
      </div>
      {result.skipIf.length > 0 && (
        <div className="pt-3 border-t border-white/10">
          <div className="text-[10px] text-rose-400 font-bold uppercase tracking-widest mb-1.5">Skip it if:</div>
          {result.skipIf.map((s) => <div key={s} className="text-xs text-slate-400 flex items-start gap-2"><X size={14} className="text-rose-400 shrink-0 mt-0.5" />{s}</div>)}
        </div>
      )}
    </div>
  );
}

export function LocalPulseCard({ pulse }: { pulse: { weather: string; crowd: string; alerts: string[]; localActivity: string; updatedLabel: string; freshnessLevel: string } }) {
  const emoji = pulse.freshnessLevel === "FRESH" ? "🟢" : pulse.freshnessLevel === "AGING" ? "🟡" : "🔴";
  return (
    <div className="p-5 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm space-y-3">
      <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-300 uppercase tracking-widest">
        <Users size={16} /> Local Pulse
      </div>
      <div className="space-y-2 text-xs text-slate-300">
        <div className="flex items-center gap-2">🌤 Weather: <span className="text-white font-medium">{pulse.weather}</span></div>
        <div className="flex items-center gap-2">👥 Crowd: <span className="text-white font-medium">{pulse.crowd}</span></div>
        {pulse.alerts.map((a) => <div key={a} className="flex items-center gap-2 text-amber-400">🚧 {a}</div>)}
        <div className="flex items-center gap-2">🍴 Local: <span className="text-white font-medium">{pulse.localActivity}</span></div>
      </div>
      <div className="text-[10px] text-slate-500 flex items-center gap-1">{emoji} {pulse.updatedLabel}</div>
    </div>
  );
}
