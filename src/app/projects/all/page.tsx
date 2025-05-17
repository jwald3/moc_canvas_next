"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import AllProjectsHeader from "@/components/projectsAll/allProjectsHeader";
import AllProjectsControls from "@/components/projectsAll/allProjectsControls";
import { AllProjectsProvider } from "@/contexts/AllProjectsContext";
import AllProjectsResultsTray from "@/components/projectsAll/allProjectsResultsTray";

// Loading component
const Loading = () => (
    <div className="min-h-screen bg-theme-gradient p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
            <div>Loading...</div>
        </div>
    </div>
);

const AllProjectsContent = () => {
    const router = useRouter();

    return (
        <AllProjectsProvider router={router}>
            <div className="min-h-screen bg-theme-gradient p-4 sm:p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <AllProjectsHeader />

                    {/* Search and Filters */}
                    <AllProjectsControls />

                    {/* Projects Grid/List */}
                    <AllProjectsResultsTray />
                </div>
            </div>
        </AllProjectsProvider>
    );
};

const AllProjectsPage = () => {
    return (
        <Suspense fallback={<Loading />}>
            <AllProjectsContent />
        </Suspense>
    );
};

// Add this export to make the page dynamic
export const dynamic = 'force-dynamic';

export default AllProjectsPage;
