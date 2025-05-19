import React from "react";
import {
    Landmark,
    Rocket,
    Shield,
    LucideIcon
} from "lucide-react";
import ExploreThemeTile from "./exploreThemeTile";
import { useExploreProjectsContext } from "@/contexts/ExploreProjectsContext";

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

const ExploreThemeTray = () => {
    const { themes, currentTheme, handleThemeChange } = useExploreProjectsContext();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8">
            {themes.map((theme) => {
                const config = themeConfig[theme.name];
                if (!config) return null;
                return (
                    <ExploreThemeTile
                        key={theme.id}
                        theme={theme}
                        currentTheme={currentTheme}
                        handleThemeChange={handleThemeChange}
                        config={config}
                    />
                );
            })}
        </div>
    );
};

export default ExploreThemeTray;
