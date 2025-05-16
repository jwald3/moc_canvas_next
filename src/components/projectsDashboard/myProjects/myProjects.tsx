import React from "react";
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Search,
    X,
    Star,
} from "lucide-react";
import Link from 'next/link';
import { ProjectCard } from '../../projects/ProjectCard';
import { useProjectContext } from "@/contexts/ProjectContext";
import { projects } from "@/data/sample-data";
import { useRouter } from 'next/navigation';

const MyProjects = () => {
    const router = useRouter();
    const { 
        navigateCarousel, 
        handleProjectClick, 
        handleTagClick, 
        activeTags, 
        isMobile,
        filteredMyProjects,
        searchQuery
    } = useProjectContext();
    return (
        <div>
            {/* My Projects Header Section */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">
                        My Projects
                    </h2>
                    <p className="text-sm text-gray-500">
                        {projects.length} project
                        {projects.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <Link
                    href="/projects/all?view=my"
                    className="text-orange-600 hover:text-orange-800 font-medium flex items-center group"
                >
                    See All
                    <ChevronRight
                        size={16}
                        className="ml-1 transform group-hover:translate-x-0.5 transition-transform"
                    />
                </Link>
            </div>

            {/* Add empty states for both sections */}
            {filteredMyProjects.length === 0 && (
                <div className="bg-white rounded-lg p-6 shadow-sm text-center border border-gray-200 mb-6">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Search size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                        No projects found
                    </h3>
                    <p className="text-gray-500 mb-4">
                        {activeTags.length > 0 || searchQuery 
                            ? "Try adjusting your filters or search terms."
                            : "Start creating projects to see them here."}
                    </p>
                </div>
            )}

            {/* Desktop View */}
            {!isMobile && filteredMyProjects.length > 0 && (
                <div className="relative mb-6">
                    <button
                        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 text-orange-600 transition-all border border-orange-200"
                        onClick={() => navigateCarousel("prev", "my")}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="overflow-hidden px-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                            {filteredMyProjects.map((project, index) => (
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
                        onClick={() => navigateCarousel("next", "my")}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}

            {/* Mobile View - My Projects */}
            {isMobile && filteredMyProjects.length > 0 && (
                <div className="space-y-4">
                    {filteredMyProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onProjectClick={handleProjectClick}
                            onTagClick={handleTagClick}
                            activeTags={activeTags}
                        />
                    ))}
                </div>
            )}

            {/* Create New Project Card */}
            <div
                onClick={() => router.push("/projects/new")}
                className="cursor-pointer w-full md:w-1/2 lg:w-1/3 border-2 border-dashed border-orange-400 rounded-xl py-12 my-8 hover:border-orange-500 transition-all group bg-white hover:bg-orange-50 card-shadow-hover"
            >
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="bg-card-gradient rounded-full p-4 group-hover:bg-gradient-hover transition-all">
                        <Plus size={24} className="text-white" />
                    </div>
                    <span className="text-orange-700 font-medium text-lg">
                        Create New Project
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MyProjects;
