import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ProjectObject } from '@/types/hand_spun_datatypes';
import AllProjectsSkeleton from '@/components/projectsAll/allProjectsSkeleton';
import colors from '@/lib/colors';

type RouterType = ReturnType<typeof useRouter>;

export type SortOption = {
    label: string;
    value: keyof ProjectObject | 'tagCount';
    direction: 'asc' | 'desc';
};

interface AllProjectsContextType {
    activeTags: string[];
    setActiveTags: (tags: string[]) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    currentSort: SortOption;
    setCurrentSort: (sort: SortOption) => void;
    filteredProjects: ProjectObject[];
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
    handleProjectClick: (id: string) => void;
    loading: boolean;
    error: string | null;
    projects: ProjectObject[];
    savedProjects: ProjectObject[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
    itemsPerPage: number;
    totalPages: number;
    paginatedProjects: ProjectObject[];
}

const AllProjectsContext = createContext<AllProjectsContextType | undefined>(undefined);

interface AllProjectsProviderProps {
    children: React.ReactNode;
    router: RouterType;
}

export const sortOptions: SortOption[] = [
    { label: 'Recently Updated', value: 'updatedAt', direction: 'desc' },
    { label: 'Project Name (A-Z)', value: 'title', direction: 'asc' },
    { label: 'Project Name (Z-A)', value: 'title', direction: 'desc' },
    { label: 'Most Tags', value: 'tagCount', direction: 'desc' },
    { label: 'Least Tags', value: 'tagCount', direction: 'asc' },
];

export const AllProjectsProvider = ({ children, router }: AllProjectsProviderProps) => {
    const [projects, setProjects] = useState<ProjectObject[]>([]);
    const [savedProjects, setSavedProjects] = useState<ProjectObject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentSort, setCurrentSort] = useState<SortOption>(sortOptions[0]);
    const [myProjectsStartIndex, setMyProjectsStartIndex] = useState(0);
    const [savedProjectsStartIndex, setSavedProjectsStartIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Show 9 items per page for grid view

    const searchParams = useSearchParams();
    const currentView = (searchParams?.get('view') as 'my' | 'saved') || 'my';

    // Fetch projects from the API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch user's own projects
                const myProjectsResponse = await fetch('/api/projects/my');
                if (myProjectsResponse.ok) {
                    const myProjectsData = await myProjectsResponse.json();
                    setProjects(myProjectsData);
                } else if (myProjectsResponse.status === 401) {
                    setProjects([]);
                } else {
                    throw new Error('Failed to fetch user projects');
                }

                // Fetch saved projects
                const savedProjectsResponse = await fetch('/api/projects/saved');
                if (savedProjectsResponse.ok) {
                    const savedProjectsData = await savedProjectsResponse.json();
                    setSavedProjects(savedProjectsData);
                } else if (savedProjectsResponse.status === 401) {
                    setSavedProjects([]);
                } else {
                    console.error('Failed to fetch saved projects');
                    setSavedProjects([]);
                }
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Helper function to check if search query matches a color
    const searchMatchesColor = (query: string, projectColorPalette: number[] = []) => {
        if (!projectColorPalette || projectColorPalette.length === 0) return false;
        
        const lowerQuery = query.toLowerCase();
        
        // Get color objects for the project's palette
        const projectColors = colors.filter(color => 
            projectColorPalette.includes(color.bricklinkColorId)
        );
        
        // Check if query matches any color name or semantic theme
        return projectColors.some(color => 
            color.bricklinkColorName.toLowerCase().includes(lowerQuery) ||
            color.semanticThemes.some(theme => 
                theme.toLowerCase().includes(lowerQuery)
            )
        );
    };

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

    const handleCreateProject = () => {
        router.push('/projects/new');
    };

    const handleProjectClick = (id: string) => {
        router.push(`/projects/${id}`);
    };

    const filterProjects = (projectsList: ProjectObject[]) => {
        return projectsList.filter(project => {
            // Search query filter - now includes color search
            const matchesSearch = searchQuery === "" || 
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (project.description ? project.description.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
                searchMatchesColor(searchQuery, project.colorPalette);

            // Tags filter
            const matchesTags = activeTags.length === 0 || 
                activeTags.every(tag => project.tags.includes(tag));

            return matchesSearch && matchesTags;
        });
    };

    const filteredProjects = filterProjects(currentView === 'my' ? projects : savedProjects);
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
        handleProjectClick,
        getAllTags,
        viewMode,
        setViewMode,
        clearSearch,
        sortOptions,
        currentView,
        handleCreateProject,
        allTags: getAllTags(),
        loading,
        error,
        projects,
        savedProjects,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        totalPages,
        paginatedProjects,
    };

    if (loading) {
        return <AllProjectsSkeleton />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[200px] text-red-500">
                <div className="text-center">
                    <svg 
                        className="w-12 h-12 mx-auto mb-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                        />
                    </svg>
                    <p className="text-lg font-semibold">Error loading projects</p>
                    <p className="text-sm text-red-400">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <AllProjectsContext.Provider value={value}>
            {children}
        </AllProjectsContext.Provider>
    );
}

export const useAllProjectsContext = () => {
    const context = useContext(AllProjectsContext);
    if (context === undefined) {
        throw new Error('useAllProjectsContext must be used within a AllProjectsProvider');
    }
    return context;
};


