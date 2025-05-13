'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ChevronLeft,
    Search,
    X,
    Plus,
    Grid,
    List
} from 'lucide-react';
import type { Project } from '@/types/project';
import { projects, savedProjects } from '@/components/projects/sample-data';

const AllProjectsPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const viewType = searchParams.get('view') || 'my';
    
    // State
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTag, setActiveTag] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    
    // Get the correct project list based on view type
    const projectsList = viewType === 'saved' ? savedProjects : projects;

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
        
        const matchesTag = !activeTag ||
            project.tags.some(tag => 
                tag.toLowerCase() === activeTag.toLowerCase()
            );
        
        return matchesSearch && matchesTag;
    });

    // Handlers
    const clearSearch = () => {
        setSearchQuery('');
        setActiveTag('');
    };

    const handleTagClick = (tag: string) => {
        setActiveTag(activeTag === tag ? '' : tag);
    };

    const handleCreateProject = () => {
        alert('Creating a new project');
    };

    const handleProjectClick = (id: number) => {
        alert(`Navigating to project ${id}`);
    };

    // Project Card Component
    const ProjectCard = ({ project }: { project: Project }) => (
        <div
            key={project.id}
            className="relative flex flex-col w-full rounded-lg overflow-hidden bg-white hover:shadow-xl cursor-pointer transition-all group border-2 border-orange-300 card-shadow card-shadow-hover"
            onClick={() => handleProjectClick(project.id)}
        >
            <div className="relative aspect-[3/2] w-full overflow-hidden">
                <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80 p-4 flex flex-col justify-between">
                    <h3 className="text-white font-bold text-xl drop-shadow-md">
                        {project.name}
                    </h3>

                    <div className="flex flex-wrap">
                        {project.tags.map((tag, index) => (
                            <span
                                key={index}
                                className={`${
                                    activeTag === tag
                                        ? "bg-card-gradient text-white shadow-md"
                                        : "bg-white/90 text-orange-700 hover:bg-orange-500 hover:text-white"
                                } text-xs px-2 py-1 rounded-full mr-1 mb-1 cursor-pointer transition-all`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleTagClick(tag);
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="px-4 py-3 flex justify-between items-center bg-gradient-to-br from-white to-orange-50">
                <p className="text-xs text-gray-500">
                    Updated {project.lastUpdated}
                </p>
                <button
                    className="py-1.5 px-4 bg-card-gradient hover-gradient text-white rounded-full transition-all shadow-sm hover:shadow-md flex items-center space-x-1 group"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(project.id);
                    }}
                >
                    <span className="text-xs font-medium">View</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-theme-gradient p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div className="flex items-center">
                        <Link
                            href="/projects"
                            className="mr-3 p-2 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <ChevronLeft size={20} className="text-orange-800" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-1">
                                {viewType === 'saved' ? 'Saved Projects' : 'My Projects'}
                            </h1>
                            <p className="text-sm text-gray-600">
                                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>
                    <button
                        className="mt-4 sm:mt-0 bg-card-gradient hover-gradient text-white px-4 py-2 rounded-full flex items-center transition-all shadow-md hover:shadow-lg font-semibold text-shadow"
                        onClick={handleCreateProject}
                    >
                        <Plus size={18} className="mr-2" />
                        Add New Project
                    </button>
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
                    <div className="flex flex-col sm:flex-row justify-between mt-4 space-y-3 sm:space-y-0">
                        <div className="flex flex-wrap gap-2">
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                                        activeTag === tag
                                            ? "bg-card-gradient text-white shadow-md"
                                            : "bg-white border-2 border-orange-400 text-orange-700 hover:bg-orange-500 hover:text-white"
                                    }`}
                                    onClick={() => handleTagClick(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center space-x-2">
                            <div className="bg-white rounded-full shadow-sm border-2 border-orange-300">
                                <button 
                                    className={`px-3 py-1.5 text-sm rounded-l-full ${
                                        viewMode === 'grid' 
                                            ? 'bg-card-gradient text-white' 
                                            : 'text-orange-700 hover:bg-orange-50'
                                    }`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <Grid size={16} />
                                </button>
                                <button 
                                    className={`px-3 py-1.5 text-sm rounded-r-full ${
                                        viewMode === 'list' 
                                            ? 'bg-card-gradient text-white' 
                                            : 'text-orange-700 hover:bg-orange-50'
                                    }`}
                                    onClick={() => setViewMode('list')}
                                >
                                    <List size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {filteredProjects.length === 0 && (
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

export default AllProjectsPage; 