import React, { useState, useEffect } from 'react';
import type { ProjectObject } from '@/types/hand_spun_datatypes';
import { formatRelativeTime } from '@/utils/dateUtils';
import { Star } from 'lucide-react';

interface ProjectCardProps {
    project: ProjectObject;
    isSaved?: boolean;
    onProjectClick: (id: string) => void;
    onTagClick: (tag: string) => void;
    activeTags: string[];
    onSaveToggle?: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    isSaved,
    onProjectClick,
    onTagClick,
    activeTags,
    onSaveToggle,
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
        const visibleTags: string[] = [];
        
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
            onClick={(e) => {
                console.log("ProjectCard clicked", project.id);

                
                e.preventDefault();
                onProjectClick(project.id);
            }}
        >
            {onSaveToggle && (
                <button
                    className="absolute top-2 right-2 z-20 p-2 transition-all hover:scale-110 group/star"
                    onClick={(e) => {
                        e.stopPropagation();
                        onSaveToggle(project.id);
                    }}
                    title={isSaved ? "Unsave Project" : "Save Project"}
                >
                    <Star 
                        size={24} 
                        className={`
                            transition-all drop-shadow-md
                            ${isSaved 
                                ? 'fill-orange-500 text-orange-500' 
                                : 'fill-transparent text-white group-hover/star:text-orange-500'
                            }
                        `}
                    />
                </button>
            )}

            <div className="relative aspect-[3/2] w-full overflow-hidden">
                <img
                    src={project.mainImage?.url || "/images/app-image-demo.jpg"}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = "/images/app-image-demo.jpg";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80 p-4 flex flex-col justify-between">
                    <h3 className="text-white font-bold text-xl drop-shadow-md">
                        {project.title}
                    </h3>

                    <div className="flex flex-wrap">
                        {visibleTags.map((tag, index) => (
                            <span
                                key={index}
                                className={`${
                                    activeTags.includes(tag)
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
                        Updated {formatRelativeTime(project.updatedAt)}
                    </p>
                </div>
                <button
                    className="py-1.5 px-4 bg-card-gradient hover-gradient text-white rounded-full transition-all shadow-sm hover:shadow-md flex items-center space-x-1 group"
                    onClick={(e) => {
                        e.preventDefault();
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