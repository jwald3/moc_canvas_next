"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AllProjectsHeader from "@/components/projectsAll/allProjectsHeader";
import AllProjectsControls from "@/components/projectsAll/allProjectsControls";
import { AllProjectsProvider } from "@/contexts/AllProjectsContext";
import AllProjectsResultsTray from "@/components/projectsAll/allProjectsResultsTray";

const AllProjectsPage = () => {
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

export default AllProjectsPage;
