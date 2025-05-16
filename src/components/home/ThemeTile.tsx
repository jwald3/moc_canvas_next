import React from "react";
import Link from "next/link";
import {
    ChevronRight,
    Star,
    TrendingUp,
    Gift,
    Users,
    BookOpen,
    Trophy,
    Plus,
} from "lucide-react";
import {
    PopularTheme,
} from "@/data/sample-data";

const ThemeTile = ({ theme }: { theme: PopularTheme }) => {

    const iconMap = {
        TrendingUp: <TrendingUp size={16} />,
        Star: <Star size={16} />,
        Gift: <Gift size={16} />,
        Users: <Users size={16} />,
        BookOpen: <BookOpen size={16} />,
        Trophy: <Trophy size={16} />,
        Plus: <Plus size={16} />
    };
    
    return (
        <Link
            key={theme.id}
            href={`/explore?theme=${theme.id}`}
            className={`relative group overflow-hidden rounded-2xl p-4 transition-all duration-300 bg-white hover:shadow-xl border border-gray-100`}
        >
            <div
                className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-[0.08] group-hover:opacity-[0.12] transition-opacity`}
            />
            <div className="relative p-4">
                <div className="flex items-center gap-4">
                    <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${theme.color} flex items-center justify-center shadow-lg`}
                    >
                        <div className="text-white">
                            {iconMap[theme.iconType as keyof typeof iconMap]}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                            {theme.name}
                        </h3>
                        <p className="text-gray-500">{theme.count}</p>
                    </div>
                    <div className="ml-auto">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br ${theme.color} text-white opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 -translate-x-4 transition-all duration-300`}
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
