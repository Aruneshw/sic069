"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

interface TellNextTravelerProps {
  isOpen: boolean;
  onClose: () => void;
  destinationName: string;
  tripId?: string;
}

export default function TellNextTraveler({ isOpen, onClose, destinationName, tripId }: TellNextTravelerProps) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    worthIt: null as boolean | null,
    bestPart: "",
    surprise: "",
    nextTraveler: "",
    bestTime: "",
    crowdLevel: "",
    realCost: "",
    avoid: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      await fetch("/api/traveler-experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destinationName,
          tripId,
          worthIt: form.worthIt,
          bestPart: form.bestPart,
          bestTime: form.bestTime,
          crowdLevel: form.crowdLevel,
          costReality: form.realCost,
          whatToAvoid: form.avoid,
          unexpectedProblem: form.surprise,
          localTip: form.nextTraveler,
          recommendation: form.worthIt ? "Recommended" : "Consider alternatives",
        }),
      });
      setSubmitted(true);
      toast.success("Thank you! Your experience helps the next traveler.");
    } catch {
      toast.error("Couldn't save right now. Try again later.");
    }
  };

  const questions = [
    {
      key: "worthIt",
      q: "Was it actually worth it?",
      render: () => (
        <div className="flex gap-4 justify-center">
          <button onClick={() => { setForm({ ...form, worthIt: true }); setStep(1); }} className="px-8 py-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-lg hover:bg-emerald-500/30 transition-all">YES</button>
          <button onClick={() => { setForm({ ...form, worthIt: false }); setStep(1); }} className="px-8 py-4 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold text-lg hover:bg-rose-500/30 transition-all">NO</button>
        </div>
      ),
    },
    { key: "bestPart", q: "Best part?", placeholder: "The sunrise view was unreal..." },
    { key: "surprise", q: "What surprised you?", placeholder: "I didn't expect the road to be..." },
    { key: "bestTime", q: "Best time to visit?", placeholder: "Early morning before 8 AM..." },
    { key: "crowdLevel", q: "How crowded was it?", render: () => (
      <div className="flex flex-wrap gap-2 justify-center">{["Empty", "Low", "Medium", "High", "Extreme"].map((l) => (
        <button key={l} onClick={() => { setForm({ ...form, crowdLevel: l.toUpperCase() }); setStep(step + 1); }} className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-all ${form.crowdLevel === l.toUpperCase() ? "bg-teal-500/20 border-teal-500/40 text-teal-300" : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"}`}>{l}</button>
      ))}</div>
    )},
    { key: "realCost", q: "Actual cost beyond your package?", placeholder: "Around ₹800 for entry + food..." },
    { key: "avoid", q: "What should visitors avoid?", placeholder: "The noon crowd, parking on weekends..." },
    { key: "nextTraveler", q: "What do you wish someone had told you?", placeholder: "Carry cash, the ATM is 5km away..." },
  ];

  const currentQ = questions[step];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg bg-navy-900 border border-teal-500/30 rounded-3xl p-8 shadow-2xl text-white">
          <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-slate-400 hover:text-white"><X size={18} /></button>

          {submitted ? (
            <div className="text-center space-y-4 py-8">
              <CheckCircle2 size={48} className="text-emerald-400 mx-auto" />
              <h3 className="text-2xl font-bold">Experience Shared!</h3>
              <p className="text-slate-400 text-sm">Your knowledge will help the next traveler make better decisions.</p>
              <button onClick={onClose} className="mt-4 px-6 py-3 bg-teal-500 text-navy-950 font-bold rounded-xl">Done</button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-widest mb-2">
                <MessageCircle size={14} /> Tell the Next Traveler
              </div>
              <p className="text-[11px] text-slate-300 mb-1">About <span className="text-teal-300 font-bold">{destinationName}</span></p>

              {/* Progress */}
              <div className="flex gap-1 my-4">{questions.map((_, i) => <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= step ? "bg-teal-400" : "bg-white/10"}`} />)}</div>

              <h3 className="text-xl font-bold mb-6">{currentQ.q}</h3>

              {"render" in currentQ && currentQ.render ? currentQ.render() : (
                <div className="space-y-4">
                  <textarea
                    value={(form as any)[currentQ.key] || ""}
                    onChange={(e) => setForm({ ...form, [currentQ.key]: e.target.value })}
                    placeholder={"placeholder" in currentQ ? currentQ.placeholder : ""}
                    rows={3}
                    className="w-full p-4 bg-white/5 border border-white/15 rounded-2xl text-sm text-white placeholder:text-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
                  />
                  <div className="flex justify-between">
                    {step > 0 && <button onClick={() => setStep(step - 1)} className="text-sm text-slate-400 hover:text-white">Back</button>}
                    <button
                      onClick={() => step < questions.length - 1 ? setStep(step + 1) : handleSubmit()}
                      className="ml-auto px-6 py-3 bg-gradient-to-r from-teal-400 to-teal-500 text-navy-950 font-bold rounded-xl text-sm flex items-center gap-2"
                    >
                      {step < questions.length - 1 ? "Next" : "Share Experience"} <Send size={14} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
