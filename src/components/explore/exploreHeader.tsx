import React from 'react';
import Link from 'next/link';
import {
    ChevronLeft,
} from 'lucide-react';
import { ProjectObject } from '@/types/hand_spun_datatypes';

interface ExploreHeaderProps {
    filteredProjects: ProjectObject[];
}

const ExploreHeader = ({ filteredProjects }: ExploreHeaderProps) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="flex items-center">
                <Link
                    href="/"
                    className="mr-3 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                    <ChevronLeft size={20} className="text-orange-800" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Explore Projects
                    </h1>
                    <p className="text-sm text-gray-600">
                        {filteredProjects.length} project
                        {filteredProjects.length !== 1 ? "s" : ""} found
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ExploreHeader;
