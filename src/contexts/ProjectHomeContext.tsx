import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project, projects, projectDetails } from "@/data/sample-data";

type RouterType = ReturnType<typeof useRouter>;

interface ProjectHomeContextType {
    project: Project | null;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    handleAddStep: () => void;
}

const ProjectHomeContext = createContext<ProjectHomeContextType | undefined>(undefined);

interface ProjectHomeProviderProps {
    children: React.ReactNode;
    router: RouterType;
    projectId: string;
}

export const ProjectHomeProvider = ({ children, router, projectId }: ProjectHomeProviderProps) => {
    const [activeTab, setActiveTab] = useState("progress");

    // Get basic project data and combine with details
    const basicProject = projects.find((p) => p.id === parseInt(projectId));
    const details = projectDetails[parseInt(projectId)];
    const project = basicProject
        ? {
              ...basicProject,
              ...details,
          }
        : null;

    const handleAddStep = () => {
        // TODO: Implement add step functionality
        console.log("Adding new step");
    };

    const value = {
        project,
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
