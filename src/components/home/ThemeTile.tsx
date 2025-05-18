import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { HandSpunTheme } from "@prisma/client";

interface ThemeTileProps {
    theme: HandSpunTheme & {
        projects: any[];
    };
    color: string;
    gradient: string;
    Icon: LucideIcon;
}

const ThemeTile = ({ theme, color, gradient, Icon }: ThemeTileProps) => {
    return (
        <Link 
            href={`/themes/${theme.id}`}
            className="group block bg-gradient-to-br from-white to-slate-50/80 rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
        >
            <div className={`bg-gradient-to-br ${gradient} p-6 sm:p-8`}>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                    <Icon style={{ color }} className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1">
                    {theme.name}
                </h3>
                <div className="text-sm text-slate-600">
                    {theme.projects.length} projects
                </div>
            </div>
        </Link>
    );
};

export default ThemeTile;
