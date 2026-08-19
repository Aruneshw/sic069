"use client";

import { useState } from "react";
import { Search, Filter, MoreVertical, ExternalLink } from "lucide-react";

const mockBookings = [
  { id: "BKG-9824", customer: "Arunesh W", package: "Kolukkumalai Sunrise Expedition", date: "Aug 15, 2024", amount: 7999, payment: "Success", status: "Confirmed" },
  { id: "BKG-9823", customer: "Sarah Chen", package: "Hidden Valley Trek", date: "Aug 18, 2024", amount: 8500, payment: "Success", status: "Confirmed" },
  { id: "BKG-9822", customer: "Emma Davis", package: "Coastal Sunset Retreat", date: "Aug 20, 2024", amount: 12000, payment: "Pending", status: "Pending" },
  { id: "BKG-9821", customer: "Rahul Sharma", package: "Desert Stargazer Odyssey", date: "Sep 01, 2024", amount: 9500, payment: "Refunded", status: "Cancelled" },
];

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Bookings</h1>
          <p className="text-sm text-slate-400">Manage all trip reservations and statuses.</p>
        </div>
      </div>

      <div className="bg-navy-900 border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
            <input type="text" placeholder="Search booking ID..." className="w-full md:w-64 bg-navy-950 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50" />
          </div>
        </div>
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-navy-950/50 text-xs uppercase tracking-wider font-bold text-slate-300 border-b border-white/5">
              <tr>
                <th className="px-5 py-4">Booking ID</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Package</th>
                <th className="px-5 py-4">Travel Date</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Payment</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockBookings.map((bkg) => (
                <tr key={bkg.id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                  <td className="px-5 py-4 font-bold text-teal-400">{bkg.id}</td>
                  <td className="px-5 py-4 font-bold text-white">{bkg.customer}</td>
                  <td className="px-5 py-4 text-slate-300">{bkg.package}</td>
                  <td className="px-5 py-4 text-slate-400">{bkg.date}</td>
                  <td className="px-5 py-4 font-bold text-white">₹{bkg.amount.toLocaleString('en-IN')}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${
                      bkg.payment === 'Success' ? 'text-emerald-400' :
                      bkg.payment === 'Pending' ? 'text-amber-400' : 'text-slate-400'
                    }`}>
                      {bkg.payment}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      bkg.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      bkg.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-danger/10 text-danger border-danger/20'
                    }`}>
                      {bkg.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
