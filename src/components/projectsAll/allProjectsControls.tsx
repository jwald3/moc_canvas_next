import React from 'react';
import {
    Search,
    X,
    Grid,
    List
} from 'lucide-react';

interface AllProjectsControlsProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    clearSearch: () => void;
    allTags: string[];
    activeTags: string[];
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    handleTagClick: (tag: string) => void;
}


const allProjectsControls = ({
    searchQuery,
    setSearchQuery,
    clearSearch,
    allTags,
    activeTags,
    viewMode,
    setViewMode,
    handleTagClick,
}: AllProjectsControlsProps) => {
    return (
        <div>
            <div className="mb-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search projects by name or tag..."
                        className="w-full pl-10 pr-10 py-2.5 border-2 border-orange-400 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-sm"
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

                {/* Filters and View Toggle */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-3 sm:space-y-0">
                    <div className="flex flex-wrap gap-2 sm:max-w-[66%]">
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                className={`text-xs px-2 py-1 rounded-full transition-colors ${
                                    activeTags.includes(tag)
                                        ? "bg-card-gradient text-white shadow-sm"
                                        : "bg-white/90 border border-orange-300 text-orange-700 hover:bg-orange-500 hover:text-white"
                                }`}
                                onClick={() => handleTagClick(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center flex-shrink-0 ml-4">
                        <div className="bg-white rounded-full shadow-sm border-2 border-orange-300 overflow-hidden flex">
                            <button
                                className={`px-3 py-1.5 text-sm relative ${
                                    viewMode === "grid"
                                        ? "bg-card-gradient text-white before:absolute before:inset-[-1px] before:bg-card-gradient"
                                        : "text-orange-700 hover:bg-orange-50"
                                }`}
                                onClick={() => setViewMode("grid")}
                            >
                                <Grid size={16} className="relative z-10" />
                            </button>
                            <button
                                className={`px-3 py-1.5 text-sm relative ${
                                    viewMode === "list"
                                        ? "bg-card-gradient text-white before:absolute before:inset-[-1px] before:bg-card-gradient"
                                        : "text-orange-700 hover:bg-orange-50"
                                }`}
                                onClick={() => setViewMode("list")}
                            >
                                <List size={16} className="relative z-10" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default allProjectsControls;
