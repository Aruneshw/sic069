"use client";

import { useState } from "react";
import { Search, Filter, Mail, Phone, MoreVertical, IndianRupee } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const mockMembers = [
  { id: 1, name: "Arunesh W", email: "arunesh@example.com", phone: "+91 98765 43210", joined: "2024-01-15", bookings: 4, spent: 45000, dna: "Adventure", status: "Active" },
  { id: 2, name: "Sarah Chen", email: "sarah.c@example.com", phone: "+91 87654 32109", joined: "2024-03-22", bookings: 1, spent: 12000, dna: "Peace", status: "Active" },
  { id: 3, name: "Rahul Sharma", email: "rahuls@example.com", phone: "+91 76543 21098", joined: "2024-05-10", bookings: 0, spent: 0, dna: "Culture", status: "New" },
  { id: 4, name: "Emma Davis", email: "emma.d@example.com", phone: "+44 7700 900077", joined: "2023-11-05", bookings: 7, spent: 125000, dna: "Nature", status: "High Value" },
];

export default function AdminMembersPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Members</h1>
          <p className="text-sm text-slate-400">Manage user accounts and traveler profiles.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy-900 border border-white/5 rounded-xl p-4">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
          {['All Members', 'Active', 'New', 'High Value', 'Inactive'].map((filter, i) => (
            <button key={filter} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${i === 0 ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-300'}`}>
              {filter}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
            <input type="text" placeholder="Search members..." className="w-full md:w-64 bg-navy-950 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50" />
          </div>
        </div>
      </div>

      <div className="bg-navy-900 border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-navy-950/50 text-xs uppercase tracking-wider font-bold text-slate-300 border-b border-white/5">
              <tr>
                <th className="px-5 py-4">Member</th>
                <th className="px-5 py-4">Joined</th>
                <th className="px-5 py-4">Travel DNA</th>
                <th className="px-5 py-4">Bookings</th>
                <th className="px-5 py-4">Spent</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockMembers.map((member) => (
                <tr key={member.id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://ui-avatars.com/api/?name=${member.name}&background=0d1b2a&color=2dd4bf`} className="w-10 h-10 rounded-full border border-white/10" alt={member.name} />
                      <div>
                        <p className="font-bold text-white group-hover:text-teal-300 transition-colors">{member.name}</p>
                        <p className="text-xs text-slate-300">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-400">{member.joined}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex px-2 py-1 bg-white/5 rounded text-xs font-bold text-slate-300 border border-white/5">
                      {member.dna}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-bold text-white">{member.bookings}</td>
                  <td className="px-5 py-4 font-bold text-emerald-400">₹{member.spent.toLocaleString('en-IN')}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      member.status === 'High Value' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      member.status === 'New' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {member.status}
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
