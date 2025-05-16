import { ProjectCard } from "@/components/projects/ProjectCard";
import React from "react";
import { useProjectContext } from "@/contexts/ProjectContext";

const myProjectsMobileView = () => {
    const { filteredMyProjects, handleProjectClick, handleTagClick, activeTags } = useProjectContext();

    return (
        <div className="space-y-4">
            {filteredMyProjects.map((project) => (
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

export default myProjectsMobileView;
