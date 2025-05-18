import React from "react";
import { ProjectThemeObject } from '@/types/hand_spun_datatypes';

interface ExploreThemeTileProps {
    theme: ProjectThemeObject;
    currentTheme: string;
    handleThemeChange: (themeId: string) => void;
    iconMap: Record<string, React.ReactNode>;
}

const ExploreThemeTile = ({ theme, currentTheme, handleThemeChange, iconMap }: ExploreThemeTileProps) => {
    return (
        <button
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={`relative group overflow-hidden rounded-xl p-4 transition-all ${
                currentTheme === theme.id
                    ? "bg-gradient-to-br " +
                      theme.color +
                      " text-white shadow-lg scale-[1.02]"
                    : "bg-white hover:bg-gray-50 text-gray-800 shadow"
            }`}
        >
            <div className="flex items-center gap-3">
                <div
                    className={`p-2 rounded-lg ${
                        currentTheme === theme.id
                            ? "bg-white/20"
                            : "bg-gray-100"
                    }`}
                >
                    {iconMap[theme.iconType as keyof typeof iconMap]}
                </div>
                <div className="text-left">
                    <h3 className="font-semibold">{theme.name}</h3>
                    <p
                        className={`text-sm ${
                            currentTheme === theme.id
                                ? "text-white/80"
                                : "text-gray-500"
                        }`}
                    >
                        {theme.description}
                    </p>
                </div>
            </div>
        </button>
    );
};

export default ExploreThemeTile;
