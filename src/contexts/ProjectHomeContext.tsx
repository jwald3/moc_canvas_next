import React, { createContext, useContext, useState } from 'react';
import { projects } from "@/data/seed-data";
import { ProjectObject } from '@/types/hand_spun_datatypes';
import { projectDetails } from '@/data/sample-data';

interface ProjectHomeContextType {
    project: ProjectObject | null;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    handleAddStep: () => void;
}

const ProjectHomeContext = createContext<ProjectHomeContextType | undefined>(undefined);

interface ProjectHomeProviderProps {
    children: React.ReactNode;
    projectId: string;
}

type ProjectDetailsType = Record<number, Partial<ProjectObject>>;

export const ProjectHomeProvider = ({ children, projectId }: ProjectHomeProviderProps) => {
    const [activeTab, setActiveTab] = useState("progress");


    const basicProject = projects.find((p) => p.id.toString() === projectId.toString());

    const details = (projectDetails as ProjectDetailsType)[Number(projectId)];
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
