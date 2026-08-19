import Link from "next/link";
import Image from "next/image";
import { getAssetUrl } from "@/lib/trips";
import {
  ArrowRight,
  CalendarClock,
  Users,
  ClipboardCheck,
  MessageCircle,
  Sparkles,
  Star,
  Compass,
  CheckCircle2,
  Calendar,
  CreditCard,
  Bell,
  MapPin,
  Heart,
  ShieldCheck,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import TripCard from "@/components/ui/TripCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowingButton from "@/components/ui/GlowingButton";
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid";

import LiveTrackingButton from "@/components/operator/LiveTrackingButton";
import DeferredGallery from "@/components/video/DeferredGallery";
import AnimeHeroTitle from "@/components/ui/AnimeHeroTitle";

const testimonials = [
  { quote: "The most authentic way to see the coastline. Zero Gravity takes care of everything with exquisite detail.", author: "Sarah Jenkins", role: "Solo Explorer", image: "/images/avatars/avatar_sarah_1784558639389.png", variant: "blush" as const },
  { quote: "Our family's alpine expedition was flawless from start to finish. Truly unforgettable memories.", author: "The Miller Family", role: "Group Travelers", image: "/images/avatars/avatar_miller_1784558652356.png", variant: "sage" as const },
  { quote: "The local guides aren't just knowledgeable, they're truly passionate storytellers.", author: "David Chen", role: "Photography Enthusiast", image: "/images/avatars/avatar_david_1784558666293.png", variant: "champagne" as const },
  { quote: "Sustainable, ethical, and breathtakingly curated. A gold standard in modern travel.", author: "Emma Watson", role: "Eco-Traveler", image: "/images/avatars/avatar_emma_1784558679373.png", variant: "lavender" as const },
  { quote: "The transparent pricing changed how I plan my journeys. Zero hidden fees, pure adventure.", author: "Aisha Patel", role: "Budget Traveler", image: "https://i.pravatar.cc/150?u=aisha", variant: "blush" as const },
  { quote: "The high-altitude valley retreat was the exact reset I needed. Exceeded every expectation.", author: "Liam O'Connor", role: "Wellness Explorer", image: "https://i.pravatar.cc/150?u=liam", variant: "sky" as const },
];

import EscapeEngineSection from "@/components/ui/EscapeEngineSection";
import WomHeroSection from "@/components/wom/WomHeroSection";

export default async function HomePage() {
  const featuredTrips = await prisma.trip.findMany({
    where: { status: "Published" },
    take: 3,
    orderBy: { rating: "desc" },
  });

  const packages = await prisma.package.findMany({
    where: { status: "Published" },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* ═══════════════════════════════════════
          GIVINGLI-STYLE HERO BENTO SHOWCASE
          ═══════════════════════════════════════ */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-24 px-4 md:px-8">
        <div className="container-main">
          
          {/* Header Title Banner */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(12,22,38,0.85)] border border-[rgba(200,165,92,0.20)] mb-4 shadow-sm">
              <Sparkles size={14} className="text-[#C8A55C]" />
              <span className="font-script text-2xl text-[#C8A55C] leading-none pt-0.5">
                The Art of Curated Wanderlust
              </span>
            </div>

            <AnimeHeroTitle>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]">
                <span className="anime-word inline-block">Life</span> <span className="anime-word inline-block">is</span> <span className="anime-word inline-block">not</span> <span className="anime-word inline-block">meant</span> <span className="anime-word inline-block">to</span> <span className="anime-word inline-block">be</span> <br className="hidden md:block" />
                <span className="anime-word inline-block text-[#C8A55C] relative">
                  in one place.
                  <span className="anime-underline absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-[#F7B538] to-[#780116] rounded-full"></span>
                </span>
              </h1>
            </AnimeHeroTitle>

            <p className="text-base md:text-lg text-slate-200 mb-8 max-w-xl mx-auto font-medium leading-relaxed">
              Transparent small-group expeditions across breathtaking mountains, serene coasts, and royal heritage landscapes.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-3">
              <GlowingButton href="/trips" variant="gold">
                <span className="flex items-center gap-2">
                  Explore Expeditions
                  <ArrowRight size={16} />
                </span>
              </GlowingButton>
              <GlowingButton href="/about" variant="crimson">
                Our Philosophy
              </GlowingButton>
              <LiveTrackingButton variant="compact" />
            </div>
          </div>

          {/* ── Givingli 6-Tile Bento Grid Mockup ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* Bento Tile 1: Lavender (Customization & Route Design) */}
            <BentoCard
              variant="lavender"
              title="Customization"
              description="Pick a pre-curated route or personalize with local guides, boutique homestays, and high-altitude permits."
              scriptSubtitle="Bespoke Design"
            >
              <div className="mt-6 flex flex-col items-center">
                {/* Floating Itinerary Card Mockup */}
                <div className="floating-element bg-[rgba(12,22,38,0.85)] backdrop-blur-md p-4 rounded-2xl w-full max-w-[260px] shadow-lg border border-indigo-100 mb-3 rotate-[-2deg]">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-indigo-50">
                    <img
                      src={getAssetUrl("/images/places/ooty.png")}
                      alt="Nilgiri Mountain Explorer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 rounded-full text-[9px] font-black uppercase text-[#C8A55C]">
                      Nilgiri 4-Day
                    </div>
                  </div>
                  <div className="text-xs font-extrabold text-white">Nilgiri Valley Trek</div>
                  <div className="text-[10px] text-slate-300">4 Days • 8 Spots Total</div>
                </div>

                {/* Floating Tool Pill Toolbar */}
                <div className="floating-element bg-white py-2 px-4 rounded-full shadow-md border border-slate-100 flex items-center gap-3 text-[10px] font-bold text-[#94A3B8]">
                  <span className="text-[#C8A55C] flex items-center gap-1">✦ Permits</span>
                  <span>•</span>
                  <span className="text-[#C8A55C] flex items-center gap-1">★ Homestays</span>
                  <span>•</span>
                  <span>✓ Porterage</span>
                </div>
              </div>
            </BentoCard>

            {/* Bento Tile 2: Blush (Live Scheduling & Date Picker) */}
            <BentoCard
              variant="blush"
              title="Scheduling"
              description="Schedule all your trips and seat reservations in real-time. Direct confirmation without email lag."
              scriptSubtitle="Live Departures"
            >
              <div className="mt-6 flex flex-col items-center">
                {/* Floating Date-Picker Mockup Card */}
                <div className="floating-element bg-[rgba(12,22,38,0.85)] backdrop-blur-md p-5 rounded-2xl w-full max-w-[270px] shadow-lg border border-pink-100 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-[#C8A55C]">
                    <span>Confirmed Departures</span>
                    <Calendar size={14} />
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-pink-50 text-xs font-bold text-white">
                    <span>Sept 25, 2026</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#C8A55C] text-white text-[10px]">6:00 AM</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 text-xs text-slate-200 font-medium">
                    <span>Oct 04, 2026</span>
                    <span className="text-[10px] text-emerald-600 font-bold">4 Seats Left</span>
                  </div>
                  <button className="w-full py-2 rounded-xl bg-[#C8A55C] text-white font-extrabold text-xs shadow-md">
                    Lock Date & Seat
                  </button>
                </div>
              </div>
            </BentoCard>

            {/* Bento Tile 3: Sage (Transparent Wallet & Pricing) */}
            <BentoCard
              variant="sage"
              title="Transparent Pricing"
              description="Know exact pricing with zero hidden fees. What you see is what you pay."
              scriptSubtitle="Zero Markup"
            >
              <div className="mt-6 flex flex-col items-center">
                {/* Floating Wallet Card */}
                <div className="floating-element bg-[#150408] text-white p-5 rounded-2xl w-full max-w-[260px] shadow-xl border border-[#F7B538]/30 space-y-3">
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold text-[#05070B]">
                    <span>Zero Gravity Pass</span>
                    <CreditCard size={14} />
                  </div>
                  <div className="text-2xl font-black text-white">
                    ₹6,499.00
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-300 pt-2 border-t border-white/10">
                    <span>All-Inclusive Basecamp</span>
                    <span className="text-emerald-400 font-bold">Verified ✓</span>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Bento Tile 4: Champagne (Curated Group & Avatars) */}
            <BentoCard
              variant="champagne"
              title="Curated Groups"
              description="Strict small-group caps (6–12 travelers max) with verified explorer profiles."
              scriptSubtitle="6–12 Explorers"
            >
              <div className="mt-6 space-y-2.5">
                {/* Floating User Cards */}
                <div className="floating-element bg-[rgba(12,22,38,0.85)] backdrop-blur-md p-3 rounded-xl shadow-sm border border-amber-100 flex items-center gap-3">
                  <img src="https://i.pravatar.cc/100?u=sarah" alt="User" className="w-9 h-9 rounded-full object-cover border border-[#F7B538]" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white truncate">Sarah Jenkins</div>
                    <div className="text-[10px] text-[#C8A55C] font-semibold">Solo Explorer • Verified</div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Joined</span>
                </div>

                <div className="floating-element bg-[rgba(12,22,38,0.85)] backdrop-blur-md p-3 rounded-xl shadow-sm border border-amber-100 flex items-center gap-3">
                  <img src="https://i.pravatar.cc/100?u=david" alt="User" className="w-9 h-9 rounded-full object-cover border border-[#F7B538]" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white truncate">David Chen</div>
                    <div className="text-[10px] text-[#C8A55C] font-semibold">Photographer • Verified</div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Joined</span>
                </div>
              </div>
            </BentoCard>

            {/* Bento Tile 5: Crimson (Verified Package Inclusions) */}
            <BentoCard
              variant="crimson"
              title="Verified Inclusions"
              description="Basecamp homestays, native mountain guides, trail permits, and hot local meals locked in upfront."
              scriptSubtitle="100% Guaranteed"
            >
              <div className="mt-6 flex flex-wrap gap-2">
                <div className="floating-element bg-white/10 text-white backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold border border-white/20 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-[#05070B]" /> Homestay Stays
                </div>
                <div className="floating-element bg-white/10 text-white backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold border border-white/20 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-[#05070B]" /> All Forest Permits
                </div>
                <div className="floating-element bg-white/10 text-white backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold border border-white/20 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-[#05070B]" /> Certified Guides
                </div>
                <div className="floating-element bg-white/10 text-white backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold border border-white/20 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-[#05070B]" /> Gourmet Local Meals
                </div>
              </div>
            </BentoCard>

            {/* Bento Tile 6: Sky Blue (Real-Time Trail Alerts) */}
            <BentoCard
              variant="sky"
              title="Dispatch Alerts"
              description="Never miss an itinerary update with live operator tracking and weather dispatches."
              scriptSubtitle="Live Dispatch"
            >
              <div className="mt-6">
                {/* Floating iPhone Alert Mockup */}
                <div className="floating-element bg-[rgba(12,22,38,0.85)] backdrop-blur-md p-4 rounded-2xl shadow-lg border border-blue-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-[#C8A55C] flex items-center justify-center text-white text-[10px] font-black">
                        ZG
                      </div>
                      <span className="text-[10px] font-bold uppercase text-slate-300">Zero Gravity Route Dispatch</span>
                    </div>
                    <span className="text-[9px] text-slate-400">now</span>
                  </div>
                  <p className="text-xs font-bold text-white">
                    Your Western Ghats expedition is locked! Guide Arun is ready at basecamp.
                  </p>
                </div>
              </div>
            </BentoCard>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED EXPEDITIONS (Givingli Bento Grid)
          ═══════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-8 border-t border-[rgba(255,255,255,0.06)]">
        <ScrollReveal className="container-main">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#C8A55C] bg-[rgba(12,22,38,0.85)] px-3.5 py-1.5 rounded-full inline-block mb-2">
                Handcrafted Collections
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                Featured Regional Bestsellers
              </h2>
              <p className="font-script text-2xl text-[#C8A55C]">
                Breathtaking journeys curated for mindful travelers
              </p>
            </div>
            <Link href="/trips" className="btn-primary whitespace-nowrap self-start md:self-auto">
              View All Expeditions <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTrips.map((trip, index) => (
              <div key={trip.id} className="h-full">
                <TripCard trip={trip} index={index} />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════
          INTELLIGENT ESCAPE ENGINE
          ═══════════════════════════════════════ */}
      <EscapeEngineSection initialPackages={packages} />

      {/* ═══════════════════════════════════════
          WORD-OF-MOUTH INTELLIGENCE ENGINE
          ═══════════════════════════════════════ */}
      <WomHeroSection />

      {/* ═══════════════════════════════════════
          VIRTUAL EXPEDITIONS GALLERY
          ═══════════════════════════════════════ */}
      <DeferredGallery />

      {/* ═══════════════════════════════════════
          TESTIMONIALS (Givingli Bento Grid)
          ═══════════════════════════════════════ */}
      <section className="py-24 px-4 md:px-8 bg-transparent border-t border-[rgba(255,255,255,0.06)]">
        <ScrollReveal className="container-main mb-12 text-center">
          <span className="font-script text-3xl text-[#C8A55C] block mb-2">Real Stories, Real Trust</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Voices from the Trail</h2>
        </ScrollReveal>
        
        <div className="container-main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <BentoCard
              key={i}
              variant={t.variant}
              headerBadge="Verified Traveler"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, sIdx) => (
                    <Star key={sIdx} size={14} className="fill-[#F7B538] text-[#05070B]" />
                  ))}
                </div>
                <p className="text-xs md:text-sm text-[#94A3B8] leading-relaxed italic font-normal">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-black/5">
                  <img
                    src={t.image}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#F7B538]"
                  />
                  <div>
                    <div className="text-xs font-extrabold text-white">{t.author}</div>
                    <div className="text-[10px] font-bold text-[#C8A55C]">{t.role}</div>
                  </div>
                </div>
              </div>
            </BentoCard>
          ))}
        </div>
      </section>
    </div>
  );
}
