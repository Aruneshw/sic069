"use client";

import { MapPin } from "lucide-react";

interface TripMapProps {
  location: string;
}

export function TripMap({ location }: TripMapProps) {
  return (
    <div className="w-full h-[300px] rounded-2xl overflow-hidden border border-white/20 relative flex items-center justify-center bg-navy-900/40">
      <div className="absolute inset-0 liquid-bg opacity-30 mix-blend-overlay"></div>
      <div className="z-10 flex flex-col items-center p-6 glass-panel rounded-xl">
        <MapPin size={48} className="text-teal-400 mb-2 drop-shadow-md" />
        <h3 className="text-white font-bold text-xl drop-shadow-md">{location}</h3>
        <p className="text-teal-100/70 text-sm mt-1">Map Visualization Unavailable</p>
      </div>
    </div>
  );
}
