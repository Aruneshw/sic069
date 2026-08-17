import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { getAssetUrl } from "@/lib/trips";
import { ArrowRight, CalendarClock, Users, ClipboardCheck, MessageCircle, Sparkles, Star, Compass } from "lucide-react";
import { prisma } from "@/lib/prisma";
import TripCard from "@/components/ui/TripCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowingButton from "@/components/ui/GlowingButton";
import WaveDivider from "@/components/ui/WaveDivider";
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid";

import LiveTrackingButton from "@/components/operator/LiveTrackingButton";
import DeferredGallery from "@/components/video/DeferredGallery";
import AnimeHeroTitle from "@/components/ui/AnimeHeroTitle";

const testimonials = [
  { quote: "The most authentic way to see the coastline. Zero Gravity takes care of everything with exquisite detail.", author: "Sarah Jenkins", role: "Solo Explorer", image: "/images/avatars/avatar_sarah_1784558639389.png" },
  { quote: "Our family's alpine expedition was flawless from start to finish. Truly unforgettable memories.", author: "The Miller Family", role: "Group Travelers", image: "/images/avatars/avatar_miller_1784558652356.png" },
  { quote: "The local guides aren't just knowledgeable, they're truly passionate storytellers.", author: "David Chen", role: "Photography Enthusiast", image: "/images/avatars/avatar_david_1784558666293.png" },
  { quote: "Sustainable, ethical, and breathtakingly curated. A gold standard in modern travel.", author: "Emma Watson", role: "Eco-Traveler", image: "/images/avatars/avatar_emma_1784558679373.png" },
  { quote: "The transparent pricing changed how I plan my journeys. Zero hidden fees, pure adventure.", author: "Aisha Patel", role: "Budget Traveler", image: "https://i.pravatar.cc/150?u=aisha" },
  { quote: "The high-altitude valley retreat was the exact reset I needed. Exceeded every expectation.", author: "Liam O'Connor", role: "Wellness Explorer", image: "https://i.pravatar.cc/150?u=liam" },
];

