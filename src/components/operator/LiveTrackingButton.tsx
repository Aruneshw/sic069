"use client";

import { useState } from "react";
import { Map, ExternalLink } from "lucide-react";
import LiveTrackingMap from "./LiveTrackingMap";

interface LiveTrackingButtonProps {
  variant?: 'card' | 'compact';
}

export default function LiveTrackingButton({ variant = 'card' }: LiveTrackingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {variant === 'card' ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 rounded-[24px] p-6 overflow-hidden w-full text-left transition-all hover:-translate-y-1"
          style={{
            background: "#FFFFFF",
            border: "2px solid rgba(247,181,56,0.2)",
            boxShadow: "6px 6px 18px rgba(120,1,22,0.06), -3px -3px 10px rgba(255,255,255,0.9), inset 1px 1px 4px rgba(255,255,255,0.7)",
          }}
        >
          {/* Background decorative map grid */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#78011622_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(145deg, #F9C862, #D49018)",
              boxShadow: "3px 3px 8px rgba(168,110,12,0.2), inset 1px 1px 2px rgba(255,255,255,0.3)",
            }}
          >
            <Map size={22} className="text-white group-hover:animate-pulse" />
          </div>
          
          <div className="flex-1 relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-white leading-tight" style={{ fontFamily: "var(--font-poppins)" }}>Live Fleet Tracking</h3>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#86C29C] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#86C29C]"></span>
              </span>
            </div>
            <p className="text-sm text-slate-300 font-medium">View real-time locations of 4 active tours</p>
          </div>
          
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-[#F7B538] transition-colors relative z-10 text-slate-400 group-hover:text-white"
            style={{
              background: "#FAF0DF",
              boxShadow: "2px 2px 6px rgba(168,110,12,0.08)",
            }}
          >
            <ExternalLink size={18} />
          </div>
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-[#C8A55C] bg-white border-2 border-[#780116]/15 hover:bg-[rgba(12,22,38,0.85)] hover:border-[#780116]/30 transition-all text-xs uppercase tracking-wider"
          style={{
            boxShadow: '4px 4px 12px rgba(120,1,22,0.08), -2px -2px 8px rgba(255,255,255,0.9), inset 1px 1px 3px rgba(255,255,255,0.7)'
          }}
        >
          <Map size={16} className="text-[#C8A55C]" />
          Live Track
        </button>
      )}

      {isOpen && <LiveTrackingMap onClose={() => setIsOpen(false)} />}
    </>
  );
}
