import React from "react";
import {
    Search,
    X,
} from 'lucide-react';
import { useAllProjectsContext } from '@/contexts/AllProjectsContext';

const AllProjectsSortAndSearch = () => {
    const {
        searchQuery,
        setSearchQuery,
        clearSearch,
    } = useAllProjectsContext();

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="Search projects by name or tag..."
                className="w-full pl-10 pr-10 py-2.5 border-2 border-[#da5249] rounded-full focus:outline-none focus:ring-2 focus:ring-[#da5249] focus:border-[#da5249] bg-white shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
                <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={clearSearch}
                >
                    <X
                        size={18}
                        className="text-gray-400 hover:text-gray-600"
                    />
                </button>
            )}
        </div>
    );
};

export default AllProjectsSortAndSearch;
