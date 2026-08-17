"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Star, Clock, MapPin, Users, Calendar as CalendarIcon, CheckCircle2, ChevronRight, Zap, Coffee, Compass, Sparkles } from "lucide-react";
import anime from "animejs";
import toast, { Toaster } from "react-hot-toast";
import { TripMap } from "@/components/ui/TripMap";
import { formatInr, getTripTheme, getCategoryVideo, getAvailability, getAssetUrl } from "@/lib/trips";
import { supabase } from "@/utils/supabase";
import ToastCard from "@/components/ui/ToastCard";
import { loadRazorpayScript } from "@/utils/razorpay";
import CompatibilityBadge from "@/components/ui/CompatibilityBadge";
import LocalGuideModal from "@/components/ui/LocalGuideModal";
import RejectionLearningModal from "@/components/ui/RejectionLearningModal";
import WhatLocalsKnow from "@/components/wom/WhatLocalsKnow";
import { WomScoreCard, RealityCheckCard, WorthItCard, LocalPulseCard } from "@/components/wom/WomCards";
import AskALocal from "@/components/wom/AskALocal";
import TellNextTraveler from "@/components/wom/TellNextTraveler";
import { getWomInsightsForDestination, getWomScore, getRealityCheck, getLocalPulse, calculateWorthIt } from "@/lib/wordOfMouth";
import { useAppStore } from "@/store/useAppStore";
import { MessageCircle } from "lucide-react";

