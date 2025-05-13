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

const formatRelativeTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    // Future dates should show as "Just now"
    if (diffInSeconds < 0) return "Just now";
    
    const SECONDS_IN = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    
    const days = Math.floor(diffInSeconds / SECONDS_IN.day);
    const years = Math.floor(diffInSeconds / SECONDS_IN.year);
    const months = Math.floor(diffInSeconds / SECONDS_IN.month);

    // Years
    if (years >= 2) return `more than ${years} years ago`;
    if (years === 1) return "1 year ago";
    
    // Months
    if (months >= 1) return `${months} month${months > 1 ? 's' : ''} ago`;
    
    // Weeks and Days
    if (days >= 30) return "30 days ago";
    if (days >= 29) return "29 days ago";
    if (days >= 28) return "4 weeks ago";
    if (days >= 27) return "27 days ago";
    if (days >= 26) return "26 days ago";
    if (days >= 25) return "25 days ago";
    if (days >= 24) return "24 days ago";
    if (days >= 23) return "23 days ago";
    if (days >= 22) return "22 days ago";
    if (days >= 21) return "3 weeks ago";
    if (days >= 20) return "20 days ago";
    if (days >= 19) return "19 days ago";
    if (days >= 18) return "18 days ago";
    if (days >= 17) return "17 days ago";
    if (days >= 16) return "16 days ago";
    if (days >= 15) return "15 days ago";
    if (days >= 14) return "2 weeks ago";
    if (days >= 13) return "13 days ago";
    if (days >= 12) return "12 days ago";
    if (days >= 11) return "11 days ago";
    if (days >= 10) return "10 days ago";
    if (days >= 9) return "9 days ago";
    if (days >= 8) return "8 days ago";
    if (days >= 7) return "1 week ago";
    if (days >= 6) return "6 days ago";
    if (days >= 5) return "5 days ago";
    if (days >= 4) return "4 days ago";
    if (days >= 3) return "3 days ago";
    if (days >= 2) return "2 days ago";
    if (days >= 1) return "1 day ago";
    
    // Hours
    const hours = Math.floor(diffInSeconds / SECONDS_IN.hour);
    if (hours >= 1) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    
    // Minutes
    const minutes = Math.floor(diffInSeconds / SECONDS_IN.minute);
    if (minutes >= 1) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    
    return "Just now";
};

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
                        Updated {formatRelativeTime(project.lastUpdated)}
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

// First, add a "View All" button component for reuse
const ViewAllButton = ({ onClick }: { onClick: () => void }) => (
    <button
        onClick={onClick}
        className="w-full mt-4 py-2 text-center text-indigo-600 font-medium hover:text-indigo-800 border border-dashed border-indigo-300 rounded-lg hover:border-indigo-500 transition-all"
    >
        See More
    </button>
);

// Add these types at the top of the file
type SortOption = {
    label: string;
    value: keyof Project | 'tagCount';
    direction: 'asc' | 'desc';
};

const sortOptions: SortOption[] = [
    { label: 'Recently Updated', value: 'lastUpdated', direction: 'desc' },
    { label: 'Project Name (A-Z)', value: 'name', direction: 'asc' },
    { label: 'Project Name (Z-A)', value: 'name', direction: 'desc' },
    { label: 'Most Tags', value: 'tagCount', direction: 'desc' },
    { label: 'Least Tags', value: 'tagCount', direction: 'asc' },
];

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
    const [currentSort, setCurrentSort] = useState<SortOption>(sortOptions[0]);

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

    // Add sorting function
    const sortProjects = (projects: Project[]): Project[] => {
        return [...projects].sort((a, b) => {
            if (currentSort.value === 'tagCount') {
                const comparison = a.tags.length - b.tags.length;
                return currentSort.direction === 'asc' ? comparison : -comparison;
            }
            
            if (currentSort.value === 'lastUpdated') {
                const aDate = new Date(a.lastUpdated).getTime();
                const bDate = new Date(b.lastUpdated).getTime();
                const comparison = bDate - aDate;
                return currentSort.direction === 'asc' ? -comparison : comparison;
            }

            const aValue = a[currentSort.value];
            const bValue = b[currentSort.value];
            
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                const comparison = aValue.localeCompare(bValue);
                return currentSort.direction === 'asc' ? comparison : -comparison;
            }
            return 0;
        });
    };

    // Modify the filtered projects to include sorting
    const filteredMyProjects = sortProjects(filterProjects(projects));
    const filteredSavedProjects = sortProjects(filterProjects(savedProjects));

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
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-grow">
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
                                    <X size={18} className="text-gray-400 hover:text-gray-600" />
                                </button>
                            )}
                        </div>

                        <select
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 sm:w-48"
                            value={`${currentSort.value}-${currentSort.direction}`}
                            onChange={(e) => {
                                const option = sortOptions.find(
                                    opt => `${opt.value}-${opt.direction}` === e.target.value
                                );
                                if (option) setCurrentSort(option);
                            }}
                        >
                            {sortOptions.map((option) => (
                                <option 
                                    key={`${option.value}-${option.direction}`}
                                    value={`${option.value}-${option.direction}`}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
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
                            <h2 className="text-xl font-bold text-gray-800 mb-6 mt-8">
                                My Projects
                            </h2>
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

                {/* Mobile View - My Projects */}
                <div className={`${isMobile ? 'block' : 'hidden'} space-y-4`}>
                    <h2 className="text-xl font-bold text-gray-800 mb-6 mt-8">
                        My Projects
                    </h2>
                    {visibleMyProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onProjectClick={handleProjectClick}
                            onTagClick={handleTagClick}
                            activeTag={activeTag}
                        />
                    ))}
                    {!showAllMyProjects && filteredMyProjects.length > 3 && (
                        <ViewAllButton onClick={() => setShowAllMyProjects(true)} />
                    )}
                </div>

                {/* Create New Project Card */}
                <div className="my-8 px-2">
                    <div 
                        onClick={handleCreateProject}
                        className="cursor-pointer w-full max-w-sm border-2 border-dashed border-indigo-300 rounded-xl py-8 hover:border-indigo-500 transition-all group bg-white hover:bg-indigo-50"
                    >
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="bg-indigo-100 rounded-full p-4 group-hover:bg-indigo-200 transition-colors">
                                <Plus size={24} className="text-indigo-600" />
                            </div>
                            <span className="text-indigo-700 font-medium text-lg">
                                Create New Project
                            </span>
                        </div>
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

                        {/* Mobile View - Saved Projects */}
                        <div className={`${isMobile ? 'block' : 'hidden'} space-y-4 mt-12`}>
                            <h2 className="text-xl font-bold text-gray-800 mb-6">
                                Saved Projects
                            </h2>
                            {visibleSavedProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onProjectClick={handleProjectClick}
                                    onTagClick={handleTagClick}
                                    activeTag={activeTag}
                                    isSaved
                                />
                            ))}
                            {!showAllSavedProjects && filteredSavedProjects.length > 3 && (
                                <ViewAllButton onClick={() => setShowAllSavedProjects(true)} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
