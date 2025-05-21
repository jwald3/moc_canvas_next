import React, { useState } from "react";
import { ProjectCard } from "../../projects/ProjectCard";
import { useProjectContext } from "@/contexts/ProjectContext";

const SavedProjectsMobileView = () => {
    const { filteredSavedProjects, activeTags, isMobile, handleProjectClick, handleTagClick } = useProjectContext();
    const [visibleProjects, setVisibleProjects] = useState(3);

    const showMoreProjects = () => {
        setVisibleProjects(prev => prev + 3);
    };

    return (
        <div>
            <div className={`${isMobile ? "block" : "hidden"} space-y-4 mt-12`}>
                {filteredSavedProjects.slice(0, visibleProjects).map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onProjectClick={handleProjectClick}
                        onTagClick={handleTagClick}
                        activeTags={activeTags}
                    />
                ))}

                {visibleProjects < filteredSavedProjects.length && (
                    <button
                        onClick={showMoreProjects}
                        className="w-full py-3 px-4 text-center text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        See More Projects
                    </button>
                )}
            </div>
        </div>
    );
};

export default SavedProjectsMobileView;
