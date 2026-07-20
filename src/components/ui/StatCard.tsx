"use client";

import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

export default function StatCard({ title, value, icon, trend, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className="card-elevated p-6 flex flex-col relative overflow-hidden"
    >
      {/* Decorative background circle */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-navy-50 rounded-full opacity-50 blur-2xl pointer-events-none" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</h3>
        <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
          {icon}
        </div>
      </div>
      
      <div className="flex items-end gap-3 relative z-10">
        <div className="text-3xl font-bold text-navy-900 tracking-tight">{value}</div>
        
        {trend && (
          <div
            className={`flex items-center text-xs font-semibold mb-1 ${
              trend.isPositive ? "text-success" : "text-danger"
            }`}
          >
            {trend.isPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
