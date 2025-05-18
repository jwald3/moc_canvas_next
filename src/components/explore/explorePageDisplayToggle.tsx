import { Grid, List } from "lucide-react";
import React from "react";

interface ExplorePageDisplayToggleProps {
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
}

const ExplorePageDisplayToggle = ({
    viewMode,
    setViewMode,
}: ExplorePageDisplayToggleProps) => {
    return (
        <div className="flex items-center flex-shrink-0 ml-4">
            <div className="bg-white rounded-full shadow-sm border-2 border-orange-300 overflow-hidden flex">
                <button
                    className={`px-3 py-1.5 text-sm relative ${
                        viewMode === "grid"
                            ? "bg-card-gradient text-white before:absolute before:inset-[-1px] before:bg-card-gradient"
                            : "text-orange-700 hover:bg-orange-50"
                    }`}
                    onClick={() => setViewMode("grid")}
                >
                    <Grid size={16} className="relative z-10" />
                </button>
                <button
                    className={`px-3 py-1.5 text-sm relative ${
                        viewMode === "list"
                            ? "bg-card-gradient text-white before:absolute before:inset-[-1px] before:bg-card-gradient"
                            : "text-orange-700 hover:bg-orange-50"
                    }`}
                    onClick={() => setViewMode("list")}
                >
                    <List size={16} className="relative z-10" />
                </button>
            </div>
        </div>
    );
};

export default ExplorePageDisplayToggle;
