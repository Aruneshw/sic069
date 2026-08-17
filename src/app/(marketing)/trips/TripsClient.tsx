"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, CalendarDays, Search, Compass, Sparkles } from "lucide-react";
import TripCard from "@/components/ui/TripCard";
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
    const matchesSearch =
      !searchTerm.trim() ||
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["All", "Coastal", "Mountain", "Urban", "Valley"];

  return (
    <div className="bg-[#FBF9F5] min-h-screen pb-28 text-[#150408]">
      {/* Hero */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 text-center px-4">
        <div className="container-main max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDE8EC] border border-[#780116]/20 text-xs font-black text-[#780116] uppercase tracking-widest mb-4">
            <Sparkles size={14} /> Curated Regional Expeditions
          </span>

          <RunningLetters
            as="h1"
            text="Find Your Next Horizon"
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#150408] mb-3 leading-tight"
          />

          <p className="font-script text-3xl text-[#780116] mb-4">
            Bespoke itineraries tailored for mindful explorers
          </p>

          <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto font-medium">
            Browse our complete collection of verified regional journeys, from peaceful coastal retreats to rigorous alpine ascents.
          </p>
        </div>
      </section>

      {/* Controls Bar */}
      <section className="container-main max-w-6xl mx-auto px-4 mb-12">
        <div className="bg-white rounded-[2rem] shadow-lg p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-[#780116]/10">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                  category === cat
                    ? "bg-[#780116] text-[#F7B538] shadow-sm"
                    : "bg-[#FBF9F5] border border-slate-200 text-slate-700 hover:bg-[#FAF0DF]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & View Switcher */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="relative flex-1 md:w-64">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search expeditions..."
                className="pl-10 pr-4 py-2.5 bg-[#FBF9F5] border border-slate-200 rounded-full text-xs font-semibold text-[#150408] focus:outline-none focus:border-[#F7B538] focus:ring-2 focus:ring-[#F7B538]/20 w-full transition-all"
              />
            </div>

            <div className="flex bg-[#FBF9F5] p-1 rounded-2xl border border-black/5 shrink-0">
              <div className="px-3.5 py-1.5 bg-[#780116] text-[#F7B538] shadow-xs rounded-xl flex items-center gap-1.5 font-black text-xs uppercase tracking-wider">
                <LayoutGrid size={14} />
                <span className="hidden sm:inline">Grid</span>
              </div>
              <Link
                href="/trips/calendar"
                className="px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 text-slate-600 hover:text-[#780116] font-bold text-xs uppercase tracking-wider transition-colors no-underline"
              >
                <CalendarDays size={14} />
                <span className="hidden sm:inline">Calendar</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="container-main max-w-6xl mx-auto px-4">
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
            <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">
              We couldn&apos;t find any journeys matching your active filters.
            </p>
            <button
              onClick={() => {
                setCategory("All");
                setSearchTerm("");
              }}
              className="btn-primary"
            >
              View All Expeditions
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
