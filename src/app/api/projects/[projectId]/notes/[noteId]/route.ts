import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
    _request: Request,
    context: { params: { projectId: string; noteId: string } }
) {
    const { noteId } = context.params;
    
    try {
        await prisma.handSpunProjectNote.delete({
            where: { id: noteId },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting note:', error);
        return NextResponse.json(
            { error: "Failed to delete note" },
            { status: 500 }
        );
    }
} 