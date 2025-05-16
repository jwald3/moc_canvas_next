import React from "react";
import {
    ChevronRight,
    Search,
} from "lucide-react";
import Link from 'next/link';
import { useProjectContext } from "@/contexts/ProjectContext";
import { projects } from "@/data/sample-data";
import NewProjectCard from "./newProjectCard";
import MyProjectsMobileView from "./myProjectsMobileView";
import MyProjectsDesktopView from "./myProjectsDesktopView";

const MyProjects = () => {
    const { 
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
                <MyProjectsDesktopView />
            )}

            {/* Mobile View - My Projects */}
            {isMobile && filteredMyProjects.length > 0 && (
                <MyProjectsMobileView />
            )}

            {/* Create New Project Card */}
            <NewProjectCard />
        </div>
    );
};

export default MyProjects;
