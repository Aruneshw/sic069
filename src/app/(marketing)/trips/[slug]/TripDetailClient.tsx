"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Star, Clock, MapPin, Users, Calendar as CalendarIcon, CheckCircle2, ChevronRight, Zap, Coffee, Compass } from "lucide-react";
import anime from "animejs";
import toast, { Toaster } from "react-hot-toast";
import { TripMap } from "@/components/ui/TripMap";
import { getCategoryVideo } from "@/lib/trips";

export default function TripDetailClient({ trip }: { trip: any }) {
  useEffect(() => {
    if (trip) {
      anime({
        targets: '.anime-stagger',
        translateX: [-30, 0],
        opacity: [0, 1],
        easing: 'easeOutQuint',
        duration: 1500,
        delay: anime.stagger(250, {start: 400})
      });
      
      anime({
        targets: '.anime-scale-up',
        scale: [0.97, 1],
        opacity: [0, 1],
        easing: 'easeOutQuint',
        duration: 1200,
        delay: anime.stagger(300, {start: 800})
      });
    }
  }, [trip]);

  const handleBooking = () => {
    toast.success("Awesome! Your expedition request has been sent.", {
      icon: '🔥',
      style: {
        borderRadius: '12px',
        background: '#0F172A',
        color: '#fff',
      },
    });
  };

  const highlights = JSON.parse(trip.highlights) as string[];
  const itinerary = JSON.parse(trip.itinerary) as { day: number; title: string; description: string }[];
  const included = JSON.parse(trip.included) as string[];

  return (
    <div className="liquid-bg min-h-screen pt-36 md:pt-48 pb-24 text-slate-100">
      <Toaster position="bottom-center" reverseOrder={false} />
      
      <div className="container-main">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-medium text-teal-200 mb-6 anime-stagger opacity-0">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/trips" className="hover:text-white transition-colors">Trips</Link>
          <ChevronRight size={14} />
          <span className="text-white font-bold">{trip.category}</span>
        </div>

        {/* Header */}
        <div className="mb-8 max-w-4xl">
          {trip.badge && (
            <span className="anime-stagger opacity-0 inline-block px-4 py-1.5 bg-gradient-to-r from-teal-400 to-teal-600 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4 shadow-lg shadow-teal-500/30">
              {trip.badge}
            </span>
          )}
          <h1 className="anime-stagger opacity-0 text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
            {trip.name}
          </h1>
          <p className="anime-stagger opacity-0 text-xl md:text-2xl text-teal-100/90 font-light drop-shadow-md">
            {trip.tagline}
          </p>
        </div>

        {/* Expedia-Style Image Mosaic (Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px] md:h-[500px] lg:h-[600px] mb-12 rounded-3xl overflow-hidden shadow-2xl">
          <div className="md:col-span-2 relative anime-scale-up opacity-0 group">
            <div className="absolute inset-0 bg-navy-900/50 animate-pulse -z-10" />
            <img 
              src={trip.imageUrl || "/images/trips-hero.png"} 
              alt={trip.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="hidden md:flex flex-col gap-4 h-full">
            <div className="flex-1 relative anime-scale-up opacity-0 group overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-navy-900/50 animate-pulse -z-10" />
              <img src="/images/trips/detail_1.png" alt="Luxury View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex-1 relative anime-scale-up opacity-0 group overflow-hidden rounded-2xl">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              >
                <source src={getCategoryVideo(trip.category)} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                Live Preview
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content (Left) */}
          <div className="flex-1 space-y-8 min-w-0">
            
            {/* Quick Overview Stats */}
            <div className="glass-panel p-6 rounded-3xl flex flex-wrap justify-between items-center gap-6 anime-stagger opacity-0">
              <div className="flex flex-col gap-1">
                <span className="text-teal-200 text-sm font-semibold uppercase tracking-widest">Rating</span>
                <div className="flex items-center gap-2">
                  <Star className="fill-warning text-warning drop-shadow-md" size={24} />
                  <span className="text-2xl font-bold text-white">{trip.rating}</span>
                </div>
              </div>
              <div className="w-px h-12 bg-white/20 hidden md:block" />
              <div className="flex flex-col gap-1">
                <span className="text-teal-200 text-sm font-semibold uppercase tracking-widest">Duration</span>
                <div className="flex items-center gap-2">
                  <Clock className="text-white drop-shadow-md" size={24} />
                  <span className="text-2xl font-bold text-white">{trip.duration}</span>
                </div>
              </div>
              <div className="w-px h-12 bg-white/20 hidden md:block" />
              <div className="flex flex-col gap-1">
                <span className="text-teal-200 text-sm font-semibold uppercase tracking-widest">Type</span>
                <div className="flex items-center gap-2">
                  <Compass className="text-white drop-shadow-md" size={24} />
                  <span className="text-2xl font-bold text-white">{trip.category}</span>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="glass-panel p-8 md:p-12 rounded-3xl anime-stagger opacity-0">
              <h2 className="text-3xl font-extrabold text-white mb-6 tracking-tight">The Experience</h2>
              <p className="text-teal-50/90 text-lg leading-relaxed font-light">{trip.description}</p>
            </div>

            {/* Highlights Grid */}
            <div className="glass-panel p-8 md:p-12 rounded-3xl anime-stagger opacity-0">
              <h2 className="text-3xl font-extrabold text-white mb-8 tracking-tight">Expedition Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="p-2 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl shadow-lg shadow-teal-500/20 shrink-0">
                      <Zap size={20} className="text-white fill-white" />
                    </div>
                    <span className="text-white font-medium leading-tight pt-1">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Explore Area (Map) */}
            <div className="glass-panel p-8 md:p-12 rounded-3xl anime-stagger opacity-0">
              <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Explore the Area</h2>
              <p className="text-teal-200/80 mb-8">Get a sense of your surroundings and key landmarks.</p>
              <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                <TripMap location={trip.name} />
              </div>
            </div>

            {/* Itinerary */}
            <div className="glass-panel p-8 md:p-12 rounded-3xl anime-stagger opacity-0">
              <h2 className="text-3xl font-extrabold text-white mb-8 tracking-tight">Daily Itinerary</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-teal-400 before:via-white/20 before:to-transparent">
                {itinerary.map((day, idx) => (
                  <div key={day.day} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-500 text-white font-bold shadow-xl shadow-teal-500/40 border-4 border-navy-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      {day.day}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-2xl border border-white/10 transition-transform duration-300 hover:-translate-y-1">
                      <h3 className="text-xl font-bold text-white mb-2">{day.title}</h3>
                      <p className="text-teal-50/80 font-light">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Booking Sidebar (Right) */}
          <div className="w-full lg:w-[420px] shrink-0">
            <div className="sticky top-32 glass-panel p-8 border border-white/20 shadow-2xl rounded-[2rem] anime-stagger opacity-0">
              
              <div className="flex items-end justify-between border-b border-white/10 pb-6 mb-8">
                <div>
                  <span className="text-xs font-bold text-teal-200 uppercase tracking-widest block mb-2 drop-shadow-md">Price per person</span>
                  <div className="flex items-end gap-2">
                     <span className="text-5xl font-extrabold text-white tracking-tighter drop-shadow-lg">${trip.price}</span>
                     <span className="text-teal-100 font-medium mb-1 drop-shadow-md">USD</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 transition-colors rounded-2xl border border-white/10 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-teal-500/20 rounded-xl text-teal-300">
                      <CalendarIcon size={24} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">Select Date</div>
                      <div className="text-sm text-teal-200/80">View available departures</div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-teal-300/50" />
                </div>
                
                <div className="flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 transition-colors rounded-2xl border border-white/10 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-teal-500/20 rounded-xl text-teal-300">
                      <Users size={24} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">Travelers</div>
                      <div className="text-sm text-teal-200/80">2 Adults</div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-teal-300/50" />
                </div>
              </div>

              <button 
                onClick={handleBooking}
                className="w-full py-4 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 text-navy-900 text-lg font-black rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-glow-cta uppercase tracking-widest"
              >
                Book Now
              </button>
              
              <p className="text-center text-xs text-teal-200/60 font-medium mt-6 uppercase tracking-wider">
                No payment required for enquiry.
              </p>

              {/* What's Included Mini-List */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-widest">Included Amenities</h4>
                <ul className="space-y-4">
                  {included.slice(0, 4).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-teal-50/90 font-medium">
                      <div className="p-1 bg-white/10 rounded-full mt-0.5 shrink-0">
                        <CheckCircle2 size={14} className="text-teal-300" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                  {included.length > 4 && (
                    <li className="text-xs text-teal-400 font-bold uppercase tracking-widest cursor-pointer pt-2 hover:text-teal-300 transition-colors">
                      + View {included.length - 4} more amenities
                    </li>
                  )}
                </ul>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
