import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectObject } from '@/types/hand_spun_datatypes';
import { HandSpunTheme } from '@prisma/client';
import { ProjectStatus, ProjectThemeObject, ProjectBuildStepObject, ProjectStatsObject } from '@/types/hand_spun_datatypes';

type RouterType = ReturnType<typeof useRouter>;

export type SortOption = {
    label: string;
    value: keyof ProjectObject | 'tagCount';
    direction: 'asc' | 'desc';
};

interface ProjectContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    currentSort: SortOption;
    setCurrentSort: (sort: SortOption) => void;
    activeTags: string[];
    setActiveTags: (tags: string[]) => void;
    myProjectsStartIndex: number;
    setMyProjectsStartIndex: (index: number) => void;
    savedProjectsStartIndex: number;
    setSavedProjectsStartIndex: (index: number) => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTagClick: (tag: string) => void;
    clearSearch: () => void;
    sortOptions: SortOption[];
    allTags: string[];
    navigateCarousel: (direction: "next" | "prev", carouselType: "my" | "saved") => void;
    handleProjectClick: (idOrEvent: string | React.MouseEvent) => void;
    onTagClick: (tag: string) => void;
    isMobile: boolean;
    filterProjects: (projectsList: ProjectObject[]) => ProjectObject[];
    filteredMyProjects: ProjectObject[];
    filteredSavedProjects: ProjectObject[];
    myProjects: ProjectObject[];
    savedProjects: ProjectObject[];
    isLoading: boolean;
    error: string | null;
    themes: (HandSpunTheme & {
        projects: {
            id: string;
            description: string;
            title: string;
            tags: string[];
            createdAt: Date;
            updatedAt: Date;
            status: ProjectStatus;
            owner: string | null;
            avatar: string | null;
            themeId: string;
            mainImageId: string | null;
            theme: ProjectThemeObject;
            steps: ProjectBuildStepObject[];
            stats: ProjectStatsObject;
            notes: { content: string }[];
        }[];
    })[];
    loadThemes: () => Promise<void>;
    refreshSavedProjects: () => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const sortOptions: SortOption[] = [
    { label: 'Recently Updated', value: 'updatedAt', direction: 'desc' },
    { label: 'Project Name (A-Z)', value: 'title', direction: 'asc' },
    { label: 'Project Name (Z-A)', value: 'title', direction: 'desc' },
    { label: 'Most Tags', value: 'tagCount', direction: 'desc' },
    { label: 'Least Tags', value: 'tagCount', direction: 'asc' },
];

interface ProjectProviderProps {
    children: React.ReactNode;
    router: RouterType;
}

