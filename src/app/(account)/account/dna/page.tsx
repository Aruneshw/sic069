"use client";

import { useAppStore } from "@/store/useAppStore";
import { Sparkles, RefreshCw, Sliders, ShieldCheck } from "lucide-react";
import TravelDnaOnboardingModal from "@/components/ui/TravelDnaOnboardingModal";

export default function TravelDnaPage() {
  const { travelDna, resetTravelDna, openOnboarding } = useAppStore();

  const dimensions = [
    { key: "adventure", label: "Adventure Intensity", value: travelDna.adventure },
    { key: "nature", label: "Nature Orientation", value: travelDna.nature },
    { key: "peace", label: "Peace & Quiet Craving", value: travelDna.peace },
    { key: "photography", label: "Photography Framing", value: travelDna.photography },
    { key: "solitude", label: "Solitude vs Group", value: travelDna.solitude },
    { key: "exploration", label: "Off-Grid Exploration", value: travelDna.exploration },
    { key: "culture", label: "Cultural Heritage", value: travelDna.culture },
    { key: "budgetSensitivity", label: "Budget Strictness", value: travelDna.budgetSensitivity },
    { key: "crowdTolerance", label: "Crowd Tolerance", value: travelDna.crowdTolerance },
    { key: "physicalIntensity", label: "Physical Intensity", value: travelDna.physicalIntensity },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">My Travel DNA</h1>
          <p className="text-sm text-slate-500">Your personalized travel intelligence score matrix.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetTravelDna}
            className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw size={14} /> Reset DNA
          </button>
          <button
            onClick={openOnboarding}
            className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl text-xs font-bold shadow-md hover:from-teal-600 hover:to-emerald-600 flex items-center gap-1.5 transition-colors"
          >
            <Sliders size={14} /> Recalibrate
          </button>
        </div>
      </div>

      {/* Banner */}
      <div className="p-6 bg-gradient-to-r from-navy-900 via-navy-800 to-teal-900 text-white rounded-2xl shadow-xl flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-300 uppercase tracking-widest">
            <Sparkles size={16} /> Autonomous Preference Engine
          </div>
          <h3 className="text-lg font-extrabold">Active DNA Profile: Micro-Escape Explorer</h3>
          <p className="text-xs text-slate-300">Updated automatically from trips viewed, saved, and compatibility reviews.</p>
        </div>
        <div className="text-right font-mono text-2xl font-extrabold text-teal-400 border-l border-white/10 pl-6 hidden sm:block">
          16 DIMS
        </div>
      </div>

      {/* DNA Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dimensions.map((dim) => (
          <div key={dim.key} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-navy-900">{dim.label}</span>
              <span className="font-mono text-teal-600">{dim.value}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${dim.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Privacy Guarantee */}
      <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-3 text-xs text-slate-600">
        <ShieldCheck size={20} className="text-teal-600 shrink-0" />
        <span>Your Travel DNA is stored securely and used solely to match you with compatible, low-crowd escapes.</span>
      </div>

      <TravelDnaOnboardingModal />
    </div>
  );
}
