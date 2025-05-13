import React from 'react';
import type { Project } from '@/types/project';
import { formatRelativeTime } from '@/utils/dateUtils';
import { Clock } from 'lucide-react';

interface ProjectListItemProps {
    project: Project;
    isSaved?: boolean;
    onProjectClick: (id: number) => void;
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
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden flex border border-orange-200 hover:border-orange-300"
            onClick={() => onProjectClick(project.id)}
        >
            <div className="w-40 h-28 flex-shrink-0 relative overflow-hidden">
                <img
                    src={project.image || "/images/app-image-demo.jpg"}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = "/images/app-image-demo.jpg";
                    }}
                />
            </div>
            
            <div className="flex-grow p-3 flex items-center justify-between">
                <div className="flex-grow pr-8 min-w-0">
                    <div className="flex items-start gap-4 mb-2">
                        <div className="min-w-0 flex-grow">
                            <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-gray-800 truncate">{project.name}</h3>
                                <span className="text-sm text-gray-500 flex-shrink-0 flex items-center gap-1">
                                    <Clock size={14} />
                                    {formatRelativeTime(project.lastUpdated)}
                                </span>
                            </div>
                            {isSaved && <p className="text-sm text-gray-600 mt-0.5">{project.owner}</p>}
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                            <button
                                key={tag}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTagClick(tag);
                                }}
                                className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                                    activeTags.includes(tag)
                                        ? 'bg-card-gradient text-white shadow-sm'
                                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="flex-shrink-0 self-center">
                    <button
                        className="py-1.5 px-4 bg-card-gradient hover-gradient text-white rounded-full transition-all shadow-sm hover:shadow-md text-xs font-medium"
                        onClick={(e) => {
                            e.stopPropagation();
                            onProjectClick(project.id);
                        }}
                    >
                        View
                    </button>
                </div>
            </div>
        </div>
    );
}; 