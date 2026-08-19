"use client";

import { useDeferredValue, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Filter,
  Search,
  Sparkles,
  CheckCircle2,
  Compass,
  X,
  Calendar,
  CreditCard,
  Users,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { formatInr, getAvailability, getCategoryPoster } from "@/lib/trips";
import RunningLetters from "@/components/ui/RunningLetters";
import { supabase } from "@/utils/supabase";
import ToastCard from "@/components/ui/ToastCard";
import { loadRazorpayScript } from "@/utils/razorpay";
import CompatibilityBadge from "@/components/ui/CompatibilityBadge";
import { BentoGrid, BentoCard, BentoVariant } from "@/components/ui/BentoGrid";

export interface Package {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  tierBadge: string;
  category: string;
  bundlePrice: number;
  duration: string;
  maxSeats: number;
  filledSeats: number;
  imageUrl: string;
  videoUrl?: string | null;
  itinerary: string;
  inclusions: string;
  includedTripIds: string;
}

const BENTO_THEMES: BentoVariant[] = ["blush", "sage", "champagne", "lavender", "sky", "white"];

function PackageBentoCard({
  pkg,
  onViewItinerary,
  index = 0,
}: {
  pkg: Package;
  onViewItinerary: () => void;
  index?: number;
}) {
  const availability = getAvailability(pkg.maxSeats, pkg.filledSeats);
  let itinerary: { day: string; title: string; description: string; location?: string }[] = [];
  try {
    itinerary = JSON.parse(pkg.itinerary);
  } catch {
    itinerary = [];
  }

  let inclusions: string[] = [];
  try {
    inclusions = JSON.parse(pkg.inclusions);
  } catch {
    inclusions = [];
  }

  const variant = BENTO_THEMES[index % BENTO_THEMES.length];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`bento-card-base bento-${variant} flex flex-col justify-between group shadow-md hover:shadow-xl transition-all duration-400`}
    >
      <div>
        {/* Floating Top Image Frame */}
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 shadow-sm border border-black/5 bg-white">
          {pkg.videoUrl ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={pkg.imageUrl || getCategoryPoster(pkg.category || "Mountain")}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
              <source src={pkg.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <img
              src={pkg.imageUrl || getCategoryPoster(pkg.category || "Mountain")}
              alt={pkg.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <span className="px-3 py-1 bg-white/95 text-[#C8A55C] text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
              {pkg.tierBadge}
            </span>
            <CompatibilityBadge item={pkg} size="sm" />
          </div>

          <div className="absolute bottom-3 left-4 right-4 z-10 text-white">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#05070B] block leading-none mb-1">
              {pkg.duration}
            </span>
            <h3 className="text-lg font-black leading-snug drop-shadow-md">{pkg.name}</h3>
          </div>
        </div>

        {/* Status Badges Toolbar */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider bg-[rgba(12,22,38,0.85)] backdrop-blur-md shadow-xs border border-black/5"
            style={{ color: availability.tone }}
          >
            {availability.label}
          </span>
          <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#C8A55C] shadow-xs border border-black/5">
            Max {pkg.maxSeats} Pax
          </span>
        </div>

        <p className="text-xs text-[#94A3B8] leading-relaxed font-medium mb-4 line-clamp-2">
          {pkg.tagline}
        </p>

        {/* Floating Mini Route Strip */}
        {itinerary.length > 0 && (
          <div className="space-y-1.5 mb-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#C8A55C]">Expedition Route</div>
            <div className="flex flex-wrap items-center gap-1.5">
              {itinerary.slice(0, 3).map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 bg-white border border-black/5 px-2.5 py-1 rounded-full text-[10px] text-white font-bold shadow-xs"
                >
                  <span className="text-[#C8A55C]">{step.day}:</span>
                  <span className="truncate max-w-[90px]">{step.title}</span>
                </div>
              ))}
              {itinerary.length > 3 && (
                <span className="text-[10px] font-bold text-[#C8A55C] bg-white px-2 py-0.5 rounded-full shadow-xs">
                  +{itinerary.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Inclusions Chips */}
        {inclusions.length > 0 && (
          <div className="space-y-1.5">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#C8A55C]">Included Upfront</div>
            <div className="flex flex-wrap gap-1.5">
              {inclusions.slice(0, 3).map((inc, iIdx) => (
                <span
                  key={iIdx}
                  className="text-[10px] bg-white text-slate-800 px-2.5 py-1 rounded-md border border-black/5 font-bold flex items-center gap-1 shadow-xs"
                >
                  <CheckCircle2 size={11} className="text-emerald-600 shrink-0" />
                  {inc}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Price & View Itinerary CTA */}
      <div className="flex items-center justify-between pt-6 border-t border-black/5 mt-6">
        <div>
          <div className="text-[9px] font-black uppercase tracking-widest text-slate-300">All-Inclusive</div>
          <div className="text-2xl font-black text-white">{formatInr(pkg.bundlePrice)}</div>
        </div>

        <button
          onClick={onViewItinerary}
          className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white bg-[#C8A55C] shadow-md hover:bg-[#A8883A] transition-all hover:-translate-y-0.5"
        >
          View Plan <ArrowRight size={14} />
        </button>
      </div>
    </motion.article>
  );
}

export default function PackagesClient({ packages }: { packages: Package[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeItineraryPackage, setActiveItineraryPackage] = useState<Package | null>(null);
  const deferredSearch = useDeferredValue(searchTerm.trim().toLowerCase());

  const categories = ["All", ...Array.from(new Set(packages.map((pkg) => pkg.tierBadge || "Expedition")))];

  const filteredPackages = packages.filter((pkg) => {
    if (activeCategory !== "All" && pkg.tierBadge !== activeCategory) {
      return false;
    }
    if (!deferredSearch) return true;
    const inclusions = JSON.parse(pkg.inclusions || "[]") as string[];
    const haystack = [pkg.name, pkg.tagline, pkg.tierBadge, ...inclusions].join(" ").toLowerCase();
    return haystack.includes(deferredSearch);
  });

  const totalSeatsLeft = packages.reduce(
    (sum, pkg) => sum + Math.max(pkg.maxSeats - pkg.filledSeats, 0),
    0
  );

  const handleBookPackage = async (pkg: Package) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please log in to book a package.");
        return;
      }
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error("Razorpay SDK failed to load.");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TO9wFGcPnJD1l7",
        amount: pkg.bundlePrice * 100,
        currency: "INR",
        name: "Zero Gravity Tours",
        description: `Booking for ${pkg.name}`,
        handler: async function (response: any) {
          try {
            const apiRes = await fetch('/api/enquiry', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                packageId: pkg.id,
                userName: session.user.user_metadata?.full_name || session.user.email,
                userEmail: session.user.email,
                message: `Payment successful (Payment ID: ${response.razorpay_payment_id}). Booked the ${pkg.name} package.`,
              }),
            });
            if (!apiRes.ok) throw new Error('Failed to submit');
            toast.custom((t) => (
              <ToastCard 
                t={t} 
                title="Expedition Reserved!" 
                message={`Your payment for ${pkg.name} was successful.`} 
                type="success" 
              />
            ));
            setActiveItineraryPackage(null);
          } catch {
            toast.error("Payment received, syncing booking...");
          }
        },
        prefill: {
          name: session.user.user_metadata?.full_name || "",
          email: session.user.email || "",
        },
        theme: { color: "#780116" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch {
      toast.error("Issue opening checkout.");
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white pb-28">
      <Toaster position="bottom-center" reverseOrder={false} />

      {/* Hero */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 text-center px-4">
        <div className="container-main max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(12,22,38,0.85)] border border-[rgba(200,165,92,0.20)] text-xs font-black uppercase tracking-widest text-[#C8A55C] mb-4">
            <Sparkles size={14} className="text-[#C8A55C]" /> Curated Regional Packages
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3 leading-tight">
            Multi-Stop Regional Expeditions
          </h1>

          <p className="font-script text-3xl text-[#C8A55C] mb-4">
            Handcrafted routes with zero guesswork
          </p>

          <p className="text-slate-200 text-sm md:text-base max-w-xl mx-auto font-medium">
            Complete, end-to-end regional expeditions combining basecamp luxury, trail permits, guided trekking, and immersive local culture.
          </p>

          {/* Givingli 3-Card Summary Strip */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-8">
            <div className="p-4 rounded-2xl bg-[rgba(12,22,38,0.85)] border border-[rgba(255,255,255,0.06)] text-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-[#C8A55C]">Bundles</div>
              <div className="text-2xl font-black text-white mt-0.5">{packages.length}</div>
            </div>
            <div className="p-4 rounded-2xl bg-[rgba(12,22,38,0.85)] border border-[rgba(255,255,255,0.06)] text-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-[#C8A55C]">Rating</div>
              <div className="text-2xl font-black text-white mt-0.5">4.95 ★</div>
            </div>
            <div className="p-4 rounded-2xl bg-[rgba(12,22,38,0.85)] border border-[rgba(255,255,255,0.06)] text-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-[#34D399]">Open Seats</div>
              <div className="text-2xl font-black text-white mt-0.5">{totalSeatsLeft}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="container-main max-w-6xl mx-auto px-4 mb-12">
        <div className="bg-[rgba(12,22,38,0.85)] backdrop-blur-md rounded-[2rem] p-4 md:p-6 border border-[rgba(255,255,255,0.06)] shadow-lg flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search packages by destination, tier, or inclusions..."
              className="w-full rounded-full border border-slate-200 bg-transparent py-3 pl-11 pr-4 text-xs font-semibold text-white outline-none focus:border-[#F7B538] focus:ring-2 focus:ring-[#F7B538]/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 hide-scrollbar">
            <span className="text-xs font-black uppercase text-slate-400 tracking-wider whitespace-nowrap">Tier:</span>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? "bg-[#C8A55C] text-[#05070B] shadow-sm"
                    : "bg-transparent border border-slate-200 text-[#94A3B8] hover:bg-[rgba(12,22,38,0.85)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Bento Grid */}
      <section className="container-main max-w-6xl mx-auto px-4">
        {filteredPackages.length === 0 ? (
          <div className="text-center py-20 bg-[rgba(12,22,38,0.85)] backdrop-blur-md rounded-[2rem] border border-[rgba(255,255,255,0.06)] p-8 shadow-sm">
            <Compass size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No packages match your search</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">Try clearing search terms or selecting a different tier.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg, idx) => (
              <PackageBentoCard
                key={pkg.id}
                pkg={pkg}
                index={idx}
                onViewItinerary={() => setActiveItineraryPackage(pkg)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Itinerary Modal */}
      <AnimatePresence>
        {activeItineraryPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setActiveItineraryPackage(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-transparent border border-[rgba(255,255,255,0.08)] rounded-[2.5rem] p-6 md:p-10 shadow-2xl z-10 max-h-[88vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveItineraryPackage(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white hover:bg-slate-100 text-slate-200 transition-colors shadow-sm"
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#C8A55C] bg-[rgba(12,22,38,0.85)] px-3 py-1 rounded-full">
                  {activeItineraryPackage.tierBadge}
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-2">
                  {activeItineraryPackage.name}
                </h2>
                <p className="text-xs text-slate-200 mt-1">{activeItineraryPackage.tagline}</p>
              </div>

              {/* Itinerary Steps */}
              <div className="space-y-3 my-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#C8A55C]">Day-by-Day Expedition Plan</h3>
                {(JSON.parse(activeItineraryPackage.itinerary || "[]") as any[]).map((step, sIdx) => (
                  <div key={sIdx} className="p-4 rounded-2xl bg-white border border-black/5 space-y-1 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#C8A55C]">{step.day}</span>
                      {step.location && <span className="text-[10px] font-bold text-[#C8A55C]">{step.location}</span>}
                    </div>
                    <h4 className="text-sm font-bold text-white">{step.title}</h4>
                    <p className="text-xs text-slate-200 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-black/5">
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-300">Total Price</div>
                  <div className="text-2xl font-black text-white">{formatInr(activeItineraryPackage.bundlePrice)}</div>
                </div>

                <button
                  onClick={() => handleBookPackage(activeItineraryPackage)}
                  className="px-8 py-3.5 rounded-full bg-[#C8A55C] text-[#05070B] font-black text-xs uppercase tracking-wider shadow-lg hover:bg-[#A8883A] transition-all"
                >
                  Confirm & Reserve
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
