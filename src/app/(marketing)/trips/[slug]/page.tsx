import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Clock, MapPin, Users, Calendar as CalendarIcon, CheckCircle2, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const trip = await prisma.trip.findUnique({
    where: { slug },
  });

  if (!trip) {
    notFound();
  }

  const highlights = JSON.parse(trip.highlights) as string[];
  const itinerary = JSON.parse(trip.itinerary) as { day: number; title: string; description: string }[];
  const included = JSON.parse(trip.included) as string[];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* ═══════════════════════════════════════
          HERO SECTION (page-04.png)
          ═══════════════════════════════════════ */}
      <div className="relative h-[60vh] min-h-[400px] w-full bg-navy-900">
        <div className="absolute inset-0 bg-slate-800 animate-pulse" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={trip.imageUrl || `https://source.unsplash.com/random/1920x1080/?${trip.category.toLowerCase()}`} 
          alt={trip.name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container-main">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm font-medium text-teal-100 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link href="/trips" className="hover:text-white transition-colors">Trips</Link>
              <ChevronRight size={14} />
              <span className="text-white">{trip.category}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                {trip.badge && (
                  <span className="inline-block px-3 py-1 bg-teal-500 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                    {trip.badge}
                  </span>
                )}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {trip.name}
                </h1>
                <p className="text-xl text-slate-200">{trip.tagline}</p>
              </div>
              
              <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shrink-0">
                <div className="text-center px-4 border-r border-white/20">
                  <div className="flex items-center justify-center gap-1 text-warning mb-1">
                    <Star size={18} className="fill-warning" />
                    <span className="font-bold text-lg">{trip.rating}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">Rating</span>
                </div>
                <div className="text-center px-4">
                  <div className="text-white font-bold text-lg mb-1">{trip.duration}</div>
                  <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">Duration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          CONTENT & SIDEBAR (page-04.png)
          ═══════════════════════════════════════ */}
      <div className="container-main mt-8">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Tabs Navigation (Visual only for this iteration) */}
            <div className="flex items-center gap-8 border-b border-slate-200 mb-8 overflow-x-auto hide-scrollbar sticky top-[var(--nav-height)] bg-slate-50/90 backdrop-blur-md z-20 pt-4">
              <div className="border-b-2 border-navy-700 pb-4 text-sm font-bold text-navy-900 whitespace-nowrap">Overview</div>
              <div className="pb-4 text-sm font-medium text-slate-500 hover:text-navy-900 transition-colors whitespace-nowrap">Itinerary</div>
              <div className="pb-4 text-sm font-medium text-slate-500 hover:text-navy-900 transition-colors whitespace-nowrap">What's Included</div>
              <div className="pb-4 text-sm font-medium text-slate-500 hover:text-navy-900 transition-colors whitespace-nowrap">Reviews</div>
            </div>

            {/* Description */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">About this expedition</h2>
              <p className="text-slate-600 text-lg leading-relaxed">{trip.description}</p>
            </section>

            {/* Highlights Grid */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Trip Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="p-1 bg-teal-50 rounded text-teal-600 mt-0.5">
                      <Star size={16} />
                    </div>
                    <span className="text-slate-700 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Itinerary */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Itinerary</h2>
              <div className="space-y-6">
                {itinerary.map((day) => (
                  <div key={day.day} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold shadow-md shrink-0">
                        {day.day}
                      </div>
                      {day.day !== itinerary.length && (
                        <div className="w-0.5 h-full bg-slate-200 mt-2 mb-2" />
                      )}
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex-1 mb-2">
                      <h3 className="text-lg font-bold text-navy-900 mb-2">{day.title}</h3>
                      <p className="text-slate-600">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Booking Sidebar */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="sticky top-[calc(var(--nav-height)+2rem)] card-elevated p-6 md:p-8 bg-white border border-slate-200 shadow-xl rounded-2xl">
              
              <div className="flex items-end justify-between border-b border-slate-100 pb-6 mb-6">
                <div>
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mb-1">Price per person</span>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-navy-900">${trip.price}</span>
                    <span className="text-slate-500 font-medium mb-1">USD</span>
                  </div>
                </div>
                {trip.badge === "Bestseller" && (
                  <div className="bg-warning-light text-warning px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Star size={14} className="fill-warning" /> Highly Rated
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <CalendarIcon size={20} className="text-teal-600" />
                    <div>
                      <div className="text-sm font-bold text-navy-900">Select Date</div>
                      <div className="text-xs text-slate-500">View available departures</div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <Users size={20} className="text-teal-600" />
                    <div>
                      <div className="text-sm font-bold text-navy-900">Travelers</div>
                      <div className="text-xs text-slate-500">2 Adults</div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400" />
                </div>
              </div>

              <button className="btn-cta w-full text-base py-4 mb-4 shadow-glow-cta">
                Enquire Now
              </button>
              
              <p className="text-center text-xs text-slate-500 font-medium">
                No payment required for enquiry. We will contact you within 24 hours to confirm availability.
              </p>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="text-sm font-bold text-navy-900 mb-4">What's Included</h4>
                <ul className="space-y-3">
                  {included.slice(0, 4).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                  {included.length > 4 && (
                    <li className="text-sm text-teal-600 font-medium cursor-pointer pt-1">
                      + {included.length - 4} more items
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
