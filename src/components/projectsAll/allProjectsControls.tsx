import React from 'react';
import {
    Search,
    X,
} from 'lucide-react';
import AllProjectsTagTray from './allProjectsTagTray';
import AllProjectsSortAndSearch from './allProjectsSortAndSearch';

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
                <AllProjectsSortAndSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    clearSearch={clearSearch}
                />

                {/* Filters and View Toggle */}
                <AllProjectsTagTray
                    allTags={allTags}
                    activeTags={activeTags}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    handleTagClick={handleTagClick}
                />
            </div>
        </div>
    );
};

export default allProjectsControls;
