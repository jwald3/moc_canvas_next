import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.handSpunProject.findMany({
      include: {
        stats: true,
        steps: {
          include: {
            images: true
          }
        },
        theme: true
      }
    });
    
    const transformedProjects = projects.map(project => ({
      ...project,
      stats: project.stats || { views: 0, likes: 0, comments: 0, shares: 0, public: true }
    }));
    
    return NextResponse.json(transformedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
} 