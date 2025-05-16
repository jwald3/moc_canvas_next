import React from "react";
import { Search, X } from "lucide-react";
import { SortOption } from "@/components/projects/ProjectsDashboard";

interface ProjectDashboardControlsProps {
    searchQuery: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setSearchQuery: (query: string) => void;
    currentSort: SortOption;
    setCurrentSort: (sort: SortOption) => void;
    sortOptions: SortOption[];
    allTags: string[];
    activeTags: string[];
    handleTagClick: (tag: string) => void;
    setMyProjectsStartIndex: (index: number) => void;
    setSavedProjectsStartIndex: (index: number) => void;
    setActiveTags: (tags: string[]) => void;
}

const projectDashboardControls = ({
    searchQuery,
    handleSearch,
    setSearchQuery,
    currentSort,
    setCurrentSort,
    sortOptions,
    allTags,
    activeTags,
    handleTagClick,
    setMyProjectsStartIndex,
    setSavedProjectsStartIndex,
    setActiveTags,
}: ProjectDashboardControlsProps) => {
    return (
        <div>
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search projects by name or tag..."
                            className="w-full pl-10 pr-10 py-2.5 border-2 border-orange-400 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-sm"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        {searchQuery && (
                            <button
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setSearchQuery("")}
                            >
                                <X
                                    size={18}
                                    className="text-gray-400 hover:text-gray-600"
                                />
                            </button>
                        )}
                    </div>

                    <select
                        className="px-4 py-2.5 border border-orange-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/70 backdrop-blur-sm text-gray-700 sm:w-48 cursor-pointer"
                        value={`${currentSort.value}-${currentSort.direction}`}
                        onChange={(e) => {
                            const option = sortOptions.find(
                                (opt) =>
                                    `${opt.value}-${opt.direction}` ===
                                    e.target.value
                            );
                            if (option) {
                                setCurrentSort(option);
                                setMyProjectsStartIndex(0);
                                setSavedProjectsStartIndex(0);
                            }
                        }}
                    >
                        {sortOptions.map((option) => (
                            <option
                                key={`${option.value}-${option.direction}`}
                                value={`${option.value}-${option.direction}`}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Add the tags filter section after the search input */}
            <div className="mt-3 mb-8 flex flex-wrap gap-2">
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                            activeTags.includes(tag)
                                ? "bg-card-gradient text-white shadow-md"
                                : "bg-white border-2 border-orange-400 text-orange-700 hover:bg-orange-500 hover:text-white"
                        }`}
                        onClick={() => handleTagClick(tag)}
                    >
                        {tag}
                    </button>
                ))}
                {activeTags.length > 0 && (
                    <button
                        className="text-xs px-3 py-1.5 rounded-full bg-red-100 text-red-700 hover:bg-red-200 flex items-center transition-all"
                        onClick={() => setActiveTags([])}
                    >
                        Clear Filter <X size={12} className="ml-1" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default projectDashboardControls;
