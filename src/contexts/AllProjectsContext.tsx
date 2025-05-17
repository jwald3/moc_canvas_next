import React, { createContext, useContext, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Project } from '@/types/project';
import { projects, savedProjects } from "@/data/sample-data";

type RouterType = ReturnType<typeof useRouter>;

export type SortOption = {
    label: string;
    value: keyof Project | 'tagCount';
    direction: 'asc' | 'desc';
};

interface AllProjectsContextType {
    activeTags: string[];
    setActiveTags: (tags: string[]) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    currentSort: SortOption;
    setCurrentSort: (sort: SortOption) => void;
    filteredProjects: Project[];
    myProjectsStartIndex: number;
    setMyProjectsStartIndex: (index: number) => void;
    savedProjectsStartIndex: number;
    setSavedProjectsStartIndex: (index: number) => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTagClick: (tag: string) => void;
    clearSearch: () => void;
    currentView: 'my' | 'saved';
    handleCreateProject: () => void;
    allTags: string[];
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    handleProjectClick: (id: number) => void;
    
}

const AllProjectsContext = createContext<AllProjectsContextType | undefined>(undefined);


interface AllProjectsProviderProps {
    children: React.ReactNode;
    router: RouterType;
}

export const sortOptions: SortOption[] = [
    { label: 'Recently Updated', value: 'lastUpdated', direction: 'desc' },
    { label: 'Project Name (A-Z)', value: 'name', direction: 'asc' },
    { label: 'Project Name (Z-A)', value: 'name', direction: 'desc' },
    { label: 'Most Tags', value: 'tagCount', direction: 'desc' },
    { label: 'Least Tags', value: 'tagCount', direction: 'asc' },
];

export const AllProjectsProvider = ({ children, router }: AllProjectsProviderProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentSort, setCurrentSort] = useState<SortOption>(sortOptions[0]);
    const [myProjectsStartIndex, setMyProjectsStartIndex] = useState(0);
    const [savedProjectsStartIndex, setSavedProjectsStartIndex] = useState(0);

    const searchParams = useSearchParams();
    const currentView = (searchParams?.get('view') as 'my' | 'saved') || 'my';

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleTagClick = (tag: string) => {
        setActiveTags(prev => {
            const isActive = prev.includes(tag);
            if (isActive) {
                return prev.filter(t => t !== tag);
            } else {
                return [...prev, tag];
            }
        });
    };

    const handleCreateProject = () => {
        router.push('/projects/new');
    };

    const handleProjectClick = (id: number) => {
        router.push(`/projects/${id}`);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setActiveTags([]);
    };

    const getAllTags = () => {
        const tagSet = new Set<string>();
        [...projects, ...savedProjects].forEach(project => {
            project.tags.forEach(tag => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
    };

    const navigateCarousel = (direction: 'next' | 'prev', type: 'my' | 'saved') => {
        if (type === 'my') {
            setMyProjectsStartIndex(prev => direction === 'next' ? prev + 1 : prev - 1);
        } else {
            setSavedProjectsStartIndex(prev => direction === 'next' ? prev + 1 : prev - 1);
        }
    };

    // Filter projects based on search and tags
    const filterProjects = (projectsList: Project[]) => {
        return projectsList.filter(project => {
            const matchesSearch = !searchQuery || 
                project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.tags.some(tag => 
                    tag.toLowerCase().includes(searchQuery.toLowerCase())
                );
            
            const matchesTags = activeTags.length === 0 ||
                activeTags.every(activeTag =>
                    project.tags.some(tag => 
                        tag.toLowerCase() === activeTag.toLowerCase()
                    )
                );
            
            return matchesSearch && matchesTags;
        });
    };

    const filteredProjects = filterProjects(currentView === 'saved' ? savedProjects : projects);

    const value = {
        activeTags,
        setActiveTags,
        searchQuery,
        setSearchQuery,
        currentSort,
        setCurrentSort,
        filteredProjects,
        myProjectsStartIndex,
        setMyProjectsStartIndex,
        savedProjectsStartIndex,
        setSavedProjectsStartIndex,
        handleSearch,
        handleTagClick,
        getAllTags,
        viewMode,
        setViewMode,
        clearSearch,
        sortOptions,
        navigateCarousel,
        handleProjectClick,
        onTagClick: handleTagClick,
        currentView,
        handleCreateProject,
        allTags: getAllTags(),
    };

    return (
        <AllProjectsContext.Provider value={value}>
            {children}
        </AllProjectsContext.Provider>
    )
}

export const useAllProjectsContext = () => {
    const context = useContext(AllProjectsContext);
    if (context === undefined) {
        throw new Error('useAllProjectsContext must be used within a AllProjectsProvider');
    }
    return context;
};


