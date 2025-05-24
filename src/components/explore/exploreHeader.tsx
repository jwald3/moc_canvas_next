import React from 'react';
import Link from 'next/link';
import {
    ChevronLeft,
} from 'lucide-react';
import { useExploreProjectsContext } from '@/contexts/ExploreProjectsContext';


const ExploreHeader = () => {
    const { filteredProjects, currentPage, projectsPerPage } = useExploreProjectsContext();
    const startIndex = (currentPage - 1) * projectsPerPage + 1;
    const endIndex = Math.min(currentPage * projectsPerPage, filteredProjects.length);

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="flex items-center">
                <Link
                    href="/"
                    className="mr-3 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                    <ChevronLeft size={20} className="text-[#da5249]" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Explore Projects
                    </h1>
                    <p className="text-sm text-gray-600">
                        {filteredProjects.length > 0 ? (
                            <>
                                Showing {startIndex}-{endIndex} of {filteredProjects.length} project
                                {filteredProjects.length !== 1 ? "s" : ""}
                            </>
                        ) : (
                            "No projects found"
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ExploreHeader;
