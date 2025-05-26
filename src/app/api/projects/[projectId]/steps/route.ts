import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        const { userId } = await auth();
        const { title, description, images } = await request.json();
        const { projectId } = await params;

        if (!userId) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        // Check ownership
        const project = await prisma.handSpunProject.findUnique({
            where: { id: projectId },
            select: { userId: true },
        });

        if (!project || project.userId !== userId) {
            return NextResponse.json(
                { error: "Project not found or access denied" },
                { status: 403 }
            );
        }

        // Create the step with images
        const step = await prisma.handSpunBuildStep.create({
            data: {
                title,
                description,
                projectId,
                order: 0,
                images: {
                    create: images.map((url: string, index: number) => ({
                        url,
                        caption: "", 
                        type: "progress",
                        order: index,
                    })),
                },
            },
        });

        return NextResponse.json(step);
    } catch (error) {
        console.error("Error creating step:", error);
        return NextResponse.json(
            { error: "Failed to create step" },
            { status: 500 }
        );
    }
} 