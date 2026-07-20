"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import Link from "next/link";
import {
  Star, Clock, Users, MapPin, Check, Sparkles,
  Crown, Zap, Shield, ArrowRight, X,
} from "lucide-react";

/* ─── Types ─── */
interface Trip {
  id: string; name: string; slug: string; tagline: string;
  description: string; category: string; price: number;
  duration: string; maxSeats: number; filledSeats: number;
  imageUrl: string; badge: string | null; rating: number;
  highlights: string; included: string;
}

/* ─── Premium package images ─── */
const PKG_IMAGES: Record<string, string> = {
  "alappuzha-backwaters": "/images/packages/bali.png",
  "ooty-hill-station": "/images/packages/swiss-alps.png",
  "wayanad-nature-retreat": "/images/packages/norway.png",
  "guna-caves-expedition": "/images/packages/japan.png",
  "hogenakkal-falls": "/images/packages/maldives.png",
  "isha-foundation": "/images/packages/santorini.png",
  "guruvayur-temple": "/images/packages/japan.png",
  "thiruchendur-pilgrimage": "/images/packages/maldives.png",
};

const INR = (usd: number) => `₹${(usd * 83).toLocaleString("en-IN")}`;

/* ─── Tier config ─── */
const TIERS = [
  { label: "Explorer", icon: Zap, color: "from-emerald-400 to-teal-500", border: "border-emerald-400/30", glow: "shadow-emerald-500/20" },
  { label: "Premium", icon: Crown, color: "from-blue-400 to-indigo-600", border: "border-blue-400/30", glow: "shadow-blue-500/20" },
  { label: "Luxury", icon: Sparkles, color: "from-amber-400 to-orange-500", border: "border-amber-400/30", glow: "shadow-amber-500/20" },
];

/* ═══════════════ TOAST ═══════════════ */
function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="toast-enter fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-2xl liquid-glass-toast text-slate-900 max-w-sm">
      <Sparkles size={18} className="text-amber-500 shrink-0" />
      <span className="text-sm font-medium">{msg}</span>
      <button onClick={onClose} className="ml-auto hover:opacity-70"><X size={14} /></button>
    </div>
  );
}

