import { Search } from "lucide-react";
import React from "react";
import { useAllProjectsContext } from "@/contexts/AllProjectsContext";


const NoProjectsFound = () => {
    const { clearSearch } = useAllProjectsContext();

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm text-center border border-gray-200">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
                No matching projects found
            </h3>
            <p className="text-gray-500 mb-4">
                Try adjusting your search or filters to find what you&apos;re looking
                for.
            </p>
            <button
                className="text-[#da5249] font-medium hover:text-[#da5249]"
                onClick={clearSearch}
            >
                Clear search and filters
            </button>
        </div>
    );
};

export default NoProjectsFound;
