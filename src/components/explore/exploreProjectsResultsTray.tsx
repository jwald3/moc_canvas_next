import React from 'react';
import {
    Search,
} from 'lucide-react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectListItem } from '@/components/projects/ProjectListItem';
import { ProjectObject } from '@/types/hand_spun_datatypes';

interface ExploreProjectsResultsTrayProps {
    filteredProjects: ProjectObject[];
    viewMode: 'grid' | 'list';
    handleProjectClick: (id: string) => void;
    handleTagClick: (tag: string) => void;
    activeTags: string[];
    clearSearch: () => void;
}


const ExploreProjectsResultsTray = ({
    filteredProjects,
    viewMode,
    handleProjectClick,
    handleTagClick,
    activeTags,
    clearSearch,
}: ExploreProjectsResultsTrayProps) => {
    return (
        <div>
            {filteredProjects.length > 0 ? (
                viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onProjectClick={handleProjectClick}
                                onTagClick={handleTagClick}
                                activeTags={activeTags}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col space-y-4">
                        {filteredProjects.map((project) => (
                            <ProjectListItem
                                key={project.id}
                                project={project}
                                onProjectClick={handleProjectClick}
                                onTagClick={handleTagClick}
                                activeTags={activeTags}
                            />
                        ))}
                    </div>
                )
            ) : (
                <div className="bg-white rounded-lg p-6 shadow-sm text-center border border-gray-200">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Search size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                        No matching projects found
                    </h3>
                    <p className="text-gray-500 mb-4">
                        Try adjusting your search or filters to find what
                        you&apos;re looking for.
                    </p>
                    <button
                        className="text-orange-600 font-medium hover:text-orange-800"
                        onClick={clearSearch}
                    >
                        Clear search and filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExploreProjectsResultsTray;
