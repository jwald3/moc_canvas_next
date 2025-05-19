import React from 'react';
import {
    Grid,
    List
} from 'lucide-react';
import { useAllProjectsContext } from '@/contexts/AllProjectsContext';

const AllProjectsTagTray = () => {

    const { allTags, activeTags, viewMode, setViewMode, handleTagClick } = useAllProjectsContext();
    
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-3 sm:space-y-0">
            <div className="flex flex-wrap gap-2 sm:max-w-[66%]">
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        className={`text-xs px-2 py-1 rounded-full transition-colors ${
                            activeTags.includes(tag)
                                ? "bg-card-gradient text-white shadow-sm"
                                : "bg-white/90 border border-[#da5249] text-[#da5249] hover:bg-[#da5249] hover:text-white"
                        }`}
                        onClick={() => handleTagClick(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div className="flex items-center flex-shrink-0 ml-4">
                <div className="bg-white rounded-full shadow-sm border-2 border-[#da5249] overflow-hidden flex">
                    <button
                        className={`px-3 py-1.5 text-sm relative ${
                            viewMode === "grid"
                                ? "bg-card-gradient text-white before:absolute before:inset-[-1px] before:bg-card-gradient"
                                : "text-[#da5249] hover:bg-[#da5249] hover:text-white"
                        }`}
                        onClick={() => setViewMode("grid")}
                    >
                        <Grid size={16} className="relative z-10" />
                    </button>
                    <button
                        className={`px-3 py-1.5 text-sm relative ${
                            viewMode === "list"
                                ? "bg-card-gradient text-white before:absolute before:inset-[-1px] before:bg-card-gradient"
                                : "text-[#da5249] hover:bg-[#da5249] hover:text-white"
                        }`}
                        onClick={() => setViewMode("list")}
                    >
                        <List size={16} className="relative z-10" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllProjectsTagTray;
