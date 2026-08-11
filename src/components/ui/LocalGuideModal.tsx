"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, AlertTriangle, Lightbulb, Compass, Send, Bot } from "lucide-react";
import { LocalInsight } from "@/lib/travelDna";

interface LocalGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripName: string;
}

export default function LocalGuideModal({ isOpen, onClose, tripName }: LocalGuideModalProps) {
  const [insights, setInsights] = useState<LocalInsight[]>([]);
  const [aiResponse, setAiResponse] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && tripName) {
      fetchLocalGuide();
    }
  }, [isOpen, tripName]);

  const fetchLocalGuide = async (q?: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/local-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripName, userQuestion: q || "" }),
      });
      const data = await res.json();
      if (data.verifiedInsights) setInsights(data.verifiedInsights);
      if (data.aiResponse) setAiResponse(data.aiResponse);
    } catch {
      setAiResponse("Failed to connect to local guide network.");
    } finally {
      setLoading(false);
    }
  };

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    fetchLocalGuide(userQuestion);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-navy-900 border border-teal-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 text-navy-950 shadow-lg">
                <Compass size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Local Guide Intelligence</h2>
                <p className="text-xs text-teal-300">Ground-truth secrets & recommendations for {tripName}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full bg-white/10 text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-2">
            {/* Confidence Banner */}
            <div className="flex items-center justify-between p-4 bg-teal-950/50 border border-teal-500/30 rounded-2xl">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
                <ShieldCheck size={18} className="text-teal-400" />
                <span>LOCAL CONFIDENCE SCORE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-navy-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: "92%" }} />
                </div>
                <span className="font-mono text-xs font-bold text-emerald-400">92%</span>
              </div>
            </div>

            {/* AI Response Section */}
            {aiResponse && (
              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-widest">
                  <Bot size={16} /> Contextual Local Intelligence
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-light">{aiResponse}</p>
              </div>
            )}

            {/* Verified Secrets & Warnings */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Ground-Truth Notes</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {insights.map((insight) => (
                  <div key={insight.id} className="p-4 bg-navy-800/80 border border-slate-700 rounded-2xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {insight.type === "SECRET" ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                            <Lightbulb size={12} /> LOCAL SECRET
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded-full border border-rose-400/30">
                            <AlertTriangle size={12} /> TOURIST MISTAKE
                          </span>
                        )}
                      </div>
                      <h5 className="font-bold text-sm text-white mb-1">{insight.title}</h5>
                      <p className="text-xs text-slate-300 leading-relaxed">{insight.content}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-slate-400 flex items-center justify-between">
                      <span>{insight.source}</span>
                      <span className="font-mono text-teal-400 font-bold">{insight.confidenceScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ask a Local Form */}
          <form onSubmit={handleAsk} className="mt-6 pt-4 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="Ask a local guide (e.g. 'Where can I eat nearby?')"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              disabled={loading || !userQuestion.trim()}
              className="px-5 py-3 bg-gradient-to-r from-teal-400 to-teal-500 text-navy-950 font-bold rounded-2xl text-sm disabled:opacity-50 flex items-center gap-2 hover:from-teal-300 hover:to-teal-400 transition-all shadow-glow-cta"
            >
              <Send size={16} /> Ask
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
