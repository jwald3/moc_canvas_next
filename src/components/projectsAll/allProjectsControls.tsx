import React from 'react';
import {
    Search,
    X,
} from 'lucide-react';
import AllProjectsTagTray from './allProjectsTagTray';
import AllProjectsSortAndSearch from './allProjectsSortAndSearch';
import { useAllProjectsContext } from '@/contexts/AllProjectsContext';

const allProjectsControls = () => {
    const {
        searchQuery,
        setSearchQuery,
        clearSearch,
        allTags,
        activeTags,
        viewMode,
        setViewMode,
        handleTagClick,
    } = useAllProjectsContext();    

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
