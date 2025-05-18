import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const themes = await prisma.handSpunTheme.findMany({
        include: {
            projects: true,
        },
    });
    
    const popularThemes = themes
        .sort((a, b) => b.projects.length - a.projects.length)
        .slice(0, 3);
        
    return NextResponse.json(popularThemes);
} 