import React from 'react';
import ExploreNoProjectsFoundCard from './exploreNoProjectsFoundCard';
import ExploreProjectsListTray from './exploreProjectsListTray';
import ExploreProjectsGridTray from './exploreProjectsGridTray';
import ExplorePagination from './explorePagination';
import { useExploreProjectsContext } from '@/contexts/ExploreProjectsContext';

const ExploreProjectsResultsTray = () => {
    const {
        paginatedProjects,
        viewMode,
        handleProjectClick,
        handleTagClick,
        activeTags,
        clearSearch,
        currentPage,
        setCurrentPage,
        totalPages,
    } = useExploreProjectsContext();

    return (
        <div>
            {paginatedProjects.length > 0 ? (
                <>
                    {viewMode === "grid" ? (
                        <ExploreProjectsGridTray
                            filteredProjects={paginatedProjects}
                            handleProjectClick={handleProjectClick}
                            handleTagClick={handleTagClick}
                            activeTags={activeTags}
                        />
                    ) : (
                        <ExploreProjectsListTray
                            filteredProjects={paginatedProjects}
                            handleProjectClick={handleProjectClick}
                            handleTagClick={handleTagClick}
                            activeTags={activeTags}
                        />
                    )}
                    <ExplorePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            ) : (
                <ExploreNoProjectsFoundCard clearSearch={clearSearch} />
            )}
        </div>
    );
};

export default ExploreProjectsResultsTray;
