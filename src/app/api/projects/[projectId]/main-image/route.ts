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
        const { imageUrl } = await request.json();
        const { projectId } = await params;

        // Only require authentication for updating main image
        if (!userId) {
            return NextResponse.json(
                { error: "Authentication required to update main image" },
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
                { error: "You can only update your own projects" },
                { status: 403 }
            );
        }

        // Create new main image
        const mainImage = await prisma.handSpunProjectMainImage.create({
            data: {
                url: imageUrl,
            },
        });

        // Update project with new main image
        const updatedProject = await prisma.handSpunProject.update({
            where: { id: projectId },
            data: {
                mainImageId: mainImage.id,
            },
            include: {
                mainImage: true,
            },
        });

        return NextResponse.json(updatedProject);
    } catch (error) {
        console.error("Error updating main image:", error);
        return NextResponse.json(
            { error: "Failed to update main image" },
            { status: 500 }
        );
    }
}