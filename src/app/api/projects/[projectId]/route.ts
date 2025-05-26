import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { type NextRequest } from "next/server";

export async function PUT(
    request: NextRequest,
    { params }: { params: { projectId: string } }
) {
    try {
        const { title, description } = await request.json();
        const { projectId } = params;

        const updatedProject = await prisma.handSpunProject.update({
            where: { id: projectId },
            data: {
                title,
                description,
            },
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
    { params }: { params: { projectId: string } }
) {
    try {
        const { projectId } = params;
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