'use client';

import React from "react";
import Link from "next/link";
import {
    ChevronRight,
    Rocket,
    Landmark,
    Shield,
    LayoutGrid,
    LucideIcon
} from "lucide-react";
import ThemeTile from "@/components/home/ThemeTile";
import { HandSpunTheme } from "@prisma/client";
import { ProjectThemeObject, ProjectBuildStepObject, ProjectStatsObject, ProjectStatus } from "@/types/hand_spun_datatypes";

// Theme configuration mapping
const themeConfig: Record<string, { color: string, gradient: string, icon: LucideIcon }> = {
    "Star Wars": {
        color: "#FFE81F",
        gradient: "from-[#FFE81F]/20 via-[#FFA500]/20 to-[#FF4D4D]/20",
        icon: Rocket
    },
    "Architecture": {
        color: "#4A90E2",
        gradient: "from-[#4A90E2]/20 via-[#63B3ED]/20 to-[#90CDF4]/20",
        icon: Landmark
    },
    "Marvel": {
        color: "#E23636",
        gradient: "from-[#E23636]/20 via-[#FF6B6B]/20 to-[#FFA07A]/20",
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
            status: ProjectStatus;
            owner: string | null;
            avatar: string | null;
            themeId: string;
            mainImageId: string | null;
            theme: ProjectThemeObject;
            steps: ProjectBuildStepObject[];
            stats: ProjectStatsObject;
        }[];
    })[];
}

const ExploreThemes = ({ themes }: ExploreThemesProps) => {
    return (
        <section className="py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
            {/* Decorative elements - more subtle version */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#ffd700]/5 via-[#da5249]/5 to-[#4a9eff]/5 rounded-full opacity-40 blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#4a9eff]/5 via-[#da5249]/5 to-[#ffd700]/5 rounded-full opacity-40 blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
                <div className="text-center mb-8 sm:mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl text-[#da5249] font-medium mb-3 border-2 border-[#da5249]/10 text-sm shadow-md mx-auto">
                        <LayoutGrid size={16} className="text-[#da5249]" />
                        <span>Popular Categories</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-4">
                        Explore Popular Themes
                    </h2>
                    <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto">
                        Discover amazing builds across different LEGO® themes
                        and find inspiration for your next project
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
                    {themes.map((theme) => {
                        const config = themeConfig[theme.name];
                        return (
                            <ThemeTile 
                                key={theme.id} 
                                theme={theme} 
                                color={config?.color}
                                gradient={config?.gradient}
                                Icon={config?.icon}
                            />
                        );
                    })}
                </div>

                <div className="text-center">
                    <Link
                        href="/themes"
                        className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl text-slate-600 hover:text-[#da5249] border-2 border-slate-100 hover:border-[#da5249]/10 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-transform font-medium group"
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
