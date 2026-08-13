"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  IndianRupee, 
  Users, 
  MapPin, 
  TrendingUp,
  Activity,
  Calendar,
  AlertCircle,
  Package,
  CheckCircle2,
  Clock,
  Star
} from "lucide-react";
import Link from "next/link";

const kpiData = [
  { id: 1, title: "Total Revenue", value: "₹8,42,500", trend: "+18.4%", isPositive: true, icon: IndianRupee },
  { id: 2, title: "Active Bookings", value: "126", trend: "+12", isPositive: true, icon: Calendar },
  { id: 3, title: "Total Members", value: "4,821", trend: "+8.2%", isPositive: true, icon: Users },
  { id: 4, title: "Active Packages", value: "32", trend: "Stable", isPositive: true, icon: Package },
];

const recentActivity = [
  { id: 1, text: "Arun booked Kolukkumalai Expedition", time: "12 mins ago", type: "booking" },
  { id: 2, text: "New package submitted for approval", time: "1 hour ago", type: "approval" },
  { id: 3, text: "Payment received ₹7,999", time: "2 hours ago", type: "payment" },
  { id: 4, text: "New review submitted for Valley Retreat", time: "5 hours ago", type: "review" },
];

const topPackages = [
  { id: 1, name: "Kolukkumalai Sunrise Expedition", location: "Kerala", bookings: 42, revenue: "₹3,35,000", rating: 4.9, status: "Published" },
  { id: 2, name: "Hidden Valley Trek", location: "Himachal", bookings: 38, revenue: "₹1,85,000", rating: 4.8, status: "Published" },
  { id: 3, name: "Coastal Sunset Retreat", location: "Goa", bookings: 25, revenue: "₹1,12,000", rating: 4.7, status: "Published" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Good morning, Admin</h1>
        <p className="text-sm text-slate-400">Here's what's happening across Zero Gravity Tours today.</p>
      </div>

      {/* Priority Command Center */}
      <div className="bg-gradient-to-br from-navy-900 to-navy-950 border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <Activity className="text-teal-400" size={20} />
            <h2 className="text-sm font-bold tracking-widest text-white uppercase">Command Center</h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            SYSTEM HEALTH: OPERATIONAL
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2 hover:bg-white/10 transition-colors cursor-pointer">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Approvals</span>
            <span className="text-2xl font-bold text-white">07</span>
          </div>
          <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 flex flex-col gap-2 hover:bg-danger/20 transition-colors cursor-pointer">
            <span className="text-[10px] font-bold text-danger uppercase tracking-wider">Payment Issues</span>
            <span className="text-2xl font-bold text-danger">02</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2 hover:bg-white/10 transition-colors cursor-pointer">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">New Enquiries</span>
            <span className="text-2xl font-bold text-white">14</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2 hover:bg-white/10 transition-colors cursor-pointer">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">New Bookings</span>
            <span className="text-2xl font-bold text-white">21</span>
          </div>
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col gap-2 hover:bg-amber-500/20 transition-colors cursor-pointer">
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Reviews to Moderate</span>
            <span className="text-2xl font-bold text-amber-500">05</span>
          </div>
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-2">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">AI Status</span>
            <span className="text-lg font-bold text-emerald-400 mt-1">ONLINE</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-navy-900 border border-white/5 rounded-2xl p-5 hover:bg-navy-800 transition-colors group relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 bg-white/5 rounded-xl group-hover:bg-teal-500/20 transition-colors">
                <kpi.icon size={20} className="text-slate-400 group-hover:text-teal-400 transition-colors" />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                <TrendingUp size={12} />
                {kpi.trend}
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-1">{kpi.title}</h3>
            <div className="text-2xl font-bold text-white">{kpi.value}</div>
            
            {/* Sparkline decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Packages Table */}
        <div className="lg:col-span-2 bg-navy-900 border border-white/5 rounded-2xl overflow-hidden flex flex-col">
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Top Performing Packages</h2>
            <Link href="/admin/packages" className="text-xs font-bold text-teal-400 hover:text-teal-300 uppercase tracking-wider">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-navy-950/50 text-xs uppercase tracking-wider font-bold text-slate-500">
                <tr>
                  <th className="px-5 py-4">Package</th>
                  <th className="px-5 py-4">Bookings</th>
                  <th className="px-5 py-4">Revenue</th>
                  <th className="px-5 py-4">Rating</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {topPackages.map((pkg, i) => (
                  <tr key={pkg.id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                          #{i + 1}
                        </div>
                        <div>
                          <p className="font-bold text-white group-hover:text-teal-300 transition-colors">{pkg.name}</p>
                          <p className="text-xs text-slate-500">{pkg.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-300">{pkg.bookings}</td>
                    <td className="px-5 py-4 font-bold text-emerald-400">{pkg.revenue}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                        <Star size={14} className="fill-amber-400" /> {pkg.rating}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20">
                        {pkg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-navy-900 border border-white/5 rounded-2xl overflow-hidden flex flex-col">
          <div className="p-5 border-b border-white/5">
            <h2 className="text-base font-bold text-white">Recent Activity</h2>
          </div>
          <div className="p-5 flex-1">
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {recentActivity.map((activity, i) => (
                <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border border-navy-900 bg-navy-800 text-slate-400 group-hover:text-teal-400 group-hover:bg-navy-950 transition-colors shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    {activity.type === 'booking' && <Calendar size={14} />}
                    {activity.type === 'approval' && <Clock size={14} />}
                    {activity.type === 'payment' && <IndianRupee size={14} />}
                    {activity.type === 'review' && <Star size={14} />}
                  </div>
                  {/* Content */}
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded-xl border border-white/5 bg-navy-950/50 group-hover:border-white/10 transition-colors">
                    <p className="text-sm font-medium text-slate-300">{activity.text}</p>
                    <time className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1 block">{activity.time}</time>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-3 border-t border-white/5 text-center">
            <Link href="/admin/audit" className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider transition-colors">
              View All Logs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
