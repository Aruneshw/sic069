"use client";

import { useState } from "react";
import { Search, Filter, CheckCircle2, XCircle, Clock, Eye, AlertCircle, Compass } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const mockApprovals = [
  { id: 1, package: "Desert Stargazer Odyssey", operator: "Operator A", submitted: "Aug 13, 2024", status: "Review", issue: null },
  { id: 2, package: "Alpine Lakes Discovery", operator: "Operator B", submitted: "Aug 12, 2024", status: "Changes Requested", issue: "Missing Local Guide data" },
  { id: 3, package: "Meghamalai Weekend", operator: "Operator C", submitted: "Aug 11, 2024", status: "Review", issue: null },
];

export default function AdminApprovalsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Package Approvals</h1>
          <p className="text-sm text-slate-400">Review and moderate operator submissions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-navy-900 border border-amber-500/20 rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-amber-500">
            <Clock size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Pending</span>
          </div>
          <span className="text-3xl font-bold text-white">07</span>
        </div>
        <div className="bg-navy-900 border border-white/5 rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-400">
            <AlertCircle size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Changes Requested</span>
          </div>
          <span className="text-3xl font-bold text-white">03</span>
        </div>
        <div className="bg-navy-900 border border-emerald-500/20 rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Approved Today</span>
          </div>
          <span className="text-3xl font-bold text-white">12</span>
        </div>
      </div>

      <div className="bg-navy-900 border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-navy-950/50 text-xs uppercase tracking-wider font-bold text-slate-300 border-b border-white/5">
              <tr>
                <th className="px-5 py-4">Package</th>
                <th className="px-5 py-4">Submitted By</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockApprovals.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center text-slate-300 shrink-0 border border-white/5">
                        <Compass size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-white">{item.package}</p>
                        {item.issue && <p className="text-xs text-danger">{item.issue}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-300 font-medium">{item.operator}</td>
                  <td className="px-5 py-4 text-slate-400">{item.submitted}</td>
                  <td className="px-5 py-4">
                    {item.status === 'Review' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        {item.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-500/10 text-slate-400 border border-slate-500/20">
                        {item.status}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold hover:bg-teal-500/20 transition-colors shadow-sm">
                      <Eye size={16} /> Review
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
