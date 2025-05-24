import { useSearchParams } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProjectObject, ProjectThemeObject } from '@/types/hand_spun_datatypes';
import { ProjectWithRelations } from '@/types/prisma';

type RouterType = ReturnType<typeof useRouter>;

interface ExploreProjectsContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    activeTags: string[];
    setActiveTags: (tags: string[]) => void;
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    currentTheme: string;
    filteredProjects: ProjectObject[];
    clearSearch: () => void;
    handleTagClick: (tag: string) => void;
    handleThemeChange: (themeId: string) => void;
    handleProjectClick: (id: string) => void;
    allTags: string[];
    isLoading: boolean;
    error: string | null;
    themes: ProjectThemeObject[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
    projectsPerPage: number;
    totalPages: number;
    paginatedProjects: ProjectObject[];
}

const ExploreProjectsContext = createContext<ExploreProjectsContextType | undefined>(undefined);

interface ExploreProjectsProviderProps {
    children: React.ReactNode;
    router: RouterType;
}

export const ExploreProjectsProvider = ({ children, router }: ExploreProjectsProviderProps) => {
    const searchParams = useSearchParams();
    const currentTheme = searchParams.get('theme') || 'all';
    
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [projects, setProjects] = useState<ProjectObject[]>([]);
    const [themes, setThemes] = useState<ProjectThemeObject[]>([]);
    const [allTags, setAllTags] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 9; // Show 9 projects per page in grid view

    // Fetch projects from the API
    useEffect(() => {
        const fetchProjects = async () => {
            console.log('Starting fetch...');
            try {
                setIsLoading(true);
                setError(null);
                
                console.log('Making API request...');
                const response = await fetch('/api/projects');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                
                const data = await response.json();
                console.log('Received data:', data);
                
                setProjects(data);

                // Extract unique tags
                const tagSet = new Set<string>();
                data.forEach((project: ProjectWithRelations) => {
                    project.tags.forEach(tag => tagSet.add(tag));
                });
                setAllTags(Array.from(tagSet).sort());
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // fetch themes from the API
    useEffect(() => {
        const fetchThemes = async () => {
            const response = await fetch('/api/themes');
            const data = await response.json();
            setThemes(data);
        };

        fetchThemes();
    }, []);

    const filteredProjects = projects.filter(project => {
        const matchesSearch = !searchQuery || 
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tags.some(tag => 
                tag.toLowerCase().includes(searchQuery.toLowerCase())
            );

        const matchesTags = activeTags.length === 0 ||
            activeTags.every(activeTag =>
                project.tags.some(tag => 
                    tag.toLowerCase() === activeTag.toLowerCase()
                )
            );
        
        const matchesTheme = currentTheme === 'all' ||
            project.tags.some(tag => 
                tag.toLowerCase() === themes.find(t => t.id === currentTheme)?.name.toLowerCase()
            );
        
        return matchesSearch && matchesTags && matchesTheme;
    });

    // Calculate total pages
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    // Get current projects for page
    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * projectsPerPage,
        currentPage * projectsPerPage
    );

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeTags, currentTheme]);

    const clearSearch = () => {
        setSearchQuery('');
        setActiveTags([]);
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

    const handleThemeChange = (themeId: string) => {
        // If clicking the currently selected theme, clear it
        if (currentTheme === themeId) {
            router.push('/explore');
        } else {
            router.push(`/explore?theme=${themeId}`);
        }
    };

    const handleProjectClick = (id: string) => {
        router.push(`/projects/${id}`);
    };

    const value = {
        searchQuery,
        setSearchQuery,
        activeTags,
        setActiveTags,
        viewMode,
        setViewMode,
        currentTheme,
        filteredProjects,
        clearSearch,
        handleTagClick,
        handleThemeChange,
        handleProjectClick,
        allTags,
        isLoading,
        error,
        themes,
        currentPage,
        setCurrentPage,
        projectsPerPage,
        totalPages,
        paginatedProjects,
    };

    return (
        <ExploreProjectsContext.Provider value={value}>
            {children}
        </ExploreProjectsContext.Provider>
    );
};

export const useExploreProjectsContext = () => {
    const context = useContext(ExploreProjectsContext);
    if (!context) {
        throw new Error('useExploreProjectsContext must be used within a ExploreProjectsProvider');
    }
    return context;
};
