import React from "react";
import { Search, X } from "lucide-react";
import { useProjectContext } from "@/contexts/ProjectContext";

const ProjectDashboardSearchAndSort = () => {
    const {
        searchQuery,
        handleSearch,
        setSearchQuery,
        currentSort,
        setCurrentSort,
        sortOptions,
        setMyProjectsStartIndex,
        setSavedProjectsStartIndex,
    } = useProjectContext();

    return (
        <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search projects by name or tag..."
                        className="w-full pl-10 pr-10 py-2.5 border-2 border-[#da5249] rounded-full focus:outline-none focus:ring-2 focus:ring-[#da5249] focus:border-[#da5249] bg-white shadow-sm"
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
                    className="px-4 py-2.5 border border-[#da5249] rounded-full focus:outline-none focus:ring-2 focus:ring-[#da5249] focus:border-[#da5249] bg-white/70 backdrop-blur-sm text-gray-700 sm:w-48 cursor-pointer"
                    value={`${String(currentSort.value)}-${currentSort.direction}`}
                    onChange={(e) => {
                        const option = sortOptions.find(
                            (opt) =>
                                `${String(opt.value)}-${opt.direction}` ===
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
                            key={`${String(option.value)}-${option.direction}`}
                            value={`${String(option.value)}-${option.direction}`}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ProjectDashboardSearchAndSort;
