import Link from "next/link";
import { Plus, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { Map, Calendar, MessageSquare, Percent } from "lucide-react";
import { getAssetUrl } from "@/lib/trips";

import LiveTrackingButton from "@/components/operator/LiveTrackingButton";

export default async function OperatorDashboard() {
  const trips = await prisma.trip.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      
      {/* ═══════════════════════════════════════
          HEADER & STATS (page-07.png)
          ═══════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-navy-900 mb-1">Overview</h1>
          <p className="text-slate-500 mb-6">Manage your regional adventures and bookings.</p>
          <div className="w-full lg:max-w-md">
            <LiveTrackingButton />
          </div>
        </div>
        <div className="shrink-0 pb-1">
          <button className="btn-primary py-2 px-6 shadow-sm w-full lg:w-auto flex items-center justify-center">
            <Plus size={18} className="mr-1" /> Add New Trip
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Trips"
          value={trips.length}
          icon={<Map size={20} />}
          trend={{ value: 12, isPositive: true }}
          delay={0}
        />
        <StatCard
          title="Upcoming Departures"
          value={24}
          icon={<Calendar size={20} />}
          trend={{ value: 5, isPositive: true }}
          delay={0.1}
        />
        <StatCard
          title="New Enquiries"
          value={156}
          icon={<MessageSquare size={20} />}
          trend={{ value: 8, isPositive: false }}
          delay={0.2}
        />
        <StatCard
          title="Occupancy Rate"
          value="84.2%"
          icon={<Percent size={20} />}
          trend={{ value: 3, isPositive: true }}
          delay={0.3}
        />
      </div>

      {/* ═══════════════════════════════════════
          TRIP INVENTORY TABLE (page-07.png)
          ═══════════════════════════════════════ */}
      <div className="card-elevated bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-navy-900">Recent Trip Inventory</h2>
          
          <div className="flex items-center gap-3">
            <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>All Statuses</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
            <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>Most Recent</option>
              <option>Alphabetical</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Trip Details</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Next Departure</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Seats Fill</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trips.map((trip) => {
                const fillPercentage = Math.round((trip.filledSeats / trip.maxSeats) * 100);
                let progressColor = "bg-success";
                if (fillPercentage < 30) progressColor = "bg-danger";
                else if (fillPercentage < 60) progressColor = "bg-warning";
                
                return (
                  <tr key={trip.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={getAssetUrl(trip.imageUrl || "/images/places/ooty.png")}
                            alt={trip.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="font-bold text-navy-900 leading-tight">{trip.name}</p>
                            {trip.badge && (
                              <span className="text-[10px] font-bold text-white bg-teal-500 px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                                {trip.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500">{trip.duration} • {trip.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-slate-700">
                        {trip.departureDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                    </td>
                    <td className="py-4 px-6 w-48">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                          <span>{fillPercentage}%</span>
                          <span>{trip.filledSeats}/{trip.maxSeats}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${progressColor} rounded-full`} style={{ width: `${fillPercentage}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={trip.status} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-slate-400 hover:text-teal-600 transition-colors" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-danger transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-navy-900 transition-colors" title="More">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-500">Showing 1 to {trips.length} of {trips.length} results</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