/* ═══════════════ SKELETON ═══════════════ */
function SkeletonCard() {
  return (
    <div className="pkg-skeleton rounded-3xl liquid-glass">
      <div className="aspect-[4/3] bg-slate-200/50 animate-pulse" />
      <div className="p-6 space-y-3 relative z-10">
        <div className="h-5 w-2/3 rounded-full bg-slate-200/80 animate-pulse" />
        <div className="h-4 w-full rounded-full bg-slate-200/50 animate-pulse" />
        <div className="h-4 w-1/2 rounded-full bg-slate-200/50 animate-pulse" />
        <div className="flex gap-3 pt-4">
          <div className="h-10 flex-1 rounded-full bg-slate-200/80 animate-pulse" />
          <div className="h-10 w-24 rounded-full bg-slate-200/80 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ PACKAGE CARD ═══════════════ */
function PackageCard({ trip, tier, index, onBook }: {
  trip: Trip; tier: typeof TIERS[0]; index: number;
  onBook: (name: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const imgSrc = PKG_IMAGES[trip.slug] || trip.imageUrl;
  const highlights: string[] = JSON.parse(trip.highlights);
  const spotsLeft = trip.maxSeats - trip.filledSeats;

  useEffect(() => {
    if (!ref.current) return;
    anime({
      targets: ref.current,
      translateX: [80, 0],
      opacity: [0, 1],
      duration: 900,
      delay: index * 120,
      easing: "easeOutExpo",
    });
  }, [index]);

  return (
    <div
      ref={ref}
      className="group relative rounded-3xl liquid-glass opacity-0"
      style={{ willChange: "transform" }}
    >
      {/* Gradient border glow on hover */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${tier.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none z-0`} />

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={imgSrc} alt={trip.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white bg-gradient-to-r ${tier.color} shadow-lg`}>
            {tier.label}
          </span>
          {trip.badge && (
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20">
              {trip.badge}
            </span>
          )}
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-4 right-4 text-right">
          <div className="text-xs text-white/90 font-medium drop-shadow-md">Starting from</div>
          <div className="text-2xl font-black text-white drop-shadow-md">{INR(trip.price)}</div>
        </div>

        {spotsLeft <= 5 && spotsLeft > 0 && (
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold animate-pulse">
            🔥 Only {spotsLeft} spots left!
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold text-slate-800">{trip.rating}</span>
          <span className="text-xs text-slate-400 ml-1">{trip.category}</span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
          {trip.name}
        </h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{trip.tagline}</p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
          <span className="flex items-center gap-1"><Clock size={13} /> {trip.duration}</span>
          <span className="flex items-center gap-1"><Users size={13} /> {trip.maxSeats} max</span>
          <span className="flex items-center gap-1"><MapPin size={13} /> {trip.category}</span>
        </div>

        {/* Highlights (show 3) */}
        <div className="space-y-1.5 mb-5">
          {highlights.slice(0, 3).map((h, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
              <Check size={12} className="text-emerald-500 shrink-0" />
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex gap-3">
          <button
            onClick={() => onBook(trip.name)}
            className={`flex-1 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r ${tier.color} hover:shadow-lg transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-2`}
          >
            Book Now <ArrowRight size={14} />
          </button>
          <Link
            href={`/trips/${trip.slug}`}
            className="px-4 py-2.5 rounded-full text-sm font-medium text-slate-500 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-all"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ PRICING TIERS ═══════════════ */
function PricingTiers() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    anime({
      targets: ref.current.querySelectorAll(".tier-card"),
      translateY: [60, 0],
      opacity: [0, 1],
      delay: anime.stagger(150),
      duration: 800,
      easing: "easeOutExpo",
    });
  }, []);

  const plans = [
    {
      name: "Explorer", icon: Zap, price: "₹12,499", period: "/person",
      color: "from-emerald-400 to-teal-500",
      features: ["3-Day Adventure Tours", "Shared Accommodation", "Group Transport", "Guided Excursions", "Basic Travel Insurance"],
    },
    {
      name: "Premium", icon: Crown, price: "₹29,999", period: "/person",
      color: "from-blue-400 to-indigo-600", popular: true,
      features: ["5-Day Immersive Journeys", "Premium Hotel Stays", "Private Transport", "Personal Guide", "Full Travel Insurance", "Drone Photography"],
    },
    {
      name: "Luxury", icon: Sparkles, price: "₹74,999", period: "/person",
      color: "from-amber-400 to-orange-500",
      features: ["7-Day Elite Expeditions", "5-Star Resorts", "Private Helicopter Transfers", "Michelin-Star Dining", "Concierge Service", "Spa & Wellness", "Exclusive VIP Access"],
    },
  ];

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
      {plans.map((p) => (
        <div key={p.name} className={`tier-card relative rounded-3xl p-8 liquid-glass opacity-0 ${p.popular ? "ring-2 ring-blue-400/40" : ""}`}>
          {p.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-400 to-indigo-600 shadow-lg">
              Most Popular
            </div>
          )}
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4 shadow-lg relative z-10`}>
            <p.icon size={22} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-1 relative z-10">{p.name}</h3>
          <div className="flex items-baseline gap-1 mb-6 relative z-10">
            <span className="text-3xl font-black gradient-price">{p.price}</span>
            <span className="text-sm text-slate-400">{p.period}</span>
          </div>
          <div className="space-y-3 mb-8 relative z-10">
            {p.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                <Check size={14} className="text-emerald-500 shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>
          <button className={`w-full py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r ${p.color} hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative z-10`}>
            Choose {p.name}
          </button>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════ MAIN ═══════════════ */
export default function PackagesClient({ trips }: { trips: Trip[] }) {
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  /* Skeleton reveal */
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  /* Hero text anime.js left-to-right */
  useEffect(() => {
    if (!titleRef.current) return;
    anime({
      targets: titleRef.current.querySelectorAll(".anim-word"),
      translateX: [-100, 0],
      opacity: [0, 1],
      delay: anime.stagger(80),
      duration: 1000,
      easing: "easeOutExpo",
    });
  }, []);

  /* Floating orbs animation */
  useEffect(() => {
    anime({
      targets: ".orb",
      translateX: () => anime.random(-40, 40),
      translateY: () => anime.random(-40, 40),
      scale: [0.9, 1.1],
      duration: () => anime.random(4000, 8000),
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    });
  }, []);

  const handleBook = (name: string) => {
    setToast(`🎉 Enquiry sent for "${name}"! We'll reach out within 24 hours.`);
  };

  const categories = ["All", ...Array.from(new Set(trips.map((t) => t.category)))];
  const filtered = filter === "All" ? trips : trips.filter((t) => t.category === filter);

  /* Assign tiers */
  const getTier = (price: number) => {
    if (price <= 250) return TIERS[0];
    if (price <= 450) return TIERS[1];
    return TIERS[2];
  };

  return (
    <div className="packages-page min-h-screen relative overflow-hidden bg-slate-50">
      {/* ─── LIQUID GLASSMORPHISM BACKGROUND ─── */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(99,102,241,0.05) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(14,165,233,0.08) 0%, transparent 50%)"
        }} />
        {/* Floating orbs */}
        <div className="orb absolute w-[500px] h-[500px] rounded-full top-[-10%] left-[10%] opacity-40" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="orb absolute w-[400px] h-[400px] rounded-full top-[40%] right-[-5%] opacity-30" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", filter: "blur(50px)" }} />
        <div className="orb absolute w-[600px] h-[600px] rounded-full bottom-[-15%] left-[30%] opacity-30" style={{ background: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)", filter: "blur(70px)" }} />
        <div className="orb absolute w-[300px] h-[300px] rounded-full top-[20%] left-[60%] opacity-30" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", filter: "blur(45px)" }} />
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
      </div>

      {/* ─── CONTENT ─── */}
      <div className="relative z-10">
        {/* ─── HERO ─── */}
        <section ref={heroRef} className="pt-36 pb-16 md:pt-44 md:pb-24 text-center">
          <div className="container-main">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill text-xs font-semibold text-blue-600 mb-6">
              <Shield size={13} /> Premium Curated Experiences
            </div>
            <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 leading-[1.1]">
              {"Discover Premium".split(" ").map((w, i) => (
                <span key={i} className="anim-word inline-block mr-3 opacity-0">{w}</span>
              ))}
              <br className="hidden md:block" />
              {"Travel Packages".split(" ").map((w, i) => (
                <span key={i + 10} className="anim-word inline-block mr-3 opacity-0 gradient-price">{w}</span>
              ))}
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
              Handcrafted itineraries with transparent pricing in ₹. From serene backwaters to majestic mountain peaks — your dream journey awaits.
            </p>
          </div>
        </section>

        {/* ─── PRICING TIERS ─── */}
        <section className="container-main mb-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Choose Your Experience Tier</h2>
            <p className="text-slate-500">All prices in Indian Rupees (₹)</p>
          </div>
          <PricingTiers />
        </section>

        {/* ─── FILTER BAR ─── */}
        <section className="container-main mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <h2 className="text-2xl font-bold text-slate-900">All Packages</h2>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap liquid-glass-pill ${
                    filter === cat ? "active text-blue-600" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ─── PACKAGE GRID ─── */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((trip, i) => (
                <PackageCard
                  key={trip.id}
                  trip={trip}
                  tier={getTier(trip.price)}
                  index={i}
                  onBook={handleBook}
                />
              ))}
            </div>
          )}
        </section>

        {/* ─── CTA BANNER ─── */}
        <section className="container-main py-20">
          <div className="relative rounded-3xl p-12 md:p-16 text-center liquid-glass">
            <div className="absolute inset-0 opacity-[0.05] z-0" style={{ background: "radial-gradient(circle at 30% 50%, rgba(59,130,246,0.8) 0%, transparent 60%)" }} />
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 relative z-10">
              Ready for the Journey of a Lifetime?
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto mb-8 relative z-10">
              Join 10,000+ happy travellers who chose Zero Gravity for their most memorable adventures.
            </p>
            <Link href="/about#contact" className="relative z-10 inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300">
              Start Planning <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>

      {/* ─── TOAST ─── */}
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      {/* ─── INLINE STYLES ─── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .gradient-price {
          background: linear-gradient(135deg, #2563eb, #6366f1, #8b5cf6, #d946ef);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gradient-text-hover {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .toast-enter { animation: toastSlide 0.5s cubic-bezier(0.16,1,0.3,1); }
        @keyframes toastSlide {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .pkg-skeleton { animation: skeletonReveal 0.6s ease forwards; }
        @keyframes skeletonReveal {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        /* ═══ APPLE LIQUID GLASS (LIGHT THEME) ═══ */
        .liquid-glass {
          position: relative;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.85) 0%,
            rgba(255,255,255,0.65) 40%,
            rgba(255,255,255,0.45) 100%
          );
          backdrop-filter: blur(40px) saturate(1.8);
          -webkit-backdrop-filter: blur(40px) saturate(1.8);
          border: 1px solid rgba(255,255,255,0.8);
          box-shadow:
            inset 0 1px 2px 0 rgba(255,255,255,0.9),
            inset 0 -1px 1px 0 rgba(255,255,255,0.4),
            0 8px 32px rgba(0,0,0,0.06),
            0 2px 8px rgba(0,0,0,0.04);
          overflow: hidden;
        }
        .liquid-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.4) 0%,
            rgba(255,255,255,0.0) 50%,
            rgba(255,255,255,0.1) 100%
          );
          pointer-events: none;
          z-index: 1;
        }
        .liquid-glass::after {
          content: '';
          position: absolute;
          top: -1px; left: -1px; right: -1px;
          height: 50%;
          border-radius: inherit;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.6) 0%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 1;
          mask-image: linear-gradient(black 0%, transparent 100%);
          -webkit-mask-image: linear-gradient(black 0%, transparent 100%);
        }
        .liquid-glass:hover {
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.95) 0%,
            rgba(255,255,255,0.8) 40%,
            rgba(255,255,255,0.6) 100%
          );
          border-color: rgba(255,255,255,1);
          box-shadow:
            inset 0 1px 2px 0 rgba(255,255,255,1),
            inset 0 -1px 1px 0 rgba(255,255,255,0.5),
            0 12px 40px rgba(0,0,0,0.08),
            0 4px 12px rgba(59,130,246,0.1);
          transform: translateY(-3px) scale(1.015);
        }
        .liquid-glass { transition: all 0.5s cubic-bezier(0.16,1,0.3,1); }

        .liquid-glass-pill {
          position: relative;
          background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%);
          backdrop-filter: blur(30px) saturate(1.6);
          -webkit-backdrop-filter: blur(30px) saturate(1.6);
          border: 1px solid rgba(255,255,255,0.8);
          box-shadow:
            inset 0 1px 1px 0 rgba(255,255,255,0.9),
            0 4px 16px rgba(0,0,0,0.05);
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .liquid-glass-pill:hover {
          background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 100%);
          border-color: rgba(255,255,255,1);
          box-shadow:
            inset 0 1px 2px 0 rgba(255,255,255,1),
            0 6px 24px rgba(0,0,0,0.08);
          transform: translateY(-1px);
        }
        .liquid-glass-pill.active {
          background: linear-gradient(135deg, rgba(239,246,255,0.9) 0%, rgba(224,231,255,0.8) 100%);
          border-color: rgba(191,219,254,1);
          box-shadow:
            inset 0 1px 1px 0 rgba(255,255,255,1),
            0 4px 20px rgba(59,130,246,0.15),
            0 0 0 1px rgba(191,219,254,0.5);
        }

        .liquid-glass-toast {
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%);
          backdrop-filter: blur(40px) saturate(1.8);
          -webkit-backdrop-filter: blur(40px) saturate(1.8);
          border: 1px solid rgba(255,255,255,0.9);
          box-shadow:
            inset 0 1px 2px 0 rgba(255,255,255,1),
            0 16px 48px rgba(0,0,0,0.12),
            0 4px 12px rgba(0,0,0,0.06);
        }
      `}} />
    </div>
  );
}
