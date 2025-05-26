import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { type NextRequest } from "next/server";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        const { userId } = await auth();
        const { public: isPublic } = await request.json();
        const { projectId } = await params;

        if (!userId) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        // Check if the user owns this project
        const existingProject = await prisma.handSpunProject.findUnique({
            where: { id: projectId },
            select: { userId: true },
        });

        if (!existingProject) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        if (existingProject.userId !== userId) {
            return NextResponse.json(
                { error: "You can only change visibility of your own projects" },
                { status: 403 }
            );
        }

        // Update the project's visibility directly
        const updatedProject = await prisma.handSpunProject.update({
            where: { id: projectId },
            data: { public: isPublic },
        });

        return NextResponse.json({ success: true, public: updatedProject.public });
    } catch (error) {
        console.error("Error updating project visibility:", error);
        return NextResponse.json(
            { error: "Failed to update project visibility" },
            { status: 500 }
        );
    }
} 