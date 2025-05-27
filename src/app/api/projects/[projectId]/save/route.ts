import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { type NextRequest } from "next/server";

export async function POST(
    _request: NextRequest,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        const { userId } = await auth();
        const { projectId } = await params;

        if (!userId) {
            return NextResponse.json(
                { error: "Authentication required to save projects" },
                { status: 401 }
            );
        }

        // Check if project exists and is public (or user owns it)
        const project = await prisma.handSpunProject.findUnique({
            where: { id: projectId },
            select: { id: true, public: true, userId: true },
        });

        if (!project) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        // Users can save public projects or their own projects
        if (!project.public && project.userId !== userId) {
            return NextResponse.json(
                { error: "Cannot save private projects" },
                { status: 403 }
            );
        }

        // Check if already saved
        const existingSave = await prisma.handSpunSavedProject.findUnique({
            where: {
                userId_projectId: {
                    userId,
                    projectId,
                },
            },
        });

        if (existingSave) {
            return NextResponse.json(
                { error: "Project already saved" },
                { status: 400 }
            );
        }

        // Create the save record
        const savedProject = await prisma.handSpunSavedProject.create({
            data: {
                userId,
                projectId,
            },
        });

        return NextResponse.json({ 
            success: true, 
            saved: true,
            savedProject 
        });
    } catch (error) {
        console.error("Error saving project:", error);
        return NextResponse.json(
            { error: "Failed to save project" },
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

        if (!userId) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        // Remove the save record
        await prisma.handSpunSavedProject.deleteMany({
            where: {
                userId,
                projectId,
            },
        });

        return NextResponse.json({ 
            success: true, 
            saved: false 
        });
    } catch (error) {
        console.error("Error unsaving project:", error);
        return NextResponse.json(
            { error: "Failed to unsave project" },
            { status: 500 }
        );
    }
} 