export default function TripDetailClient({ trip }: { trip: any }) {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isTellNextOpen, setIsTellNextOpen] = useState(false);

  const travelDna = useAppStore((state) => state.travelDna);
  const travelState = useAppStore((state) => state.travelState);

  const destinationName = trip?.name || "South India";
  const womInsights = getWomInsightsForDestination(destinationName);
  const womScore = getWomScore(destinationName);
  const realityCheck = getRealityCheck(destinationName);
  const localPulse = getLocalPulse(destinationName);
  const worthItResult = calculateWorthIt(destinationName, travelDna, travelState);
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

  const handleBooking = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please log in to book this trip.");
        return;
      }

      const res = await loadRazorpayScript();
      if (!res) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TO9wFGcPnJD1l7",
        amount: trip.price * 100, // Amount in paise
        currency: "INR",
        name: "Zero Gravity Tours",
        description: `Booking for ${trip.name}`,
        handler: async function (response: any) {
          try {
            const apiRes = await fetch('/api/enquiry', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                tripId: trip.id,
                userName: session.user.user_metadata?.full_name || session.user.email,
                userEmail: session.user.email,
                message: `Payment successful (Payment ID: ${response.razorpay_payment_id}). Booked the ${trip.name} trip.`,
              }),
            });

            if (!apiRes.ok) throw new Error('Failed to submit enquiry');

            toast.custom((t) => (
              <ToastCard 
                t={t} 
                title="Expedition Confirmed!" 
                message={`Awesome! Your payment for ${trip.name} was successful. Our team will contact you shortly.`} 
                type="success" 
              />
            ));
          } catch (error) {
            toast.custom((t) => (
              <ToastCard 
                t={t} 
                title="Payment Saved, Sync Failed" 
                message="Your payment was successful but we couldn't log the request. Please contact support." 
                type="error" 
              />
            ));
          }
        },
        prefill: {
          name: session.user.user_metadata?.full_name || "",
          email: session.user.email || "",
        },
        theme: {
          color: "#780116",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        toast.error("Payment failed. Please try again.");
      });
      rzp.open();

    } catch (error) {
      toast.custom((t) => (
        <ToastCard 
          t={t} 
          title="Checkout Failed" 
          message="There was an issue opening the checkout. Please try again." 
          type="error" 
        />
      ));
    }
  };

  const highlights = JSON.parse(trip.highlights) as string[];
  const itinerary = JSON.parse(trip.itinerary) as { day: number; title: string; description: string }[];
  const included = JSON.parse(trip.included) as string[];

  return (
    <div className="min-h-screen pt-32 md:pt-44 pb-24 bg-[#FBF9F5]">
      <Toaster position="bottom-center" reverseOrder={false} />
      
      <div className="container-main px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-semibold text-[#780116]/60 mb-6 anime-stagger opacity-0" style={{ fontFamily: "var(--font-poppins)" }}>
          <Link href="/" className="hover:text-[#780116] transition-colors no-underline text-slate-500">Home</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <Link href="/trips" className="hover:text-[#780116] transition-colors no-underline text-slate-500">Trips</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-[#780116] font-bold">{trip.category}</span>
        </div>

        {/* Header */}
        <div className="mb-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {trip.badge && (
              <span
                className="anime-stagger opacity-0 inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full text-white"
                style={{
                  background: "linear-gradient(145deg, #F9C862, #D49018)",
                  boxShadow: "4px 4px 12px rgba(168,110,12,0.2), inset 1px 1px 3px rgba(255,255,255,0.3)",
                  color: "#150408",
                }}
              >
                {trip.badge}
              </span>
            )}
            <CompatibilityBadge item={trip} onRejectClick={() => setIsRejectOpen(true)} size="lg" />
            <button
              onClick={() => setIsGuideOpen(true)}
              className="bento-card-base px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider rounded-full flex items-center gap-1.5 !p-0 !rounded-full"
              style={{
                padding: "6px 16px",
                borderRadius: 100,
                background: "#FFFFFF",
                border: "2px solid rgba(120,1,22,0.12)",
                color: "#780116",
                boxShadow: "4px 4px 12px rgba(120,1,22,0.06), -2px -2px 8px rgba(255,255,255,0.9), inset 1px 1px 3px rgba(255,255,255,0.7)",
              }}
            >
              <Compass size={14} className="text-[#D49018]" /> Ask Local Guide
            </button>
          </div>

          <h1
            className="anime-stagger opacity-0 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#150408] mb-4 leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {trip.name}
          </h1>
          <p className="anime-stagger opacity-0 text-lg md:text-xl text-slate-600 font-medium" style={{ fontFamily: "var(--font-poppins)" }}>
            {trip.tagline}
          </p>
        </div>

        {/* Image Mosaic (Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-[350px] md:h-[480px] lg:h-[560px] mb-14 anime-scale-up opacity-0">
          <div className="md:col-span-2 relative group overflow-hidden" style={{ borderRadius: 28, boxShadow: "8px 8px 24px rgba(120,1,22,0.1), -4px -4px 14px rgba(255,255,255,0.8)" }}>
            <div className="absolute inset-0 bg-[#FAF0DF] animate-pulse -z-10" style={{ borderRadius: 28 }} />
            <img 
              src={getAssetUrl(trip.imageUrl || "/images/trips-hero.png")} 
              alt={trip.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ borderRadius: 28 }}
            />
          </div>
          <div className="hidden md:flex flex-col gap-5 h-full">
            <div className="flex-1 relative group overflow-hidden" style={{ borderRadius: 24, boxShadow: "6px 6px 18px rgba(120,1,22,0.08), -3px -3px 10px rgba(255,255,255,0.8)" }}>
              <div className="absolute inset-0 bg-[#FDE8EC] animate-pulse -z-10" />
              <img src={getAssetUrl("/images/trips/detail_1.png")} alt="Luxury View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ borderRadius: 24 }} />
            </div>
            <div className="flex-1 relative group overflow-hidden" style={{ borderRadius: 24, boxShadow: "6px 6px 18px rgba(120,1,22,0.08), -3px -3px 10px rgba(255,255,255,0.8)" }}>
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ borderRadius: 24 }}
              >
                <source src={getCategoryVideo(trip.category)} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/10 pointer-events-none" style={{ borderRadius: 24 }} />
              <div
                className="absolute bottom-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{
                  background: "rgba(255,253,249,0.92)",
                  backdropFilter: "blur(10px)",
                  border: "1.5px solid rgba(247,181,56,0.3)",
                  color: "#780116",
                  boxShadow: "3px 3px 10px rgba(0,0,0,0.08)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-[#F7B538] animate-pulse" />
                Live Preview
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content (Left) */}
          <div className="flex-1 space-y-8 min-w-0">
            
            {/* Quick Overview Stats */}
            <div className="bento-card-base bento-white p-6 flex flex-wrap justify-between items-center gap-6 anime-stagger opacity-0">
              <div className="flex flex-col gap-1">
                <span className="text-[#D49018] text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-poppins)" }}>Rating</span>
                <div className="flex items-center gap-2">
                  <Star className="fill-[#F7B538] text-[#F7B538]" size={22} />
                  <span className="text-2xl font-extrabold text-[#150408]">{trip.rating}</span>
                </div>
              </div>
              <div className="w-px h-12 bg-[#780116]/10 hidden md:block" />
              <div className="flex flex-col gap-1">
                <span className="text-[#D49018] text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-poppins)" }}>Duration</span>
                <div className="flex items-center gap-2">
                  <Clock className="text-[#780116]" size={22} />
                  <span className="text-2xl font-extrabold text-[#150408]">{trip.duration}</span>
                </div>
              </div>
              <div className="w-px h-12 bg-[#780116]/10 hidden md:block" />
              <div className="flex flex-col gap-1">
                <span className="text-[#D49018] text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-poppins)" }}>Type</span>
                <div className="flex items-center gap-2">
                  <Compass className="text-[#780116]" size={22} />
                  <span className="text-2xl font-extrabold text-[#150408]">{trip.category}</span>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bento-card-base bento-champagne p-8 md:p-12 anime-stagger opacity-0">
              <h2 className="text-3xl font-extrabold text-[#150408] mb-5 tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>The Experience</h2>
              <p className="text-slate-700 text-lg leading-relaxed">{trip.description}</p>
            </div>

            {/* Highlights Grid */}
            <div className="bento-card-base bento-white p-8 md:p-12 anime-stagger opacity-0">
              <h2 className="text-3xl font-extrabold text-[#150408] mb-8 tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>Expedition Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-5 rounded-2xl transition-all hover:-translate-y-1"
                    style={{
                      background: idx % 4 === 0 ? "#FDE8EC" : idx % 4 === 1 ? "#EBF5EE" : idx % 4 === 2 ? "#F0EEFA" : "#E6F2F8",
                      border: "2px solid rgba(0,0,0,0.04)",
                      boxShadow: "4px 4px 12px rgba(0,0,0,0.04), -2px -2px 8px rgba(255,255,255,0.8), inset 1px 1px 3px rgba(255,255,255,0.5)",
                    }}
                  >
                    <div
                      className="p-2 rounded-xl shrink-0"
                      style={{
                        background: "linear-gradient(145deg, #F9C862, #D49018)",
                        boxShadow: "3px 3px 8px rgba(168,110,12,0.2), inset 1px 1px 2px rgba(255,255,255,0.3)",
                      }}
                    >
                      <Zap size={18} className="text-white fill-white" />
                    </div>
                    <span className="text-[#150408] font-semibold leading-tight pt-1" style={{ fontFamily: "var(--font-poppins)" }}>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Explore Area (Map) */}
            <div className="bento-card-base bento-white p-8 md:p-12 anime-stagger opacity-0">
              <h2 className="text-3xl font-extrabold text-[#150408] mb-2 tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>Explore the Area</h2>
              <p className="text-slate-500 mb-8 font-medium">Get a sense of your surroundings and key landmarks.</p>
              <div className="rounded-2xl overflow-hidden border-2 border-[#780116]/8" style={{ boxShadow: "6px 6px 18px rgba(0,0,0,0.06)" }}>
                <TripMap location={trip.name} />
              </div>
            </div>

            {/* Word-of-Mouth Intelligence Layer */}
            <div className="space-y-8 anime-stagger opacity-0">
              <WorthItCard result={worthItResult} destination={destinationName} />

              <div className="bento-card-base bento-lavender p-8 md:p-10">
                <WhatLocalsKnow destination={destinationName} insights={womInsights} />
              </div>

              <AskALocal destination={destinationName} tripId={trip.id} />

              {/* Tell Next Traveler CTA */}
              <div
                className="bento-card-base p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                style={{
                  background: "linear-gradient(145deg, #FAF0DF 0%, #FDE8EC 100%)",
                  border: "2px solid rgba(247,181,56,0.25)",
                  boxShadow: "8px 8px 22px rgba(168,110,12,0.1), -4px -4px 12px rgba(255,255,255,0.7), inset 2px 2px 6px rgba(255,255,255,0.5)",
                }}
              >
                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#D49018]" style={{ fontFamily: "var(--font-poppins)" }}>You&apos;ve been here before?</div>
                  <h4 className="text-lg font-bold text-[#150408]" style={{ fontFamily: "var(--font-poppins)" }}>Help the Next Traveler</h4>
                  <p className="text-xs text-slate-500 font-medium">Share your experience — what to avoid, actual costs, and local tips.</p>
                </div>
                <button
                  onClick={() => setIsTellNextOpen(true)}
                  className="shrink-0 flex items-center gap-2 font-bold text-sm text-white rounded-full px-6 py-3 transition-all hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(145deg, #8B021A, #4A000E)",
                    border: "2px solid rgba(247,181,56,0.35)",
                    boxShadow: "4px 4px 14px rgba(74,0,14,0.3), inset 1px 1px 4px rgba(247,181,56,0.1)",
                    fontFamily: "var(--font-poppins)",
                  }}
                >
                  <MessageCircle size={16} className="text-[#F7B538]" /> Share Experience
                </button>
              </div>
            </div>

            {/* Itinerary */}
            <div className="bento-card-base bento-white p-8 md:p-12 anime-stagger opacity-0">
              <h2 className="text-3xl font-extrabold text-[#150408] mb-8 tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>Daily Itinerary</h2>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#F7B538] before:via-[#780116]/20 before:to-transparent">
                {itinerary.map((day, idx) => (
                  <div key={day.day} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-full font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-white text-sm"
                      style={{
                        background: "linear-gradient(145deg, #F9C862, #D49018)",
                        border: "3px solid #FBF9F5",
                        color: "#150408",
                        boxShadow: "4px 4px 12px rgba(168,110,12,0.25), inset 1px 1px 3px rgba(255,255,255,0.4)",
                        fontFamily: "var(--font-poppins)",
                      }}
                    >
                      {day.day}
                    </div>
                    <div
                      className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl transition-transform duration-300 hover:-translate-y-1"
                      style={{
                        background: "#FFFFFF",
                        border: "2px solid rgba(120,1,22,0.06)",
                        boxShadow: "5px 5px 16px rgba(0,0,0,0.05), -3px -3px 10px rgba(255,255,255,0.9), inset 1px 1px 4px rgba(255,255,255,0.7)",
                      }}
                    >
                      <h3 className="text-lg font-bold text-[#150408] mb-2" style={{ fontFamily: "var(--font-poppins)" }}>{day.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Booking Sidebar (Right) */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div
              className="sticky top-32 bento-card-base p-8 anime-stagger opacity-0"
              style={{
                background: "#FFFFFF",
                border: "2px solid rgba(247,181,56,0.2)",
                borderRadius: 32,
                boxShadow: "10px 10px 30px rgba(120,1,22,0.08), -5px -5px 16px rgba(255,255,255,0.9), inset 2px 2px 6px rgba(255,255,255,0.7), inset -1px -1px 4px rgba(0,0,0,0.02)",
              }}
            >
              
              <div className="flex items-end justify-between border-b-2 border-[#780116]/8 pb-6 mb-8">
                <div>
                  <span className="text-[11px] font-bold text-[#D49018] uppercase tracking-widest block mb-2" style={{ fontFamily: "var(--font-poppins)" }}>Price per person</span>
                  <div className="flex items-end gap-2">
                     <span className="text-5xl font-extrabold text-[#150408] tracking-tighter" style={{ fontFamily: "var(--font-poppins)" }}>${trip.price}</span>
                     <span className="text-[#780116] font-bold mb-1 text-sm" style={{ fontFamily: "var(--font-poppins)" }}>USD</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div
                  className="flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5"
                  style={{
                    background: "#FAF0DF",
                    border: "2px solid rgba(247,181,56,0.18)",
                    boxShadow: "4px 4px 12px rgba(168,110,12,0.06), -2px -2px 8px rgba(255,255,255,0.8), inset 1px 1px 3px rgba(255,255,255,0.5)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl" style={{ background: "linear-gradient(145deg, #F9C862, #D49018)", boxShadow: "2px 2px 6px rgba(168,110,12,0.2)" }}>
                      <CalendarIcon size={20} className="text-[#150408]" />
                    </div>
                    <div>
                      <div className="text-[#150408] font-bold text-base" style={{ fontFamily: "var(--font-poppins)" }}>Select Date</div>
                      <div className="text-xs text-slate-500 font-medium">View available departures</div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-[#D49018]" />
                </div>
                
                <div
                  className="flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5"
                  style={{
                    background: "#EBF5EE",
                    border: "2px solid rgba(134,194,156,0.2)",
                    boxShadow: "4px 4px 12px rgba(134,194,156,0.1), -2px -2px 8px rgba(255,255,255,0.8), inset 1px 1px 3px rgba(255,255,255,0.5)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl" style={{ background: "#86C29C", boxShadow: "2px 2px 6px rgba(20,83,45,0.15)" }}>
                      <Users size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-[#150408] font-bold text-base" style={{ fontFamily: "var(--font-poppins)" }}>Travelers</div>
                      <div className="text-xs text-slate-500 font-medium">2 Adults</div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-[#86C29C]" />
                </div>
              </div>

              <button 
                onClick={handleBooking}
                className="w-full py-4 text-lg font-black rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] uppercase tracking-widest text-white"
                style={{
                  fontFamily: "var(--font-poppins)",
                  background: "linear-gradient(145deg, #8B021A, #4A000E)",
                  border: "2px solid rgba(247,181,56,0.4)",
                  boxShadow: "6px 6px 20px rgba(74,0,14,0.35), -3px -3px 10px rgba(155,8,34,0.1), inset 2px 2px 6px rgba(247,181,56,0.1), inset -2px -2px 4px rgba(0,0,0,0.2)",
                }}
              >
                Book Now
              </button>
              
              <p className="text-center text-[11px] text-slate-400 font-medium mt-5 uppercase tracking-wider" style={{ fontFamily: "var(--font-poppins)" }}>
                No payment required for enquiry.
              </p>

              {/* What's Included Mini-List */}
              <div className="mt-8 pt-6 border-t-2 border-[#780116]/6">
                <h4 className="text-xs font-bold text-[#150408] mb-5 uppercase tracking-widest" style={{ fontFamily: "var(--font-poppins)" }}>Included Amenities</h4>
                <ul className="space-y-3">
                  {included.slice(0, 4).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                      <div className="p-1 bg-[#EBF5EE] rounded-full mt-0.5 shrink-0" style={{ boxShadow: "2px 2px 6px rgba(134,194,156,0.15)" }}>
                        <CheckCircle2 size={14} className="text-[#14532D]" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                  {included.length > 4 && (
                    <li className="text-xs text-[#D49018] font-bold uppercase tracking-widest cursor-pointer pt-2 hover:text-[#F7B538] transition-colors" style={{ fontFamily: "var(--font-poppins)" }}>
                      + View {included.length - 4} more amenities
                    </li>
                  )}
                </ul>
              </div>

              {/* Sidebar Word-of-Mouth Intelligence Card */}
              <div className="mt-8 pt-6 border-t-2 border-[#780116]/6">
                <WomScoreCard score={womScore} />
              </div>

            </div>
          </div>
          
        </div>
      </div>

      <LocalGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} tripName={trip.name} />
      <RejectionLearningModal isOpen={isRejectOpen} onClose={() => setIsRejectOpen(false)} itemId={trip.id} itemTitle={trip.name} />
      <TellNextTraveler isOpen={isTellNextOpen} onClose={() => setIsTellNextOpen(false)} destinationName={destinationName} tripId={trip.id} />
    </div>
  );
}
