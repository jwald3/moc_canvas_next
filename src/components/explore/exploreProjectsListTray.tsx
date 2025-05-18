import React from "react";
import { ProjectListItem } from "@/components/projects/ProjectListItem";
import { ProjectObject } from "@/types/hand_spun_datatypes";

interface ExploreProjectsListTrayProps {
    filteredProjects: ProjectObject[];
    handleProjectClick: (id: string) => void;
    handleTagClick: (tag: string) => void;
    activeTags: string[];
}

const ExploreProjectsListTray = ({
    filteredProjects,
    handleProjectClick,
    handleTagClick,
    activeTags,
}: ExploreProjectsListTrayProps) => {
    return (
        <div className="flex flex-col space-y-4">
            {filteredProjects.map((project) => (
                <ProjectListItem
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

export default ExploreProjectsListTray;
