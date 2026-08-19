"use client";

import { useState, useEffect } from "react";
import { MessageCircle, MapPin, ShieldCheck, Sparkles, Users } from "lucide-react";
import AskALocal from "@/components/wom/AskALocal";
import WhatLocalsKnow from "@/components/wom/WhatLocalsKnow";
import { WomScoreCard, RealityCheckCard, LocalPulseCard } from "@/components/wom/WomCards";
import { getWomInsightsForDestination, getWomScore, getRealityCheck, getLocalPulse } from "@/lib/wordOfMouth";

const DESTINATIONS = ["Kodaikanal", "Wayanad", "Ooty", "Varkala", "Munnar"];

export default function AskLocalPage() {
  const [selectedDest, setSelectedDest] = useState("Kodaikanal");
  const [womData, setWomData] = useState<{
    insights: any;
    score: any;
    realityCheck: any;
    localPulse: any;
  } | null>(null);

  useEffect(() => {
    async function fetchWom() {
      setWomData(null);
      const insights = await getWomInsightsForDestination(selectedDest);
      const score = await getWomScore(selectedDest);
      const realityCheck = await getRealityCheck(selectedDest);
      const localPulse = await getLocalPulse(selectedDest);
      setWomData({ insights, score, realityCheck, localPulse });
    }
    fetchWom();
  }, [selectedDest]);

  return (
    <div className="min-h-screen bg-transparent text-white pb-24">
      {/* Hero */}
      <div className="pt-36 pb-16 md:pt-44 md:pb-20 text-center relative overflow-hidden px-4">
        <div className="container-main relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(12,22,38,0.85)] border border-[rgba(255,255,255,0.08)] text-xs font-black text-[#C8A55C] uppercase tracking-widest mb-4">
            <MessageCircle size={14} /> Verified Local Intelligence
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">
            What would you ask someone who{" "}
            <span className="font-script text-4xl md:text-6xl text-[#C8A55C] block sm:inline">
              actually lives here?
            </span>
          </h1>
          <p className="text-slate-200 text-base md:text-lg max-w-xl mx-auto font-medium">
            Get verified local insights. No generic advice. No hallucinated facts.
          </p>
        </div>
      </div>

      {/* Destination Selector */}
      <div className="container-main max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap gap-2.5 justify-center mb-10">
          {DESTINATIONS.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDest(d)}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider border transition-all duration-300 ${
                d === selectedDest
                  ? "bg-[#C8A55C] text-[#05070B] border-[#780116] shadow-md scale-105"
                  : "bg-white border-[#780116]/15 text-[#94A3B8] hover:bg-[rgba(12,22,38,0.85)]"
              }`}
            >
              <MapPin size={13} className="inline mr-1 text-[#05070B]" />
              {d}
            </button>
          ))}
        </div>

        {/* Ask A Local Chat */}
        <div className="mb-10">
          <AskALocal destination={selectedDest} />
        </div>

        {/* WoM Score + Reality Check Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {womData ? (
            <>
              <WomScoreCard score={womData.score} />
              <RealityCheckCard check={womData.realityCheck} />
            </>
          ) : (
            <>
              <div className="animate-pulse h-48 bg-slate-200 rounded-3xl w-full"></div>
              <div className="animate-pulse h-48 bg-slate-200 rounded-3xl w-full"></div>
            </>
          )}
        </div>

        {/* Local Pulse */}
        <div className="mb-10">
          {womData ? (
            <LocalPulseCard pulse={womData.localPulse} />
          ) : (
            <div className="animate-pulse h-40 bg-slate-200 rounded-3xl w-full"></div>
          )}
        </div>

        {/* What Locals Know */}
        <div className="mb-16">
          {womData ? (
            <WhatLocalsKnow destination={selectedDest} insights={womData.insights} />
          ) : (
            <div className="animate-pulse h-96 bg-slate-200 rounded-3xl w-full"></div>
          )}
        </div>

        {/* Trust Footer */}
        <div className="text-center pb-16 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-semibold">
            <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-600" /> Verified knowledge only</div>
            <div className="flex items-center gap-1.5"><Users size={14} className="text-[#C8A55C]" /> Community-confirmed insights</div>
            <div className="flex items-center gap-1.5"><Sparkles size={14} className="text-[#C8A55C]" /> Zero AI hallucinated facts</div>
          </div>
          <p className="text-[11px] text-slate-300 max-w-xl mx-auto">
            All insights are sourced from certified regional guides, verified local operators, and traveler reports. Freshness indicators show when information was last verified.
          </p>
        </div>
      </div>
    </div>
  );
}
