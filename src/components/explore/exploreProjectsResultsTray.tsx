import React from 'react';
import ExploreNoProjectsFoundCard from './exploreNoProjectsFoundCard';
import ExploreProjectsListTray from './exploreProjectsListTray';
import ExploreProjectsGridTray from './exploreProjectsGridTray';
import { useExploreProjectsContext } from '@/contexts/ExploreProjectsContext';

const ExploreProjectsResultsTray = () => {
    const {
        filteredProjects,
        viewMode,
        handleProjectClick,
        handleTagClick,
        activeTags,
        clearSearch,
    } = useExploreProjectsContext();

    return (
        <div>
            {filteredProjects.length > 0 ? (
                viewMode === "grid" ? (
                    <ExploreProjectsGridTray
                        filteredProjects={filteredProjects}
                        handleProjectClick={handleProjectClick}
                        handleTagClick={handleTagClick}
                        activeTags={activeTags}
                    />
                ) : (
                    <ExploreProjectsListTray
                        filteredProjects={filteredProjects}
                        handleProjectClick={handleProjectClick}
                        handleTagClick={handleTagClick}
                        activeTags={activeTags}
                    />
                )
            ) : (
                <ExploreNoProjectsFoundCard clearSearch={clearSearch} />
            )}
        </div>
    );
};

export default ExploreProjectsResultsTray;
