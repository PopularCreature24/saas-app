'use client';

import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductViewer } from '@/components/3d/product-viewer';
import { DashboardCharts } from '@/components/dashboard/charts';
import { 
  FolderOpen, 
  CreditCard, 
  TrendingUp, 
  Plus,
  ArrowRight,
  Loader2,
  Database
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {session?.user?.name}</h1>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your projects.</p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              {stats.projectsChange >= 0 ? '+' : ''}{stats.projectsChange}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {stats.viewsChange >= 0 ? '+' : ''}{stats.viewsChange}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.storageUsed.toFixed(1)} GB</div>
            <p className="text-xs text-muted-foreground">
              of {stats.currentTier === 'FREE' ? '1' : stats.currentTier === 'STARTER' ? '10' : stats.currentTier === 'PRO' ? '100' : '1000'} GB available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Badge className={tierColors[stats.currentTier] || 'bg-gray-500'}>
              {tierLabels[stats.currentTier] || 'Free'}
            </Badge>
            <p className="text-xs text-muted-foreground">
              <Link href="/dashboard/billing" className="hover:underline">Manage subscription</Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {data?.chartData && data.chartData.length > 0 && (
        <DashboardCharts data={data.chartData} />
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Your latest 3D projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data?.recentProjects && data.recentProjects.length > 0 ? (
              data.recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <FolderOpen className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Link href={`/dashboard/projects/${project.id}`}>
                    <Button variant="ghost" size="icon">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No projects yet</p>
                <Link href="/dashboard/projects/new">
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Create your first project
                  </Button>
                </Link>
              </div>
            )}
            <Link href="/dashboard/projects" className="w-full">
              <Button variant="outline" className="w-full">
                View All Projects
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Preview</CardTitle>
            <CardDescription>Interactive 3D demo</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductViewer variant="card" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
