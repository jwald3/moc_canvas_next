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

        console.log("Visibility update request:", { userId, projectId, isPublic });

        if (!userId) {
            console.log("No userId found in auth");
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        // Check if the user owns this project
        const existingProject = await prisma.handSpunProject.findUnique({
            where: { id: projectId },
            select: { userId: true, title: true },
        });

        console.log("Found project:", existingProject);

        if (!existingProject) {
            console.log("Project not found");
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        console.log("Comparing userIds:", { projectUserId: existingProject.userId, requestUserId: userId });

        if (existingProject.userId !== userId) {
            console.log("User does not own this project");
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

        console.log("Successfully updated project visibility:", { projectId, public: updatedProject.public });

        return NextResponse.json({ success: true, public: updatedProject.public });
    } catch (error) {
        console.error("Error updating project visibility:", error);
        return NextResponse.json(
            { error: "Failed to update project visibility" },
            { status: 500 }
        );
    }
} 