import React from "react";
import AllProjectsGrid from "./allProjectsGrid";
import AllProjectsList from "./allProjectsList";
import { useAllProjectsContext } from "@/contexts/AllProjectsContext";
import NoProjectsFound from "./noProjectsFound";

const AllProjectsResultsTray = () => {
    const {
        viewMode,
        filteredProjects,
        currentView,
        handleTagClick,
        handleProjectClick,
        activeTags,
        clearSearch,
    } = useAllProjectsContext();

    return (
        <div>
            {viewMode === "grid" ? (
                <AllProjectsGrid
                    filteredProjects={filteredProjects}
                    currentView={currentView}
                    handleProjectClick={handleProjectClick}
                    handleTagClick={handleTagClick}
                    activeTags={activeTags}
                />
            ) : (
                <AllProjectsList
                    filteredProjects={filteredProjects}
                    currentView={currentView}
                    handleProjectClick={handleProjectClick}
                    handleTagClick={handleTagClick}
                    activeTags={activeTags}
                />
            )}

            {filteredProjects.length === 0 && (
                <NoProjectsFound clearSearch={clearSearch} />
            )}
        </div>
    );
};

export default AllProjectsResultsTray;
