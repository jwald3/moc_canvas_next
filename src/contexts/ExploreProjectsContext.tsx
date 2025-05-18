import { useSearchParams } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { projects, themes } from '@/data/seed-data';
import { ProjectObject } from '@/types/hand_spun_datatypes';

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
}

const ExploreProjectsContext = createContext<ExploreProjectsContextType | undefined>(undefined);

// Helper function to get all unique tags
const getAllTags = () => {      
    const tagSet = new Set<string>();
    projects.forEach(project => {
        project.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
};

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
        router.push(`/explore?theme=${themeId}`);
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
        allTags: getAllTags(),
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
