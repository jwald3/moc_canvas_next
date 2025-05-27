import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ProjectObject, ProjectStatus } from "@/types/hand_spun_datatypes";

export async function GET() {
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        const savedProjects = await prisma.handSpunSavedProject.findMany({
            where: {
                userId: userId,
            },
            include: {
                project: {
                    include: {
                        stats: true,
                        steps: {
                            include: {
                                images: true,
                            },
                        },
                        theme: true,
                        mainImage: true,
                        images: true,
                        notes: true,
                    },
                },
            },
            orderBy: {
                savedAt: 'desc',
            },
        });

        // Transform the projects to match ProjectObject type
        const transformedProjects: ProjectObject[] = savedProjects.map((savedProject) => {
            const project = savedProject.project;
            return {
                ...project,
                notes: project.notes,
                status: project.status as ProjectStatus,
                images: project.images.map(image => ({
                    ...image,
                    buildStepId: image.buildStepId ?? undefined,
                    projectId: image.projectId ?? undefined,
                    type: image.type as "reference" | "progress" | "standalone" | undefined,
                })),
                steps: project.steps.map((step) => ({
                    ...step,
                    images: step.images.map((image) => ({
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
                },
                mainImage: project.mainImage
                    ? {
                          id: project.mainImage.id,
                          projectId: project.id,
                          url: project.mainImage.url,
                      }
                    : undefined,
                // Add saved project metadata
                isSavedByCurrentUser: true,
                savedBy: [{
                    id: savedProject.id,
                    userId: savedProject.userId,
                    projectId: savedProject.projectId,
                    savedAt: savedProject.savedAt,
                }],
            };
        });

        return NextResponse.json(transformedProjects);
    } catch (error) {
        console.error("Error fetching saved projects:", error);
        return NextResponse.json(
            { error: "Failed to fetch saved projects" },
            { status: 500 }
        );
    }
} 