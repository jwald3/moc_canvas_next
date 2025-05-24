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
            className={`group relative overflow-hidden rounded-2xl transition-all duration-200 ${
                isSelected 
                    ? `bg-gradient-to-br ${config.gradient} shadow-lg scale-[1.02] border-2 border-[#da5249]/20` 
                    : 'bg-white hover:shadow-md shadow-sm hover:scale-[1.01] border border-gray-100'
            }`}
        >
            <div className="relative z-10 p-6">
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl transition-colors ${
                        isSelected 
                            ? 'bg-slate-900/10 backdrop-blur-sm' 
                            : `bg-gradient-to-br ${config.gradient}`
                    }`}>
                        <Icon size={24} className={isSelected ? 'text-slate-900' : 'text-slate-700'} />
                    </div>
                    <div>
                        <h3 className={`font-semibold text-left transition-colors ${
                            isSelected 
                                ? 'text-slate-900' 
                                : 'text-slate-800'
                        }`}>
                            {theme.name}
                        </h3>
                        <p className={`text-sm text-left transition-colors ${
                            isSelected 
                                ? 'text-slate-800' 
                                : 'text-slate-600'
                        }`}>
                            {theme.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Background decoration - only shown on hover when not selected */}
            {!isSelected && (
                <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 
                    group-hover:opacity-[0.08] transition-all duration-300`} />
            )}
        </button>
    );
};

export default ExploreThemeTile;
