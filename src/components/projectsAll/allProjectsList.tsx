import React from "react";
import { ProjectListItem } from "../projects/ProjectListItem";
import { Project } from "@/types/project";

interface AllProjectsListProps {
    filteredProjects: Project[];
    currentView: "my" | "saved";
    handleProjectClick: (id: number) => void;
    handleTagClick: (tag: string) => void;
    activeTags: string[];
}

const allProjectsList = ({
    filteredProjects,
    currentView,
    handleProjectClick,
    handleTagClick,
    activeTags,
}: AllProjectsListProps) => {
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

export default allProjectsList;
