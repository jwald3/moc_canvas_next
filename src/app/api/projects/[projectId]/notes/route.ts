import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(
    request: Request,
    context: { params: Promise<{ projectId: string }> }
) {
    const { projectId } = await context.params;
    
    try {
        const { userId } = await auth();
        const { content } = await request.json();
        
        // Only require authentication for adding notes
        if (!userId) {
            return NextResponse.json(
                { error: "Authentication required to add notes" },
                { status: 401 }
            );
        }

        // Check if the user owns this project
        const project = await prisma.handSpunProject.findUnique({
            where: { id: projectId },
            select: { userId: true },
        });

        if (!project) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        if (project.userId !== userId) {
            return NextResponse.json(
                { error: "You can only add notes to your own projects" },
                { status: 403 }
            );
        }
        
        console.log('Creating note:', { projectId, content });
        
        const note = await prisma.handSpunProjectNote.create({
            data: {
                content,
                projectId,
            },
        });
        return NextResponse.json(note);
    } catch (error) {
        console.error('Error creating note:', error);
        return NextResponse.json(
            { error: "Failed to create note" },
            { status: 500 }
        );
    }
}