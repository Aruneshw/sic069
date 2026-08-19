"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, CalendarDays, ChevronLeft, ChevronRight, Info, Sparkles, Clock, Users } from "lucide-react";
import { formatInr, getAssetUrl } from "@/lib/trips";

export default function CalendarClient({ allDepartures }: { allDepartures: any[] }) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState("All");
  const [monthParam, setMonthParam] = useState<string | null>(null);
  
  useEffect(() => {
    setCategory(searchParams.get("category") || "All");
    setMonthParam(searchParams.get("month"));
  }, [searchParams]);

  const targetMonth = monthParam ? new Date(monthParam) : new Date("2024-10-01");
  const monthName = targetMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  const startDate = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 1);
  const endDate = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0);

  const departures = allDepartures.filter(dep => {
    const dDate = new Date(dep.date);
    const inMonth = dDate >= startDate && dDate <= endDate;
    const matchesCategory = category === "All" || dep.trip.category === category;
    return inMonth && matchesCategory;
  });

  const categories = ["All", "Coastal", "Mountain", "Urban", "Valley"];

  const departuresByDate = departures.reduce((acc, dep) => {
    const dateStr = dep.date.split('T')[0];
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(dep);
    return acc;
  }, {} as Record<string, typeof departures>);

  const daysInMonth = endDate.getDate();
  const firstDayOfWeek = startDate.getDay();
  const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const dateWithDepartures = Object.keys(departuresByDate)[0];
  const [selectedDateStr, setSelectedDateStr] = useState<string>("");

  useEffect(() => {
    if (!selectedDateStr && dateWithDepartures) {
      setSelectedDateStr(dateWithDepartures);
    } else if (!selectedDateStr) {
      setSelectedDateStr(`${targetMonth.getFullYear()}-10-15`);
    }
  }, [dateWithDepartures, selectedDateStr, targetMonth]);

  const selectedDepartures = departuresByDate[selectedDateStr] || [];
  const selectedDateObj = selectedDateStr ? new Date(selectedDateStr) : new Date();

  return (
    <div className="bg-transparent min-h-screen pb-24 text-white">
      {/* Header */}
      <section className="pt-36 pb-14 md:pt-44 md:pb-16 text-center px-4">
        <div className="container-main max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(12,22,38,0.85)] border border-[rgba(200,165,92,0.20)] text-xs font-black uppercase tracking-widest text-[#C8A55C] mb-4">
            <Sparkles size={14} className="text-[#C8A55C]" /> Live Departure Schedules
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3 leading-tight">
            Expedition Availability Calendar
          </h1>
          <p className="font-script text-3xl text-[#C8A55C] mb-4">
            Plan ahead with real-time seat tracking
          </p>
          <p className="text-slate-200 text-sm md:text-base max-w-xl mx-auto font-medium">
            Lock in your next adventure by checking exact confirmed departure dates and remaining seats.
          </p>
        </div>
      </section>

      {/* Controls Bar */}
      <div className="container-main max-w-6xl mx-auto px-4 mb-8">
        <div className="bg-[rgba(12,22,38,0.85)] backdrop-blur-md rounded-[2rem] shadow-lg p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-[rgba(255,255,255,0.06)]">
          
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                  category === cat
                    ? "bg-[#C8A55C] text-[#05070B] shadow-sm"
                    : "bg-transparent border border-slate-200 text-[#94A3B8] hover:bg-[rgba(12,22,38,0.85)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Month Pagination & Switcher */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2 bg-transparent px-3 py-1.5 rounded-full border border-black/5">
              <span className="font-extrabold text-xs text-white">{monthName}</span>
            </div>

            <div className="flex bg-transparent p-1 rounded-2xl border border-black/5 shrink-0">
              <Link
                href="/trips"
                className="px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 text-slate-200 hover:text-[#C8A55C] font-bold text-xs uppercase tracking-wider transition-colors no-underline"
              >
                <LayoutGrid size={14} />
                <span className="hidden sm:inline">Grid</span>
              </Link>
              <div className="px-3.5 py-1.5 bg-[#C8A55C] text-[#05070B] shadow-xs rounded-xl flex items-center gap-1.5 font-black text-xs uppercase tracking-wider">
                <CalendarDays size={14} />
                <span className="hidden sm:inline">Calendar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Calendar & Details Bento Layout */}
      <div className="container-main max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-[rgba(12,22,38,0.85)] backdrop-blur-md rounded-[2rem] p-6 md:p-8 border border-[rgba(255,255,255,0.06)] shadow-lg">
          <div className="grid grid-cols-7 gap-2 mb-3 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-[11px] font-black uppercase text-slate-400 py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {blanks.map((b) => (
              <div key={`blank-${b}`} className="aspect-square rounded-2xl bg-transparent/40" />
            ))}
            {days.map((day) => {
              const dayStr = `${targetMonth.getFullYear()}-${String(targetMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const dayDepartures = departuresByDate[dayStr] || [];
              const isSelected = selectedDateStr === dayStr;
              const hasDeps = dayDepartures.length > 0;

              return (
                <button
                  key={day}
                  onClick={() => hasDeps && setSelectedDateStr(dayStr)}
                  disabled={!hasDeps}
                  className={`aspect-square rounded-2xl p-2 flex flex-col justify-between items-center transition-all ${
                    isSelected
                      ? "bg-[#C8A55C] text-[#05070B] shadow-md scale-105"
                      : hasDeps
                      ? "bg-[rgba(12,22,38,0.85)] hover:bg-[rgba(12,22,38,0.85)] border border-[rgba(255,255,255,0.06)] text-white cursor-pointer"
                      : "bg-transparent text-slate-300 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <span className="text-xs font-black">{day}</span>
                  {hasDeps && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F7B538]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Departures Detail Card */}
        <div className="bg-[rgba(12,22,38,0.85)] backdrop-blur-md rounded-[2rem] p-6 md:p-8 border border-[rgba(255,255,255,0.06)] shadow-lg flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#C8A55C]">Selected Date</span>
            <h3 className="text-xl font-extrabold text-white mb-4">
              {selectedDateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </h3>

            {selectedDepartures.length === 0 ? (
              <div className="p-6 rounded-2xl bg-transparent text-center text-xs text-slate-300 border border-black/5">
                No departures scheduled for this specific date. Select a highlighted date on the calendar.
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDepartures.map((dep: any) => (
                  <div key={dep.id} className="p-4 rounded-2xl bg-[rgba(12,22,38,0.85)] border border-[rgba(255,255,255,0.06)] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-[#C8A55C]">{dep.trip.category}</span>
                      <span className="text-xs font-black text-[#34D399] bg-white px-2.5 py-0.5 rounded-full shadow-xs">
                        {dep.seatsLeft} Seats Open
                      </span>
                    </div>
                    <h4 className="text-sm font-extrabold text-white">{dep.trip.name}</h4>
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-[rgba(255,255,255,0.06)]/60 font-bold">
                      <span className="text-white">{formatInr(dep.trip.price)}</span>
                      <Link href={`/trips/${dep.trip.slug}`} className="text-[#C8A55C] hover:underline">
                        View Trip →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-black/5 mt-6">
            <Link href="/trips" className="btn-primary w-full text-center block no-underline">
              Browse All Trips
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
