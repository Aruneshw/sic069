"use client";

import { useDeferredValue, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Filter,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
  Calendar,
  CheckCircle2,
  Compass,
  Clock,
  IndianRupee,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { formatInr, getAvailability, getCategoryPoster } from "@/lib/trips";
import RunningLetters from "@/components/ui/RunningLetters";
import { supabase } from "@/utils/supabase";
import ToastCard from "@/components/ui/ToastCard";
import { loadRazorpayScript } from "@/utils/razorpay";
import CompatibilityBadge from "@/components/ui/CompatibilityBadge";
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid";
import { SkeletonCard } from "@/components/ui/SkeletonBento";

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

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="bento-card group relative overflow-hidden rounded-[2rem] border border-[#780116]/12 bg-white shadow-xl hover:border-[#F7B538]/60 transition-all duration-400 flex flex-col justify-between"
    >
      {/* Top Image / Media Showcase */}
      <div className="relative aspect-[16/9] lg:aspect-[16/8] w-full overflow-hidden">
        {pkg.videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={pkg.imageUrl || getCategoryPoster(pkg.category || "Mountain")}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          >
            <source src={pkg.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={pkg.imageUrl || getCategoryPoster(pkg.category || "Mountain")}
            alt={pkg.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#150408]/85 via-[#150408]/20 to-transparent" />
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-3.5 py-1 bg-[#780116]/90 backdrop-blur-md text-[#F7B538] border border-[#F7B538]/30 text-[10px] font-black uppercase tracking-widest rounded-full shadow-md">
            {pkg.tierBadge}
          </span>
          <CompatibilityBadge item={pkg} size="sm" />
        </div>

        {/* Title over Image */}
        <div className="absolute bottom-4 left-5 right-5 z-10 text-white">
          <span className="font-script text-xl text-[#F7B538] drop-shadow-sm block leading-none mb-1">
            Handcrafted Journey
          </span>
          <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight leading-snug drop-shadow-md">
            {pkg.name}
          </h3>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow justify-between space-y-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider"
              style={{ backgroundColor: `${availability.tone}18`, border: `1px solid ${availability.tone}44`, color: availability.tone }}
            >
              {availability.label}
            </span>
            <span className="rounded-full border border-[#780116]/15 bg-[#FFFDF9] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#780116]">
              {pkg.duration}
            </span>
            <span className="rounded-full border border-[#F7B538]/40 bg-[#FAF3E7] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#150408]">
              Max {pkg.maxSeats} Pax
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4 line-clamp-2">
            {pkg.tagline}
          </p>

          {/* Mini Itinerary Timeline */}
          {itinerary.length > 0 && (
            <div className="space-y-2 mb-4">
              <div className="text-[10px] font-black uppercase tracking-widest text-[#780116]">Route Timeline</div>
              <div className="flex flex-wrap items-center gap-1.5">
                {itinerary.slice(0, 4).map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 bg-[#FAF3E7] border border-[#780116]/10 px-2.5 py-1 rounded-full text-[11px] text-[#150408] font-medium"
                  >
                    <span className="font-extrabold text-[#780116]">{step.day}</span>
                    <span className="truncate max-w-[100px] text-slate-600">{step.title}</span>
                    {idx < Math.min(itinerary.length - 1, 3) && <span className="text-[#F7B538]">→</span>}
                  </div>
                ))}
                {itinerary.length > 4 && (
                  <span className="text-[10px] font-bold text-[#780116] bg-[#780116]/10 px-2 py-0.5 rounded-full">
                    +{itinerary.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Inclusions Chips */}
          {inclusions.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-black uppercase tracking-widest text-[#780116]">Verified Inclusions</div>
              <div className="flex flex-wrap gap-1.5">
                {inclusions.slice(0, 3).map((inc, iIdx) => (
                  <span
                    key={iIdx}
                    className="text-[11px] bg-[#FFFDF9] text-slate-700 px-2.5 py-1 rounded-md border border-[#F7B538]/30 font-medium flex items-center gap-1"
                  >
                    <CheckCircle2 size={11} className="text-[#10B981] shrink-0" />
                    {inc}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Price & Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#780116]/10 mt-auto">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">All-Inclusive Bundle</div>
            <div className="text-2xl font-black text-[#150408]">
              {formatInr(pkg.bundlePrice)}
            </div>
          </div>

          <button
            onClick={onViewItinerary}
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-wider text-[#150408] bg-gradient-to-r from-[#F7B538] to-[#D49018] shadow-md hover:shadow-lg hover:shadow-[#F7B538]/30 transition-all hover:-translate-y-0.5"
          >
            Full Itinerary
            <ArrowRight size={14} />
          </button>
        </div>
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

    if (!deferredSearch) {
      return true;
    }

    const inclusions = JSON.parse(pkg.inclusions || "[]") as string[];
    const haystack = [
      pkg.name,
      pkg.tagline,
      pkg.tierBadge,
      ...inclusions,
    ]
      .join(" ")
      .toLowerCase();

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
        toast.error("Razorpay SDK failed to load. Are you online?");
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

            if (!apiRes.ok) throw new Error('Failed to submit enquiry');

            toast.custom((t) => (
              <ToastCard 
                t={t} 
                title="Expedition Reserved!" 
                message={`Your payment for ${pkg.name} was successful. Our team will contact you shortly to finalize details.`} 
                type="success" 
              />
            ));
            setActiveItineraryPackage(null);
          } catch (error) {
            toast.error("Payment received, logging enquiry...");
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
      rzp.on("payment.failed", function () {
        toast.error("Payment failed. Please try again.");
      });
      rzp.open();

    } catch (error) {
      toast.error("There was an issue opening checkout. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FFFDF9]">
      <Toaster position="bottom-center" reverseOrder={false} />

      {/* Hero Section */}
      <section className="relative pt-44 pb-20 md:pt-52 md:pb-28 overflow-hidden bg-gradient-to-br from-[#150408] via-[#330009] to-[#780116] text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F7B538]/15 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F7B538]/40 bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#F7B538] backdrop-blur-md mb-6">
              <Sparkles size={14} /> Curated Multi-Stop Journeys
            </span>

            <RunningLetters
              as="h1"
              text="Regional Multi-Stop Travel Bundles"
              className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-md"
            />

            <p className="font-script text-3xl text-[#F7B538] mb-4">
              Handcrafted routes with zero guesswork
            </p>

            <p className="text-slate-200 text-base leading-relaxed max-w-xl">
              Complete, end-to-end regional expeditions combining basecamp luxury, trail permits, guided trekking, and immersive local culture.
            </p>

            {/* Bento Quick Metrics */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
              <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/10 text-center">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#F7B538]">Bundles</div>
                <div className="text-2xl font-black text-white mt-1">{packages.length}</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/10 text-center">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#F7B538]">Rating</div>
                <div className="text-2xl font-black text-white mt-1">4.95 ★</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/10 text-center">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#F7B538]">Open Seats</div>
                <div className="text-2xl font-black text-white mt-1">{totalSeatsLeft}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="container-main relative -mt-8 z-20 mb-12">
        <div className="bg-white rounded-[2rem] p-4 md:p-6 border border-[#780116]/15 shadow-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search packages by name, tier, or inclusions..."
                className="w-full rounded-full border border-slate-200 bg-[#FFFDF9] py-3.5 pl-12 pr-4 text-xs font-medium text-slate-800 outline-none focus:border-[#F7B538] focus:ring-2 focus:ring-[#F7B538]/20 transition-all"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
              <span className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-black uppercase tracking-wider text-slate-400 whitespace-nowrap">
                <Filter size={14} /> Tier:
              </span>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-[#780116] text-[#F7B538] border border-[#F7B538]/40 shadow-md"
                      : "bg-[#FAF3E7] text-slate-600 hover:bg-[#FAF3E7]/80 border border-transparent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages Bento Grid */}
      <section className="container-main pb-28">
        {filteredPackages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-[#780116]/10 p-8">
            <Compass size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-[#150408] mb-2">No packages match your search</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">Try clearing your search terms or selecting a different tier filter.</p>
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
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setActiveItineraryPackage(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-[#FFFDF9] border border-[#F7B538]/30 rounded-[2.5rem] p-6 md:p-10 shadow-2xl z-10 max-h-[88vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveItineraryPackage(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#780116] bg-[#780116]/10 px-3 py-1 rounded-full border border-[#780116]/20">
                  {activeItineraryPackage.tierBadge}
                </span>
                <h2 className="text-2xl font-extrabold text-[#150408] mt-2">
                  {activeItineraryPackage.name}
                </h2>
                <p className="text-xs text-slate-500 mt-1">{activeItineraryPackage.tagline}</p>
              </div>

              {/* Itinerary Timeline List */}
              <div className="space-y-4 my-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#780116]">Day-by-Day Expedition Plan</h3>
                {(JSON.parse(activeItineraryPackage.itinerary || "[]") as any[]).map((step, sIdx) => (
                  <div key={sIdx} className="p-4 rounded-2xl bg-white border border-[#780116]/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#780116]">{step.day}</span>
                      {step.location && <span className="text-[10px] font-bold text-[#D49018]">{step.location}</span>}
                    </div>
                    <h4 className="text-sm font-bold text-[#150408]">{step.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>

              {/* Booking Action Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-[#780116]/10">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Price</div>
                  <div className="text-2xl font-black text-[#150408]">{formatInr(activeItineraryPackage.bundlePrice)}</div>
                </div>

                <button
                  onClick={() => handleBookPackage(activeItineraryPackage)}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#780116] to-[#4A000E] text-[#F7B538] font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:from-[#9B0822] hover:to-[#600112] transition-all border border-[#F7B538]/30"
                >
                  Confirm & Book Package
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
