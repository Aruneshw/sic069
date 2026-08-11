"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Sparkles, ShieldCheck } from "lucide-react";

interface AskALocalProps {
  destination: string;
  tripId?: string;
}

const SUGGESTED_QUESTIONS = [
  "Is this place actually worth visiting?",
  "Where would locals eat?",
  "What should I avoid?",
  "What's the best time to go?",
  "What do tourists usually get wrong?",
  "Is there a better alternative nearby?",
  "What should I carry?",
  "What's not worth spending money on?",
];

type Msg = { role: "user" | "assistant"; content: string };

export default function AskALocal({ destination, tripId }: AskALocalProps) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const ask = async (question: string) => {
    if (!question.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: question.trim() };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setLoading(true);
    setIsExpanded(true);

    try {
      const res = await fetch("/api/local-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripName: destination, userQuestion: question.trim() }),
      });
      const data = await res.json();
      const content = data.aiResponse || "I don't have enough reliable information about that right now.";
      setMessages((p) => [...p, { role: "assistant", content }]);
    } catch {
      setMessages((p) => [...p, { role: "assistant", content: "I'm having trouble connecting. Here's what I can verify: check the 'What Locals Know' section above for confirmed insights." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-navy-950/50 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-white/10 bg-gradient-to-r from-teal-500/15 to-indigo-500/10">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-2 rounded-xl bg-teal-500/20"><MessageCircle size={16} className="text-teal-300" /></div>
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Ask a Local</h3>
          <div className="ml-auto flex items-center gap-1 text-[10px] text-slate-400"><ShieldCheck size={12} className="text-emerald-400" /> Trust-verified responses</div>
        </div>
        <p className="text-xs text-slate-400 mt-1">What would you ask someone who actually lives in <span className="text-teal-300 font-bold">{destination}</span>?</p>
      </div>

      {/* Suggested Questions */}
      {messages.length === 0 && (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button key={q} onClick={() => ask(q)} className="text-left p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 hover:bg-teal-500/10 hover:border-teal-500/30 hover:text-teal-300 transition-all">
              "{q}"
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="overflow-hidden">
            <div className="max-h-80 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${m.role === "user" ? "bg-teal-500/20 text-teal-100 rounded-tr-sm" : "bg-white/5 text-slate-300 rounded-tl-sm border border-white/10"}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-1.5 p-3"><div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" /><div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} /><div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} /></div>
              )}
              <div ref={scrollRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="p-3 border-t border-white/10 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask(input)}
          placeholder={`Ask about ${destination}...`}
          className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500/30 outline-none"
          disabled={loading}
        />
        <button onClick={() => ask(input)} disabled={!input.trim() || loading} className="px-4 py-2.5 bg-teal-500 text-navy-950 rounded-xl font-bold text-sm disabled:opacity-30 flex items-center gap-1.5">
          <Send size={14} /> Ask
        </button>
      </div>
    </div>
  );
}
