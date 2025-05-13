import React from 'react';
import type { Project } from '@/types/project';
import { formatRelativeTime } from '@/utils/dateUtils';

interface ProjectListItemProps {
    project: Project;
    isSaved?: boolean;
    onProjectClick: (id: number) => void;
    onTagClick: (tag: string) => void;
    activeTag: string;
}

export const ProjectListItem: React.FC<ProjectListItemProps> = ({
    project,
    isSaved,
    onProjectClick,
    onTagClick,
    activeTag,
}) => {
    return (
        <div 
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden flex border border-orange-200 hover:border-orange-300"
            onClick={() => onProjectClick(project.id)}
        >
            <div className="w-40 h-28 flex-shrink-0 relative overflow-hidden">
                <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                />
            </div>
            
            <div className="flex-grow p-3 flex items-center">
                <div className="flex-grow max-w-[calc(100%-120px)]">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-semibold text-gray-800">{project.name}</h3>
                            {isSaved && <p className="text-sm text-gray-600 mt-0.5">{project.owner}</p>}
                        </div>
                        <div className="text-sm text-gray-500 ml-4 flex-shrink-0">
                            {formatRelativeTime(project.lastUpdated)}
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
                                    activeTag === tag
                                        ? 'bg-card-gradient text-white shadow-sm'
                                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="ml-4 flex items-center flex-shrink-0">
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