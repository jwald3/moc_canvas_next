import { PrismaClient } from '@prisma/client'
import { projects, projectDetails } from '../src/data/sample-data'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.projectImage.deleteMany()
  await prisma.buildStep.deleteMany()
  await prisma.projectStats.deleteMany()
  await prisma.project.deleteMany()

  // Seed projects
  for (const project of projects) {
    const details = projectDetails[project.id]
    
    const createdProject = await prisma.project.create({
      data: {
        name: project.name,
        description: details?.description,
        image: project.image,
        tags: project.tags,
        lastUpdated: new Date(project.lastUpdated),
        owner: project.owner,
        avatar: project.avatar,
        progress: details?.progress,
        status: details?.status,
        stats: details?.stats ? {
          create: details.stats
        } : undefined,
        steps: details?.steps ? {
          create: details.steps.map(step => ({
            title: step.title,
            description: step.description,
            completed: step.completed,
            images: {
              create: step.images.map(img => ({
                type: img.type,
                url: img.url
              }))
            }
          }))
        } : undefined
      }
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 