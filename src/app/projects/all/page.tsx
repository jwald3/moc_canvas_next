"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import AllProjectsHeader from "@/components/projectsAll/allProjectsHeader";
import AllProjectsControls from "@/components/projectsAll/allProjectsControls";
import { AllProjectsProvider } from "@/contexts/AllProjectsContext";
import AllProjectsResultsTray from "@/components/projectsAll/allProjectsResultsTray";
import AllProjectsSkeleton from "@/components/projectsAll/allProjectsSkeleton";

const AllProjectsContent = () => {
    const router = useRouter();

    return (
        <AllProjectsProvider router={router}>
            <div className="min-h-screen bg-theme-gradient p-4 sm:p-6">
                <div className="max-w-7xl mx-auto">
                    <AllProjectsHeader />
                    <AllProjectsControls />
                    <AllProjectsResultsTray />
                </div>
            </div>
        </AllProjectsProvider>
    );
};

const AllProjectsPage = () => {
    return (
        <Suspense fallback={<AllProjectsSkeleton />}>
            <AllProjectsContent />
        </Suspense>
    );
};

export const dynamic = 'force-dynamic';

export default AllProjectsPage;
