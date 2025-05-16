'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { projects, savedProjects } from '@/data/sample-data';
import NoProjectsFound from '@/components/projectsAll/noProjectsFound';
import AllProjectsGrid from '@/components/projectsAll/allProjectsGrid';
import AllProjectsList from '@/components/projectsAll/allProjectsList';
import AllProjectsHeader from '@/components/projectsAll/allProjectsHeader';
import AllProjectsControls from '@/components/projectsAll/allProjectsControls';

const AllProjectsPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentView = searchParams.get('view') as 'my' | 'saved' || 'my';
    
    // State
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Get the correct project list based on view type
    const projectsList = currentView === 'saved' ? savedProjects : projects;

    // Get all unique tags
    const getAllTags = () => {
        const tagSet = new Set<string>();
        projectsList.forEach(project => {
            project.tags.forEach(tag => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
    };

    const allTags = getAllTags();

    // Filter projects
    const filteredProjects = projectsList.filter(project => {
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

    const handleCreateProject = () => {
        router.push('/projects/new');
    };

    const handleProjectClick = (id: number) => {
        alert(`Navigating to project ${id}`);
    };

    return (
        <div className="min-h-screen bg-theme-gradient p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <AllProjectsHeader
                    currentView={currentView}
                    handleCreateProject={handleCreateProject}
                    filteredProjects={filteredProjects}
                />

                {/* Search and Filters */}
                <AllProjectsControls
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    clearSearch={clearSearch}
                    allTags={allTags}
                    activeTags={activeTags}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    handleTagClick={handleTagClick}
                />

                {/* Projects Grid/List */}
                {viewMode === 'grid' ? (
                    <AllProjectsGrid
                        filteredProjects={filteredProjects}
                        currentView={currentView}
                        handleProjectClick={handleProjectClick}
                        handleTagClick={handleTagClick}
                        activeTags={activeTags}
                    />
                ) : (
                    <AllProjectsList
                        filteredProjects={filteredProjects}
                        currentView={currentView}
                        handleProjectClick={handleProjectClick}
                        handleTagClick={handleTagClick}
                        activeTags={activeTags}
                    />
                )}

                {filteredProjects.length === 0 && (
                    <NoProjectsFound clearSearch={clearSearch} />
                )}
            </div>
        </div>
    );
};

export default AllProjectsPage; 