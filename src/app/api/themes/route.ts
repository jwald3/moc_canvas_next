import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ProjectStatus } from "@/types/hand_spun_datatypes";

export async function GET() {
    const themes = await prisma.handSpunTheme.findMany({
        include: {
            projects: {
                include: {
                    theme: true,
                    stats: true,
                    steps: {
                        include: {
                            images: true,
                        },
                    },
                    mainImage: true,
                    images: true,
                    notes: true,
                },
            },
        },
    });
    
    // Transform the data to match ProjectObject type
    const transformedThemes = themes.map(theme => ({
        ...theme,
        projects: theme.projects.map(project => ({
            ...project,
            status: project.status as ProjectStatus,
            images: project.images.map(image => ({
                ...image,
                buildStepId: image.buildStepId ?? undefined,
                projectId: image.projectId ?? undefined,
                type: image.type as "reference" | "progress" | "standalone" | undefined,
            })),
            steps: project.steps.map(step => ({
                ...step,
                images: step.images.map(image => ({
                    ...image,
                    buildStepId: image.buildStepId ?? undefined,
                    projectId: image.projectId ?? undefined,
                    type: image.type as "reference" | "progress" | "standalone" | undefined,
                })),
            })),
            theme: {
                ...project.theme,
                iconType: project.theme.iconType || undefined,
                color: project.theme.color || undefined,
            },
            stats: project.stats || {
                id: "",
                projectId: project.id,
                views: 0,
                likes: 0,
                comments: 0,
                shares: 0,
                public: true,
            },
            mainImage: project.mainImage
                ? {
                      id: project.mainImage.id,
                      projectId: project.id,
                      url: project.mainImage.url,
                  }
                : undefined,
        }))
    }));
    
    const popularThemes = transformedThemes
        .sort((a, b) => b.projects.length - a.projects.length)
        .slice(0, 3);
        
    return NextResponse.json(popularThemes);
} 