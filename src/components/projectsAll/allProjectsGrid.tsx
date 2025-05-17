import React from "react";
import { ProjectCard } from "../projects/ProjectCard";
import { useAllProjectsContext } from "@/contexts/AllProjectsContext";  

const AllProjectsGrid = () => {
    const { filteredProjects, currentView, handleProjectClick, handleTagClick, activeTags } = useAllProjectsContext();
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    isSaved={currentView === "saved"}
                    onProjectClick={handleProjectClick}
                    onTagClick={handleTagClick}
                    activeTags={activeTags}
                />
            ))}
        </div>
    );
};

export default AllProjectsGrid;
