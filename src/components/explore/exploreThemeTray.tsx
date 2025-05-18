import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ChevronLeft,
    Search,
    X,
    Grid,
    List,
    Star,
    TrendingUp,
    Gift,
    Users,
    BookOpen,
    Trophy,
} from 'lucide-react';
import { ProjectThemeObject } from '@/types/hand_spun_datatypes';
interface ExploreThemeTrayProps {
    themes: ProjectThemeObject[];
    currentTheme: string;
    handleThemeChange: (themeId: string) => void;
}

const iconMap = {
    TrendingUp: <TrendingUp size={16} />,
    Star: <Star size={16} />,
    Gift: <Gift size={16} />,
    Users: <Users size={16} />,
    BookOpen: <BookOpen size={16} />,
    Trophy: <Trophy size={16} />,
};

const ExploreThemeTray = ({ themes, currentTheme, handleThemeChange }: ExploreThemeTrayProps) => {
  return (
    <div className="mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {themes.map(theme => (
                            <button
                                key={theme.id}
                                onClick={() => handleThemeChange(theme.id)}
                                className={`relative group overflow-hidden rounded-xl p-4 transition-all ${
                                    currentTheme === theme.id
                                        ? 'bg-gradient-to-br ' + theme.color + ' text-white shadow-lg scale-[1.02]'
                                        : 'bg-white hover:bg-gray-50 text-gray-800 shadow'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${
                                        currentTheme === theme.id
                                            ? 'bg-white/20'
                                            : 'bg-gray-100'
                                    }`}>
                                        {iconMap[theme.iconType as keyof typeof iconMap]}
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold">{theme.name}</h3>
                                        <p className={`text-sm ${
                                            currentTheme === theme.id
                                                ? 'text-white/80'
                                                : 'text-gray-500'
                                        }`}>
                                            {theme.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
  )
}

export default ExploreThemeTray
