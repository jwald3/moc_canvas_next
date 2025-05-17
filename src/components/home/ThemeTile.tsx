import React from "react";
import Link from "next/link";
import {
    ChevronRight,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ThemeTileProps {
    theme: {
        name: string;
        id: string;
        description: string;
        iconType: string | null;
        color: string | null;
    };
    color?: string;
    Icon?: LucideIcon;
}

const ThemeTile = ({ theme, color, Icon }: ThemeTileProps) => {
    // Convert color string to actual CSS style
    const gradientStyle = {
        background: `linear-gradient(to bottom right, ${color}, ${color}80)`,
    };

    const overlayStyle = {
        backgroundColor: color,
        opacity: 0.08,
    };
    
    return (
        <Link
            key={theme.id}
            href={`/explore?theme=${theme.id}`}
            className="relative group overflow-hidden rounded-2xl p-4 transition-all duration-300 bg-white hover:shadow-xl border border-gray-100"
        >
            {/* Use style prop instead of Tailwind classes for dynamic colors */}
            <div
                className="absolute inset-0 group-hover:opacity-[0.12] transition-opacity"
                style={overlayStyle}
            />
            <div className="relative p-4">
                <div className="flex items-center gap-4">
                    <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                        style={gradientStyle}
                    >
                        <div className="text-white">
                            {Icon && <Icon size={24} />}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                            {theme.name}
                        </h3>
                        <p className="text-gray-500">10 projects</p>
                    </div>
                    <div className="ml-auto">
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 -translate-x-4 transition-all duration-300"
                            style={gradientStyle}
                        >
                            <ChevronRight size={16} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ThemeTile;