const marqueeTestimonials = [...testimonials, ...testimonials];

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
    <div className="flex flex-col min-h-screen bg-[#FFFDF9]">
      {/* ═══════════════════════════════════════
          HERO SECTION — Bento & Luxury Cinematic
          ═══════════════════════════════════════ */}
      <section className="relative pt-40 pb-32 md:pt-48 md:pb-48 overflow-hidden bg-gradient-to-br from-[#150408] via-[#330009] to-[#780116]">
        {/* Background Video */}
        <video 
          src={getAssetUrl("/videos/mountain.mp4")}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          poster={getAssetUrl("/videos/mountain-poster.webp")}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-45"
        />
        {/* Obsidian & Gold Ambient Mist Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#150408] via-[#150408]/60 to-transparent z-0 pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#F7B538]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#780116]/40 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="container-main relative z-10 flex flex-col items-center text-center">
          
          {/* Script Sub-headline */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#F7B538]/40 mb-6 shadow-lg shadow-black/20"
          >
            <Sparkles size={16} className="text-[#F7B538]" />
            <span className="font-script text-2xl md:text-3xl text-[#F7B538] leading-none pt-0.5">
              The Art of Curated Wanderlust
            </span>
          </div>

          <AnimeHeroTitle>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-xl leading-[1.1] max-w-4xl">
              <span className="anime-word inline-block">Life</span> <span className="anime-word inline-block">is</span> <span className="anime-word inline-block">not</span> <span className="anime-word inline-block">meant</span> <span className="anime-word inline-block">to</span> <span className="anime-word inline-block">be</span> <br className="hidden md:block" />
              <span className="anime-word inline-block text-[#F7B538] relative">
                in one place.
                <span className="anime-underline absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-[#F7B538] to-[#780116] rounded-full"></span>
              </span>
            </h1>
          </AnimeHeroTitle>

          <p className="text-lg md:text-xl text-[#FAF3E7] mb-10 max-w-2xl mx-auto drop-shadow-sm font-medium opacity-90">
            Discover transparent small-group expeditions across breathtaking mountains, serene coasts, and royal heritage landscapes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <GlowingButton href="/trips" variant="gold">
              <span className="flex items-center gap-2">
                Explore Expeditions
                <ArrowRight size={17} />
              </span>
            </GlowingButton>
            <GlowingButton href="/about" variant="crimson">
              Our Philosophy
            </GlowingButton>
            <div className="w-full sm:w-auto mt-2 sm:mt-0">
              <LiveTrackingButton variant="compact" />
            </div>
          </div>

          {/* Hero Bento Highlights Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-4xl border-t border-white/15 pt-8">
            <div className="text-center p-3">
              <div className="text-2xl md:text-3xl font-black text-[#F7B538]">120+</div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-300">Regional Tours</div>
            </div>
            <div className="text-center p-3 border-l border-white/10">
              <div className="text-2xl md:text-3xl font-black text-[#F7B538]">100%</div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-300">Clear Inclusions</div>
            </div>
            <div className="text-center p-3 md:border-l border-white/10">
              <div className="text-2xl md:text-3xl font-black text-[#F7B538]">45k+</div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-300">Happy Explorers</div>
            </div>
            <div className="text-center p-3 border-l border-white/10">
              <div className="text-2xl md:text-3xl font-black text-[#F7B538]">4.95 ★</div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-300">Verified Rating</div>
            </div>
          </div>

        </div>
        
        <WaveDivider className="text-[#FFFDF9]" />
      </section>

      {/* ═══════════════════════════════════════
          VALUE PILLARS BENTO GRID
          ═══════════════════════════════════════ */}
      <section className="relative pt-16 pb-28 bg-[#FFFDF9]">
        <ScrollReveal className="container-main relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-[#780116] bg-[#780116]/10 px-4 py-1.5 rounded-full border border-[#780116]/20 inline-block mb-3">
              The Radical Difference
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#150408] mb-4">
              Why Discerning Explorers Choose Zero Gravity
            </h2>
            <p className="font-script text-2xl text-[#D49018] mb-3">
              Transparency as an art form
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              We replaced word-of-mouth guesswork with deterministic availability, transparent pricing, and instant communication.
            </p>
          </div>
          
          {/* Asymmetrical Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Bento Card 1: Featured 2-col span */}
            <BentoCard variant="dark" colSpan={2} headerBadge="Live Schedules" scriptSubtitle="Departure Precision">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-[#780116] rounded-2xl flex items-center justify-center text-[#F7B538] shadow-md border border-[#F7B538]/30">
                  <CalendarClock size={28} />
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  Real-Time Trip Schedules & Availability
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                  Every upcoming departure is live and synchronized in real time. Know exact dates, departure windows, and confirmed slots without ever waiting on an email reply.
                </p>
              </div>
            </BentoCard>

            {/* Bento Card 2 */}
            <BentoCard variant="gold" colSpan={1} headerBadge="Live Seats" scriptSubtitle="Zero Crowding">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#780116] shadow-md border border-[#780116]/20">
                  <Users size={28} />
                </div>
                <h3 className="text-xl font-extrabold text-[#150408]">
                  Transparent Group Limits
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Strict small-group caps (6–12 travellers max) so you enjoy intimate, unhurried exploration.
                </p>
              </div>
            </BentoCard>

            {/* Bento Card 3 */}
            <BentoCard variant="crimson" colSpan={1} headerBadge="Upfront Pricing" scriptSubtitle="Zero Hidden Costs">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-[#F7B538] rounded-2xl flex items-center justify-center text-[#150408] shadow-md">
                  <ClipboardCheck size={28} />
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  Clear Inclusions & Exclusions
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Full visibility into basecamp stays, gourmet local meals, permits, and porterage. No surprise markups on the trail.
                </p>
              </div>
            </BentoCard>

            {/* Bento Card 4: 2-col span */}
            <BentoCard variant="light" colSpan={2} headerBadge="Direct Concierge" scriptSubtitle="Instant Peace of Mind">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-[#FAF3E7] rounded-2xl flex items-center justify-center text-[#780116] shadow-sm border border-[#780116]/20">
                  <MessageCircle size={28} />
                </div>
                <h3 className="text-2xl font-extrabold text-[#150408]">
                  Instant Enquiries with Dedicated Route Directors
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                  Connect instantly with certified expedition leaders who know every altitude gain, river crossing, and sunset vantage point.
                </p>
              </div>
            </BentoCard>

          </div>
        </ScrollReveal>
        <WaveDivider className="text-[#FAF3E7]" />
      </section>

      {/* ═══════════════════════════════════════
          FEATURED EXPEDITIONS (Bento Showcase)
          ═══════════════════════════════════════ */}
      <section className="relative pt-16 pb-28 bg-[#FAF3E7] border-b border-[#780116]/10">
        <ScrollReveal className="container-main relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#780116] bg-white px-4 py-1.5 rounded-full border border-[#780116]/20 inline-block mb-2">
                Handcrafted Collections
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#150408] mb-2">
                Featured Regional Bestsellers
              </h2>
              <p className="font-script text-2xl text-[#D49018]">
                Curated for the adventurous spirit
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
        <WaveDivider className="text-[#150408]" />
      </section>

      {/* ═══════════════════════════════════════
          INTELLIGENT ESCAPE ENGINE
          ═══════════════════════════════════════ */}
      <EscapeEngineSection initialPackages={packages} />

      {/* ═══════════════════════════════════════
          WORD-OF-MOUTH INTELLIGENCE ENGINE
          ═══════════════════════════════════════ */}
      <WomHeroSection />

      <DeferredGallery />

      {/* ═══════════════════════════════════════
          TESTIMONIAL MARQUEE
          ═══════════════════════════════════════ */}
      <section className="py-24 bg-[#150408] text-white overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#780116]/30 rounded-full blur-[140px] pointer-events-none" />

        <ScrollReveal className="container-main mb-12 text-center relative z-10">
          <span className="font-script text-3xl text-[#F7B538] block mb-2">Real Stories, Real Trust</span>
          <h2 className="text-3xl md:text-4xl font-extrabold">Voices from the Trail</h2>
        </ScrollReveal>
        
        {/* Infinite Marquee */}
        <div className="relative w-full overflow-hidden group">
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#150408] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#150408] to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-6 md:gap-8 px-6 animate-marquee">
            {marqueeTestimonials.map((t, i) => (
              <div
                key={i}
                className="inline-block w-[85vw] sm:w-80 md:w-96 whitespace-normal p-8 rounded-[2rem] bg-[#0B0204] border border-[#F7B538]/20 shrink-0 relative overflow-hidden group-hover:border-[#F7B538]/60 transition-all duration-300 shadow-xl"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, sIdx) => (
                    <Star key={sIdx} size={14} className="fill-[#F7B538] text-[#F7B538]" />
                  ))}
                </div>
                <p className="text-slate-200 text-sm leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3.5 pt-4 border-t border-white/10">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#F7B538]/50 shrink-0">
                    {t.image.startsWith('http') ? (
                      <img src={t.image} alt={t.author} className="object-cover w-full h-full" />
                    ) : (
                      <Image src={getAssetUrl(t.image)} alt={t.author} fill sizes="48px" className="object-cover" />
                    )}
                  </div>
                  <div>
                    <p className="font-extrabold text-white text-sm">{t.author}</p>
                    <p className="text-xs font-bold text-[#F7B538]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translate3d(0%, 0, 0); }
            100% { transform: translate3d(calc(-50% - 1.5rem), 0, 0); }
          }
          .animate-marquee {
            animation: marquee 35s linear infinite;
            width: max-content;
            will-change: transform;
            backface-visibility: hidden;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}} />
      </section>
    </div>
  );
}
