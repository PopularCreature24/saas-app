'use client';

import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductViewer } from '@/components/3d/product-viewer';
import { DashboardCharts } from '@/components/dashboard/charts';
import { StatSkeleton, CardSkeleton, ChartSkeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderOpen, 
  CreditCard, 
  TrendingUp, 
  Plus,
  ArrowRight,
  Loader2,
  Database,
  Activity,
  Eye,
  HardDrive
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface ChartData {
  date: string;
  views: number;
  projects: number;
}

interface DashboardData {
  stats: {
    totalProjects: number;
    totalViews: number;
    storageUsed: number;
    currentTier: string;
    projectsChange: number;
    viewsChange: number;
  };
  recentProjects: Array<{
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
  }>;
  chartData: ChartData[];
}

function AnimatedCounter({ 
  value, 
  duration = 2000,
  format = (v: number) => v.toString()
}: { 
  value: number; 
  duration?: number;
  format?: (v: number) => string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value, duration, isInView]);

  return <div ref={ref}>{format(count)}</div>;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch('/api/dashboard');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const tierColors: Record<string, string> = {
    FREE: 'bg-gray-500',
    STARTER: 'bg-blue-500',
    PRO: 'bg-gradient-to-r from-violet-500 to-fuchsia-500',
    ENTERPRISE: 'bg-gradient-to-r from-amber-500 to-orange-500',
  };

  const tierLabels: Record<string, string> = {
    FREE: 'Free',
    STARTER: 'Starter',
    PRO: 'Pro',
    ENTERPRISE: 'Enterprise',
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-10 w-64 rounded-lg bg-white/5 animate-pulse" />
            <div className="h-4 w-48 rounded bg-white/5 animate-pulse" />
          </div>
          <div className="h-11 w-36 rounded-xl bg-white/5 animate-pulse" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatSkeleton key={i} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <CardSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    );
  }

  const stats = data?.stats || {
    totalProjects: 0,
    totalViews: 0,
    storageUsed: 0,
    currentTier: 'FREE',
    projectsChange: 0,
    viewsChange: 0,
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      change: stats.projectsChange,
      icon: FolderOpen,
      gradient: 'from-violet-500 to-violet-600',
      glow: 'shadow-violet-500/25',
      format: (v: number) => v.toString(),
    },
    {
      title: 'Total Views',
      value: stats.totalViews,
      change: stats.viewsChange,
      icon: Eye,
      gradient: 'from-fuchsia-500 to-fuchsia-600',
      glow: 'shadow-fuchsia-500/25',
      format: (v: number) => v.toLocaleString(),
    },
    {
      title: 'Storage Used',
      value: Math.floor(stats.storageUsed * 10),
      change: 12,
      icon: HardDrive,
      gradient: 'from-cyan-500 to-cyan-600',
      glow: 'shadow-cyan-500/25',
      format: (v: number) => (v / 10).toFixed(1) + ' GB',
    },
    {
      title: 'Current Plan',
      value: 0,
      change: 0,
      icon: CreditCard,
      gradient: 'from-amber-500 to-amber-600',
      glow: 'shadow-amber-500/25',
      format: () => '',
      isBadge: true,
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-muted-foreground bg-clip-text">
            Welcome back, {session?.user?.name?.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground mt-1">Here&apos;s what&apos;s happening with your projects.</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/dashboard/projects/new">
            <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-lg shadow-violet-500/25">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Card className="relative overflow-hidden glass-card hover:border-white/20 transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`} />
                <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} shadow-lg ${stat.glow}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  {stat.isBadge ? (
                    <Badge className={`${tierColors[stats.currentTier]} text-white`}>
                      {tierLabels[stats.currentTier] || 'Free'}
                    </Badge>
                  ) : (
                    <div className="text-3xl font-bold">
                      <AnimatedCounter 
                        value={stat.value} 
                        format={stat.format}
                        duration={1500}
                      />
                    </div>
                  )}
                  {stat.change !== 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="h-3 w-3 text-emerald-500" />
                      <p className="text-xs text-emerald-500">
                        {stat.change >= 0 ? '+' : ''}{stat.change}% from last month
                      </p>
                    </div>
                  )}
                  {stat.isBadge && (
                    <Link href="/dashboard/billing" className="block mt-2">
                      <span className="text-xs text-muted-foreground hover:text-violet-400 transition-colors">
                        Manage subscription →
                      </span>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {data?.chartData && data.chartData.length > 0 && (
        <DashboardCharts data={data.chartData} />
      )}

      <motion.div 
        className="grid gap-6 lg:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-violet-400" />
              <CardTitle>Recent Projects</CardTitle>
            </div>
            <CardDescription>Your latest 3D creations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data?.recentProjects && data.recentProjects.length > 0 ? (
              data.recentProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <Link href={`/dashboard/projects/${project.id}`}>
                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 hover:bg-white/10 hover:border-violet-500/20 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/10">
                          <FolderOpen className="h-5 w-5 text-violet-400" />
                        </div>
                        <div>
                          <p className="font-medium">{project.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(project.updatedAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="p-2 rounded-lg bg-white/5"
                      >
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />
                <div className="relative">
                  <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 mb-4">
                    <FolderOpen className="h-8 w-8 text-violet-400" />
                  </div>
                  <p className="text-muted-foreground mb-4">No projects yet</p>
                  <Link href="/dashboard/projects/new">
                    <Button variant="outline" className="border-violet-500/20 hover:bg-violet-500/10">
                      <Plus className="mr-2 h-4 w-4" />
                      Create your first project
                    </Button>
                  </Link>
                </div>
              </div>
            )}
            <Link href="/dashboard/projects" className="block">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-fuchsia-400" />
              <CardTitle>Quick Preview</CardTitle>
            </div>
            <CardDescription>Interactive 3D demo</CardDescription>
          </CardHeader>
          <CardContent className="relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-transparent" />
            <ProductViewer variant="card" />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
