import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const [
      projects,
      subscription,
      recentProjects,
      viewsThisMonth,
      viewsLastMonth,
    ] = await Promise.all([
      prisma.project.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
        take: 5,
      }),
      prisma.subscription.findUnique({
        where: { userId },
      }),
      prisma.project.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      prisma.viewLog.count({
        where: {
          userId,
          viewedAt: {
            gte: new Date(new Date().setDate(1)),
          },
        },
      }),
      prisma.viewLog.count({
        where: {
          userId,
          viewedAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 30)),
            lt: new Date(new Date().setDate(1)),
          },
        },
      }),
    ]);

    const totalViews = await prisma.project.aggregate({
      where: { userId },
      _sum: { views: true },
    });

    const projectsThisMonth = await prisma.project.count({
      where: {
        userId,
        createdAt: {
          gte: new Date(new Date().setDate(1)),
        },
      },
    });

    const projectsLastMonth = await prisma.project.count({
      where: {
        userId,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)),
          lt: new Date(new Date().setDate(1)),
        },
      },
    });

    const viewsChange = viewsLastMonth === 0 
      ? 100 
      : Math.round(((viewsThisMonth - viewsLastMonth) / viewsLastMonth) * 100);

    const projectsChange = projectsLastMonth === 0 
      ? 100 
      : Math.round(((projectsThisMonth - projectsLastMonth) / projectsLastMonth) * 100);

    const chartData = await getChartData(userId);

    return NextResponse.json({
      stats: {
        totalProjects: projects.length,
        totalViews: totalViews._sum.views || 0,
        storageUsed: projects.length * 0.5,
        currentTier: subscription?.tier || 'FREE',
        projectsChange,
        viewsChange,
      },
      recentProjects,
      chartData,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}

async function getChartData(userId: string) {
  const days = 14;
  const data = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    
    const views = await prisma.viewLog.count({
      where: {
        userId,
        viewedAt: {
          gte: date,
          lt: nextDate,
        },
      },
    });
    
    const projects = await prisma.project.count({
      where: {
        userId,
        createdAt: {
          gte: date,
          lt: nextDate,
        },
      },
    });

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views,
      projects,
    });
  }
  
  return data;
}
