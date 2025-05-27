import React from "react";

const AllProjectsSkeleton = () => {
    return (
        <div className="min-h-screen bg-theme-gradient p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Skeleton */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div className="flex items-center">
                        {/* Back button skeleton */}
                        <div className="mr-3 w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                        <div>
                            {/* Title skeleton */}
                            <div className="w-32 h-8 bg-gray-200 rounded mb-2 animate-pulse" />
                            {/* View toggle skeleton */}
                            <div className="w-48 h-6 bg-gray-200 rounded animate-pulse" />
                            {/* Project count skeleton */}
                            <div className="w-24 h-4 bg-gray-200 rounded mt-1 animate-pulse" />
                        </div>
                    </div>
                    {/* Add New Project button skeleton */}
                    <div className="mt-4 sm:mt-0 w-40 h-10 bg-gray-200 rounded-full animate-pulse" />
                </div>

                {/* Controls Skeleton */}
                <div className="mb-6">
                    {/* Search bar skeleton */}
                    <div className="w-full h-12 bg-gray-200 rounded-full animate-pulse" />
                    
                    {/* Tags tray skeleton */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                        {/* View toggle skeleton */}
                        <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse mt-4 sm:mt-0" />
                    </div>
                </div>

                {/* Results Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(9)].map((_, i) => (
                        <div 
                            key={i} 
                            className="bg-gray-200 rounded-lg h-64 animate-pulse"
                        />
                    ))}
                </div>

                {/* Pagination Skeleton */}
                <div className="flex justify-center items-center gap-2 mt-6">
                    <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
                    <div className="w-32 h-8 bg-gray-200 rounded mx-4 animate-pulse" />
                    <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
};

export default AllProjectsSkeleton; 