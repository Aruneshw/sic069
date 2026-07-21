import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { getAssetUrl } from "@/lib/trips";
import { ArrowRight, CalendarClock, Users, ClipboardCheck, MessageCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import TripCard from "@/components/ui/TripCard";

import HeroSceneWrapper from "@/components/3d/HeroSceneWrapper";
import LiveTrackingButton from "@/components/operator/LiveTrackingButton";
import ImmersiveVideoGallery from "@/components/video/ImmersiveVideoGallery";

// Mock testimonials for the horizontal scroll
const testimonials = [
  { quote: "The most authentic way to see the coastline. Zero Gravity takes care of everything.", author: "Sarah Jenkins", role: "Solo Explorer", image: "/images/avatars/avatar_sarah_1784558639389.png" },
  { quote: "Our family's alpine expedition was flawless from start to finish. Unforgettable.", author: "The Miller Family", role: "Group Travelers", image: "/images/avatars/avatar_miller_1784558652356.png" },
  { quote: "The guides aren't just knowledgeable, they're truly passionate about the region.", author: "David Chen", role: "Photography Enthusiast", image: "/images/avatars/avatar_david_1784558666293.png" },
  { quote: "Sustainable, ethical, and absolutely stunning. A premium experience.", author: "Emma Watson", role: "Eco-Traveler", image: "/images/avatars/avatar_emma_1784558679373.png" },
];

export default async function HomePage() {
  // Fetch featured trips from DB
  const featuredTrips = await prisma.trip.findMany({
    where: { status: "Published" },
    take: 3,
    orderBy: { rating: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* ═══════════════════════════════════════
          HERO SECTION (Light Glassmorphism Theme)
          ═══════════════════════════════════════ */}
      <section className="relative pt-40 pb-32 md:pt-48 md:pb-48 overflow-hidden gradient-hero">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={getAssetUrl("/videos/mountain.mp4")} type="video/mp4" />
        </video>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-navy-900/40 z-0 mix-blend-multiply" />
        
        <div className="container-main relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left mt-8 md:mt-0">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-md leading-[1.1] animate-slide-fade-in">
              Life is not meant to be <br className="hidden md:block" />
              <span className="text-teal-300">in one place.</span>
            </h1>
            <p className="text-lg md:text-xl text-teal-50 mb-10 max-w-2xl mx-auto md:mx-0 drop-shadow-sm font-medium opacity-90 animate-slide-fade-in animation-delay-200">
              Wander far, explore the unseen, and journey beyond your horizon.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Link href="/trips" className="btn-primary bg-blue-600 hover:bg-blue-700 w-full sm:w-auto px-8 py-4 text-base shadow-lg shadow-blue-500/30 rounded-full">
                Explore Tours
                <ArrowRight size={18} />
              </Link>
              <Link href="/about" className="inline-flex items-center justify-center gap-2 font-semibold w-full sm:w-auto px-8 py-4 text-base bg-white/60 backdrop-blur-md border border-white hover:bg-white/90 text-navy-900 transition-all rounded-full shadow-sm">
                Our Story
              </Link>
              <div className="w-full sm:w-auto mt-2 sm:mt-0">
                <LiveTrackingButton variant="compact" />
              </div>
            </div>
          </div>
          
          <div className="flex-1 hidden lg:block">
            {/* Empty right column for layout balance */}
          </div>
        </div>
        
        {/* Bottom curve separator */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }} />
      </section>

      {/* ═══════════════════════════════════════
          VALUE CARDS (Glassmorphism)
          ═══════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Why Zero Gravity?</h2>
            <p className="text-slate-600">We built this because budget travellers deserve better than word-of-mouth. Every trip we run is fully visible — schedules, group sizes, and inclusions, all in one place.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="kodplay-glow-card glow-teal w-full group">
              <span></span>
              <div className="kodplay-content p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <CalendarClock size={32} className="text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-3">Live Trip Schedules</h3>
                <p className="text-sm text-slate-600 leading-relaxed">See every upcoming departure with exact dates and real-time availability — no more waiting on a reply to find out when the next trip runs.</p>
              </div>
            </div>
            
            <div className="kodplay-glow-card glow-blue w-full group">
              <span></span>
              <div className="kodplay-content p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <Users size={32} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-3">Transparent Group Sizes</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Know exactly how many seats are open and how many travellers have already joined, before you ever send an enquiry.</p>
              </div>
            </div>
            
            <div className="kodplay-glow-card glow-indigo w-full group">
              <span></span>
              <div className="kodplay-content p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <ClipboardCheck size={32} className="text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-3">Clear Inclusions, No Surprises</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Every trip lists what's included and excluded upfront, so budget travellers can plan with confidence instead of guesswork.</p>
              </div>
            </div>
            
            <div className="kodplay-glow-card glow-purple w-full group">
              <span></span>
              <div className="kodplay-content p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <MessageCircle size={32} className="text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-3">Instant Enquiry, Real Replies</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Send a booking enquiry in seconds and get a real response — replacing word-of-mouth with a system you can actually rely on.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED TRIPS (page-02.png)
          ═══════════════════════════════════════ */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-teal-600 font-bold uppercase tracking-wider text-sm mb-2 block">Curated Journeys</span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Discover Our Bestsellers</h2>
              <p className="text-slate-600 text-lg">Hand-picked expeditions that showcase the absolute best of our regional offerings.</p>
            </div>
            <Link href="/trips" className="btn-secondary whitespace-nowrap">
              View All Trips
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTrips.map((trip, index) => (
              <div key={trip.id} className="h-full">
                <TripCard trip={trip} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImmersiveVideoGallery />

      {/* ═══════════════════════════════════════
          TESTIMONIAL STRIP (page-05.png style)
          ═══════════════════════════════════════ */}
      <section className="py-20 bg-navy-900 text-white overflow-hidden">
        <div className="container-main mb-12 text-center">
          <h2 className="text-3xl font-bold">Don't just take our word for it.</h2>
        </div>
        
        {/* Horizontal scroll container for testimonials */}
        <div className="relative w-full">
          <div className="flex gap-8 md:gap-12 px-6 md:px-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8">
            {testimonials.map((t, i) => (
              <div key={i} className="snap-center inline-block w-[85vw] sm:w-80 md:w-96 whitespace-normal p-8 rounded-2xl bg-navy-800 border border-navy-700 shrink-0 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                <p className="text-teal-100 text-lg italic mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500/30 group-hover:border-blue-400 transition-colors">
                    <Image src={getAssetUrl(t.image)} alt={t.author} fill sizes="56px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-white">{t.author}</p>
                    <p className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent animate-gradient-x">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes gradient-x {
            0%, 100% {
                background-size: 200% 200%;
                background-position: left center;
            }
            50% {
                background-size: 200% 200%;
                background-position: right center;
            }
          }
          .animate-gradient-x {
            animation: gradient-x 3s ease infinite;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />
      </section>
    </div>
  );
}
