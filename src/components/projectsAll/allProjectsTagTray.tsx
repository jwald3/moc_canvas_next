import React from 'react';
import {
    Grid,
    List
} from 'lucide-react';

interface AllProjectsTagTrayProps {
    allTags: string[];
    activeTags: string[];
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    handleTagClick: (tag: string) => void;
}

const allProjectsTagTray = ({
    allTags,
    activeTags,
    viewMode,
    setViewMode,
    handleTagClick,
}: AllProjectsTagTrayProps) => {
    return (
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
    );
};

export default allProjectsTagTray;
