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
      className="bento-card relative w-full h-full group bg-white border border-[#780116]/10 rounded-[1.75rem] overflow-hidden flex flex-col justify-between"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/trips/${trip.slug}`} className="absolute inset-0 z-30 rounded-[1.75rem]" aria-label={`View ${trip.name} details`} />

      <motion.div style={{ transform }} className="flex flex-col h-full pointer-events-none">
        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <div className="absolute inset-0 bg-[#150408]/10" />
          <Image
            src={getAssetUrl(trip.imageUrl || "/images/trips-hero.png")}
            alt={trip.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#150408]/80 via-transparent to-black/20" />
          
          {/* Top Category and Rating Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="px-3.5 py-1 bg-[#780116]/90 backdrop-blur-md text-[#F7B538] border border-[#F7B538]/30 text-[11px] font-extrabold uppercase tracking-wider rounded-full shadow-md">
              {trip.category}
            </span>
            {trip.badge && (
              <span className="px-3 py-1 bg-[#F7B538] text-[#150408] text-[10px] font-black uppercase tracking-wider rounded-full shadow-md">
                {trip.badge}
              </span>
            )}
          </div>

          {/* Price Overlay Badge */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
            <div className="bg-[#150408]/90 backdrop-blur-md border border-[#F7B538]/40 text-white px-3.5 py-1.5 rounded-xl shadow-lg flex items-baseline gap-1.5">
              <span className="text-[10px] font-bold text-[#F7B538] uppercase tracking-wider">From</span>
              <span className="text-base font-extrabold text-white">{formatInr(trip.price)}</span>
            </div>

            <div className="w-8 h-8 rounded-full bg-[#F7B538] text-[#150408] flex items-center justify-center shadow-lg group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col flex-grow justify-between bg-white">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Star size={13} className="fill-[#F7B538] text-[#F7B538]" />
              <span className="text-xs font-bold text-slate-700">{trip.rating}</span>
              <span className="text-[11px] text-slate-400 font-medium">/ 5.0</span>
            </div>
            
            <h3 className="text-lg font-extrabold text-[#150408] mb-2 line-clamp-1 group-hover:text-[#780116] transition-colors">
              {trip.name}
            </h3>
            
            <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
              {trip.tagline}
            </p>
          </div>

          {/* Footer Metadata */}
          <div className="flex items-center justify-between pt-4 border-t border-[#780116]/10 mt-auto">
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#780116]" />
                <span>{trip.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={14} className="text-[#F7B538]" />
                <span>Curated Group</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
