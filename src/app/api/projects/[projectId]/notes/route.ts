import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
    request: Request,
    context: { params: Promise<{ projectId: string }> }
) {
    const { projectId } = await context.params;
    
    try {
        const { content } = await request.json();
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