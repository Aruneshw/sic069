"use client";

import { useState } from "react";
import { MessageCircle, Award, CheckCircle2, ShieldCheck, Heart, Sparkles } from "lucide-react";

export default function MyTravelKnowledgePage() {
  const [stats] = useState({
    tripsShared: 4,
    helpfulInsights: 17,
    travelerConfirmations: 12,
    reputationScore: 88,
  });

  const [contributions] = useState([
    {
      id: "c-1",
      destination: "Kodaikanal",
      type: "LOCAL_TIP",
      title: "Go to Pine Forest before 8 AM",
      confirmations: 8,
      status: "Verified",
      date: "3 days ago",
    },
    {
      id: "c-2",
      destination: "Wayanad",
      type: "AVOID",
      title: "Midday steep climb heat at Edakkal Caves",
      confirmations: 5,
      status: "Verified",
      date: "1 week ago",
    },
    {
      id: "c-3",
      destination: "Ooty",
      type: "COST_REALITY",
      title: "Keep ₹500 cash for entry fees",
      confirmations: 4,
      status: "Verified",
      date: "2 weeks ago",
    },
  ]);

  return (
    <div className="space-y-8 text-white">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <MessageCircle className="text-teal-400" size={24} /> My Travel Knowledge
        </h1>
        <p className="text-xs text-slate-400 mt-1">Your contributions help future travelers make better, more informed decisions.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-navy-900 border border-white/10 space-y-1">
          <div className="text-2xl font-black text-teal-300">{stats.tripsShared}</div>
          <div className="text-xs text-slate-400">Trips Shared</div>
        </div>
        <div className="p-4 rounded-2xl bg-navy-900 border border-white/10 space-y-1">
          <div className="text-2xl font-black text-emerald-300">{stats.helpfulInsights}</div>
          <div className="text-xs text-slate-400">Helpful Insights</div>
        </div>
        <div className="p-4 rounded-2xl bg-navy-900 border border-white/10 space-y-1">
          <div className="text-2xl font-black text-amber-300">{stats.travelerConfirmations}</div>
          <div className="text-xs text-slate-400">Confirmations</div>
        </div>
        <div className="p-4 rounded-2xl bg-navy-900 border border-white/10 space-y-1">
          <div className="text-2xl font-black text-purple-300">{stats.reputationScore}%</div>
          <div className="text-xs text-slate-400">Knowledge Accuracy</div>
        </div>
      </div>

      {/* Contributor Badge */}
      <div className="p-6 rounded-2xl border border-teal-500/30 bg-teal-500/10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-teal-500/20 text-teal-300"><Award size={24} /></div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-teal-300">Status</div>
            <div className="text-base font-bold text-white">Verified Local Contributor</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-navy-950/50 px-3 py-1.5 rounded-full border border-emerald-500/30">
          <ShieldCheck size={14} /> Trust Level: HIGH
        </div>
      </div>

      {/* Contribution History */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Contribution History</h3>
        <div className="space-y-3">
          {contributions.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-navy-900 border border-white/10 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[10px] font-bold uppercase">{c.destination}</span>
                  <span className="text-[10px] text-slate-300">{c.date}</span>
                </div>
                <div className="text-sm font-bold text-white">{c.title}</div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
                <Heart size={14} className="text-rose-400" /> {c.confirmations} confirmed
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
