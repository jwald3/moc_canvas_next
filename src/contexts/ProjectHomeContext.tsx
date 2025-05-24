'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getProjectById } from '@/actions/project-actions'
import type { HandSpunProject, HandSpunBuildStep, HandSpunProjectImage, HandSpunProjectNote } from '@prisma/client'

type ProjectMainImage = {
  id: string;
  url: string;
}

type ProjectWithRelations = HandSpunProject & {
  mainImage?: ProjectMainImage | null;
  steps?: (HandSpunBuildStep & {
    images: HandSpunProjectImage[]
  })[] | null;
  theme?: {
    name: string;
    id: string;
    description: string;
    iconType: string | null;
    color: string | null;
  };
  stats?: {
    id: string;
    projectId: string;
    views: number;
    likes: number;
    comments: number;
    shares: number;
    public: boolean;
  } | null;
  images: HandSpunProjectImage[];
  notes?: HandSpunProjectNote[];
}

interface ProjectHomeContextType {
    project: ProjectWithRelations | null;
    isLoading: boolean;
    error: string | null;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    handleAddStep: () => void;
    handleMainImageUpload: (imageUrl: string) => Promise<void>;
    handleAddNote: (content: string) => Promise<void>;
    handleDeleteNote: (noteId: string) => Promise<void>;
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

    const handleMainImageUpload = async (imageUrl: string) => {
        try {
            setIsLoading(true);
            
            // Update the project with the new main image
            const response = await fetch(`/api/projects/${projectId}/main-image`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl }),
            });

            if (!response.ok) {
                throw new Error('Failed to update main image');
            }

            // Refresh the project data
            const updatedProject = await getProjectById(projectId);
            setProject(updatedProject);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to upload image');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddNote = async (content: string) => {
        try {
            const response = await fetch(`/api/projects/${projectId}/notes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content }),
            });
            if (!response.ok) throw new Error('Failed to add note');
            const updatedProject = await getProjectById(projectId);
            setProject(updatedProject);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add note');
        }
    };

    const handleDeleteNote = async (noteId: string) => {
        try {
            const response = await fetch(`/api/projects/${projectId}/notes/${noteId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete note');
            const updatedProject = await getProjectById(projectId);
            setProject(updatedProject);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete note');
        }
    };

    const value = {
        project,
        isLoading,
        error,
        activeTab,
        setActiveTab,
        handleAddStep,
        handleMainImageUpload,
        handleAddNote,
        handleDeleteNote,
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
