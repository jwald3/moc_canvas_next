'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getProjectById } from '@/actions/project-actions'
import type { HandSpunProject, HandSpunBuildStep, HandSpunProjectImage } from '@prisma/client'

type ProjectWithRelations = HandSpunProject & {
  steps?: (HandSpunBuildStep & {
    images: HandSpunProjectImage[]
  })[]
}

interface ProjectHomeContextType {
    project: ProjectWithRelations | null;
    isLoading: boolean;
    error: string | null;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    handleAddStep: () => void;
}

const ProjectHomeContext = createContext<ProjectHomeContextType | undefined>(undefined);

interface ProjectHomeProviderProps {
    children: React.ReactNode;
    projectId: string;
}

export const ProjectHomeProvider = ({ children, projectId }: ProjectHomeProviderProps) => {
    const [project, setProject] = useState<ProjectWithRelations | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("progress");

    useEffect(() => {
        async function loadProject() {
            try {
                setIsLoading(true);
                const projectData = await getProjectById(projectId);
                setProject(projectData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load project');
            } finally {
                setIsLoading(false);
            }
        }

        loadProject();
    }, [projectId]);

    const handleAddStep = () => {
        // TODO: Implement add step functionality
        console.log("Adding new step");
    };

    const value = {
        project,
        isLoading,
        error,
        activeTab,
        setActiveTab,
        handleAddStep,
    };

    return (
        <ProjectHomeContext.Provider value={value}>
            {children}
        </ProjectHomeContext.Provider>
    );
};

export const useProjectHomeContext = () => {
    const context = useContext(ProjectHomeContext);
    if (context === undefined) {
        throw new Error('useProjectHomeContext must be used within a ProjectHomeProvider');
    }
    return context;
};
