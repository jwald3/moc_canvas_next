import React, { useState, useEffect } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Search,
    X,
    Bookmark,
} from "lucide-react";
import type { Project } from "@/types/project";

// Move sample data to a separate file
import { projects, savedProjects } from "./sample-data";

interface ProjectCardProps {
    project: Project | null;
    isSaved?: boolean;
    onProjectClick: (id: number | React.MouseEvent) => void;
    onTagClick: (tag: string) => void;
    activeTag: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    isSaved,
    onProjectClick,
    onTagClick,
    activeTag,
}) => {
    if (project === null) {
        return (
            <div
                className="group flex flex-col justify-center items-center w-full h-full rounded-xl border-2 border-dashed border-indigo-300 mx-2 my-4 hover:border-indigo-500 cursor-pointer transition-all bg-gradient-to-br from-gray-50 to-indigo-50 hover:shadow-md"
                onClick={(e) => onProjectClick(e)}
            >
                <div className="bg-indigo-100 rounded-full p-5 mb-4 group-hover:bg-indigo-200 transition-colors">
                    <Plus size={32} className="text-indigo-600" />
                </div>
                <p className="text-indigo-700 font-medium text-lg">
                    Create New Project
                </p>
            </div>
        );
    }

    return (
        <div
            key={project.id}
            className="relative flex flex-col w-full rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg cursor-pointer mx-2 my-2 transition-all group"
            onClick={() => onProjectClick(project.id)}
        >
            <div className="relative aspect-[3/2] w-full overflow-hidden">
                <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70 p-4 flex flex-col justify-between">
                    <h3 className="text-white font-semibold text-xl">
                        {project.name}
                    </h3>

                    <div className="flex flex-wrap">
                        {project.tags.map((tag, index) => (
                            <span
                                key={index}
                                className={`${
                                    activeTag === tag
                                        ? "bg-indigo-600"
                                        : "bg-black/40"
                                } text-white text-xs px-2 py-1 rounded mr-1 mb-1 cursor-pointer hover:bg-indigo-600`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTagClick(tag);
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="px-3 py-2.5 flex justify-between items-center bg-white">
                <div>
                    {isSaved && <p className="text-sm mb-1">{project.owner}</p>}
                    <p className="text-xs text-gray-500">
                        Updated {project.lastUpdated}
                    </p>
                </div>
                <button
                    className="py-1 px-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        onProjectClick(project.id);
                    }}
                >
                    <span className="flex items-center">
                        <span className="text-xs font-medium">View</span>
                        <ChevronRight size={12} className="ml-1" />
                    </span>
                </button>
            </div>
        </div>
    );
};

export const ProjectsDashboard = () => {
    // State with proper typing
    const [myProjectsStartIndex, setMyProjectsStartIndex] = useState<number>(0);
    const [savedProjectsStartIndex, setSavedProjectsStartIndex] =
        useState<number>(0);
    const [showAllMyProjects, setShowAllMyProjects] = useState<boolean>(false);
    const [showAllSavedProjects, setShowAllSavedProjects] =
        useState<boolean>(false);
    const [cardsPerView, setCardsPerView] = useState<number>(3);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [activeTag, setActiveTag] = useState<string>("");

    // Update type definitions for functions
    const filterProjects = (projectsList: Project[]): Project[] => {
        return projectsList.filter((project) => {
            const matchesSearch =
                searchQuery === "" ||
                project.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                project.tags.some((tag) =>
                    tag.toLowerCase().includes(searchQuery.toLowerCase())
                );

            const matchesTag =
                activeTag === "" ||
                project.tags.some(
                    (tag) => tag.toLowerCase() === activeTag.toLowerCase()
                );

            return matchesSearch && matchesTag;
        });
    };

    // Filtered projects
    const filteredMyProjects = filterProjects(projects);
    const filteredSavedProjects = filterProjects(savedProjects);

    const navigateCarousel = (
        direction: "next" | "prev",
        carouselType: "my" | "saved"
    ): void => {
        const projectsList =
            carouselType === "my" ? filteredMyProjects : filteredSavedProjects;
        const maxIndex = Math.max(0, projectsList.length - (cardsPerView - 1));

        if (carouselType === "my") {
            if (direction === "next") {
                setMyProjectsStartIndex((prevIndex) =>
                    prevIndex >= maxIndex ? 0 : prevIndex + 1
                );
            } else {
                setMyProjectsStartIndex((prevIndex) =>
                    prevIndex <= 0 ? maxIndex : prevIndex - 1
                );
            }
        } else {
            if (direction === "next") {
                setSavedProjectsStartIndex((prevIndex) =>
                    prevIndex >= maxIndex ? 0 : prevIndex + 1
                );
            } else {
                setSavedProjectsStartIndex((prevIndex) =>
                    prevIndex <= 0 ? maxIndex : prevIndex - 1
                );
            }
        }
    };

    const handleProjectClick = (idOrEvent: number | React.MouseEvent): void => {
        if (typeof idOrEvent === "number") {
            alert(`Navigating to project ${idOrEvent}`);
        } else {
            handleCreateProject(idOrEvent);
        }
    };

    const handleCreateProject = (e: React.MouseEvent | number): void => {
        if (typeof e !== "number") {
            e.stopPropagation();
        }
        alert("Creating a new project");
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(e.target.value);
        setMyProjectsStartIndex(0);
        setSavedProjectsStartIndex(0);
    };

    const handleTagClick = (tag: string): void => {
        if (activeTag === tag) {
            setActiveTag("");
        } else {
            setActiveTag(tag);
            setSearchQuery("");
        }
        setMyProjectsStartIndex(0);
        setSavedProjectsStartIndex(0);
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setIsMobile(true);
                setCardsPerView(1);
            } else if (width < 1024) {
                setIsMobile(false);
                setCardsPerView(2);
            } else {
                setIsMobile(false);
                setCardsPerView(3);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Add these computed values before the return statement
    const visibleMyProjectsDesktop = filteredMyProjects.slice(
        myProjectsStartIndex,
        myProjectsStartIndex + cardsPerView
    );

    const visibleSavedProjectsDesktop = filteredSavedProjects.slice(
        savedProjectsStartIndex,
        savedProjectsStartIndex + cardsPerView
    );

    // Add this function after filterProjects
    const getAllTags = (): string[] => {
        const allTags = new Set<string>();
        [...projects, ...savedProjects].forEach((project) => {
            project.tags.forEach((tag) => {
                allTags.add(tag);
            });
        });
        return Array.from(allTags).sort();
    };

    // Add this before return statement
    const allTags = getAllTags();
    const clearSearch = () => {
        setSearchQuery("");
        setActiveTag("");
    };

    // Add these for mobile view
    const visibleMyProjects = showAllMyProjects
        ? filteredMyProjects
        : filteredMyProjects.slice(0, 3);
    const visibleSavedProjects = showAllSavedProjects
        ? filteredSavedProjects
        : filteredSavedProjects.slice(0, 3);

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 px-2">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">
                            Project Dashboard
                        </h1>
                        <p className="text-sm text-gray-600">
                            Manage and track all your projects in one place
                        </p>
                    </div>
                    <button
                        className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center transition-all shadow-sm"
                        onClick={handleCreateProject}
                    >
                        <Plus size={18} className="mr-2" />
                        Add New Project
                    </button>
                </div>

                <div className="mb-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search projects by name or tag..."
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        {searchQuery && (
                            <button
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setSearchQuery("")}
                            >
                                <X
                                    size={18}
                                    className="text-gray-400 hover:text-gray-600"
                                />
                            </button>
                        )}
                    </div>
                </div>

                {/* Add the tags filter section after the search input */}
                <div className="mt-3 flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            className={`text-xs px-2 py-1 rounded-md ${
                                activeTag === tag
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                            onClick={() => handleTagClick(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                    {activeTag && (
                        <button
                            className="text-xs px-2 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200 flex items-center"
                            onClick={() => setActiveTag("")}
                        >
                            Clear Filter <X size={12} className="ml-1" />
                        </button>
                    )}
                </div>

                {/* Add empty states for both sections */}
                {filteredMyProjects.length === 0 &&
                (searchQuery || activeTag) ? (
                    <div className="bg-white rounded-lg p-6 shadow-sm text-center border border-gray-200 mb-6">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Search size={24} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                            No matching projects found
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Try adjusting your search or filters to find what
                            you're looking for.
                        </p>
                        <button
                            className="text-indigo-600 font-medium hover:text-indigo-800"
                            onClick={clearSearch}
                        >
                            Clear search and filters
                        </button>
                    </div>
                ) : null}

                {/* Desktop View */}
                <div className={`${isMobile ? 'hidden' : 'block'} relative mb-6`}>
                    {filteredMyProjects.length > 0 && (
                        <>
                            <button
                                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 text-indigo-700 transition-all border border-gray-100"
                                onClick={() => navigateCarousel("prev", "my")}
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className="overflow-hidden px-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                                    {visibleMyProjectsDesktop.map(
                                        (project, index) => (
                                            <div
                                                key={
                                                    project?.id ||
                                                    `create-${index}`
                                                }
                                            >
                                                <ProjectCard
                                                    project={project}
                                                    onProjectClick={
                                                        handleProjectClick
                                                    }
                                                    onTagClick={handleTagClick}
                                                    activeTag={activeTag}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            <button
                                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 text-indigo-700 transition-all border border-gray-100"
                                onClick={() => navigateCarousel("next", "my")}
                            >
                                <ChevronRight size={20} />
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile View */}
                <div className={`${isMobile ? 'block' : 'hidden'} space-y-4`}>
                    {visibleMyProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onProjectClick={handleProjectClick}
                            onTagClick={handleTagClick}
                            activeTag={activeTag}
                        />
                    ))}
                </div>

                {/* Create New Project Card */}
                <div className="my-8 px-2">
                    <div className="max-w-sm mx-auto">
                        <ProjectCard
                            project={null}
                            onProjectClick={handleCreateProject}
                            onTagClick={handleTagClick}
                            activeTag={activeTag}
                        />
                    </div>
                </div>

                {/* Saved Projects Section */}
                {filteredSavedProjects.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">
                            Saved Projects
                        </h2>
                        <div
                            className={`${
                                isMobile ? "hidden" : "block"
                            } relative`}
                        >
                            <button
                                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 text-indigo-700 transition-all border border-gray-100"
                                onClick={() =>
                                    navigateCarousel("prev", "saved")
                                }
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className="overflow-hidden px-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                                    {visibleSavedProjectsDesktop.map(
                                        (project) => (
                                            <ProjectCard
                                                key={project.id}
                                                project={project}
                                                isSaved
                                                onProjectClick={
                                                    handleProjectClick
                                                }
                                                onTagClick={handleTagClick}
                                                activeTag={activeTag}
                                            />
                                        )
                                    )}
                                </div>
                            </div>

                            <button
                                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 text-indigo-700 transition-all border border-gray-100"
                                onClick={() =>
                                    navigateCarousel("next", "saved")
                                }
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Mobile View for Saved Projects */}
                        <div
                            className={`${
                                isMobile ? "block" : "hidden"
                            } space-y-4`}
                        >
                            {visibleSavedProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    isSaved
                                    onProjectClick={handleProjectClick}
                                    onTagClick={handleTagClick}
                                    activeTag={activeTag}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
