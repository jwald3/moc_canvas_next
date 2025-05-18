'use client';

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { themes } from '@/data/seed-data';
import ExploreHeader from '@/components/explore/exploreHeader';
import ExploreThemeTray from '@/components/explore/exploreThemeTray';
import ExploreProjectsResultsTray from '@/components/explore/exploreProjectsResultsTray';
import ExplorePageControls from '@/components/explore/explorePageControls';
import { ExploreProjectsProvider, useExploreProjectsContext } from '@/contexts/ExploreProjectsContext';

const LoadingState = () => (
    <div className="min-h-screen bg-theme-gradient p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
            Loading...
        </div>
    </div>
);

const ErrorState = ({ error }: { error: string }) => (
    <div className="min-h-screen bg-theme-gradient p-4 sm:p-6">
        <div className="max-w-7xl mx-auto text-red-500">
            Error: {error}
        </div>
    </div>
);

const ExplorePageContent = () => {
    const {
        searchQuery,
        setSearchQuery,
        clearSearch,
        allTags,
        activeTags,
        handleTagClick,
        viewMode,
        setViewMode,
        currentTheme,
        filteredProjects,
        handleThemeChange,
        handleProjectClick,
        isLoading,
        error
    } = useExploreProjectsContext();

    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState error={error} />;

    return (
        <div className="min-h-screen bg-theme-gradient p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* This contains the header with the back button and the project count. */}
                <ExploreHeader />

                {/* This contains the clickable theme tiles users can click on to filter by theme. 
                Subject to change as we add more themes to the database and the view becomes more dynamic. */}
                <ExploreThemeTray />

                {/* This contains the search bar, clickable tags, and view mode buttons. I would like to eventually
                make this also include a sort-by dropdown and use this component across the app. */}
                <ExplorePageControls
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    clearSearch={clearSearch}
                    allTags={allTags}
                    activeTags={activeTags}
                    handleTagClick={handleTagClick}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />

                {/* This contains the projects that match the search query, tags, and theme. It handles the 
                display of the projects in a grid or list view and additionally handles responsive design internally
                depending on the screen size. */}
                <ExploreProjectsResultsTray 
                    filteredProjects={filteredProjects}
                    viewMode={viewMode}
                    handleProjectClick={handleProjectClick}
                    handleTagClick={handleTagClick}
                    activeTags={activeTags}
                    clearSearch={clearSearch}
                />
            </div>
        </div>
    );
};

const ExplorePage = () => {
    const router = useRouter();

    return (
        <Suspense fallback={<LoadingState />}>
            <ExploreProjectsProvider router={router}>
                <ExplorePageContent />
            </ExploreProjectsProvider>
        </Suspense>
    );
};

export default ExplorePage;
