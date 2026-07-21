"use client";

import React from "react";
import Link from "next/link";
import { Star, Clock, Users } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { formatInr, getAssetUrl, getTripTheme } from "@/lib/trips";

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

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 30;
    const y = -(clientY - top - height / 2) / 30;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const transform = useMotionTemplate`rotateX(${mouseY}deg) rotateY(${mouseX}deg)`;

  const categoryGlows: Record<string, string> = {
    Coastal: "glow-teal",
    Mountain: "glow-blue",
    Urban: "glow-purple",
    Valley: "glow-orange",
  };
  const glowColor = categoryGlows[trip.category] || "glow-indigo";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`card-3d kodplay-glow-card ${glowColor} relative w-full h-full group`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/trips/${trip.slug}`} className="absolute inset-0 z-[100] rounded-[1.5rem]" aria-label={`View ${trip.name} details`} />
      <span></span>
      <div className="block no-underline h-full pointer-events-none">
        <motion.div
          style={{ transform }}
          className="kodplay-content card-3d-inner flex flex-col h-full overflow-hidden"
        >
          {/* Image Container */}
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <div className="absolute inset-0 bg-slate-200 animate-pulse" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getAssetUrl(trip.imageUrl || "/images/trips-hero.png")}
              alt={trip.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-navy-900 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                {trip.category}
              </span>
              {trip.badge && (
                <span className="px-3 py-1 bg-teal-500/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                  {trip.badge}
                </span>
              )}
            </div>

            {/* Price Overlay */}
            <div className="absolute bottom-4 right-4 bg-navy-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg shadow-lg flex items-baseline gap-1">
              <span className="text-xs font-medium opacity-80">From</span>
              <span className="text-lg font-bold">{formatInr(trip.price)}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col flex-grow">
            <div className="flex items-center gap-1 mb-2">
              <Star size={14} className="fill-warning text-warning" />
              <span className="text-sm font-semibold text-slate-700">{trip.rating}</span>
            </div>
            
            <h3 className="text-xl font-bold text-navy-900 mb-2 line-clamp-1 group-hover:text-teal-500 transition-colors">
              {trip.name}
            </h3>
            
            <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-grow">
              {trip.tagline}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
              <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-teal-500" />
                  <span>{trip.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-teal-500" />
                  <span>Small Group</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
