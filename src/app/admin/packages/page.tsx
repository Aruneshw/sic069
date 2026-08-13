"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, MoreVertical, Edit, Copy, Trash2, ShieldCheck, Eye, Compass, Archive, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const mockPackages = [
  { id: 1, name: "Kolukkumalai Sunrise Expedition", destination: "Kerala", category: "Adventure", price: 7999, duration: "3 Days", capacity: 12, bookings: 42, status: "Published", updatedAt: "2024-08-12" },
  { id: 2, name: "Hidden Valley Trek", destination: "Himachal", category: "Trekking", price: 8500, duration: "4 Days", capacity: 15, bookings: 38, status: "Published", updatedAt: "2024-08-10" },
  { id: 3, name: "Coastal Sunset Retreat", destination: "Goa", category: "Peace", price: 12000, duration: "5 Days", capacity: 10, bookings: 25, status: "Published", updatedAt: "2024-08-08" },
  { id: 4, name: "Desert Stargazer Odyssey", destination: "Rajasthan", category: "Nature", price: 9500, duration: "3 Days", capacity: 20, bookings: 12, status: "Pending Approval", updatedAt: "2024-08-13" },
  { id: 5, name: "Alpine Lakes Discovery", destination: "Kashmir", category: "Exploration", price: 15000, duration: "7 Days", capacity: 8, bookings: 0, status: "Draft", updatedAt: "2024-08-13" },
  { id: 6, name: "Vineyard Valley Escape", destination: "Maharashtra", category: "Peace", price: 6500, duration: "2 Days", capacity: 25, bookings: 89, status: "Published", updatedAt: "2024-07-22" },
];

export default function AdminPackagesPage() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Published': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Pending Approval': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Draft': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      case 'Archived': return 'bg-danger/10 text-danger border-danger/20';
      default: return 'bg-white/5 text-slate-300 border-white/10';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Packages</h1>
          <p className="text-sm text-slate-400">Manage all travel experiences and expeditions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-navy-800 text-white rounded-lg text-sm font-semibold hover:bg-navy-700 transition-colors border border-white/5 shadow-sm">
            Import
          </button>
          <Link href="/admin/packages/new" className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-navy-950 rounded-lg text-sm font-bold hover:bg-teal-400 transition-colors shadow-[0_0_15px_rgba(45,212,191,0.3)] hover:shadow-[0_0_20px_rgba(45,212,191,0.5)]">
            <Plus size={16} strokeWidth={2.5} />
            Create Package
          </Link>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy-900 border border-white/5 rounded-xl p-4">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
          {['All', 'Published', 'Draft', 'Pending Approval', 'Archived'].map((filter, i) => (
            <button key={filter} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${i === 0 ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-300'}`}>
              {filter}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search packages..." className="w-full md:w-64 bg-navy-950 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50" />
          </div>
          <button className="p-2 border border-white/10 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-navy-900 border border-white/5 rounded-2xl overflow-visible">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-navy-950/50 text-xs uppercase tracking-wider font-bold text-slate-500 border-b border-white/5">
              <tr>
                <th className="px-5 py-4 w-12 text-center"><input type="checkbox" className="rounded border-white/10 bg-navy-950 accent-teal-500" /></th>
                <th className="px-5 py-4">Package Info</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Capacity</th>
                <th className="px-5 py-4">Bookings</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-5 py-4 text-center"><input type="checkbox" className="rounded border-white/10 bg-navy-950 accent-teal-500" /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center text-slate-500 shrink-0 border border-white/5">
                        <Compass size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-white">{pkg.name}</p>
                        <p className="text-xs text-slate-500">{pkg.destination} • {pkg.duration}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-300">{pkg.category}</td>
                  <td className="px-5 py-4 font-bold text-white">₹{pkg.price.toLocaleString('en-IN')}</td>
                  <td className="px-5 py-4 text-slate-400">{pkg.capacity} Pax</td>
                  <td className="px-5 py-4 font-bold text-emerald-400">{pkg.bookings}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(pkg.status)}`}>
                      {pkg.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right relative">
                    <button 
                      onClick={() => setActiveMenu(activeMenu === pkg.id ? null : pkg.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <MoreVertical size={18} />
                    </button>
                    
                    <AnimatePresence>
                      {activeMenu === pkg.id && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setActiveMenu(null)} />
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-8 top-10 w-48 bg-navy-800 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden py-1"
                          >
                            <Link href={`/admin/packages/${pkg.id}`} className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 no-underline">
                              <Eye size={16} /> View Preview
                            </Link>
                            <Link href={`/admin/packages/${pkg.id}/edit`} className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 no-underline">
                              <Edit size={16} /> Edit Package
                            </Link>
                            <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 text-left">
                              <Copy size={16} /> Duplicate
                            </button>
                            {pkg.status === 'Draft' && (
                              <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-teal-400 hover:bg-teal-500/10 text-left font-bold">
                                <ShieldCheck size={16} /> Submit for Approval
                              </button>
                            )}
                            <div className="h-px bg-white/5 my-1" />
                            <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-amber-500 hover:bg-amber-500/10 text-left">
                              <Archive size={16} /> Archive
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-danger hover:bg-danger/10 text-left">
                              <Trash2 size={16} /> Delete
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-slate-400">
          <span>Showing 1 to 6 of 32 packages</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/5 disabled:opacity-50">Previous</button>
            <button className="px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-white">1</button>
            <button className="px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/5">2</button>
            <button className="px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/5">3</button>
            <button className="px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/5">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
