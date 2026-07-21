"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, CalendarDays, Search, Filter } from "lucide-react";
import TripCard from "@/components/ui/TripCard";

export default function TripsClient({ trips }: { trips: any[] }) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setCategory(cat);
    } else {
      setCategory("All");
    }
  }, [searchParams]);

  const filteredTrips = category === "All" 
    ? trips 
    : trips.filter(t => t.category === category);

  const categories = ["All", "Coastal", "Mountain", "Urban", "Valley"];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: "420px" }}>
        <img
          src="/images/trips-hero.png"
          alt="Travel planning flat lay"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-32 md:py-40">
          <span className="inline-block px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-teal-200 uppercase tracking-widest mb-6">
            ✦ Curated Regional Tours
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-lg leading-[1.1]">
            Find Your <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-teal-300 via-blue-300 to-indigo-400 bg-clip-text text-transparent">Next Destination</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto drop-shadow-sm font-medium mt-6">
            Browse our complete collection of regional tours, from relaxing coastal retreats to challenging alpine summits.
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="container-main relative -mt-16 z-20 mb-16">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100">
          
          <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                  category === cat
                    ? "bg-navy-900 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
            <div className="relative hidden md:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search trips..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 w-48 transition-all focus:w-64"
              />
            </div>
            
            <button className="md:hidden flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-semibold text-slate-700">
              <Filter size={16} /> Filters
            </button>

            <div className="flex bg-slate-100 p-1 rounded-xl">
              <div className="px-3 py-1.5 bg-white shadow-sm rounded-lg flex items-center gap-2 text-navy-900 font-medium text-sm">
                <LayoutGrid size={16} />
                <span className="hidden sm:inline">Grid</span>
              </div>
              <Link href="/trips/calendar" className="px-3 py-1.5 rounded-lg flex items-center gap-2 text-slate-500 hover:text-navy-900 font-medium text-sm transition-colors">
                <CalendarDays size={16} />
                <span className="hidden sm:inline">Calendar</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container-main">
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTrips.map((trip, index) => (
              <div key={trip.id} className="h-full">
                <TripCard trip={trip} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <h3 className="text-xl font-bold text-navy-900 mb-2">No trips found</h3>
            <p className="text-slate-500 mb-6">We couldn't find any trips matching the "{category}" category.</p>
            <button onClick={() => setCategory("All")} className="btn-primary">View All Trips</button>
          </div>
        )}
      </div>
    </div>
  );
}
