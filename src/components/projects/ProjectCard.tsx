import React, { useState, useEffect } from 'react';
import type { Project } from '@/types/project';

interface ProjectCardProps {
    project: Project;
    isSaved?: boolean;
    onProjectClick: (id: number) => void;
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
    if (days >= 21) return "3 weeks ago";
    if (days >= 14) return "2 weeks ago";
    if (days >= 7) return "1 week ago";
    if (days >= 1) return `${days} day${days > 1 ? 's' : ''} ago`;
    
    // Hours
    const hours = Math.floor(diffInSeconds / SECONDS_IN.hour);
    if (hours >= 1) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    
    // Minutes
    const minutes = Math.floor(diffInSeconds / SECONDS_IN.minute);
    if (minutes >= 1) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    
    return "Just now";
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    isSaved,
    onProjectClick,
    onTagClick,
    activeTag,
}) => {
    const [maxChars, setMaxChars] = useState(40);

    useEffect(() => {
        const updateMaxChars = () => {
            if (window.innerWidth < 640) {
                setMaxChars(60);
            } else {
                setMaxChars(40);
            }
        };

        updateMaxChars();
        window.addEventListener('resize', updateMaxChars);
        return () => window.removeEventListener('resize', updateMaxChars);
    }, []);

    const ELLIPSIS_LENGTH = 4; // "+ N "
    
    const getVisibleTags = (tags: string[]) => {
        let totalLength = 0;
        let visibleTags: string[] = [];
        
        for (let i = 0; i < tags.length; i++) {
            const tag = tags[i];
            if (totalLength + tag.length + (i > 0 ? 1 : 0) <= maxChars - ELLIPSIS_LENGTH) {
                visibleTags.push(tag);
                totalLength += tag.length + (i > 0 ? 1 : 0); // Add 1 for spacing
            } else {
                break;
            }
        }
        
        return {
            visibleTags,
            hiddenCount: tags.length - visibleTags.length
        };
    };

    const { visibleTags, hiddenCount } = getVisibleTags(project.tags);

    return (
        <div
            className="relative flex flex-col w-full rounded-lg overflow-hidden bg-white hover:shadow-xl cursor-pointer transition-all group border-2 border-orange-300 card-shadow card-shadow-hover"
            onClick={() => onProjectClick(project.id)}
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
                        {visibleTags.map((tag, index) => (
                            <span
                                key={index}
                                className={`${
                                    activeTag === tag
                                        ? "bg-card-gradient text-white shadow-md"
                                        : "bg-white/90 text-orange-700 hover:bg-orange-500 hover:text-white"
                                } text-xs px-2 py-1 rounded-full mr-1 mb-1 cursor-pointer transition-all`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTagClick(tag);
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                        {hiddenCount > 0 && (
                            <span
                                className="bg-black/40 text-white text-xs px-2 py-1 rounded-full mr-1 mb-1 cursor-pointer hover:bg-orange-500 transition-all backdrop-blur-sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    alert(`Additional tags: ${project.tags.slice(visibleTags.length).join(', ')}`);
                                }}
                            >
                                +{hiddenCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="px-4 py-3 flex justify-between items-center bg-gradient-to-br from-white to-orange-50">
                <div>
                    {isSaved && <p className="text-sm mb-1 text-gray-700">{project.owner}</p>}
                    <p className="text-xs text-gray-500">
                        Updated {formatRelativeTime(project.lastUpdated)}
                    </p>
                </div>
                <button
                    className="py-1.5 px-4 bg-card-gradient hover-gradient text-white rounded-full transition-all shadow-sm hover:shadow-md flex items-center space-x-1 group"
                    onClick={(e) => {
                        e.stopPropagation();
                        onProjectClick(project.id);
                    }}
                >
                    <span className="text-xs font-medium">View</span>
                </button>
            </div>
        </div>
    );
}; 