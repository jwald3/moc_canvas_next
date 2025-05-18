import React from "react";
import {
    Star,
    TrendingUp,
    Gift,
    Users,
    BookOpen,
    Trophy,
} from "lucide-react";
import ExploreThemeTile from "./exploreThemeTile";
import { useExploreProjectsContext } from "@/contexts/ExploreProjectsContext";

const iconMap = {
    TrendingUp: <TrendingUp size={16} />,
    Star: <Star size={16} />,
    Gift: <Gift size={16} />,
    Users: <Users size={16} />,
    BookOpen: <BookOpen size={16} />,
    Trophy: <Trophy size={16} />,
};

const ExploreThemeTray = () => {
    const { themes, currentTheme, handleThemeChange } = useExploreProjectsContext();

    return (
        <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {themes.map((theme) => (
                    <ExploreThemeTile
                        key={theme.id}
                        theme={theme}
                        currentTheme={currentTheme}
                        handleThemeChange={handleThemeChange}
                        iconMap={iconMap}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExploreThemeTray;
