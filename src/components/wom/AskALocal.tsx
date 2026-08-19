"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Sparkles, ShieldCheck, Loader2 } from "lucide-react";

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

export default function AskALocal({ destination }: AskALocalProps) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      const content = data.aiResponse || "I don't have enough reliable verified information about that right now.";
      setMessages((p) => [...p, { role: "assistant", content }]);
    } catch {
      setMessages((p) => [
        ...p,
        {
          role: "assistant",
          content: "I'm having trouble connecting. Here's what I can verify: check the 'What Locals Know' section below for confirmed insights.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[2rem] border border-[#780116]/15 bg-[rgba(12,22,38,0.85)] backdrop-blur-md shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(12,22,38,0.85)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#C8A55C] text-[#05070B] shadow-sm">
            <MessageCircle size={18} />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Ask a Verified Local
            </h3>
            <p className="text-xs text-slate-200 mt-0.5">
              Direct answers for <span className="font-extrabold text-[#C8A55C]">{destination}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-bold text-[#34D399] bg-emerald-50 px-3 py-1 rounded-full border border-[rgba(255,255,255,0.06)]">
          <ShieldCheck size={13} className="text-emerald-600" /> Verified Insights
        </div>
      </div>

      {/* Suggested Questions */}
      {messages.length === 0 && (
        <div className="p-6 bg-transparent">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#C8A55C] mb-3">Popular Explorer Questions</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => ask(q)}
                className="text-left p-3.5 rounded-xl bg-white border border-[rgba(255,255,255,0.06)] text-xs font-bold text-white hover:bg-[rgba(12,22,38,0.85)] hover:border-[#F7B538] transition-all shadow-sm flex items-center justify-between group"
              >
                <span>&ldquo;{q}&rdquo;</span>
                <span className="text-[#05070B] font-black group-hover:translate-x-1 transition-transform">→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      {messages.length > 0 && (
        <div className="p-6 max-h-96 overflow-y-auto space-y-4 bg-transparent">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed ${
                  m.role === "user"
                    ? "bg-[#C8A55C] text-white font-bold rounded-tr-none shadow-md"
                    : "bg-white text-white border border-[rgba(255,255,255,0.06)] rounded-tl-none shadow-sm"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[rgba(12,22,38,0.85)] backdrop-blur-md p-4 rounded-2xl border border-[rgba(255,255,255,0.06)] flex items-center gap-2 text-xs font-bold text-[#C8A55C]">
                <Loader2 size={16} className="animate-spin" /> Verifying local records...
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      )}

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="p-4 bg-white border-t border-[rgba(255,255,255,0.06)] flex items-center gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask anything about ${destination}...`}
          className="flex-1 px-4 py-3 bg-transparent border border-[#780116]/15 rounded-full text-xs font-medium text-white placeholder-slate-400 focus:outline-none focus:border-[#F7B538] focus:ring-2 focus:ring-[#F7B538]/20 transition-all"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-6 py-3 rounded-full bg-[#C8A55C] text-[#05070B] text-xs font-black uppercase tracking-wider hover:bg-[#A8883A] disabled:opacity-50 transition-all shadow-md flex items-center gap-1.5 shrink-0"
        >
          <span>Ask</span>
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
