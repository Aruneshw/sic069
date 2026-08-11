import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { getAssetUrl } from "@/lib/trips";
import { ArrowRight, CalendarClock, Users, ClipboardCheck, MessageCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import TripCard from "@/components/ui/TripCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowingButton from "@/components/ui/GlowingButton";
import WaveDivider from "@/components/ui/WaveDivider";

import LiveTrackingButton from "@/components/operator/LiveTrackingButton";
import DeferredGallery from "@/components/video/DeferredGallery";
import AnimeHeroTitle from "@/components/ui/AnimeHeroTitle";

// Expanded mock testimonials for a lively horizontal scroll
const testimonials = [
  { quote: "The most authentic way to see the coastline. Zero Gravity takes care of everything.", author: "Sarah Jenkins", role: "Solo Explorer", image: "/images/avatars/avatar_sarah_1784558639389.png", color: "glow-teal" },
  { quote: "Our family's alpine expedition was flawless from start to finish. Unforgettable.", author: "The Miller Family", role: "Group Travelers", image: "/images/avatars/avatar_miller_1784558652356.png", color: "glow-blue" },
  { quote: "The guides aren't just knowledgeable, they're truly passionate about the region.", author: "David Chen", role: "Photography Enthusiast", image: "/images/avatars/avatar_david_1784558666293.png", color: "glow-indigo" },
  { quote: "Sustainable, ethical, and absolutely stunning. A premium experience.", author: "Emma Watson", role: "Eco-Traveler", image: "/images/avatars/avatar_emma_1784558679373.png", color: "glow-purple" },
  { quote: "I've never felt so immersed in local culture. Every detail was planned beautifully.", author: "James Carter", role: "Culture Seeker", image: "https://i.pravatar.cc/150?u=james", color: "glow-pink" },
  { quote: "The transparent pricing changed how I travel. Zero hidden fees, just pure adventure.", author: "Aisha Patel", role: "Budget Traveler", image: "https://i.pravatar.cc/150?u=aisha", color: "glow-teal" },
  { quote: "The valley retreat was exactly the mental reset I needed. Simply breathtaking views.", author: "Liam O'Connor", role: "Wellness Advocate", image: "https://i.pravatar.cc/150?u=liam", color: "glow-blue" },
  { quote: "Smooth logistics and incredible stays. We are already booking our next trip with them!", author: "The Hendersons", role: "Couples Getaway", image: "https://i.pravatar.cc/150?u=hendersons", color: "glow-indigo" },
];

// Duplicate for seamless infinite scrolling marquee
const marqueeTestimonials = [...testimonials, ...testimonials];

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
          src={getAssetUrl("/videos/mountain.mp4")}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          poster={getAssetUrl("/videos/mountain-poster.webp")}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-navy-900/40 z-0 mix-blend-multiply" />
        
        <div className="container-main relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left mt-8 md:mt-0">
            <AnimeHeroTitle>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-md leading-[1.1]">
                <span className="anime-word inline-block">Life</span> <span className="anime-word inline-block">is</span> <span className="anime-word inline-block">not</span> <span className="anime-word inline-block">meant</span> <span className="anime-word inline-block">to</span> <span className="anime-word inline-block">be</span> <br className="hidden md:block" />
                <span className="anime-word inline-block text-teal-300 relative">
                  in one place.
                  <span className="anime-underline absolute -bottom-2 left-0 h-1.5 bg-teal-400"></span>
                </span>
              </h1>
            </AnimeHeroTitle>
            <p className="text-lg md:text-xl text-teal-50 mb-10 max-w-2xl mx-auto md:mx-0 drop-shadow-sm font-medium opacity-90 animate-slide-fade-in animation-delay-200">
              Wander far, explore the unseen, and journey beyond your horizon.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <GlowingButton href="/trips">
                <span className="flex items-center gap-2">
                  Explore Tours
                  <ArrowRight size={18} />
                </span>
              </GlowingButton>
              <GlowingButton href="/about">
                Our Story
              </GlowingButton>
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
        <WaveDivider className="text-white" />
      </section>

      {/* ═══════════════════════════════════════
          VALUE CARDS (Glassmorphism)
          ═══════════════════════════════════════ */}
      <section className="relative pt-16 pb-32 bg-white">
        <ScrollReveal className="container-main relative z-10">
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
        </ScrollReveal>
        <WaveDivider className="text-slate-50" />
      </section>

      {/* ═══════════════════════════════════════
          FEATURED TRIPS (page-02.png)
          ═══════════════════════════════════════ */}
      <section className="relative pt-16 pb-32 bg-slate-50 border-b border-slate-200">
        <ScrollReveal className="container-main relative z-10">
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
        </ScrollReveal>
        <WaveDivider className="text-slate-950" />
      </section>

      <DeferredGallery />

      {/* ═══════════════════════════════════════
          LIVELY TESTIMONIAL MARQUEE
          ═══════════════════════════════════════ */}
      <section className="py-24 bg-navy-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-navy-950 to-navy-950 z-0"></div>
        
        <ScrollReveal className="container-main mb-16 text-center relative z-10">
          <span className="text-teal-400 font-bold uppercase tracking-widest text-xs mb-3 block">Traveler Stories</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Don't just take our word for it.</h2>
        </ScrollReveal>
        
        {/* Infinite Marquee Container */}
        <div className="relative w-full overflow-hidden flex z-10 group">
          
          {/* Left and Right Fade Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-navy-950 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-navy-950 to-transparent z-20 pointer-events-none" />
          
          {/* Scrolling Track */}
          <div className="flex gap-6 md:gap-8 px-4 animate-marquee hover:animation-paused">
            {marqueeTestimonials.map((t, i) => (
              <div 
                key={i} 
                className={`kodplay-glow-card ${t.color || 'glow-teal'} w-[85vw] sm:w-80 md:w-96 shrink-0 relative overflow-hidden group/card hover:-translate-y-2 transition-all duration-300`}
              >
                <span></span>
                <div className="kodplay-content p-8 h-full flex flex-col justify-between bg-navy-900/90 backdrop-blur-md">
                  <div className="mb-6 relative">
                    <svg className="absolute -top-4 -left-4 w-10 h-10 text-white/5 transform -rotate-6" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-white/90 text-lg leading-relaxed relative z-10 font-medium">"{t.quote}"</p>
                  </div>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 group-hover/card:border-white/60 transition-colors shadow-lg">
                      {t.image.startsWith('http') ? (
                        <img src={t.image} alt={t.author} className="object-cover w-full h-full" />
                      ) : (
                        <Image src={getAssetUrl(t.image)} alt={t.author} fill sizes="48px" className="object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-white text-base">{t.author}</p>
                      <p className="text-xs font-semibold bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent animate-gradient-x">{t.role}</p>
                    </div>
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
          
          /* Infinite Marquee Animation */
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); } /* Scrolls exactly half the duplicated content width */
          }
          .animate-marquee {
            animation: marquee 35s linear infinite;
            width: fit-content;
          }
          .hover\\:animation-paused:hover {
            animation-play-state: paused;
          }
        `}} />
      </section>
    </div>
  );
}
