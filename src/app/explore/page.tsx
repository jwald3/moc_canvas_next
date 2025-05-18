'use client';

import React, { useState, Suspense } from 'react';
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
} from 'lucide-react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectListItem } from '@/components/projects/ProjectListItem';
import { projects, themes } from '@/data/seed-data';
import ExploreHeader from '@/components/explore/exploreHeader';
import ExploreThemeTray from '@/components/explore/exploreThemeTray';
import ExploreProjectsResultsTray from '@/components/explore/exploreProjectsResultsTray';
// Add this mapping object near the top of the file, after the imports


// Only keep the getAllTags helper function outside
const getAllTags = () => {      
    const tagSet = new Set<string>();
    projects.forEach(project => {
        project.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
};

const allTags = getAllTags();

const ExplorePageContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentTheme = searchParams.get('theme') || 'all';
    
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Move all handlers and filtering logic here
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

    return (
        <div className="min-h-screen bg-theme-gradient p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <ExploreHeader filteredProjects={filteredProjects} />

                {/* Theme Selection */}
                <ExploreThemeTray themes={themes} currentTheme={currentTheme} handleThemeChange={handleThemeChange} />

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
                <ExploreProjectsResultsTray 
                    filteredProjects={filteredProjects}
                    viewMode={viewMode}
                    handleProjectClick={handleProjectClick}
                    handleTagClick={handleTagClick}
                    activeTags={activeTags}
                    clearSearch={clearSearch}
                />
            </div>
        </div>
    );
};

// Main page component with Suspense boundary
const ExplorePage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-theme-gradient p-4 sm:p-6">
                <div className="max-w-7xl mx-auto">
                    Loading...
                </div>
            </div>
        }>
            <ExplorePageContent />
        </Suspense>
    );
};

export default ExplorePage;
