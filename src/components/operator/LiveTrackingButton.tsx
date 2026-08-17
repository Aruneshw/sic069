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
          className="group relative flex items-center gap-3 bg-navy-900 text-white rounded-2xl p-6 overflow-hidden w-full text-left transition-transform hover:scale-[1.02] shadow-lg border border-navy-800"
        >
          {/* Background decorative map grid */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] mix-blend-overlay pointer-events-none" />
          
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center shrink-0 border border-teal-500/30">
            <Map size={24} className="text-teal-400 group-hover:animate-pulse" />
          </div>
          
          <div className="flex-1 relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-white leading-tight">Live Fleet Tracking</h3>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
            </div>
            <p className="text-sm text-slate-400">View real-time locations of 4 active tours</p>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors relative z-10">
            <ExternalLink size={18} />
          </div>
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-[#780116] bg-white border-2 border-[#780116]/15 hover:bg-[#FDE8EC] hover:border-[#780116]/30 transition-all text-xs uppercase tracking-wider"
          style={{
            boxShadow: '4px 4px 12px rgba(120,1,22,0.08), -2px -2px 8px rgba(255,255,255,0.9), inset 1px 1px 3px rgba(255,255,255,0.7)'
          }}
        >
          <Map size={16} className="text-[#D49018]" />
          Live Track
        </button>
      )}

      {isOpen && <LiveTrackingMap onClose={() => setIsOpen(false)} />}
    </>
  );
}
