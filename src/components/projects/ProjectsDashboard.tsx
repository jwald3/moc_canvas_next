import React from "react";
import type { Project } from "@/types/project";
import { useRouter } from 'next/navigation';

// Remove the Router import and use the return type of useRouter
type RouterType = ReturnType<typeof useRouter>;

import ProjectDashboardHeader from "@/components/projectsDashboard/projectDashboardHeader";
import ProjectDashboardControls from "../projectsDashboard/projectDashboardControls";
import { ProjectProvider, useProjectContext } from "@/contexts/ProjectContext";
import MyProjects from "../projectsDashboard/myProjects";
import SavedProjects from "../projectsDashboard/savedProjects";

// Add these types at the top of the file
export type SortOption = {
    label: string;
    value: keyof Project | 'tagCount';
    direction: 'asc' | 'desc';
};

const sortOptions: SortOption[] = [
    { label: 'Recently Updated', value: 'lastUpdated', direction: 'desc' },
    { label: 'Project Name (A-Z)', value: 'name', direction: 'asc' },
    { label: 'Project Name (Z-A)', value: 'name', direction: 'desc' },
    { label: 'Most Tags', value: 'tagCount', direction: 'desc' },
    { label: 'Least Tags', value: 'tagCount', direction: 'asc' },
];

export const ProjectsDashboard = () => {
    const router = useRouter();

    return (
        <ProjectProvider router={router}>
            <ProjectDashboardContent router={router} />
        </ProjectProvider>
    );
};

const ProjectDashboardContent = ({ router }: { router: RouterType }) => {
    return (
        <div className="min-h-screen bg-theme-gradient p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                <ProjectDashboardHeader handleCreateProject={() => {}} />

                <ProjectDashboardControls />

                <MyProjects />

                <SavedProjects />
            </div>
        </div>
    );
};
