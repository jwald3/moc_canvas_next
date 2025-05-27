import { useSearchParams } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProjectObject, ProjectThemeObject } from '@/types/hand_spun_datatypes';
import { SearchMode } from '@/components/explore/searchModeSelector';

type RouterType = ReturnType<typeof useRouter>;

interface SearchFilters {
    colorIds?: number[];
}

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
    handleSearch: (query: string, mode: SearchMode, filters?: SearchFilters) => void;
    handleModeChange: (mode: SearchMode) => void;
    allTags: string[];
    isLoading: boolean;
    error: string | null;
    themes: ProjectThemeObject[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
    projectsPerPage: number;
    totalPages: number;
    paginatedProjects: ProjectObject[];
    searchMode: SearchMode;
    setSearchMode: (mode: SearchMode) => void;
    selectedColors: number[];
    setSelectedColors: (colors: number[]) => void;
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
    const [searchMode, setSearchMode] = useState<SearchMode>('all');
    const [selectedColors, setSelectedColors] = useState<number[]>([]);
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [projects, setProjects] = useState<ProjectObject[]>([]);
    const [themes, setThemes] = useState<ProjectThemeObject[]>([]);
    const [allTags, setAllTags] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasSearched, setHasSearched] = useState(false);
    const projectsPerPage = 9;

    // Load initial projects (all public projects)
    const loadInitialProjects = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await fetch('/api/projects');
            if (!response.ok) throw new Error('Failed to fetch projects');
            
            const data = await response.json();
            setProjects(data);

            // Extract unique tags
            const tagSet = new Set<string>();
            data.forEach((project: ProjectObject) => {
                project.tags.forEach(tag => tagSet.add(tag));
            });
            setAllTags(Array.from(tagSet).sort());
        } catch (err) {
            console.error('Error fetching projects:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch projects');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Only fetch initial projects if we haven't searched yet
        if (!hasSearched) {
            loadInitialProjects();
        }
    }, [hasSearched]);

    // Load themes
    useEffect(() => {
        const fetchThemes = async () => {
            try {
                const response = await fetch('/api/themes');
                if (!response.ok) throw new Error('Failed to fetch themes');
                const data = await response.json();
                setThemes(data);
            } catch (err) {
                console.error('Error fetching themes:', err);
            }
        };

        fetchThemes();
    }, []);

    // Handle search with different modes
    const handleSearch = async (query: string, mode: SearchMode, filters?: SearchFilters) => {
        try {
            setIsLoading(true);
            setError(null);
            setHasSearched(true);

            const searchParams = new URLSearchParams();
            if (query) searchParams.set('q', query);
            searchParams.set('type', mode);
            
            if (mode === 'color' && filters?.colorIds && filters.colorIds.length > 0) {
                searchParams.set('colorIds', filters.colorIds.join(','));
            }
            
            if (currentTheme !== 'all') {
                searchParams.set('themeId', currentTheme);
            }

            const response = await fetch(`/api/projects/search?${searchParams.toString()}`);
            if (!response.ok) throw new Error('Search failed');
            
            const data = await response.json();
            setProjects(data);
            setCurrentPage(1); // Reset to first page
        } catch (err) {
            console.error('Search error:', err);
            setError(err instanceof Error ? err.message : 'Search failed');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle mode changes - this will clear search and reload initial projects
    const handleModeChange = async (mode: SearchMode) => {
        setSearchMode(mode);
        setSearchQuery('');
        setSelectedColors([]);
        setActiveTags([]);
        setHasSearched(false); // This will trigger reload of initial projects
        setCurrentPage(1);
    };

    // Filter projects for display (now mainly for theme filtering and tags)
    const filteredProjects = projects.filter(project => {
        const matchesTheme = currentTheme === 'all' || project.theme.id === currentTheme;
        const matchesTags = activeTags.length === 0 || 
            activeTags.every(tag => project.tags.includes(tag));
        
        return matchesTheme && matchesTags;
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * projectsPerPage,
        currentPage * projectsPerPage
    );

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTags, currentTheme]);

    const clearSearch = async () => {
        setSearchQuery('');
        setActiveTags([]);
        setSelectedColors([]);
        setSearchMode('all');
        setHasSearched(false);
        setCurrentPage(1);
        // This will trigger the initial fetch in the useEffect
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
        handleSearch,
        handleModeChange,
        allTags,
        isLoading,
        error,
        themes,
        currentPage,
        setCurrentPage,
        projectsPerPage,
        totalPages,
        paginatedProjects,
        searchMode,
        setSearchMode,
        selectedColors,
        setSelectedColors,
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
