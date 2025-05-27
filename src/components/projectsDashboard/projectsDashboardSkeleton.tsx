import React from 'react';
import '@/styles/shimmer.css';

const ProjectsDashboardSkeleton = () => {
    return (
        <>
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-6">
                <div>
                    <div className="h-8 w-48 bg-gray-200 rounded mb-2 shimmer" />
                    <div className="h-4 w-64 bg-gray-200 rounded shimmer" />
                </div>
                <div className="w-full sm:w-auto">
                    <div className="h-10 w-full sm:w-40 bg-gray-200 rounded-full shimmer" />
                </div>
            </div>

            {/* Controls Skeleton */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="h-10 w-full bg-gray-200 rounded-full shimmer" />
                    <div className="h-10 w-full sm:w-48 bg-gray-200 rounded-full shimmer" />
                </div>
            </div>

            {/* My Projects Section Skeleton */}
            <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <div className="h-7 w-32 bg-gray-200 rounded shimmer mb-2" />
                        <div className="h-4 w-24 bg-gray-200 rounded shimmer" />
                    </div>
                    <div className="h-6 w-20 bg-gray-200 rounded shimmer" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-64 bg-gray-200 rounded-lg shadow-sm shimmer" />
                    ))}
                </div>
            </div>

            {/* Saved Projects Section Skeleton */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <div className="h-7 w-36 bg-gray-200 rounded shimmer mb-2" />
                        <div className="h-4 w-24 bg-gray-200 rounded shimmer" />
                    </div>
                    <div className="h-6 w-20 bg-gray-200 rounded shimmer" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-64 bg-gray-200 rounded-lg shadow-sm shimmer" />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProjectsDashboardSkeleton; 