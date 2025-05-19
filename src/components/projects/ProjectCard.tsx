import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden border-2 border-slate-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            onClick={(e) => {
                e.preventDefault();
                onProjectClick(project.id);
            }}
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/20 via-[#da5249]/20 to-[#4a9eff]/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                <Image
                    src={project.mainImage?.url || "/images/app-image-demo.jpg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = "/images/app-image-demo.jpg";
                    }}
                />
                {onSaveToggle && (
                    <button
                        className="absolute top-4 right-4 z-20 p-2 transition-all hover:scale-110 group/star"
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
                                    ? 'fill-[#da5249] text-[#da5249]' 
                                    : 'fill-transparent text-white group-hover/star:text-[#da5249]'
                                }
                            `}
                        />
                    </button>
                )}
            </div>
            
            <div className="p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                        <h3 className="font-bold text-slate-800 mb-2 group-hover:text-[#da5249] transition-colors">
                            {project.title}
                        </h3>
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                            {isSaved && <p className="text-sm text-gray-700">{project.owner}</p>}
                            <p className="text-xs text-gray-500">
                                Updated {formatRelativeTime(project.updatedAt)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1">
                    {visibleTags.map((tag, index) => (
                        <span
                            key={index}
                            className={`${
                                activeTags.includes(tag)
                                    ? "bg-[#da5249] text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-[#da5249] hover:text-white"
                            } text-xs px-2 py-1 rounded-full cursor-pointer transition-all`}
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
                            className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-[#da5249] hover:text-white transition-all"
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
    );
}; 