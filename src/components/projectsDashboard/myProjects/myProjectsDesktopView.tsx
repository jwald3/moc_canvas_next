import { ProjectCard } from "@/components/projects/ProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useProjectContext } from "@/contexts/ProjectContext";

const MyProjectsDesktopView = () => {
    const { filteredMyProjects, handleProjectClick, handleTagClick, activeTags } = useProjectContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const projectsPerPage = 3;

    const handleNext = () => {
        setCurrentIndex(prev => 
            (prev + 1) % filteredMyProjects.length
        );
    };

    const handlePrev = () => {
        setCurrentIndex(prev => 
            (prev - 1 + filteredMyProjects.length) % filteredMyProjects.length
        );
    };

    // Reset index when filtered projects change
    useEffect(() => {
        setCurrentIndex(0);
    }, [filteredMyProjects.length]);

    const getVisibleProjects = () => {
        if (filteredMyProjects.length <= projectsPerPage) {
            return filteredMyProjects;
        }

        const projects = [];
        for (let i = 0; i < projectsPerPage; i++) {
            const index = (currentIndex + i) % filteredMyProjects.length;
            projects.push(filteredMyProjects[index]);
        }
        return projects;
    };

    const visibleProjects = getVisibleProjects();
    const showNavigation = filteredMyProjects.length > projectsPerPage;

    return (
        <div className="relative mb-6">
            {showNavigation && (
                <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 text-orange-600 transition-all border border-orange-200"
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
                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 text-orange-600 transition-all border border-orange-200"
                    onClick={handleNext}
                >
                    <ChevronRight size={20} />
                </button>
            )}
        </div>
    );
};

export default MyProjectsDesktopView;
