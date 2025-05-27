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
        const body = await request.json();
        const { projectId } = await params;

        // Only require authentication for editing
        if (!userId) {
            return NextResponse.json(
                { error: "Authentication required to edit projects" },
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
                { error: "You can only edit your own projects" },
                { status: 403 }
            );
        }

        // Prepare update data - only include fields that are provided
        const updateData: {
            title?: string;
            description?: string;
            colorPalette?: number[];
        } = {};
        
        if (body.title !== undefined) {
            updateData.title = body.title;
        }
        
        if (body.description !== undefined) {
            updateData.description = body.description;
        }
        
        if (body.colorPalette !== undefined) {
            // Parse colorPalette string to number array if it's a string
            updateData.colorPalette = typeof body.colorPalette === 'string' 
                ? JSON.parse(body.colorPalette) 
                : body.colorPalette;
        }

        const updatedProject = await prisma.handSpunProject.update({
            where: { id: projectId },
            data: updateData,
            include: {
                mainImage: true,
                theme: true,
                stats: true,
                steps: {
                    include: {
                        images: true,
                    }
                },
                images: true,
                notes: true,
            },
        });

        return NextResponse.json(updatedProject);
    } catch (error) {
        console.error("Error updating project:", error);
        return NextResponse.json(
            { error: "Failed to update project" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        const { userId } = await auth();
        const { projectId } = await params;

        // Only require authentication for deleting
        if (!userId) {
            return NextResponse.json(
                { error: "Authentication required to delete projects" },
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
                { error: "You can only delete your own projects" },
                { status: 403 }
            );
        }

        await prisma.handSpunProject.delete({
            where: { id: projectId },
        });
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting project:", error);
        return NextResponse.json(
            { error: "Failed to delete project" },
            { status: 500 }
        );
    }
} 