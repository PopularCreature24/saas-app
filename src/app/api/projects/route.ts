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

    const projects = await prisma.project.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Projects fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Project name is required' },
        { status: 400 }
      );
    }

    const userProjects = await prisma.project.count({
      where: { userId: session.user.id },
    });

    const subscription = await prisma.subscription.findUnique({
      where: { userId: session.user.id },
    });

    const maxProjects = {
      FREE: 3,
      STARTER: 15,
      PRO: 1000,
      ENTERPRISE: 1000,
    };

    const tier = subscription?.tier || 'FREE';
    const max = maxProjects[tier as keyof typeof maxProjects] || 3;

    if (userProjects >= max) {
      return NextResponse.json(
        { error: `You have reached the maximum number of projects for your plan (${max}). Please upgrade to create more.` },
        { status: 403 }
      );
    }

    const project = await prisma.project.create({
      data: {
        userId: session.user.id,
        name: name.trim(),
        description: description?.trim() || null,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Project creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
