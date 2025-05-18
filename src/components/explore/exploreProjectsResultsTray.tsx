import React from 'react';
import {
    Search,
} from 'lucide-react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectObject } from '@/types/hand_spun_datatypes';
import ExploreNoProjectsFoundCard from './exploreNoProjectsFoundCard';
import ExploreProjectsListTray from './exploreProjectsListTray';

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onProjectClick={handleProjectClick}
                                onTagClick={handleTagClick}
                                activeTags={activeTags}
                            />
                        ))}
                    </div>
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
