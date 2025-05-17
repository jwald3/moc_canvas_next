'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getProjectById(id: string) {
  try {
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
      },
    })
    
    return project
  } catch (error) {
    console.error('Error fetching project:', error)
    throw new Error('Failed to fetch project')
  }
} 