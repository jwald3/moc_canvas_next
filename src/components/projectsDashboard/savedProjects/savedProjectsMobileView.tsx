import React from "react";
import { ProjectCard } from "../../projects/ProjectCard";
import { useProjectContext } from "@/contexts/ProjectContext";

const savedProjectsMobileView = () => {
    const { filteredSavedProjects, activeTags, isMobile, handleProjectClick, handleTagClick } = useProjectContext();

    return (
        <div>
            <div className={`${isMobile ? "block" : "hidden"} space-y-4 mt-12`}>
                {filteredSavedProjects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onProjectClick={handleProjectClick}
                        onTagClick={handleTagClick}
                        activeTags={activeTags}
                    />
                ))}
            </div>
        </div>
    );
};

export default savedProjectsMobileView;
