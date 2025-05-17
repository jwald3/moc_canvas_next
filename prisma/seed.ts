import { PrismaClient } from '@prisma/client'
import { projects, themes } from '../src/data/seed-data'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.handSpunProjectImage.deleteMany()
  await prisma.handSpunBuildStep.deleteMany()
  await prisma.handSpunProjectStats.deleteMany()
  await prisma.handSpunProject.deleteMany()
  await prisma.handSpunTheme.deleteMany()

  // First seed themes since projects depend on them
  const createdThemes = await Promise.all(
    themes.map(theme => 
      prisma.handSpunTheme.create({
        data: {
          id: theme.id, // Using the predefined theme ids from seed-data
          name: theme.name,
          description: theme.description,
          iconType: theme.iconType,
          color: theme.color
        }
      })
    )
  )

  // Then seed projects with their related data
  for (const project of projects) {
    // First create the project without any images
    const createdProject = await prisma.handSpunProject.create({
      data: {
        id: project.id,
        title: project.title,
        description: project.description,
        tags: project.tags,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        status: project.status,
        owner: project.owner,
        avatar: project.avatar,
        themeId: project.theme.id,
        
        // Create stats
        stats: {
          create: {
            views: project.stats.views,
            likes: project.stats.likes,
            comments: project.stats.comments,
            shares: project.stats.shares,
            public: project.stats.public
          }
        },

        // Create steps without images first
        steps: {
          create: project.steps.map(step => ({
            id: step.id,
            title: step.title,
            description: step.description,
            order: step.order
          }))
        }
      }
    });

    // Now add images to each step
    for (const step of project.steps) {
      for (const img of step.images) {
        await prisma.handSpunProjectImage.create({
          data: {
            id: img.id,
            order: img.order,
            caption: img.caption,
            url: img.url,
            type: img.type,
            buildStep: { connect: { id: step.id } }
          }
        });
      }
    }

    // Finally, handle the main image if it exists
    if (project.mainImage) {
      const mainImage = await prisma.handSpunProjectImage.create({
        data: {
          id: project.mainImage.id,
          order: project.mainImage.order,
          caption: project.mainImage.caption,
          url: project.mainImage.url,
          type: project.mainImage.type,
          // Only connect to buildStep if buildStepId is not "main"
          ...(project.mainImage.buildStepId !== "main" ? {
            buildStep: { connect: { id: project.mainImage.buildStepId } }
          } : {})
        }
      });
      
      // Update the project with the main image
      await prisma.handSpunProject.update({
        where: { id: project.id },
        data: { mainImageId: mainImage.id }
      });
    }
  }

  console.log('Database has been seeded with HandSpun data')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 