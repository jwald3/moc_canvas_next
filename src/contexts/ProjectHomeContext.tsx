'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getProjectById } from '@/actions/project-actions'
import { useUser } from '@clerk/nextjs'
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
    handleAddStep: (stepData: { title: string; description: string; images: string[] }) => Promise<void>;
    handleMainImageUpload: (imageUrl: string) => Promise<void>;
    handleAddNote: (content: string) => Promise<void>;
    handleDeleteNote: (noteId: string) => Promise<void>;
    updateProject: (updatedProject: ProjectWithRelations) => void;
    handleVisibilityUpdate: (isPublic: boolean) => Promise<void>;
    isOwner: boolean;
}

const ProjectHomeContext = createContext<ProjectHomeContextType | undefined>(undefined);

interface ProjectHomeProviderProps {
    children: React.ReactNode;
    projectId: string;
}

export const ProjectHomeProvider = ({ children, projectId }: ProjectHomeProviderProps) => {
    const { user } = useUser();
    const [project, setProject] = useState<ProjectWithRelations | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("progress");

    // Check if current user owns this project
    const isOwner = user?.id === project?.userId;

    // Enhanced setActiveTab that prevents non-owners from accessing settings
    const setActiveTabSafe = (tab: string) => {
        if (tab === "settings" && !isOwner) {
            return; // Don't allow non-owners to access settings
        }
        setActiveTab(tab);
    };

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

    const handleAddStep = async (stepData: { title: string; description: string; images: string[] }) => {
        try {
            const response = await fetch(`/api/projects/${projectId}/steps`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stepData),
            });

            if (!response.ok) {
                throw new Error('Failed to add step');
            }

            // Refresh the project data
            const updatedProject = await getProjectById(projectId);
            setProject(updatedProject);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add step');
            throw err;
        }
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

    const updateProject = (updatedProject: ProjectWithRelations) => {
        setProject(updatedProject);
    };

    const handleVisibilityUpdate = async (isPublic: boolean) => {
        try {
            const response = await fetch(`/api/projects/${projectId}/visibility`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ public: isPublic }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP ${response.status}: Failed to update project visibility`);
            }

            const result = await response.json();
            
            // Update the project with the new visibility
            if (project) {
                setProject({
                    ...project,
                    public: result.public
                });
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update visibility';
            setError(errorMessage);
            console.error('Visibility update error:', errorMessage);
            throw err; // Re-throw so the component can handle the error
        }
    };

    const value = {
        project,
        isLoading,
        error,
        activeTab,
        setActiveTab: setActiveTabSafe,
        handleAddStep,
        handleMainImageUpload,
        handleAddNote,
        handleDeleteNote,
        updateProject,
        handleVisibilityUpdate,
        isOwner,
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
