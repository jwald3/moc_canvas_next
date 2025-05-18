'use client';
import { useRouter } from 'next/navigation';
import MyProjects from '@/components/projectsDashboard/myProjects/myProjects';
import ProjectDashboardControls from '@/components/projectsDashboard/projectDashboardControls';
import ProjectDashboardHeader from '@/components/projectsDashboard/projectDashboardHeader';
import SavedProjects from '@/components/projectsDashboard/savedProjects/savedProjects';
import { ProjectProvider } from '@/contexts/ProjectContext';
import type { Project } from "@/types/project";

// Add these types at the top of the file
export type SortOption = {
    label: string;
    value: keyof Project | 'tagCount';
    direction: 'asc' | 'desc';
};

export default function ProjectsPage() {
    const router = useRouter();

    return (
        <ProjectProvider router={router}>
            <div className="min-h-screen bg-theme-gradient">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                    <ProjectDashboardHeader handleCreateProject={() => {}} />
                    <ProjectDashboardControls />
                    <MyProjects />
                    <SavedProjects />
                </div>
            </div>
        </ProjectProvider>
    );
} 