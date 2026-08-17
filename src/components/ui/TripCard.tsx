"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Clock, Users, ArrowUpRight } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { formatInr, getAssetUrl } from "@/lib/trips";

interface TripCardProps {
  trip: {
    name: string;
    slug: string;
    category: string;
    tagline: string;
    price: number;
    duration: string;
    rating: number;
    imageUrl: string;
    badge: string | null;
  };
  index?: number;
}

export default function TripCard({ trip, index = 0 }: TripCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 120, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 120, damping: 25 });

  const rafId = React.useRef<number | null>(null);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (rafId.current) return;
    rafId.current = requestAnimationFrame(() => {
      const { left, top, width, height } = currentTarget.getBoundingClientRect();
      const xVal = (clientX - left - width / 2) / 35;
      const yVal = -(clientY - top - height / 2) / 35;
      mouseX.set(xVal);
      mouseY.set(yVal);
      rafId.current = null;
    });
  }

  function handleMouseLeave() {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    mouseX.set(0);
    mouseY.set(0);
  }

  const transform = useMotionTemplate`rotateX(${mouseY}deg) rotateY(${mouseX}deg) translateZ(0px)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="bento-card-base bento-white p-0 relative w-full h-full group bg-white border border-[#780116]/10 rounded-[2rem] overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-400"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/trips/${trip.slug}`} className="absolute inset-0 z-30 rounded-[2rem]" aria-label={`View ${trip.name} details`} />

      <motion.div style={{ transform }} className="flex flex-col h-full pointer-events-none">
        {/* Floating Top Image Frame */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <Image
            src={getAssetUrl(trip.imageUrl || "/images/trips-hero.png")}
            alt={trip.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="px-3.5 py-1 bg-white/95 backdrop-blur-md text-[#780116] border border-[#780116]/20 text-[10px] font-black uppercase tracking-wider rounded-full shadow-sm">
              {trip.category}
            </span>
            {trip.badge && (
              <span className="px-3 py-1 bg-[#F7B538] text-[#150408] text-[9px] font-black uppercase tracking-wider rounded-full shadow-sm">
                {trip.badge}
              </span>
            )}
          </div>

          {/* Floating Price Pill */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
            <div className="bg-white/95 backdrop-blur-md border border-black/5 text-[#150408] px-3.5 py-1.5 rounded-xl shadow-md flex items-baseline gap-1.5">
              <span className="text-[9px] font-black text-slate-500 uppercase">From</span>
              <span className="text-base font-black text-[#150408]">{formatInr(trip.price)}</span>
            </div>

            <div className="w-8 h-8 rounded-full bg-[#780116] text-[#F7B538] flex items-center justify-center shadow-md group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col flex-grow justify-between bg-white">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Star size={13} className="fill-[#F7B538] text-[#F7B538]" />
              <span className="text-xs font-black text-[#150408]">{trip.rating}</span>
              <span className="text-[10px] text-slate-400 font-semibold">/ 5.0</span>
            </div>
            
            <h3 className="text-lg font-extrabold text-[#150408] mb-1.5 line-clamp-1 group-hover:text-[#780116] transition-colors">
              {trip.name}
            </h3>
            
            <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed font-normal">
              {trip.tagline}
            </p>
          </div>

          {/* Metadata Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-black/5 mt-auto">
            <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-[#780116]" />
                <span>{trip.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={13} className="text-[#D49018]" />
                <span>6–12 Pax</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
