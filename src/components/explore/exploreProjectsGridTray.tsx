import React from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectObject } from "@/types/hand_spun_datatypes";

interface ExploreProjectsGridTrayProps {
    filteredProjects: ProjectObject[];
    handleProjectClick: (id: string) => void;
    handleTagClick: (tag: string) => void;
    activeTags: string[];
}

const ExploreProjectsGridTray = ({
    filteredProjects,
    handleProjectClick,
    handleTagClick,
    activeTags,
}: ExploreProjectsGridTrayProps) => {
    return (
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
    );
};

export default ExploreProjectsGridTray;
