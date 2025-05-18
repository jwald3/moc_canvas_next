import React from 'react';
import '@/styles/shimmer.css';

const ExplorePageSkeleton = () => {
    return (
        <>
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div className="flex items-center">
                    <div className="mr-3 p-2 rounded-full bg-gray-200 w-8 h-8 shimmer" />
                    <div>
                        <div className="h-8 w-48 bg-gray-200 rounded mb-2 shimmer" />
                        <div className="h-4 w-32 bg-gray-200 rounded shimmer" />
                    </div>
                </div>
            </div>

            {/* Theme Tray Skeleton */}
            <div className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-32 bg-gray-200 rounded-lg shadow-sm shimmer" />
                    ))}
                </div>
            </div>

            {/* Controls Skeleton */}
            <div className="mb-6">
                <div className="h-12 bg-gray-200 rounded-lg mb-4 shadow-sm shimmer" />
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-3 sm:space-y-0">
                    <div className="h-8 w-full sm:w-2/3 bg-gray-200 rounded shimmer" />
                    <div className="h-8 w-24 bg-gray-200 rounded shimmer" />
                </div>
            </div>

            {/* Projects Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-200 rounded-lg shadow-sm shimmer" />
                ))}
            </div>
        </>
    );
};

export default ExplorePageSkeleton; 