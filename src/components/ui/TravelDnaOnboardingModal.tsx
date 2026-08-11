"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Compass, Shield, Heart, Zap, Check } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const ESCAPE_VIBES = [
  { id: "nature", label: "Get lost in nature", icon: Compass, dna: { nature: 95, solitude: 75, adventure: 75 } },
  { id: "adventure", label: "Chase high adventure", icon: Zap, dna: { adventure: 95, physicalIntensity: 85, nature: 80 } },
  { id: "peace", label: "Find complete silence", icon: Shield, dna: { peace: 95, crowdTolerance: 20, solitude: 85 } },
  { id: "culture", label: "Discover local culture", icon: Heart, dna: { culture: 95, exploration: 85, food: 80 } },
  { id: "spontaneous", label: "Surprise me", icon: Sparkles, dna: { spontaneity: 95, adventure: 80, exploration: 90 } },
];

const TRAVEL_STATES = [
  { id: "Escape", title: "I need to escape", desc: "Disconnect from screen fatigue and reset" },
  { id: "Peace", title: "I need peace", desc: "Quiet landscapes, slow rhythm, minimal crowds" },
  { id: "Adventure", title: "I want adventure", desc: "High elevation, active treks, adrenaline" },
  { id: "Freedom", title: "I want freedom", desc: "Unplanned discovery, wide horizons" },
];

export default function TravelDnaOnboardingModal() {
  const { isOnboardingOpen, closeOnboarding, setTravelDna, setTravelState, travelState } = useAppStore();
  const [step, setStep] = useState(1);
  const [selectedVibe, setSelectedVibe] = useState("nature");
  const [selectedState, setSelectedState] = useState(travelState.state || "Escape");

  if (!isOnboardingOpen) return null;

  const handleFinish = () => {
    const vibeObj = ESCAPE_VIBES.find((v) => v.id === selectedVibe);
    if (vibeObj) {
      setTravelDna(vibeObj.dna);
    }
    setTravelState({ state: selectedState });
    closeOnboarding();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-xl bg-navy-900 border border-teal-500/30 rounded-3xl p-8 shadow-2xl text-white overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={closeOnboarding}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-slate-300"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-widest mb-2">
            <Sparkles size={16} /> Intelligent Personalization • Step {step} of 2
          </div>

          {step === 1 ? (
            <div>
              <h2 className="text-3xl font-extrabold mb-3">What kind of escape sounds right?</h2>
              <p className="text-slate-400 text-sm mb-6">Select your primary travel intuition to build your Travel DNA.</p>

              <div className="space-y-3 mb-8">
                {ESCAPE_VIBES.map((vibe) => {
                  const Icon = vibe.icon;
                  const isSelected = selectedVibe === vibe.id;
                  return (
                    <button
                      key={vibe.id}
                      onClick={() => setSelectedVibe(vibe.id)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? "bg-gradient-to-r from-teal-500/20 to-navy-800 border-teal-400 text-white shadow-lg"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${isSelected ? "bg-teal-500 text-navy-950" : "bg-white/10 text-teal-300"}`}>
                          <Icon size={20} />
                        </div>
                        <span className="font-bold">{vibe.label}</span>
                      </div>
                      {isSelected && <Check size={20} className="text-teal-400" />}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-4 bg-gradient-to-r from-teal-400 to-teal-500 text-navy-950 font-black rounded-2xl uppercase tracking-widest shadow-glow-cta hover:from-teal-300 hover:to-teal-400 transition-all"
              >
                Continue
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-extrabold mb-3">What do you need right now?</h2>
              <p className="text-slate-400 text-sm mb-6">Set your temporary Travel State for this specific getaway.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {TRAVEL_STATES.map((st) => {
                  const isSelected = selectedState === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setSelectedState(st.id)}
                      className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? "bg-gradient-to-br from-teal-500/20 to-navy-800 border-teal-400 text-white shadow-lg"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      <span className="font-bold text-lg mb-1">{st.title}</span>
                      <span className="text-xs text-slate-400 leading-relaxed">{st.desc}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 font-bold text-slate-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleFinish}
                  className="flex-1 py-4 bg-gradient-to-r from-teal-400 to-teal-500 text-navy-950 font-black rounded-2xl uppercase tracking-widest shadow-glow-cta hover:from-teal-300 hover:to-teal-400 transition-all"
                >
                  Calibrate Travel DNA
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
