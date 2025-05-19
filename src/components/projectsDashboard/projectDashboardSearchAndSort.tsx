import React, { useState, useRef, useEffect } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { useProjectContext } from "@/contexts/ProjectContext";

const ProjectDashboardSearchAndSort = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSortSelect = (option: typeof currentSort) => {
        setCurrentSort(option);
        setMyProjectsStartIndex(0);
        setSavedProjectsStartIndex(0);
        setIsOpen(false);
    };

    return (
        <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <Search size={20} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search projects by name or tag..."
                        className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-full 
                        focus:outline-none focus:ring-2 focus:ring-[--color-primary-light] focus:border-[--color-primary-light]
                        bg-white/70 backdrop-blur-sm shadow-sm transition-all duration-200
                        hover:border-[--color-primary-light] text-gray-700 placeholder-gray-400"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    {searchQuery && (
                        <button
                            className="absolute inset-y-0 right-0 pr-4 flex items-center transition-colors duration-200"
                            onClick={() => setSearchQuery("")}
                        >
                            <X
                                size={20}
                                className="text-gray-400 hover:text-[--color-primary] transition-colors duration-200"
                            />
                        </button>
                    )}
                </div>

                <div className="relative w-full sm:w-56" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center justify-between pl-5 pr-4 py-3 
                        border border-gray-200 rounded-full bg-white/70 backdrop-blur-sm shadow-sm 
                        transition-all duration-200 hover:border-[--color-primary-light] text-gray-700"
                    >
                        <span>{currentSort.label}</span>
                        <ChevronDown
                            size={20}
                            className={`text-gray-400 transition-transform duration-200 ${
                                isOpen ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {isOpen && (
                        <div className="absolute z-10 w-full mt-2 py-1 bg-white rounded-lg shadow-lg 
                        border border-gray-100 max-h-60 overflow-auto">
                            {sortOptions.map((option) => (
                                <button
                                    key={`${String(option.value)}-${option.direction}`}
                                    className={`w-full text-left px-5 py-2.5 hover:bg-gray-50 
                                    transition-colors duration-150 ${
                                        currentSort.value === option.value &&
                                        currentSort.direction === option.direction
                                            ? 'text-[--color-primary] bg-[--color-secondary]/10'
                                            : 'text-gray-700'
                                    }`}
                                    onClick={() => handleSortSelect(option)}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDashboardSearchAndSort;
