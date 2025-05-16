import { ProjectCard } from "@/components/projects/ProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useProjectContext } from "@/contexts/ProjectContext";

const savedProjectsDesktopView = () => {
    const { filteredSavedProjects, handleProjectClick, handleTagClick, activeTags, navigateCarousel } = useProjectContext();

    return (
        <div className="relative mb-6">
            <button
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 text-orange-600 transition-all border border-orange-200"
                onClick={() => navigateCarousel("prev", "saved")}
            >
                <ChevronLeft size={20} />
            </button>

            <div className="overflow-hidden px-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    {filteredSavedProjects.map((project, index) => (
                        <div key={project?.id || `create-${index}`}>
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

            <button
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 text-orange-600 transition-all border border-orange-200"
                onClick={() => navigateCarousel("next", "saved")}
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default savedProjectsDesktopView;
