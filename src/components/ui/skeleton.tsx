'use client';

import { motion } from 'framer-motion';

export function Skeleton({ 
  className = '',
  pulseClassName = ''
}: { 
  className?: string;
  pulseClassName?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={`absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent ${pulseClassName}`} />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/5 bg-card p-6">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="h-12 w-12 rounded-xl bg-white/5" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4 bg-white/5" />
          <Skeleton className="h-3 w-1/2 bg-white/5" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full bg-white/5" />
        <Skeleton className="h-3 w-5/6 bg-white/5" />
      </div>
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="text-center p-6 rounded-2xl glass-effect">
      <Skeleton className="h-10 w-24 mx-auto mb-2 rounded-lg bg-white/5" />
      <Skeleton className="h-4 w-20 mx-auto bg-white/5" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
          <Skeleton className="h-10 w-10 rounded-lg bg-white/5" />
          <Skeleton className="h-4 flex-1 bg-white/5" />
          <Skeleton className="h-4 w-20 bg-white/5" />
          <Skeleton className="h-8 w-8 rounded bg-white/5" />
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-2xl border border-white/5 bg-card p-6 h-[300px]">
      <div className="flex items-end justify-between h-full gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-gradient-to-t from-violet-500/20 to-fuchsia-500/20 rounded-t"
            initial={{ height: '20%' }}
            animate={{ 
              height: `${30 + Math.random() * 70}%`,
            }}
            transition={{ 
              duration: 1,
              delay: i * 0.05,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full bg-white/5" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32 bg-white/5" />
        <Skeleton className="h-3 w-48 bg-white/5" />
      </div>
    </div>
  );
}
