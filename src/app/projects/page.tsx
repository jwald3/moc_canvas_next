'use client';

import { useRouter } from 'next/navigation';
import MyProjects from '@/components/projectsDashboard/myProjects/myProjects';
import ProjectDashboardControls from '@/components/projectsDashboard/projectDashboardControls';
import ProjectDashboardHeader from '@/components/projectsDashboard/projectDashboardHeader';
import SavedProjects from '@/components/projectsDashboard/savedProjects/savedProjects';
import { ProjectProvider, useProjectContext } from '@/contexts/ProjectContext';
import ProjectsDashboardSkeleton from '@/components/projectsDashboard/projectsDashboardSkeleton';
import { Suspense } from 'react';
import type { Project } from "@/types/project";

export type SortOption = {
    label: string;
    value: keyof Project | 'tagCount';
    direction: 'asc' | 'desc';
};

const ErrorState = ({ error }: { error: string }) => (
    <div className="min-h-screen bg-theme-gradient p-4 sm:p-6">
        <div className="max-w-7xl mx-auto text-red-500">
            Error: {error}
        </div>
    </div>
);

const ProjectsDashboardContent = () => {
    const {
        isLoading,
        error
    } = useProjectContext();

    return (
        <div className="min-h-screen bg-theme-gradient">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                {isLoading ? (
                    <ProjectsDashboardSkeleton />
                ) : error ? (
                    <ErrorState error={error} />
                ) : (
                    <>
                        <ProjectDashboardHeader />
                        <ProjectDashboardControls />
                        <MyProjects />
                        <SavedProjects />
                    </>
                )}
            </div>
        </div>
    );
};

export default function ProjectsPage() {
    const router = useRouter();

    return (
        <Suspense fallback={<ProjectsDashboardSkeleton />}>
            <ProjectProvider router={router}>
                <ProjectsDashboardContent />
            </ProjectProvider>
        </Suspense>
    );
} 