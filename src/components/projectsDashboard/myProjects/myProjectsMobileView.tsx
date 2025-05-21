import { ProjectCard } from "@/components/projects/ProjectCard";
import React, { useState } from "react";
import { useProjectContext } from "@/contexts/ProjectContext";

const MyProjectsMobileView = () => {
    const { filteredMyProjects, handleProjectClick, handleTagClick, activeTags } = useProjectContext();
    const [visibleProjects, setVisibleProjects] = useState(3);

    const showMoreProjects = () => {
        setVisibleProjects(prev => prev + 3);
    };

    return (
        <div className="space-y-4">
            {filteredMyProjects.slice(0, visibleProjects).map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    onProjectClick={handleProjectClick}
                    onTagClick={handleTagClick}
                    activeTags={activeTags}
                />
            ))}
            
            {visibleProjects < filteredMyProjects.length && (
                <button
                    onClick={showMoreProjects}
                    className="w-full py-3 px-4 text-center text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    See More Projects
                </button>
            )}
        </div>
    );
};

export default MyProjectsMobileView;
