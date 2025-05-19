import React from "react";
import { ProjectThemeObject } from '@/types/hand_spun_datatypes';
import { LucideIcon } from "lucide-react";

interface ExploreThemeTileProps {
    theme: ProjectThemeObject;
    currentTheme: string;
    handleThemeChange: (themeId: string) => void;
    config: {
        color: string;
        gradient: string;
        icon: LucideIcon;
    };
}

const ExploreThemeTile = ({ theme, currentTheme, handleThemeChange, config }: ExploreThemeTileProps) => {
    const Icon = config.icon;
    const isSelected = currentTheme === theme.id;
    
    return (
        <button
            onClick={() => handleThemeChange(theme.id)}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition-all"
        >
            <div className="relative z-10 p-6">
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${config.gradient}`}>
                        <Icon size={24} className="text-slate-700" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800 text-left">
                            {theme.name}
                        </h3>
                        <p className="text-sm text-slate-600 text-left">
                            {theme.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        </button>
    );
};

export default ExploreThemeTile;
