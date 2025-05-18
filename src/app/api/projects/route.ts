import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ProjectObject, ProjectStatus } from '@/types/hand_spun_datatypes';

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
        theme: true,
        mainImage: true
      }
    });
    
    // Transform the projects to match ProjectObject type
    const transformedProjects: ProjectObject[] = projects.map(project => {
      console.log('Project main image:', project.mainImage);
      return ({
        ...project,
        status: project.status as ProjectStatus,
        steps: project.steps.map(step => ({
          ...step,
          images: step.images.map(image => ({
            ...image,
            url: image.url.startsWith('/') ? image.url : `/${image.url}`,
            type: image.type as "reference" | "progress" | undefined
          }))
        })),
        theme: {
          ...project.theme,
          iconType: project.theme.iconType || undefined,
          color: project.theme.color || undefined
        },
        stats: project.stats || { 
          id: '',
          projectId: project.id,
          views: 0, 
          likes: 0, 
          comments: 0, 
          shares: 0, 
          public: true 
        },
        mainImage: project.mainImage ? {
          id: project.mainImage.id,
          projectId: project.id,
          url: project.mainImage.url.startsWith('/') ? project.mainImage.url : `/${project.mainImage.url}`
        } : undefined
      });
    });
    
    return NextResponse.json(transformedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
} 