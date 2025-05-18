'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { projects, themes } from '@/data/seed-data';
import ExploreHeader from '@/components/explore/exploreHeader';
import ExploreThemeTray from '@/components/explore/exploreThemeTray';
import ExploreProjectsResultsTray from '@/components/explore/exploreProjectsResultsTray';
import ExplorePageControls from '@/components/explore/explorePageControls';

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
                <ExplorePageControls
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    clearSearch={clearSearch}
                    allTags={allTags}
                    activeTags={activeTags}
                    handleTagClick={handleTagClick}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />

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
