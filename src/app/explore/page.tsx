'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ChevronLeft,
    Search,
    X,
    Grid,
    List,
    Star,
    TrendingUp,
    Gift,
    Users,
    BookOpen,
    Trophy,
    Plus
} from 'lucide-react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectListItem } from '@/components/projects/ProjectListItem';
import { projects } from '@/components/projects/sample-data';

// Theme definitions with icons and colors
const themes = [
    { 
        id: 'all',
        name: 'All Themes', 
        icon: <TrendingUp size={20} />,
        color: 'from-blue-500 to-purple-600',
        description: 'Explore projects across all LEGO® themes'
    },
    { 
        id: 'star-wars',
        name: 'Star Wars', 
        icon: <Star size={20} />,
        color: 'from-blue-500 to-purple-600',
        description: 'From a galaxy far, far away - Star Wars LEGO® builds'
    },
    { 
        id: 'technic',
        name: 'Technic', 
        icon: <Gift size={20} />,
        color: 'from-red-500 to-yellow-500',
        description: 'Complex mechanical builds and engineering marvels'
    },
    { 
        id: 'city',
        name: 'City', 
        icon: <Users size={20} />,
        color: 'from-green-500 to-teal-500',
        description: 'Urban builds and everyday LEGO® adventures'
    },
    { 
        id: 'ideas',
        name: 'Ideas', 
        icon: <BookOpen size={20} />,
        color: 'from-purple-500 to-indigo-600',
        description: 'Fan-designed sets and creative concepts'
    },
    { 
        id: 'creator',
        name: 'Creator', 
        icon: <Trophy size={20} />,
        color: 'from-yellow-400 to-orange-500',
        description: '3-in-1 sets and creative building experiences'
    }
];

const ExplorePage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentTheme = searchParams.get('theme') || 'all';
    
    // State
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Get all unique tags
    const getAllTags = () => {
        const tagSet = new Set<string>();
        projects.forEach(project => {
            project.tags.forEach(tag => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
    };

    const allTags = getAllTags();

    // Filter projects
    const filteredProjects = projects.filter(project => {
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
        
        const matchesTheme = currentTheme === 'all' ||
            project.tags.some(tag => 
                tag.toLowerCase() === themes.find(t => t.id === currentTheme)?.name.toLowerCase()
            );
        
        return matchesSearch && matchesTags && matchesTheme;
    });

    // Handlers
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

    const handleProjectClick = (id: number) => {
        router.push(`/projects/${id}`);
    };

    return (
        <div className="min-h-screen bg-theme-gradient p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="mr-3 p-2 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <ChevronLeft size={20} className="text-orange-800" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Explore Projects</h1>
                            <p className="text-sm text-gray-600">
                                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                            </p>
                        </div>
                    </div>
                </div>

                {/* Theme Selection */}
                <div className="mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {themes.map(theme => (
                            <button
                                key={theme.id}
                                onClick={() => handleThemeChange(theme.id)}
                                className={`relative group overflow-hidden rounded-xl p-4 transition-all ${
                                    currentTheme === theme.id
                                        ? 'bg-gradient-to-br ' + theme.color + ' text-white shadow-lg scale-[1.02]'
                                        : 'bg-white hover:bg-gray-50 text-gray-800 shadow'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${
                                        currentTheme === theme.id
                                            ? 'bg-white/20'
                                            : 'bg-gray-100'
                                    }`}>
                                        {theme.icon}
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold">{theme.name}</h3>
                                        <p className={`text-sm ${
                                            currentTheme === theme.id
                                                ? 'text-white/80'
                                                : 'text-gray-500'
                                        }`}>
                                            {theme.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="mb-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search projects by name or tag..."
                            className="w-full pl-10 pr-10 py-2.5 border-2 border-orange-400 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={clearSearch}
                            >
                                <X size={18} className="text-gray-400 hover:text-gray-600" />
                            </button>
                        )}
                    </div>

                    {/* Filters and View Toggle */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-3 sm:space-y-0">
                        <div className="flex flex-wrap gap-2 sm:max-w-[66%]">
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    className={`text-xs px-2 py-1 rounded-full transition-colors ${
                                        activeTags.includes(tag)
                                            ? "bg-card-gradient text-white shadow-sm"
                                            : "bg-white/90 border border-orange-300 text-orange-700 hover:bg-orange-500 hover:text-white"
                                    }`}
                                    onClick={() => handleTagClick(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center flex-shrink-0 ml-4">
                            <div className="bg-white rounded-full shadow-sm border-2 border-orange-300 overflow-hidden flex">
                                <button 
                                    className={`px-3 py-1.5 text-sm relative ${
                                        viewMode === 'grid' 
                                            ? 'bg-card-gradient text-white before:absolute before:inset-[-1px] before:bg-card-gradient' 
                                            : 'text-orange-700 hover:bg-orange-50'
                                    }`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <Grid size={16} className="relative z-10" />
                                </button>
                                <button 
                                    className={`px-3 py-1.5 text-sm relative ${
                                        viewMode === 'list' 
                                            ? 'bg-card-gradient text-white before:absolute before:inset-[-1px] before:bg-card-gradient' 
                                            : 'text-orange-700 hover:bg-orange-50'
                                    }`}
                                    onClick={() => setViewMode('list')}
                                >
                                    <List size={16} className="relative z-10" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects Grid/List */}
                {filteredProjects.length > 0 ? (
                    viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredProjects.map(project => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onProjectClick={handleProjectClick}
                                    onTagClick={handleTagClick}
                                    activeTags={activeTags}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-4">
                            {filteredProjects.map(project => (
                                <ProjectListItem
                                    key={project.id}
                                    project={project}
                                    onProjectClick={handleProjectClick}
                                    onTagClick={handleTagClick}
                                    activeTags={activeTags}
                                />
                            ))}
                        </div>
                    )
                ) : (
                    <div className="bg-white rounded-lg p-6 shadow-sm text-center border border-gray-200">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Search size={24} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                            No matching projects found
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Try adjusting your search or filters to find what you're looking for.
                        </p>
                        <button
                            className="text-orange-600 font-medium hover:text-orange-800"
                            onClick={clearSearch}
                        >
                            Clear search and filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExplorePage;
