"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, CalendarDays, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { formatInr } from "@/lib/trips";

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
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-navy-900 pt-36 md:pt-48 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/trips-hero.png')] bg-cover bg-center mix-blend-overlay" />
        <div className="container-main relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Availability Calendar</h1>
          <p className="text-teal-100 text-lg max-w-2xl mx-auto">
            Plan your adventure by checking upcoming departure dates and real-time availability.
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="container-main relative -mt-8 z-20 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-100">
          
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
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

          {/* View Toggles */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <Link href="/trips" className="px-3 py-1.5 rounded-lg flex items-center gap-2 text-slate-500 hover:text-navy-900 font-medium text-sm transition-colors">
                <LayoutGrid size={16} />
                <span className="hidden sm:inline">Grid</span>
              </Link>
              <div className="px-3 py-1.5 bg-white shadow-sm rounded-lg flex items-center gap-2 text-navy-900 font-medium text-sm">
                <CalendarDays size={16} />
                <span className="hidden sm:inline">Calendar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-main">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Calendar Grid Area */}
          <div className="flex-1 card-elevated p-6 bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden flex flex-col">
            
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-navy-900">{monthName}</h2>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full cursor-pointer hover:bg-slate-200">
                  Jump to Today
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
                  <ChevronLeft size={20} />
                </button>
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mb-6 px-2 text-sm font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success"></div> Open
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning"></div> Filling Fast
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-danger"></div> &lt; 3 Seats Left
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 min-h-[500px]">
              <div className="grid grid-cols-7 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                {blanks.map(b => (
                  <div key={`blank-${b}`} className="bg-slate-50 min-h-[100px]" />
                ))}
                
                {days.map(d => {
                  const dateStr = `${targetMonth.getFullYear()}-${String(targetMonth.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                  const hasDepartures = !!departuresByDate[dateStr];
                  const isSelected = dateStr === selectedDateStr;
                  
                  return (
                    <div 
                      key={d} 
                      onClick={() => setSelectedDateStr(dateStr)}
                      className={`bg-white min-h-[100px] p-2 transition-colors cursor-pointer border-2 ${
                        isSelected ? "border-teal-500 bg-teal-50/30" : "border-transparent hover:bg-slate-50"
                      }`}
                    >
                      <div className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full mb-2 ${
                        isSelected ? "bg-teal-500 text-white" : "text-slate-700"
                      }`}>
                        {d}
                      </div>
                      
                      {hasDepartures && (
                        <div className="flex flex-col gap-2">
                          {departuresByDate[dateStr].slice(0, 3).map((dep: any, i: number) => {
                            let dotColor = "bg-success";
                            if (dep.status === "Filling Fast") dotColor = "bg-warning";
                            if (dep.status === "Almost Full") dotColor = "bg-danger";
                            
                            return (
                              <div key={i} className="flex items-center gap-2 px-2 py-1 rounded bg-slate-50 border border-slate-100 overflow-hidden">
                                <div className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
                                <span className="text-[10px] font-medium text-slate-700 truncate">{dep.trip.name}</span>
                              </div>
                            );
                          })}
                          {departuresByDate[dateStr].length > 3 && (
                            <div className="text-[10px] font-bold text-slate-400 text-center mt-1">
                              +{departuresByDate[dateStr].length - 3} more
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-6 flex items-start gap-2 p-4 bg-blue-50/50 rounded-xl text-sm text-slate-600">
              <Info size={16} className="text-info shrink-0 mt-0.5" />
              <p>All times are shown in local regional time. Contact our support team if you require assistance with connecting travel arrangements.</p>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="sticky top-[calc(var(--nav-height)+2rem)]">
              <h3 className="text-xl font-bold text-navy-900 mb-6">
                Departures on {selectedDateObj?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </h3>
              
              <div className="space-y-4">
                {selectedDepartures.length > 0 ? (
                  selectedDepartures.map((dep: any) => (
                    <div key={dep.id} className="card-elevated bg-white rounded-2xl overflow-hidden border border-slate-200">
                      <div className="flex items-stretch h-28">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={dep.trip.imageUrl || "/images/places/ooty.png"} 
                          alt={dep.trip.name}
                          className="w-1/3 object-cover"
                        />
                        <div className="w-2/3 p-4 flex flex-col justify-center">
                          <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">{dep.time}</div>
                          <h4 className="font-bold text-navy-900 truncate mb-1" title={dep.trip.name}>{dep.trip.name}</h4>
                          <div className="flex items-center justify-between mt-auto">
                            <span className="font-bold text-navy-900">{formatInr(dep.trip.price)}</span>
                            <span className={`text-xs font-semibold ${
                              dep.status === "Almost Full" ? "text-danger" : 
                              dep.status === "Filling Fast" ? "text-warning" : "text-slate-500"
                            }`}>
                              {dep.seatsLeft} seats left
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border-t border-slate-100 bg-slate-50">
                        <Link href={`/trips/${dep.trip.slug}`} className="btn-primary w-full py-2 text-sm">
                          View Trip Details
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
                    <p className="text-slate-500">No scheduled departures for this date matching your filters.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
