import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ProjectObject, ProjectStatus, ProjectBuildStepObject, ProjectImageObject } from "@/types/hand_spun_datatypes";

export async function GET() {
    try {
        const projects = await prisma.handSpunProject.findMany({
            include: {
                stats: true,
                steps: {
                    include: {
                        images: true,
                    },
                },
                theme: true,
                mainImage: true,
            },
        });

        // Transform the projects to match ProjectObject type
        const transformedProjects: ProjectObject[] = projects.map((project) => {
            return {
                ...project,
                status: project.status as ProjectStatus,
                steps: project.steps.map((step) => ({
                    ...step,
                    images: step.images.map((image) => ({
                        ...image,
                        url: image.url,
                        type: image.type as
                            | "reference"
                            | "progress"
                            | undefined,
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
        const data = await request.json();

        // Create the project with a transaction to ensure all related records are created
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

            // Create the project
            const project = await tx.handSpunProject.create({
                data: {
                    title: data.title,
                    description: data.description,
                    tags: data.tags,
                    status: data.status,
                    themeId: theme.id,
                    mainImageId: mainImage?.id,
                    // Create stats
                    stats: {
                        create: {
                            views: 0,
                            likes: 0,
                            comments: 0,
                            shares: 0,
                            public: true,
                        },
                    },
                    // Create build steps
                    steps: {
                        create: data.buildSections.map(
                            (section: ProjectBuildStepObject, index: number) => ({
                                title: section.title,
                                description: section.description,
                                order: index,
                                // Create images for each step
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
