'use client';

import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, TrendingUp } from 'lucide-react';

interface ChartData {
  date: string;
  views: number;
  projects: number;
}

interface DashboardChartsProps {
  data: ChartData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card border border-white/10 rounded-xl p-3 shadow-xl">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function DashboardCharts({ data }: DashboardChartsProps) {
  return (
    <motion.div 
      className="grid gap-6 lg:grid-cols-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="rounded-2xl border border-white/10 glass p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-violet-500/20">
              <TrendingUp className="h-4 w-4 text-violet-400" />
            </div>
            <h3 className="text-lg font-semibold">Views Over Time</h3>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-white/5" />
                <XAxis 
                  dataKey="date" 
                  className="text-xs"
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <YAxis 
                  className="text-xs" 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fill="url(#viewsGradient)"
                  dot={false}
                  activeDot={{ r: 6, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 glass p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-fuchsia-500/20">
              <Activity className="h-4 w-4 text-fuchsia-400" />
            </div>
            <h3 className="text-lg font-semibold">Project Activity</h3>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <defs>
                  <linearGradient id="projectsGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-white/5" />
                <XAxis 
                  dataKey="date" 
                  className="text-xs"
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <YAxis 
                  className="text-xs" 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="projects"
                  stroke="url(#projectsGradient)"
                  strokeWidth={3}
                  dot={{ fill: '#f472b6', strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: '#f472b6', strokeWidth: 2, stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
