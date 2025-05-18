'use client';

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import ExploreHeader from '@/components/explore/exploreHeader';
import ExploreThemeTray from '@/components/explore/exploreThemeTray';
import ExploreProjectsResultsTray from '@/components/explore/exploreProjectsResultsTray';
import ExplorePageControls from '@/components/explore/explorePageControls';
import { ExploreProjectsProvider, useExploreProjectsContext } from '@/contexts/ExploreProjectsContext';
import ExplorePageSkeleton from '@/components/explore/explorePageSkeleton';

const ErrorState = ({ error }: { error: string }) => (
    <div className="min-h-screen bg-theme-gradient p-4 sm:p-6">
        <div className="max-w-7xl mx-auto text-red-500">
            Error: {error}
        </div>
    </div>
);

const ExplorePageContent = () => {
    const {
        isLoading,
        error
    } = useExploreProjectsContext();

    console.log('ExplorePageContent render:', { isLoading, error });

    return (
        <div className="min-h-screen bg-theme-gradient p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {isLoading ? (
                    <ExplorePageSkeleton />
                ) : error ? (
                    <ErrorState error={error} />
                ) : (
                    <>
                        <ExploreHeader />
                        <ExploreThemeTray />
                        <ExplorePageControls />
                        <ExploreProjectsResultsTray />
                    </>
                )}
            </div>
        </div>
    );
};

const ExplorePage = () => {
    const router = useRouter();

    return (
        <Suspense fallback={<ExplorePageSkeleton />}>
            <ExploreProjectsProvider router={router}>
                <ExplorePageContent />
            </ExploreProjectsProvider>
        </Suspense>
    );
};

export default ExplorePage;
