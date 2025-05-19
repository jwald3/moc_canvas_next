import { ProjectCard } from "@/components/projects/ProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useProjectContext } from "@/contexts/ProjectContext";

const SavedProjectsDesktopView = () => {
    const { filteredSavedProjects, handleProjectClick, handleTagClick, activeTags } = useProjectContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const projectsPerPage = 3;

    const handleNext = () => {
        setCurrentIndex(prev => 
            (prev + 1) % filteredSavedProjects.length
        );
    };

    const handlePrev = () => {
        setCurrentIndex(prev => 
            (prev - 1 + filteredSavedProjects.length) % filteredSavedProjects.length
        );
    };

    // Reset index when filtered projects change
    useEffect(() => {
        setCurrentIndex(0);
    }, [filteredSavedProjects.length]);

    const getVisibleProjects = () => {
        if (filteredSavedProjects.length <= projectsPerPage) {
            return filteredSavedProjects;
        }

        const projects = [];
        for (let i = 0; i < projectsPerPage; i++) {
            const index = (currentIndex + i) % filteredSavedProjects.length;
            projects.push(filteredSavedProjects[index]);
        }
        return projects;
    };

    const visibleProjects = getVisibleProjects();
    const showNavigation = filteredSavedProjects.length > projectsPerPage;

    return (
        <div className="relative mb-6">
            {showNavigation && (
                <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 text-[#da5249] transition-all border border-[#f8d7d5]"
                    onClick={handlePrev}
                >
                    <ChevronLeft size={20} />
                </button>
            )}

            <div className="overflow-hidden px-2">
                <div className="grid grid-cols-3 gap-4">
                    {visibleProjects.map((project) => (
                        <div key={project?.id} className="w-full">
                            <ProjectCard
                                project={project}
                                onProjectClick={handleProjectClick}
                                onTagClick={handleTagClick}
                                activeTags={activeTags}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {showNavigation && (
                <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 text-[#da5249] transition-all border border-[#f8d7d5]"
                    onClick={handleNext}
                >
                    <ChevronRight size={20} />
                </button>
            )}
        </div>
    );
};

export default SavedProjectsDesktopView;
