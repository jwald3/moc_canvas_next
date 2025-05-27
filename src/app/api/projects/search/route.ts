import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ProjectObject, ProjectStatus } from "@/types/hand_spun_datatypes";
import colors from "@/lib/colors";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q') || '';
        const type = searchParams.get('type') || 'all'; // 'all', 'color', 'theme', 'tag'
        const themeId = searchParams.get('themeId');
        const colorIds = searchParams.get('colorIds')?.split(',').map(Number) || [];

        const whereClause: {
            public: boolean;
            colorPalette?: { hasSome: number[] };
            themeId?: string;
            tags?: { has: string };
            OR?: Array<{
                title?: { contains: string; mode: 'insensitive' };
                description?: { contains: string; mode: 'insensitive' };
                tags?: { has: string };
            }>;
        } = {
            public: true
        };

        // Build where clause based on search type
        switch (type) {
            case 'color':
                if (colorIds.length > 0) {
                    whereClause.colorPalette = {
                        hasSome: colorIds
                    };
                } else if (query) {
                    // Find color IDs that match the query
                    const matchingColors = colors.filter(color => 
                        color.bricklinkColorName.toLowerCase().includes(query.toLowerCase()) ||
                        color.semanticThemes.some(theme => 
                            theme.toLowerCase().includes(query.toLowerCase())
                        )
                    );
                    const matchingColorIds = matchingColors.map(c => c.bricklinkColorId);
                    
                    if (matchingColorIds.length > 0) {
                        whereClause.colorPalette = {
                            hasSome: matchingColorIds
                        };
                    }
                }
                break;

            case 'theme':
                if (themeId && themeId !== 'all') {
                    whereClause.themeId = themeId;
                }
                break;

            case 'tag':
                if (query) {
                    whereClause.tags = {
                        has: query
                    };
                }
                break;

            case 'all':
            default:
                if (query) {
                    whereClause.OR = [
                        {
                            title: {
                                contains: query,
                                mode: 'insensitive'
                            }
                        },
                        {
                            description: {
                                contains: query,
                                mode: 'insensitive'
                            }
                        },
                        {
                            tags: {
                                has: query
                            }
                        }
                    ];
                }
                break;
        }

        const projects = await prisma.handSpunProject.findMany({
            where: whereClause,
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
            orderBy: {
                updatedAt: 'desc'
            }
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
        console.error("Error searching projects:", error);
        return NextResponse.json(
            { error: "Failed to search projects" },
            { status: 500 }
        );
    }
} 