"use client";

import { motion } from "framer-motion";
import { Dna, TrendingUp } from "lucide-react";

export default function AdminTravelDNAPage() {
  const distribution = [
    { trait: "Adventure", percentage: 72 },
    { trait: "Nature", percentage: 84 },
    { trait: "Peace", percentage: 61 },
    { trait: "Photography", percentage: 68 },
    { trait: "Culture", percentage: 49 },
    { trait: "Social", percentage: 38 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Travel DNA Analytics</h1>
          <p className="text-sm text-slate-400">Aggregate customer behavior and psychological profiling.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-navy-900 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
            <Dna size={20} className="text-teal-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Traveler Personality Distribution</h2>
          </div>
          
          <div className="space-y-6">
            {distribution.map((item) => (
              <div key={item.trait}>
                <div className="flex justify-between text-sm font-bold text-white mb-2">
                  <span>{item.trait}</span>
                  <span className="text-teal-400">{item.percentage}%</span>
                </div>
                <div className="h-2 w-full bg-navy-950 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-navy-900 border border-white/5 rounded-2xl p-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-4">Most Rejected Package Traits</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-danger/5 border border-danger/10">
                <span className="text-sm font-medium text-slate-300">Too expensive</span>
                <span className="text-sm font-bold text-danger">34%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-danger/5 border border-danger/10">
                <span className="text-sm font-medium text-slate-300">Too far</span>
                <span className="text-sm font-bold text-danger">21%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-danger/5 border border-danger/10">
                <span className="text-sm font-medium text-slate-300">Too crowded</span>
                <span className="text-sm font-bold text-danger">18%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
