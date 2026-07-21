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
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { formatInr, getAvailability, getCategoryVideo, getCategoryPoster, getTripTheme } from "@/lib/trips";

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
  itinerary: string;       // JSON string: { day: string; title: string; description: string }[]
  inclusions: string;      // JSON string: string[]
  includedTripIds: string; // JSON string: string[]
}

function PackageRowCard({
  pkg,
  onViewItinerary,
}: {
  pkg: Package;
  onViewItinerary: () => void;
}) {
  const theme = getTripTheme(pkg.category);
  const availability = getAvailability(pkg.maxSeats, pkg.filledSeats);
  const itinerary = JSON.parse(pkg.itinerary) as { day: string; title: string; description: string }[];
  const inclusions = JSON.parse(pkg.inclusions) as string[];

  return (
    <motion.article
      layout
      className="glass-surface group relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/70 shadow-xl transition-shadow duration-300 hover:shadow-2xl"
      style={{ borderColor: theme.ring }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] min-h-[30rem] lg:min-h-[26rem]">
        {/* Left Side: Dynamic Video/Image Block */}
        <div className="relative overflow-hidden min-h-[16rem] lg:min-h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={getCategoryPoster(pkg.category)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
          >
            <source src={getCategoryVideo(pkg.category)} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-transparent lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:hidden block" />
          
          <div className="absolute left-6 top-6 flex flex-wrap gap-2 z-10">
            <span className="rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white backdrop-blur-xl">
              {pkg.category}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-10 text-white block lg:hidden">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] backdrop-blur-xl">
              {pkg.tierBadge}
            </span>
            <h3 className="text-2xl font-bold mt-2">{pkg.name}</h3>
          </div>
        </div>

        {/* Right Side: Detailed Content */}
        <div className="relative flex flex-col justify-between p-6 md:p-10 text-slate-800">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500 lg:inline-block hidden">
                {pkg.tierBadge}
              </span>
              <span
                className="rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em]"
                style={{ backgroundColor: `${availability.tone}22`, border: `1px solid ${availability.tone}55`, color: availability.tone }}
              >
                {availability.label}
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-600">
                {pkg.duration}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-950 lg:block hidden">
                {pkg.name}
              </h3>
              <p className="text-base text-slate-600 leading-relaxed font-light">
                {pkg.tagline}
              </p>
            </div>

            {/* Mini Itinerary Strip */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Itinerary Timeline</div>
              <div className="flex flex-wrap items-center gap-2">
                {itinerary.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-slate-100 border border-slate-200/60 px-3 py-1.5 rounded-full text-xs text-slate-700 font-medium"
                  >
                    <span className="font-bold text-teal-600 shrink-0">{step.day}</span>
                    <span className="text-slate-300">•</span>
                    <span className="truncate max-w-[120px] sm:max-w-none">{step.title}</span>
                    {idx < itinerary.length - 1 && <span className="text-slate-300 ml-1">→</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Includes Row */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Package Inclusions</div>
              <div className="flex flex-wrap gap-2">
                {inclusions.map((inc) => (
                  <span
                    key={inc}
                    className="text-xs bg-teal-50/50 text-teal-800 px-3 py-1 rounded-md border border-teal-100 font-medium flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={12} className="text-teal-600 shrink-0" />
                    {inc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-slate-100 pt-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Package from</div>
              <div className="mt-1 text-3xl font-extrabold tracking-tight text-slate-950">
                {formatInr(pkg.bundlePrice)}
              </div>
            </div>
            <button
              onClick={onViewItinerary}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
              style={{ background: theme.buttonGradient }}
            >
              View Itinerary
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function TrustCard({
  icon: Icon,
  title,
  body,
  index = 0,
}: {
  icon: typeof ShieldCheck;
  title: string;
  body: string;
  index?: number;
}) {
  const colors = ["glow-teal", "glow-blue", "glow-purple"];
  const glowColor = colors[index % colors.length];

  return (
    <div className={`kodplay-glow-card ${glowColor} w-full h-full group`}>
      <span></span>
      <div className="kodplay-content p-8 flex flex-col h-full">
        <div className="mb-4 inline-flex rounded-2xl bg-slate-950 px-3 py-3 text-white self-start">
          <Icon size={20} />
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-slate-950">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600 flex-grow">{body}</p>
      </div>
    </div>
  );
}

export default function PackagesClient({ packages }: { packages: Package[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeItineraryPackage, setActiveItineraryPackage] = useState<Package | null>(null);
  const deferredSearch = useDeferredValue(searchTerm.trim().toLowerCase());

  const categories = ["All", ...Array.from(new Set(packages.map((pkg) => pkg.category)))];
  const filteredPackages = packages.filter((pkg) => {
    if (activeCategory !== "All" && pkg.category !== activeCategory) {
      return false;
    }

    if (!deferredSearch) {
      return true;
    }

    const inclusions = JSON.parse(pkg.inclusions) as string[];
    const haystack = [
      pkg.name,
      pkg.tagline,
      pkg.category,
      pkg.tierBadge,
      ...inclusions,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(deferredSearch);
  });

  const averageRating = 4.8; // Set default luxury standard rating
  const totalSeatsLeft = packages.reduce(
    (sum, pkg) => sum + Math.max(pkg.maxSeats - pkg.filledSeats, 0),
    0
  );
  
  const strongestTheme = packages.length ? getTripTheme(packages[0].category) : getTripTheme("Coastal");

  const handleBookPackage = (pkg: Package) => {
    toast.success(`Enquiry submitted for ${pkg.name}!`, {
      icon: "🎉",
      style: {
        borderRadius: "12px",
        background: "#0F172A",
        color: "#fff",
      },
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="absolute inset-0" style={{ background: strongestTheme.ambientGradient }} />
      <div
        className="mesh-orb absolute -left-24 top-12 h-72 w-72 rounded-full blur-3xl"
        style={{ backgroundColor: `${strongestTheme.accent}33` }}
      />
      <div className="mesh-orb-delayed absolute right-[-6rem] top-[22rem] h-[24rem] w-[24rem] rounded-full bg-amber-300/20 blur-3xl" />
      <div className="mesh-orb absolute bottom-[-8rem] left-1/3 h-[26rem] w-[26rem] rounded-full bg-sky-300/20 blur-3xl" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container-main pt-48 pb-20 md:pt-56 lg:pt-64 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/50 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <Sparkles size={14} />
              Bundle-based Tour Design
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold leading-[1.05] md:leading-[0.96] tracking-tight md:tracking-[-0.04em] text-slate-950 md:text-7xl">
              Curated regional multi-stop travel packages.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Curated multi-stop itineraries — browse individual destinations under{" "}
              <Link href="/trips" className="text-teal-600 hover:underline font-bold transition-all">
                Trips
              </Link>.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3 max-w-3xl">
              <div className="kodplay-glow-card glow-blue w-full group">
                <span></span>
                <div className="kodplay-content p-6">
                  <div className="text-[10px] uppercase tracking-[0.26em] text-slate-400">Total Packages</div>
                  <div className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">{packages.length}</div>
                </div>
              </div>
              <div className="kodplay-glow-card glow-teal w-full group">
                <span></span>
                <div className="kodplay-content p-6">
                  <div className="text-[10px] uppercase tracking-[0.26em] text-slate-400">Average rating</div>
                  <div className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">{averageRating.toFixed(1)}</div>
                </div>
              </div>
              <div className="kodplay-glow-card glow-purple w-full group">
                <span></span>
                <div className="kodplay-content p-6">
                  <div className="text-[10px] uppercase tracking-[0.26em] text-slate-400">Seats available</div>
                  <div className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">{totalSeatsLeft}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Filter and Search Bar */}
        <section className="container-main pb-16">
          <div className="glass-surface rounded-[2rem] p-4 md:p-6 border border-white/30 bg-white/50 backdrop-blur-md">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search packages by destination, inclusion, or timeline..."
                  className="w-full rounded-full border border-white/50 bg-white/70 py-3.5 pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0 lg:pb-0">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-4 py-3 text-sm font-semibold text-slate-500 whitespace-nowrap">
                  <Filter size={16} />
                  Filters
                </span>
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-5 py-3 text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                      activeCategory === category
                        ? "text-white shadow-lg shadow-teal-500/20"
                        : "border border-white/50 bg-white/60 text-slate-600 hover:bg-white"
                    }`}
                    style={
                      activeCategory === category ? { background: strongestTheme.buttonGradient } : undefined
                    }
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vertical Rows Stack */}
        <section className="container-main pb-24">
          <div className="mb-10">
            <div className="text-xs font-bold uppercase tracking-[0.28em] text-slate-400">Curated Bundles</div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
              Immersive, multi-stop expeditions.
            </h2>
          </div>

          {filteredPackages.length > 0 ? (
            <div className="space-y-12">
              {filteredPackages.map((pkg) => (
                <PackageRowCard
                  key={pkg.id}
                  pkg={pkg}
                  onViewItinerary={() => setActiveItineraryPackage(pkg)}
                />
              ))}
            </div>
          ) : (
            <div className="glass-surface rounded-[2rem] p-16 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-slate-950">No packages match that filter</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Try choosing another category or clearing your search.
              </p>
            </div>
          )}
        </section>


      </div>

      {/* Fullscreen Glassmorphic Itinerary Modal */}
      <AnimatePresence>
        {activeItineraryPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItineraryPackage(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-5xl h-[85vh] md:h-[80vh] flex flex-col rounded-[2.5rem] bg-slate-950/85 border border-white/20 text-white shadow-2xl overflow-hidden z-10"
            >
              {/* Top Banner Area */}
              <div className="relative min-h-[14rem] md:min-h-[18rem] flex flex-col justify-end p-6 md:p-10 shrink-0">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={getCategoryPoster(activeItineraryPackage.category)}
                  className="absolute inset-0 w-full h-full object-cover -z-10"
                >
                  <source src={getCategoryVideo(activeItineraryPackage.category)} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent -z-10" />

                {/* Close Button */}
                <button
                  onClick={() => setActiveItineraryPackage(null)}
                  className="absolute top-6 right-6 p-3 rounded-full bg-black/60 hover:bg-black/80 transition-all border border-white/10"
                >
                  <X size={18} />
                </button>

                <div className="space-y-3">
                  <span className="rounded-full border border-white/30 bg-teal-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.24em] text-teal-300 backdrop-blur-md self-start">
                    {activeItineraryPackage.tierBadge}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                    {activeItineraryPackage.name}
                  </h2>
                  <p className="text-sm md:text-base text-white/80 font-light max-w-2xl">
                    {activeItineraryPackage.tagline}
                  </p>
                </div>
              </div>

              {/* Grid content space */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
                {/* Left Side: Detailed Itinerary */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-teal-300">
                    <Compass size={20} />
                    Day-by-Day Timeline
                  </h3>

                  <div className="relative border-l border-white/10 pl-6 ml-3 space-y-8">
                    {(
                      JSON.parse(activeItineraryPackage.itinerary) as {
                        day: string;
                        title: string;
                        description: string;
                      }[]
                    ).map((step, idx) => (
                      <div key={idx} className="relative">
                        {/* Dot indicator */}
                        <div className="absolute -left-[31px] top-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-teal-400 border-2 border-slate-950 shadow-md" />
                        
                        <div className="space-y-1">
                          <span className="text-xs font-extrabold text-teal-400 tracking-wider">
                            {step.day}
                          </span>
                          <h4 className="text-lg font-bold text-white">{step.title}</h4>
                          <p className="text-sm text-white/70 leading-relaxed font-light">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Price, Booking, Amenities */}
                <div className="flex flex-col justify-between space-y-6 lg:border-l lg:border-white/10 lg:pl-8">
                  <div className="space-y-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.24em] text-white/60 mb-2">
                        Comprehensive price
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-teal-300">
                          {formatInr(activeItineraryPackage.bundlePrice)}
                        </span>
                        <span className="text-xs uppercase tracking-widest text-white/50">INR / Bundle</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3">
                          <Calendar size={18} className="text-teal-400" />
                          <div className="text-sm font-semibold">Total Duration</div>
                        </div>
                        <span className="text-sm font-bold text-teal-300">{activeItineraryPackage.duration}</span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3">
                          <Users size={18} className="text-teal-400" />
                          <div className="text-sm font-semibold">Seats left</div>
                        </div>
                        <span className="text-sm font-bold text-orange-400">
                          {activeItineraryPackage.maxSeats - activeItineraryPackage.filledSeats} / {activeItineraryPackage.maxSeats}
                        </span>
                      </div>
                    </div>

                    {/* Inclusions list */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-[0.24em] text-white/60">
                        Included in Bundle
                      </h4>
                      <ul className="grid grid-cols-2 gap-3">
                        {(JSON.parse(activeItineraryPackage.inclusions) as string[]).map((inc) => (
                          <li key={inc} className="flex items-center gap-2 text-sm text-white/80">
                            <CheckCircle2 size={14} className="text-teal-400 shrink-0" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <button
                      onClick={() => handleBookPackage(activeItineraryPackage)}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 text-slate-950 text-sm font-black uppercase tracking-widest transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-teal-500/20"
                    >
                      Book Expedition
                    </button>
                    <p className="text-center text-[10px] text-white/50 uppercase tracking-widest">
                      Zero up-front charge — pay only after itinerary confirmation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .glass-surface {
          position: relative;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.65) 100%);
          backdrop-filter: blur(24px) saturate(1.3);
          -webkit-backdrop-filter: blur(24px) saturate(1.3);
        }

        .mesh-orb {
          animation: drift 18s ease-in-out infinite alternate;
        }

        .mesh-orb-delayed {
          animation: drift 22s ease-in-out infinite alternate-reverse;
        }

        @keyframes drift {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(32px, -28px, 0) scale(1.08);
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
