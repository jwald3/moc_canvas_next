import React, { useState, useEffect } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Search,
    X,
    Star,
} from "lucide-react";
import type { Project } from "@/types/project";
import Link from 'next/link';
import { ProjectCard } from './ProjectCard';
import { useRouter } from 'next/navigation';

// Remove the Router import and use the return type of useRouter
type RouterType = ReturnType<typeof useRouter>;

import { projects, savedProjects } from "../../data/sample-data";
import ProjectDashboardHeader from "@/components/projectsDashboard/projectDashboardHeader";
import ProjectDashboardControls from "../projectsDashboard/projectDashboardControls";
import { ProjectProvider, useProjectContext } from "@/contexts/ProjectContext";
import MyProjects from "../projectsDashboard/myProjects";

// Add this component at the top of the file, near ViewAllButton
const ToggleViewButton = ({ expanded, onClick }: { expanded: boolean; onClick: () => void }) => (
    <button
        onClick={onClick}
        className="w-full py-3 text-orange-600 font-medium hover:text-orange-800 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-center mt-4"
    >
        {expanded ? "See Less" : "See All"}
    </button>
);

// Add these types at the top of the file
export type SortOption = {
    label: string;
    value: keyof Project | 'tagCount';
    direction: 'asc' | 'desc';
};

const sortOptions: SortOption[] = [
    { label: 'Recently Updated', value: 'lastUpdated', direction: 'desc' },
    { label: 'Project Name (A-Z)', value: 'name', direction: 'asc' },
    { label: 'Project Name (Z-A)', value: 'name', direction: 'desc' },
    { label: 'Most Tags', value: 'tagCount', direction: 'desc' },
    { label: 'Least Tags', value: 'tagCount', direction: 'asc' },
];

export const ProjectsDashboard = () => {
    const router = useRouter();

    return (
        <ProjectProvider router={router}>
            <ProjectDashboardContent router={router} />
        </ProjectProvider>
    );
};

const ProjectDashboardContent = ({ router }: { router: RouterType }) => {
    const { 
        navigateCarousel, 
        handleProjectClick, 
        handleTagClick, 
        activeTags, 
        isMobile,
        filteredSavedProjects,
        searchQuery 
    } = useProjectContext();

    return (
        <div className="min-h-screen bg-theme-gradient p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                <ProjectDashboardHeader handleCreateProject={() => {}} />

                <ProjectDashboardControls />

                <MyProjects />

                {/* Saved Projects Section */}
                <div className="mt-12">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Saved Projects
                            </h2>
                            <p className="text-sm text-gray-500">
                                {filteredSavedProjects.length} project{filteredSavedProjects.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                        {filteredSavedProjects.length > 0 && (
                            <Link 
                                href="/projects/all?view=saved"
                                className="text-orange-600 hover:text-orange-800 font-medium flex items-center group"
                            >
                                See All
                                <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        )}
                    </div>

                    {filteredSavedProjects.length === 0 ? (
                        <div className="bg-white rounded-lg p-8 shadow-sm text-center border border-gray-200 mb-6">
                            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Star size={24} className="text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-800 mb-2">
                                No saved projects found
                            </h3>
                            <p className="text-gray-500 mb-4">
                                {activeTags.length > 0 || searchQuery 
                                    ? "Try adjusting your filters or search terms."
                                    : "Click the star icon on any project to save it for later. Your saved projects will appear here."}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div
                                className={`${
                                    isMobile ? "hidden" : "block"
                                } relative`}
                            >
                                <button
                                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 text-orange-600 transition-all border border-orange-200"
                                    onClick={() =>
                                        navigateCarousel("prev", "saved")
                                    }
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                <div className="overflow-hidden px-2">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                                        {filteredSavedProjects.map(
                                            (project) => (
                                                <ProjectCard
                                                    key={project.id}
                                                    project={project}
                                                    onProjectClick={handleProjectClick}
                                                    onTagClick={handleTagClick}
                                                    activeTags={activeTags}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>

                                <button
                                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 text-orange-600 transition-all border border-orange-200"
                                    onClick={() =>
                                        navigateCarousel("next", "saved")
                                    }
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>

                            {/* Mobile View - Saved Projects */}
                            <div className={`${isMobile ? 'block' : 'hidden'} space-y-4 mt-12`}>
                                {filteredSavedProjects.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        onProjectClick={handleProjectClick}
                                        onTagClick={handleTagClick}
                                        activeTags={activeTags}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
