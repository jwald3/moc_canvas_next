import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { HandSpunTheme } from "@prisma/client";
import { ProjectObject } from "@/types/hand_spun_datatypes";
        
interface ThemeTileProps {
    theme: HandSpunTheme & {
        projects: ProjectObject[];
    };
    color: string;
    gradient: string;
    Icon: LucideIcon;
}

const ThemeTile = ({ theme, color, gradient, Icon }: ThemeTileProps) => {
    return (
        <Link 
            href={`/themes/${theme.id}`}
            className="group block bg-gradient-to-br from-white to-slate-50/80 rounded-xl border border-slate-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
        >
            <div className={`bg-gradient-to-br ${gradient} p-4 sm:p-6`}>
                <div className="flex items-center gap-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Icon style={{ color }} className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-800">
                            {theme.name}
                        </h3>
                        <div className="text-xs sm:text-sm text-slate-600">
                            {theme.projects.length} projects
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ThemeTile;