export const ProjectProvider = ({ children, router }: ProjectProviderProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentSort, setCurrentSort] = useState(sortOptions[0]);
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [myProjectsStartIndex, setMyProjectsStartIndex] = useState(0);
    const [savedProjectsStartIndex, setSavedProjectsStartIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [themes, setThemes] = useState<(HandSpunTheme & {
        projects: {
            id: string;
            description: string;
            title: string;
            tags: string[];
            createdAt: Date;
            updatedAt: Date;
            status: ProjectStatus;
            owner: string | null;
            avatar: string | null;
            themeId: string;
            mainImageId: string | null;
            theme: ProjectThemeObject;
            steps: ProjectBuildStepObject[];
            stats: ProjectStatsObject;
            notes: { content: string }[];
        }[];
    })[]>([]);
    // Separate state for user's projects and saved projects
    const [myProjects, setMyProjects] = useState<ProjectObject[]>([]);
    const [savedProjects, setSavedProjects] = useState<ProjectObject[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const newIsMobile = width < 640;
            setIsMobile(newIsMobile);
            console.log('Window width:', width, 'isMobile:', newIsMobile);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const fetchSavedProjects = async () => {
        try {
            const savedProjectsResponse = await fetch('/api/projects/saved');
            if (savedProjectsResponse.ok) {
                const savedProjectsData = await savedProjectsResponse.json();
                setSavedProjects(savedProjectsData);
            } else if (savedProjectsResponse.status === 401) {
                // User not authenticated, set empty array
                setSavedProjects([]);
            } else {
                console.error('Failed to fetch saved projects');
                setSavedProjects([]);
            }
        } catch (error) {
            console.error('Error fetching saved projects:', error);
            setSavedProjects([]);
        }
    };

    const refreshSavedProjects = async () => {
        await fetchSavedProjects();
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Fetch user's own projects
                const myProjectsResponse = await fetch('/api/projects/my');
                if (myProjectsResponse.ok) {
                    const myProjectsData = await myProjectsResponse.json();
                    setMyProjects(myProjectsData);
                } else if (myProjectsResponse.status === 401) {
                    // User not authenticated, set empty array
                    setMyProjects([]);
                } else {
                    throw new Error('Failed to fetch user projects');
                }

                // Fetch saved projects
                await fetchSavedProjects();
                
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setError('Failed to fetch projects');
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setMyProjectsStartIndex(0);
        setSavedProjectsStartIndex(0);
    };

    const handleTagClick = (tag: string) => {
        setActiveTags(prev => {
            const isActive = prev.includes(tag);
            return isActive ? prev.filter(t => t !== tag) : [...prev, tag];
        });
        setSearchQuery("");
        setMyProjectsStartIndex(0);
        setSavedProjectsStartIndex(0);
    };

    const clearSearch = () => {
        setSearchQuery("");
        setActiveTags([]);
    };

    const getAllTags = (): string[] => {
        const allTags = new Set<string>();
        [...myProjects, ...savedProjects].forEach((project) => {
            project.tags.forEach((tag) => {
                allTags.add(tag);
            });
        });
        return Array.from(allTags).sort();
    };

    const navigateCarousel = (direction: "next" | "prev", carouselType: "my" | "saved"): void => {
        const projectsList = carouselType === "my" ? myProjects : savedProjects;
        const maxIndex = Math.max(0, projectsList.length - 3); // Assuming 3 cards per view

        if (carouselType === "my") {
            setMyProjectsStartIndex(prev => 
                direction === "next" 
                    ? (prev >= maxIndex ? 0 : prev + 1)
                    : (prev <= 0 ? maxIndex : prev - 1)
            );
        } else {
            setSavedProjectsStartIndex(prev => 
                direction === "next" 
                    ? (prev >= maxIndex ? 0 : prev + 1)
                    : (prev <= 0 ? maxIndex : prev - 1)
            );
        }
    };

    const handleProjectClick = (idOrEvent: string | React.MouseEvent) => {
        if (typeof idOrEvent === "string") {
            router.push(`/projects/${idOrEvent}`);
        }
    };

    const filterProjects = (projectsList: ProjectObject[]) => {
        return projectsList.filter(project => {
            // Search query filter
            const matchesSearch = searchQuery === "" || 
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (project.description ? project.description.toLowerCase().includes(searchQuery.toLowerCase()) : false);

            // Tags filter
            const matchesTags = activeTags.length === 0 || 
                activeTags.every(tag => project.tags.includes(tag));

            return matchesSearch && matchesTags;
        });
    };

    const loadThemes = async () => {
        const response = await fetch('/api/themes');
        const data = await response.json();
        setThemes(data); // No transformation needed since API returns correct format
    };

    const value = {
        searchQuery,
        setSearchQuery,
        currentSort,
        setCurrentSort,
        activeTags,
        setActiveTags,
        myProjectsStartIndex,
        setMyProjectsStartIndex,
        savedProjectsStartIndex,
        setSavedProjectsStartIndex,
        handleSearch,
        handleTagClick,
        clearSearch,
        sortOptions,
        allTags: getAllTags(),
        navigateCarousel,
        handleProjectClick,
        onTagClick: handleTagClick,
        isMobile,
        filterProjects,
        filteredMyProjects: filterProjects(myProjects),
        filteredSavedProjects: filterProjects(savedProjects),
        myProjects,
        savedProjects,
        themes,
        loadThemes,
        isLoading,
        error,
        refreshSavedProjects,
    };

    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjectContext = () => {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useProjectContext must be used within a ProjectProvider');
    }
    return context;
}; 