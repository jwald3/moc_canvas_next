import React from "react";
import { SortOption } from "@/components/projects/ProjectsDashboard";
import ProjectTagTray from "./projectTagTray";
import ProjectDashboardSearchAndSort from "./projectDashboardSearchAndSort";

interface ProjectDashboardControlsProps {
    searchQuery: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setSearchQuery: (query: string) => void;
    currentSort: SortOption;
    setCurrentSort: (sort: SortOption) => void;
    sortOptions: SortOption[];
    allTags: string[];
    activeTags: string[];
    handleTagClick: (tag: string) => void;
    setMyProjectsStartIndex: (index: number) => void;
    setSavedProjectsStartIndex: (index: number) => void;
    setActiveTags: (tags: string[]) => void;
}

const projectDashboardControls = ({
    searchQuery,
    handleSearch,
    setSearchQuery,
    currentSort,
    setCurrentSort,
    sortOptions,
    allTags,
    activeTags,
    handleTagClick,
    setMyProjectsStartIndex,
    setSavedProjectsStartIndex,
    setActiveTags,
}: ProjectDashboardControlsProps) => {
    return (
        <div>
            
            <ProjectDashboardSearchAndSort
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                setSearchQuery={setSearchQuery}
                currentSort={currentSort}
                setCurrentSort={setCurrentSort}
                sortOptions={sortOptions}
                setMyProjectsStartIndex={setMyProjectsStartIndex}
                setSavedProjectsStartIndex={setSavedProjectsStartIndex}
            />
            <ProjectTagTray
                allTags={allTags}
                activeTags={activeTags}
                handleTagClick={handleTagClick}
                setActiveTags={setActiveTags}
            />

        </div>
    );
};

export default projectDashboardControls;
