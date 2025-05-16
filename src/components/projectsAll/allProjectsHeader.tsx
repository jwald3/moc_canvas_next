import React from 'react';
import Link from 'next/link';
import {
    ChevronLeft,
    Plus,
} from 'lucide-react';
import ViewToggle from './viewToggle';
import { useAllProjectsContext } from '@/contexts/AllProjectsContext';


const allProjectsHeader = () => {
    const {
        currentView,
        handleCreateProject,
        filteredProjects,
    } = useAllProjectsContext();

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="flex items-center">
                <Link
                    href="/projects"
                    className="mr-3 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                    <ChevronLeft size={20} className="text-orange-800" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Projects
                    </h1>
                    <ViewToggle currentView={currentView} />
                    <p className="text-sm text-gray-600 mt-1">
                        {filteredProjects.length} project
                        {filteredProjects.length !== 1 ? "s" : ""}
                    </p>
                </div>
            </div>
            <button
                className="mt-4 sm:mt-0 bg-card-gradient hover-gradient text-white px-4 py-2 rounded-full flex items-center transition-all shadow-md hover:shadow-lg font-semibold text-shadow"
                onClick={handleCreateProject}
            >
                <Plus size={18} className="mr-2" />
                Add New Project
            </button>
        </div>
    );
};

export default allProjectsHeader;
