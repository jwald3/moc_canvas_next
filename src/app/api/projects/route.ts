import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ProjectObject, ProjectStatus, ProjectBuildStepObject, ProjectImageObject } from "@/types/hand_spun_datatypes";

export async function GET() {
    try {
        const { userId } = await auth();
        
        // Only show public projects, unless user is viewing their own projects
        const projects = await prisma.handSpunProject.findMany({
            where: {
                public: true // Much simpler query
            },
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
        });

        // Transform the projects to match ProjectObject type
        const transformedProjects: ProjectObject[] = projects.map((project) => {
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
            };
        });

        return NextResponse.json(transformedProjects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json(
            { error: "Failed to fetch projects" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        
        // Allow project creation without authentication for now, but use userId if available
        const data = await request.json();

        const project = await prisma.$transaction(async (tx) => {
            // First create the theme
            const theme = await tx.handSpunTheme.create({
                data: {
                    name: "Default Theme",
                    description: "Default project theme",
                },
            });

            // Create the main image if provided
            let mainImage = null;
            if (data.mainImage) {
                mainImage = await tx.handSpunProjectMainImage.create({
                    data: {
                        url: data.mainImage.url,
                    },
                });
            }

            // Create the project with user association if available
            const project = await tx.handSpunProject.create({
                data: {
                    title: data.title,
                    description: data.description,
                    tags: data.tags,
                    status: data.status,
                    userId: userId || "anonymous",
                    owner: userId || null,
                    public: false,
                    themeId: theme.id,
                    mainImageId: mainImage?.id,
                    // Add standalone images
                    images: {
                        create: data.images?.map(
                            (image: ProjectImageObject, imageIndex: number) => ({
                                url: image.url,
                                caption: image.caption || "",
                                type: "standalone",
                                order: imageIndex,
                            })
                        ) || [],
                    },
                    // Create stats
                    stats: {
                        create: {
                            views: 0,
                            likes: 0,
                            comments: 0,
                            shares: 0,
                        },
                    },
                    // Create build steps
                    steps: {
                        create: data.buildSections.map(
                            (section: ProjectBuildStepObject, index: number) => ({
                                title: section.title,
                                description: section.description,
                                order: index,
                                images: {
                                    create: section.images.map(
                                        (image: ProjectImageObject, imageIndex: number) => ({
                                            url: image.url,
                                            caption: image.caption,
                                            type: image.type || "progress",
                                            order: imageIndex,
                                        })
                                    ),
                                },
                            })
                        ),
                    },
                },
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
                },
            });

            return project;
        });

        return NextResponse.json(project);
    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json(
            { error: "Failed to create project" },
            { status: 500 }
        );
    }
}
