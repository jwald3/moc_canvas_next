import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { type NextRequest } from "next/server";

export async function PUT(
    request: NextRequest,
    { params }: { params: { projectId: string } }
) {
    try {
        const { imageUrl } = await request.json();
        const { projectId } = params;

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