import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Project } from '@/types/project';
import { projects } from "@/data/seed-data";
import { useRouter } from 'next/navigation';

type RouterType = ReturnType<typeof useRouter>;

export type SortOption = {
    label: string;
    value: keyof Project | 'tagCount';
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
    handleProjectClick: (idOrEvent: number | React.MouseEvent) => void;
    onTagClick: (tag: string) => void;
    isMobile: boolean;
    filterProjects: (projectsList: Project[]) => Project[];
    filteredMyProjects: Project[];
    filteredSavedProjects: Project[];
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const sortOptions: SortOption[] = [
    { label: 'Recently Updated', value: 'lastUpdated', direction: 'desc' },
    { label: 'Project Name (A-Z)', value: 'name', direction: 'asc' },
    { label: 'Project Name (Z-A)', value: 'name', direction: 'desc' },
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

    // saved projects can just be the projects array for now
    const savedProjects = projects;

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
        [...projects, ...savedProjects].forEach((project) => {
            project.tags.forEach((tag) => {
                allTags.add(tag);
            });
        });
        return Array.from(allTags).sort();
    };

    const navigateCarousel = (direction: "next" | "prev", carouselType: "my" | "saved"): void => {
        const projectsList = carouselType === "my" ? projects : savedProjects;
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

    const handleProjectClick = (idOrEvent: number | React.MouseEvent) => {
        if (typeof idOrEvent === "number") {
            router.push(`/projects/${idOrEvent}`);
        }
    };

    const filterProjects = (projectsList: Project[]) => {
        return projectsList.filter(project => {
            // Search query filter
            const matchesSearch = searchQuery === "" || 
                project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (project.description ? project.description.toLowerCase().includes(searchQuery.toLowerCase()) : false);

            // Tags filter
            const matchesTags = activeTags.length === 0 || 
                activeTags.every(tag => project.tags.includes(tag));

            return matchesSearch && matchesTags;
        });
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
        filteredMyProjects: filterProjects(projects as unknown as Project[]),
        filteredSavedProjects: filterProjects(savedProjects as unknown as Project[]),
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