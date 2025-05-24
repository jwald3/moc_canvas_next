'use server'

import prisma from '@/lib/prisma'

export async function getProjectById(id: string) {
  try {
    console.log('Fetching project with ID:', id) // Debug log
    
    const project = await prisma.handSpunProject.findUnique({
      where: { id },
      include: {
        theme: true,
        steps: {
          include: {
            images: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        stats: true,
        mainImage: true,
        images: true,
        notes: true,
      },
    })
    
    console.log('Project fetch result:', project ? 'Found' : 'Not found') // Debug log
    
    if (!project) {
      throw new Error('Project not found')
    }
    
    return project
  } catch (error) {
    console.error('Detailed error fetching project:', error) // More detailed error
    throw new Error('Failed to fetch project')
  }
} 