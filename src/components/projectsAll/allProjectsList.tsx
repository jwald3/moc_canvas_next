import React from "react";
import { ProjectListItem } from "../projects/ProjectListItem";
import { useAllProjectsContext } from "@/contexts/AllProjectsContext";

const AllProjectsList = () => {

    const { filteredProjects, currentView, handleProjectClick, handleTagClick, activeTags } = useAllProjectsContext();

    return (
        <div className="flex flex-col space-y-4">
            {filteredProjects.map((project) => (
                <ProjectListItem 
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

export default AllProjectsList;
