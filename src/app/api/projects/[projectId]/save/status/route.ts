import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { type NextRequest } from "next/server";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        const { userId } = await auth();
        const { projectId } = await params;

        if (!userId) {
            return NextResponse.json({ saved: false });
        }

        const savedProject = await prisma.handSpunSavedProject.findUnique({
            where: {
                userId_projectId: {
                    userId,
                    projectId,
                },
            },
        });

        return NextResponse.json({ saved: !!savedProject });
    } catch (error) {
        console.error("Error checking save status:", error);
        return NextResponse.json({ saved: false });
    }
} 