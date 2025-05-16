import React from "react";
import { ProjectCard } from "../projects/ProjectCard";
import { Project } from "@/types/project";

interface AllProjectsGridProps {
    filteredProjects: Project[];
    currentView: "my" | "saved";
    handleProjectClick: (id: number) => void;
    handleTagClick: (tag: string) => void;
    activeTags: string[];
}

const allProjectsGrid = ({
    filteredProjects,
    currentView,
    handleProjectClick,
    handleTagClick,
    activeTags,
}: AllProjectsGridProps) => {
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

export default allProjectsGrid;
