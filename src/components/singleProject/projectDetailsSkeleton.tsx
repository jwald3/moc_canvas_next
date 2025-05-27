import React from "react";

const ProjectDetailsSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-50 animate-pulse">
            {/* Header Skeleton */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200" />
                            <div className="h-6 w-48 bg-gray-200 rounded" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200" />
                            <div className="w-8 h-8 rounded-full bg-gray-200" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
                {/* Hero Banner Skeleton */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                    <div className="w-full h-64 bg-gray-200" />
                    
                    {/* Project Info Skeleton */}
                    <div className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <div className="flex-1">
                                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
                                <div className="h-4 bg-gray-200 rounded mb-2 w-1/2" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Skeleton */}
                <div className="border-b border-gray-200 mb-6">
                    <div className="flex space-x-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="h-8 w-24 bg-gray-200 rounded"
                            />
                        ))}
                    </div>
                </div>

                {/* Content Skeleton */}
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="bg-white rounded-lg p-4 shadow-sm"
                        >
                            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
                            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                            <div className="h-4 bg-gray-200 rounded w-2/3" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Action Button Skeleton */}
            <div className="fixed bottom-6 right-6">
                <div className="w-12 h-12 rounded-full bg-gray-200" />
            </div>
        </div>
    );
};

export default ProjectDetailsSkeleton; 