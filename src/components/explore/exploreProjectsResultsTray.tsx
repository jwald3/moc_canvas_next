import React from 'react';
import { ProjectObject } from '@/types/hand_spun_datatypes';
import ExploreNoProjectsFoundCard from './exploreNoProjectsFoundCard';
import ExploreProjectsListTray from './exploreProjectsListTray';
import ExploreProjectsGridTray from './exploreProjectsGridTray';

interface ExploreProjectsResultsTrayProps {
    filteredProjects: ProjectObject[];
    viewMode: 'grid' | 'list';
    handleProjectClick: (id: string) => void;
    handleTagClick: (tag: string) => void;
    activeTags: string[];
    clearSearch: () => void;
}


const ExploreProjectsResultsTray = ({
    filteredProjects,
    viewMode,
    handleProjectClick,
    handleTagClick,
    activeTags,
    clearSearch,
}: ExploreProjectsResultsTrayProps) => {
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
