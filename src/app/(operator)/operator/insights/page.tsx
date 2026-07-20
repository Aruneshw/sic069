import { Download, Calendar, TrendingUp, TrendingDown, Users, Star, ArrowUpRight } from "lucide-react";
import { RevenueChart, SourcePieChart, DestinationBarChart } from "@/components/ui/Charts";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/ui/StatusBadge";

export default async function InsightsPage() {
  const topTrips = await prisma.trip.findMany({
    orderBy: { rating: 'desc' },
    take: 5
  });

  return (
    <div className="space-y-8 pb-12">
      
      {/* ═══════════════════════════════════════
          HEADER (page-14.png)
          ═══════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">Staff Portal / Operator Access</div>
          <h1 className="text-2xl font-bold text-navy-900 mb-1">Business Insights</h1>
          <p className="text-slate-500 text-sm">Performance metrics and analytics for Q3 2024.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 shadow-sm text-sm font-medium text-slate-700">
            <Calendar size={16} className="text-slate-400" />
            <span>Jul 1, 2024 - Sep 30, 2024</span>
          </div>
          <button className="flex items-center gap-2 bg-navy-900 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-navy-800 transition-colors shadow-sm">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          KPI CARDS
          ═══════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-sm font-medium text-slate-500 mb-1">Total Revenue</div>
          <div className="flex items-end justify-between">
            <div className="text-2xl font-bold text-navy-900">$124,500</div>
            <div className="flex items-center text-xs font-bold text-success bg-success-light px-2 py-1 rounded-md">
              <TrendingUp size={12} className="mr-1" /> +12%
            </div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-sm font-medium text-slate-500 mb-1">Avg Occupancy</div>
          <div className="flex items-end justify-between">
            <div className="text-2xl font-bold text-navy-900">87.4%</div>
            <div className="flex items-center text-xs font-bold text-success bg-success-light px-2 py-1 rounded-md">
              <TrendingUp size={12} className="mr-1" /> +5%
            </div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-sm font-medium text-slate-500 mb-1">Repeat Rate</div>
          <div className="flex items-end justify-between">
            <div className="text-2xl font-bold text-navy-900">22.1%</div>
            <div className="flex items-center text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
              — 0%
            </div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-sm font-medium text-slate-500 mb-1">Referral Rate</div>
          <div className="flex items-end justify-between">
            <div className="text-2xl font-bold text-navy-900">14.8%</div>
            <div className="flex items-center text-xs font-bold text-danger bg-danger-light px-2 py-1 rounded-md">
              <TrendingDown size={12} className="mr-1" /> -2%
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          CHARTS GRID
          ═══════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-navy-900">Revenue Performance</h2>
            <div className="flex gap-3 text-xs font-medium">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-teal-600"/> Current</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300"/> Previous</div>
            </div>
          </div>
          <RevenueChart />
        </div>

        {/* Donut Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-navy-900 mb-2">Revenue Source</h2>
          <div className="flex-1 flex items-center justify-center relative">
            <SourcePieChart />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-2xl font-bold text-navy-900">75%</div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Direct</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <div className="w-2 h-2 rounded-full bg-[#15779D]" /> Direct (75%)
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <div className="w-2 h-2 rounded-full bg-[#4FC3F7]" /> Agents (15%)
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 col-span-2">
              <div className="w-2 h-2 rounded-full bg-[#1A9BC7]" /> Referrals (10%)
            </div>
          </div>
        </div>

        {/* Heatmap (Mocked with CSS grid) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-navy-900 mb-4">Seasonal Demand Heatmap</h2>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-12 gap-1 mb-2">
                {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map(m => (
                  <div key={m} className="text-center text-[10px] font-bold text-slate-400">{m}</div>
                ))}
              </div>
              <div className="space-y-1">
                {['Coastal', 'Mountain', 'Urban', 'Valley'].map((cat, i) => (
                  <div key={cat} className="flex items-center gap-2">
                    <div className="w-16 text-xs font-medium text-slate-600 shrink-0">{cat}</div>
                    <div className="grid grid-cols-12 gap-1 flex-1">
                      {[...Array(12)].map((_, j) => {
                        // Generate mock intensity
                        const intensity = Math.random();
                        let bgClass = "bg-teal-50";
                        if (intensity > 0.8) bgClass = "bg-teal-600 text-white";
                        else if (intensity > 0.5) bgClass = "bg-teal-400";
                        else if (intensity > 0.3) bgClass = "bg-teal-200";
                        
                        return (
                          <div 
                            key={j} 
                            className={`h-8 rounded-sm flex items-center justify-center text-[10px] font-bold transition-colors hover:ring-2 hover:ring-navy-900 cursor-pointer ${bgClass}`}
                            title={`${cat} in month ${j+1}`}
                          >
                            {intensity > 0.8 ? 'Peak' : ''}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end gap-3 mt-4 text-xs font-medium text-slate-500">
                <span>Low</span>
                <div className="flex gap-1">
                  <div className="w-4 h-4 rounded-sm bg-teal-50" />
                  <div className="w-4 h-4 rounded-sm bg-teal-200" />
                  <div className="w-4 h-4 rounded-sm bg-teal-400" />
                  <div className="w-4 h-4 rounded-sm bg-teal-600" />
                </div>
                <span>High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-navy-900 mb-2">Destination Popularity</h2>
          <DestinationBarChart />
        </div>

      </div>

      {/* ═══════════════════════════════════════
          TOP TRIPS TABLE
          ═══════════════════════════════════════ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-6">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-900">Top Performing Trips</h2>
          <button className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1">
            View All <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Trip Name</th>
                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Bookings</th>
                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Revenue</th>
                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Rating</th>
                <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topTrips.map((trip) => (
                <tr key={trip.id} className="hover:bg-slate-50">
                  <td className="py-3 px-6 font-semibold text-navy-900">{trip.name}</td>
                  <td className="py-3 px-6 text-slate-600">{Math.floor(Math.random() * 100) + 20}</td>
                  <td className="py-3 px-6 text-slate-600 font-medium">${(Math.floor(Math.random() * 50) + 10).toLocaleString()},000</td>
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-1 text-sm font-bold text-navy-900">
                      <Star size={14} className="fill-warning text-warning" /> {trip.rating}
                    </div>
                  </td>
                  <td className="py-3 px-6"><StatusBadge status={trip.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
