import React from "react";
import ExplorePageSearch from "./explorePageSearch";
import ExplorePageTagTray from "./explorePageTagTray";
import ExplorePageDisplayToggle from "./explorePageDisplayToggle";
import { useExploreProjectsContext } from "@/contexts/ExploreProjectsContext";

const ExplorePageControls = () => {
    const {
        searchQuery,
        setSearchQuery,
        clearSearch,
        allTags,
        activeTags,
        handleTagClick,
        viewMode,
        setViewMode,
    } = useExploreProjectsContext();

    return (
        <div className="mb-6">
            <ExplorePageSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                clearSearch={clearSearch}
            />

            {/* Filters and View Toggle */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-3 sm:space-y-0">
                <ExplorePageTagTray
                    allTags={allTags}
                    activeTags={activeTags}
                    handleTagClick={handleTagClick}
                />
                <ExplorePageDisplayToggle
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />
            </div>
        </div>
    );
};

export default ExplorePageControls;
