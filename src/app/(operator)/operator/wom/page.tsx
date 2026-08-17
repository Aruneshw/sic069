"use client";

import { useState } from "react";
import { MessageCircle, AlertTriangle, TrendingUp, ShieldCheck, Users, RefreshCw, CheckCircle2, Clock } from "lucide-react";
import StatCard from "@/components/ui/StatCard";

export default function OperatorWomDashboard() {
  const [insights] = useState([
    { id: "1", dest: "Kodaikanal", issue: "Pine forest plastic bottles confiscated", reports: 24, type: "MISTAKE", status: "Active Advisory" },
    { id: "2", dest: "Wayanad", issue: "Edakkal Caves steep climb midday heat", reports: 18, type: "MISTAKE", status: "Active Advisory" },
    { id: "3", dest: "Ooty", issue: "Weekend Botanical Garden overcrowding", reports: 30, type: "CROWD", status: "Active Advisory" },
    { id: "4", dest: "Munnar", issue: "Mountain road fog after 4 PM", reports: 35, type: "WEATHER", status: "Critical Alert" },
  ]);

  const [contradictions] = useState([
    { id: "ct-1", dest: "Kodaikanal", statement: "Guna caves crowd level", reportA: "Heavy crowds at 2 PM", reportB: "Empty at 4:15 PM", factor: "Time of day (mist window)" },
    { id: "ct-2", dest: "Varkala", statement: "Black sand beach safety", reportA: "Great for swimming", reportB: "Strong undercurrents south cliff", factor: "Zone location (north vs south)" },
  ]);

  return (
    <div className="space-y-8 p-6 md:p-8 bg-[#FBF9F5] text-[#150408] min-h-screen">
      <div>
        <h1 className="text-3xl font-extrabold flex items-center gap-3">
          <MessageCircle className="text-[#D49018]" size={32} /> Word-of-Mouth Intelligence Dashboard
        </h1>
        <p className="text-slate-500 text-sm mt-1">Real-time operational intelligence aggregated from traveler feedback and local contributor reports.</p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Traveler Reports" value="142" icon={<Users size={20} />} trend={{ value: 18, isPositive: true }} />
        <StatCard title="Active Travel Alerts" value="4" icon={<AlertTriangle size={20} />} trend={{ value: 2, isPositive: false }} />
        <StatCard title="Verified Insights" value="89" icon={<ShieldCheck size={20} />} trend={{ value: 94, isPositive: true }} />
        <StatCard title="Insight Freshness" value="92%" icon={<RefreshCw size={20} />} trend={{ value: 92, isPositive: true }} />
      </div>

      {/* Frequently Reported Issues */}
      <div className="bento-card-base bento-white p-6 space-y-4">
        <h3 className="text-xl font-bold text-[#150408] flex items-center gap-2">
          <AlertTriangle size={20} className="text-amber-400" /> Frequently Reported Friction & Tourist Mistakes
        </h3>
        <div className="space-y-3">
          {insights.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-[#FAF0DF]/50 border-2 border-[#780116]/8 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#F7B538]/20 text-[#F7B538] text-[10px] font-bold uppercase">{item.dest}</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase">{item.type}</span>
                </div>
                <div className="text-sm font-bold text-[#150408]">{item.issue}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-bold text-[#D49018]">{item.reports} reports</div>
                <div className="text-[10px] text-slate-500">{item.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contradiction Detection */}
      <div className="bento-card-base bento-white p-6 space-y-4">
        <h3 className="text-xl font-bold text-[#150408] flex items-center gap-2">
          <TrendingUp size={20} className="text-indigo-400" /> Contradiction Detection Engine
        </h3>
        <p className="text-xs text-slate-500">When traveler reports conflict, our AI identifies the contextual root factor (e.g. time of day, season, zone).</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contradictions.map((c) => (
            <div key={c.id} className="p-5 rounded-2xl bg-[#FAF0DF]/50 border-2 border-[#780116]/8 space-y-3">
              <div className="text-xs font-bold text-[#F7B538] uppercase">{c.dest} — {c.statement}</div>
              <div className="space-y-1 text-xs">
                <div className="text-rose-300">Report A: "{c.reportA}"</div>
                <div className="text-emerald-300">Report B: "{c.reportB}"</div>
              </div>
              <div className="pt-2 border-t border-white/10 text-[11px] text-amber-400 font-bold">
                Resolution Factor: {c.factor}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
