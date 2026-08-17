"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, CalendarDays, Search, Filter, Compass, Sparkles } from "lucide-react";
import TripCard from "@/components/ui/TripCard";
import { getAssetUrl } from "@/lib/trips";
import RunningLetters from "@/components/ui/RunningLetters";

export default function TripsClient({ trips }: { trips: any[] }) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setCategory(cat);
    } else {
      setCategory("All");
    }
  }, [searchParams]);

  const filteredTrips = trips.filter((t) => {
    const matchesCategory = category === "All" || t.category === category;
    const matchesSearch = !searchTerm.trim() || 
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["All", "Coastal", "Mountain", "Urban", "Valley"];

  return (
    <div className="bg-[#FFFDF9] min-h-screen pb-28">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#150408] via-[#330009] to-[#780116] min-h-[460px] flex items-center justify-center">
        <img
          src={getAssetUrl("/images/trips-hero.png")}
          alt="Travel planning flat lay"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#150408] via-transparent to-black/30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F7B538]/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-36 md:py-44">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#F7B538]/40 text-xs font-black text-[#F7B538] uppercase tracking-widest mb-4 shadow-md">
            <Sparkles size={14} /> Curated Regional Expeditions
          </span>
          <RunningLetters
            as="h1"
            text="Find Your Next Horizon"
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 drop-shadow-xl leading-[1.1]"
          />
          <p className="font-script text-3xl text-[#F7B538] mb-4">
            Bespoke itineraries tailored for mindful explorers
          </p>
          <p className="text-base md:text-lg text-slate-200 max-w-2xl mx-auto drop-shadow-sm font-normal">
            Browse our complete collection of verified regional journeys, from peaceful coastal retreats to rigorous alpine ascents.
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="container-main relative -mt-10 z-20 mb-14">
        <div className="bg-white rounded-[2rem] shadow-xl p-5 md:p-7 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#780116]/12">
          
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                  category === cat
                    ? "bg-[#780116] text-[#F7B538] border border-[#F7B538]/40 shadow-md"
                    : "bg-[#FAF3E7] text-slate-700 hover:bg-[#FAF3E7]/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & View Switcher */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className="relative flex-1 md:w-64">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search expeditions..."
                className="pl-10 pr-4 py-2.5 bg-[#FFFDF9] border border-slate-200 rounded-full text-xs font-medium text-slate-800 focus:outline-none focus:border-[#F7B538] focus:ring-2 focus:ring-[#F7B538]/20 w-full transition-all"
              />
            </div>

            <div className="flex bg-[#FAF3E7] p-1 rounded-2xl border border-[#780116]/10 shrink-0">
              <div className="px-3.5 py-1.5 bg-[#780116] text-[#F7B538] shadow-sm rounded-xl flex items-center gap-2 font-black text-xs uppercase tracking-wider">
                <LayoutGrid size={14} />
                <span className="hidden sm:inline">Grid</span>
              </div>
              <Link href="/trips/calendar" className="px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-slate-600 hover:text-[#780116] font-bold text-xs uppercase tracking-wider transition-colors no-underline">
                <CalendarDays size={14} />
                <span className="hidden sm:inline">Calendar</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="container-main">
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip, index) => (
              <div key={trip.id} className="h-full">
                <TripCard trip={trip} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-[#780116]/10 p-8 shadow-sm">
            <Compass size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-extrabold text-[#150408] mb-2">No expeditions found</h3>
            <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">We couldn&apos;t find any journeys matching your active filters.</p>
            <button onClick={() => { setCategory("All"); setSearchTerm(""); }} className="btn-primary">
              View All Expeditions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
