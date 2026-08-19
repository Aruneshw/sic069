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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="card-base p-0 relative w-full h-full group overflow-hidden flex flex-col"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/trips/${trip.slug}`} className="absolute inset-0 z-30" aria-label={`View ${trip.name} details`} />

      <motion.div style={{ transform }} className="flex flex-col h-full pointer-events-none">
        {/* Image Frame */}
        <div className="relative aspect-[4/3] w-full overflow-hidden" style={{ background: "var(--bg-tertiary)" }}>
          <Image
            src={getAssetUrl(trip.imageUrl || "/images/trips-hero.png")}
            alt={trip.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span
              className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full"
              style={{
                background: "var(--surface-glass)",
                backdropFilter: "blur(12px)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
              }}
            >
              {trip.category}
            </span>
            {trip.badge && (
              <span
                className="px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full"
                style={{
                  background: "var(--gold-500)",
                  color: "var(--bg-primary)",
                }}
              >
                {trip.badge}
              </span>
            )}
          </div>

          {/* Bottom Price + Arrow */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
            <div
              className="px-3.5 py-1.5 rounded-lg flex items-baseline gap-1.5"
              style={{
                background: "var(--surface-glass)",
                backdropFilter: "blur(12px)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <span className="text-[9px] font-bold uppercase" style={{ color: "var(--text-muted)" }}>From</span>
              <span className="text-base font-bold" style={{ color: "var(--text-primary)" }}>{formatInr(trip.price)}</span>
            </div>

            <div
              className="w-8 h-8 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300"
              style={{
                background: "var(--gold-500)",
                color: "var(--bg-primary)",
                boxShadow: "0 4px 12px rgba(200,165,92,0.30)",
              }}
            >
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col flex-grow justify-between" style={{ background: "var(--surface-card)" }}>
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Star size={13} className="fill-current" style={{ color: "var(--gold-500)" }} />
              <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{trip.rating}</span>
              <span className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>/ 5.0</span>
            </div>
            
            <h3 className="heading-card mb-1.5 line-clamp-1 group-hover:text-gold-400 transition-colors">
              {trip.name}
            </h3>
            
            <p className="text-xs mb-4 line-clamp-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {trip.tagline}
            </p>
          </div>

          {/* Metadata Footer */}
          <div className="flex items-center justify-between pt-4 mt-auto" style={{ borderTop: "1px solid var(--border-subtle)" }}>
            <div className="flex items-center gap-4 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
              <div className="flex items-center gap-1.5">
                <Clock size={13} style={{ color: "var(--cyan-400)" }} />
                <span>{trip.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={13} style={{ color: "var(--gold-500)" }} />
                <span>6–12 Pax</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
