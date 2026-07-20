import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, CalendarClock, Users, ClipboardCheck, MessageCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import TripCard from "@/components/ui/TripCard";

import HeroSceneWrapper from "@/components/3d/HeroSceneWrapper";
import LiveTrackingButton from "@/components/operator/LiveTrackingButton";

// Mock testimonials for the horizontal scroll
const testimonials = [
  { quote: "The most authentic way to see the coastline. Zero Gravity takes care of everything.", author: "Sarah Jenkins", role: "Solo Explorer" },
  { quote: "Our family's alpine expedition was flawless from start to finish. Unforgettable.", author: "The Miller Family", role: "Group Travelers" },
  { quote: "The guides aren't just knowledgeable, they're truly passionate about the region.", author: "David Chen", role: "Photography Enthusiast" },
  { quote: "Sustainable, ethical, and absolutely stunning. A premium experience.", author: "Emma Watson", role: "Eco-Traveler" },
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
          <source src="/videos/mountain.mp4" type="video/mp4" />
        </video>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-navy-900/40 z-0 mix-blend-multiply" />
        
        <div className="container-main relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left mt-8 md:mt-0">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-md leading-[1.1]">
              Life is not meant to be <br className="hidden md:block" />
              <span className="text-teal-300">in one place.</span>
            </h1>
            <p className="text-lg md:text-xl text-teal-50 mb-10 max-w-2xl mx-auto md:mx-0 drop-shadow-sm font-medium opacity-90">
              Wander far, explore the unseen, and journey beyond your horizon.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Link href="/trips" className="btn-primary bg-blue-600 hover:bg-blue-700 w-full sm:w-auto px-8 py-4 text-base shadow-lg shadow-blue-500/30 rounded-full">
                Explore Tours
                <ArrowRight size={18} />
              </Link>
              <Link href="/about" className="btn-secondary w-full sm:w-auto px-8 py-4 text-base bg-white/60 backdrop-blur-md border border-white hover:bg-white/90 text-navy-900 transition-all rounded-full shadow-sm">
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
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Why Zero Gravity?</h2>
            <p className="text-slate-600">We built this because budget travellers deserve better than word-of-mouth. Every trip we run is fully visible — schedules, group sizes, and inclusions, all in one place.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 text-center group rounded-3xl bg-white/50 backdrop-blur-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <CalendarClock size={32} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Live Trip Schedules</h3>
              <p className="text-sm text-slate-600 leading-relaxed">See every upcoming departure with exact dates and real-time availability — no more waiting on a reply to find out when the next trip runs.</p>
            </div>
            
            <div className="p-8 text-center group rounded-3xl bg-white/50 backdrop-blur-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Users size={32} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Transparent Group Sizes</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Know exactly how many seats are open and how many travellers have already joined, before you ever send an enquiry.</p>
            </div>
            
            <div className="p-8 text-center group rounded-3xl bg-white/50 backdrop-blur-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <ClipboardCheck size={32} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Clear Inclusions, No Surprises</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Every trip lists what's included and excluded upfront, so budget travellers can plan with confidence instead of guesswork.</p>
            </div>
            
            <div className="p-8 text-center group rounded-3xl bg-white/50 backdrop-blur-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <MessageCircle size={32} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-3">Instant Enquiry, Real Replies</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Send a booking enquiry in seconds and get a real response — replacing word-of-mouth with a system you can actually rely on.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED TRIPS (page-02.png)
          ═══════════════════════════════════════ */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTrips.map((trip, index) => (
              <div key={trip.id} className="h-full">
                <TripCard trip={trip} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIAL STRIP (page-05.png style)
          ═══════════════════════════════════════ */}
      <section className="py-20 bg-navy-900 text-white overflow-hidden">
        <div className="container-main mb-12 text-center">
          <h2 className="text-3xl font-bold">Don't just take our word for it.</h2>
        </div>
        
        {/* Simple CSS marquee for testimonials */}
        <div className="relative w-full overflow-hidden flex whitespace-nowrap">
          <div className="animate-marquee flex gap-8 px-4">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="inline-block w-80 md:w-96 whitespace-normal p-8 rounded-2xl bg-navy-800 border border-navy-700 shrink-0">
                <p className="text-teal-100 text-lg italic mb-6">"{t.quote}"</p>
                <div>
                  <p className="font-bold text-white">{t.author}</p>
                  <p className="text-sm text-teal-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}} />
      </section>
    </div>
  );
}
