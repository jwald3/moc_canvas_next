import React from 'react';
import Image from 'next/image';
import type { ProjectObject } from '@/types/hand_spun_datatypes';
import { formatRelativeTime } from '@/utils/dateUtils';
import { Clock } from 'lucide-react';

interface ProjectListItemProps {
    project: ProjectObject;
    isSaved?: boolean;
    onProjectClick: (id: string) => void;
    onTagClick: (tag: string) => void;
    activeTags: string[];
}

export const ProjectListItem: React.FC<ProjectListItemProps> = ({
    project,
    isSaved,
    onProjectClick,
    onTagClick,
    activeTags,
}) => {
    return (
        <div 
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden flex border border-gray-100 hover:border-[#da5249]"
            onClick={() => onProjectClick(project.id)}
        >
            <div className="w-48 h-32 flex-shrink-0 relative overflow-hidden">
                <Image
                    src={project?.mainImage?.url || "/images/app-image-demo.jpg"}
                    alt={project?.title || "Project Image"}
                    fill
                    className="object-cover"
                    onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = "/images/app-image-demo.jpg";
                    }}
                />
            </div>
            
            <div className="flex-grow p-4 flex flex-col justify-between">
                <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="min-w-0 flex-grow">
                            <h3 className="font-semibold text-gray-800 text-lg mb-1">{project?.title}</h3>
                            <div className="flex items-center gap-2 text-gray-500">
                                <Clock size={14} />
                                <span className="text-sm">
                                    {formatRelativeTime(project?.updatedAt || new Date())}
                                </span>
                            </div>
                            {isSaved && <p className="text-sm text-gray-600 mt-1">{project?.owner}</p>}
                        </div>
                        
                        <button
                            className="py-2 px-6 bg-[#da5249] hover:bg-[#c54940] text-white rounded-full transition-all 
                            shadow-sm hover:shadow-md text-sm font-medium flex-shrink-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                onProjectClick(project.id);
                            }}
                        >
                            View
                        </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string) => (
                            <button
                                key={tag}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTagClick(tag);
                                }}
                                className={`text-sm px-3 py-1 rounded-full transition-colors ${
                                    activeTags.includes(tag)
                                        ? 'bg-[#da5249] text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}; 