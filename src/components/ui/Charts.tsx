"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const revenueData = [
  { name: "Jan", current: 85000, previous: 72000 },
  { name: "Feb", current: 92000, previous: 78000 },
  { name: "Mar", current: 110000, previous: 85000 },
  { name: "Apr", current: 105000, previous: 90000 },
  { name: "May", current: 125000, previous: 95000 },
  { name: "Jun", current: 142000, previous: 110000 },
  { name: "Jul", current: 138000, previous: 120000 },
  { name: "Aug", current: 124500, previous: 115000 },
];

const sourceData = [
  { name: "Direct Website", value: 75, color: "#15779D" },
  { name: "Travel Agents", value: 15, color: "#4FC3F7" },
  { name: "Referrals", value: 10, color: "#1A9BC7" },
];

const destinationData = [
  { name: "Coastal Highway Escape", value: 92 },
  { name: "Alpine Lakes Expedition", value: 85 },
  { name: "Urban Discovery Tokyo", value: 78 },
  { name: "Desert Stargazer", value: 65 },
  { name: "Bali Zen Sanctuary", value: 60 },
];

export function RevenueChart() {
  return (
    <div className="h-[300px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748B', fontSize: 12 }} 
            dy={10} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748B', fontSize: 12 }} 
            tickFormatter={(value) => `₹${(value * 83 / 100000).toFixed(1)}L`}
            dx={-10}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
            formatter={(value: any) => [`₹${Math.round(value * 83).toLocaleString('en-IN')}`, '']}
          />
          <Line 
            type="monotone" 
            dataKey="current" 
            name="Current Period"
            stroke="#15779D" 
            strokeWidth={3} 
            dot={{ r: 4, strokeWidth: 2 }} 
            activeDot={{ r: 6 }} 
          />
          <Line 
            type="monotone" 
            dataKey="previous" 
            name="Previous Period"
            stroke="#94A3B8" 
            strokeWidth={2} 
            strokeDasharray="5 5"
            dot={false} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SourcePieChart() {
  return (
    <div className="h-[250px] w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={sourceData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {sourceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: any) => [`${value}%`, '']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DestinationBarChart() {
  return (
    <div className="h-[250px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={destinationData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#475569', fontSize: 12 }}
            width={150}
          />
          <Tooltip 
            cursor={{ fill: '#F1F5F9' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Bar dataKey="value" fill="#1A9BC7" radius={[0, 4, 4, 0]} barSize={24}>
            {destinationData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? "#123A63" : "#1A9BC7"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
