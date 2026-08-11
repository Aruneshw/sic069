"use client";

import { useState } from "react";
import { MessageCircle, MapPin, ShieldCheck, Sparkles, Users } from "lucide-react";
import AskALocal from "@/components/wom/AskALocal";
import WhatLocalsKnow from "@/components/wom/WhatLocalsKnow";
import { WomScoreCard, RealityCheckCard, LocalPulseCard } from "@/components/wom/WomCards";
import { getWomInsightsForDestination, getWomScore, getRealityCheck, getLocalPulse } from "@/lib/wordOfMouth";

const DESTINATIONS = ["Kodaikanal", "Wayanad", "Ooty", "Varkala", "Munnar"];

export default function AskLocalPage() {
  const [selectedDest, setSelectedDest] = useState("Kodaikanal");
  const insights = getWomInsightsForDestination(selectedDest);
  const score = getWomScore(selectedDest);
  const reality = getRealityCheck(selectedDest);
  const pulse = getLocalPulse(selectedDest);

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white">
      {/* Hero */}
      <div className="py-16 md:py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(20,184,166,0.08),transparent_60%)]" />
        <div className="container-main relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/15 border border-teal-500/25 text-xs font-bold text-teal-300 uppercase tracking-widest mb-4">
            <MessageCircle size={14} /> Ask a Local
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
            What would you ask someone who{" "}
            <span className="bg-gradient-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent">actually lives here?</span>
          </h1>
          <p className="text-slate-400 text-lg">Get verified local insights. No generic advice. No hallucinated facts.</p>
        </div>
      </div>

      {/* Destination Selector */}
      <div className="container-main max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {DESTINATIONS.map((d) => (
            <button key={d} onClick={() => setSelectedDest(d)} className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-all ${d === selectedDest ? "bg-teal-500/20 border-teal-500/40 text-teal-300" : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"}`}>
              <MapPin size={14} className="inline mr-1.5" />{d}
            </button>
          ))}
        </div>

        {/* Ask A Local Chat */}
        <div className="mb-10">
          <AskALocal destination={selectedDest} />
        </div>

        {/* WoM Score + Reality Check Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <WomScoreCard score={score} />
          <RealityCheckCard check={reality} />
        </div>

        {/* Local Pulse */}
        <div className="mb-10">
          <LocalPulseCard pulse={pulse} />
        </div>

        {/* What Locals Know */}
        <div className="mb-16">
          <WhatLocalsKnow destination={selectedDest} insights={insights} />
        </div>

        {/* Trust Footer */}
        <div className="text-center pb-16 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-400" /> Verified knowledge only</div>
            <div className="flex items-center gap-1.5"><Users size={14} className="text-teal-400" /> Community-confirmed insights</div>
            <div className="flex items-center gap-1.5"><Sparkles size={14} className="text-amber-400" /> AI never fabricates facts</div>
          </div>
          <p className="text-[11px] text-slate-600">All insights are sourced from verified contributors, tour operators, and traveler reports. Freshness indicators show when information was last confirmed.</p>
        </div>
      </div>
    </div>
  );
}
