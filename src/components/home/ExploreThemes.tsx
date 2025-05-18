'use client';

import React from "react";
import Link from "next/link";
import {
    ChevronRight,
    Rocket,
    Landmark,
    Shield,
    LucideIcon
} from "lucide-react";
import ThemeTile from "@/components/home/ThemeTile";
import { HandSpunTheme } from "@prisma/client";

// Theme configuration mapping
const themeConfig: Record<string, { color: string, icon: LucideIcon }> = {
    "Star Wars": {
        color: "#FFE81F",
        icon: Rocket
    },
    "Architecture": {
        color: "#4A90E2",
        icon: Landmark
    },
    "Marvel": {
        color: "#E23636",
        icon: Shield
    }
};

interface ExploreThemesProps {
    themes: (HandSpunTheme & {
        projects: {
            id: string;
            description: string;
            title: string;
            tags: string[];
            createdAt: Date;
            updatedAt: Date;
            status: string;
            owner: string | null;
            avatar: string | null;
            themeId: string;
            mainImageId: string | null;
        }[];
    })[];
}

const ExploreThemes = ({ themes }: ExploreThemesProps) => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-[0.03] bg-grid-slate-100" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Explore Popular Themes
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover amazing builds across different LEGO® themes
                        and find inspiration for your next project
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {themes.map((theme) => {
                        const config = themeConfig[theme.name];
                        return (
                            <ThemeTile 
                                key={theme.id} 
                                theme={theme} 
                                color={config?.color} 
                                Icon={config?.icon}
                            />
                        );
                    })}
                </div>

                {/* View All Themes Button */}
                <div className="mt-12 text-center">
                    <Link
                        href="/themes"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-colors group"
                    >
                        View All Themes
                        <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ExploreThemes;
