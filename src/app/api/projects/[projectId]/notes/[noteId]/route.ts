import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string; noteId: string } }
) {
    try {
        await prisma.handSpunProjectNote.delete({
            where: { id: params.noteId },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete note" },
            { status: 500 }
        );
    }
} 