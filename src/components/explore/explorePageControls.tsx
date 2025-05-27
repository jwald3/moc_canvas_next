import React from "react";
import ExplorePageSearch from "./explorePageSearch";
import ExplorePageDisplayToggle from "./explorePageDisplayToggle";
import { useExploreProjectsContext } from "@/contexts/ExploreProjectsContext";

const ExplorePageControls = () => {
    const {
        viewMode,
        setViewMode,
        handleSearch,
    } = useExploreProjectsContext();

    return (
        <div className="mb-6">
            <ExplorePageSearch
                onSearch={handleSearch}
            />

            {/* Filters and View Toggle */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-3 sm:space-y-0">
                <ExplorePageDisplayToggle
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />
            </div>
        </div>
    );
};

export default ExplorePageControls;
