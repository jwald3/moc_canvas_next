import React, { useState, useEffect } from "react";
import {
    Image as LucideImage,
    Plus,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { useProjectHomeContext } from "@/contexts/ProjectHomeContext";
import AddBuildStepModal from "./addBuildStepModal";
import ImageViewModal from "./imageViewModal";

const ProjectProgressTabContents = () => {
    const { project, isLoading, handleAddStep, isOwner } = useProjectHomeContext();
    const [showAddStepModal, setShowAddStepModal] = useState(false);
    const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());
    const [imageModal, setImageModal] = useState<{
        isOpen: boolean;
        images: Array<{ id: string; url: string; caption?: string | null }>;
        currentIndex: number;
    }>({
        isOpen: false,
        images: [],
        currentIndex: 0,
    });
    
    // Expand all steps by default when project loads
    useEffect(() => {
        if (project?.steps) {
            setExpandedSteps(new Set(project.steps.map(step => step.id)));
        }
    }, [project?.steps]);
    
    console.log('ProjectProgressTabContents:', { isLoading, hasSteps: project?.steps?.length });

    const handleSaveStep = async (stepData: { title: string; description: string; images: string[] }) => {
        if (handleAddStep) {
            await handleAddStep(stepData);
        }
    };

    const toggleStep = (stepId: string) => {
        setExpandedSteps(prev => {
            const newSet = new Set(prev);
            if (newSet.has(stepId)) {
                newSet.delete(stepId);
            } else {
                newSet.add(stepId);
            }
            return newSet;
        });
    };

    const expandAll = () => {
        if (project?.steps) {
            setExpandedSteps(new Set(project.steps.map(step => step.id)));
        }
    };

    const collapseAll = () => {
        setExpandedSteps(new Set());
    };

    const openImageModal = (images: Array<{ id: string; url: string; caption?: string | null }>, index: number) => {
        setImageModal({
            isOpen: true,
            images,
            currentIndex: index,
        });
    };

    const closeImageModal = () => {
        setImageModal({
            isOpen: false,
            images: [],
            currentIndex: 0,
        });
    };

    const navigateImage = (index: number) => {
        setImageModal(prev => ({
            ...prev,
            currentIndex: index,
        }));
    };

    if (isLoading) {
        return (
            <div className="space-y-6 pb-12 animate-pulse">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                        <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                    <div className="p-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4 pb-8">
            {/* Header with controls */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Build Progress</h2>
                <div className="flex items-center gap-2">
                    {/* Expand/Collapse controls - only show if there are steps */}
                    {project?.steps && project.steps.length > 0 && (
                        <div className="flex items-center gap-2 mr-4">
                            <button
                                onClick={expandAll}
                                className="text-sm text-gray-600 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-100"
                            >
                                Expand All
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                                onClick={collapseAll}
                                className="text-sm text-gray-600 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-100"
                            >
                                Collapse All
                            </button>
                        </div>
                    )}
                    {isOwner && (
                        <button
                            onClick={() => setShowAddStepModal(true)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
                        >
                            <Plus size={16} />
                            Add Step
                        </button>
                    )}
                </div>
            </div>

            {/* Empty State */}
            {(!project?.steps || project.steps.length === 0) && (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="bg-gray-50 rounded-full p-4 mb-4">
                        <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {isOwner ? "Start Your Build Journey" : "No Build Steps Yet"}
                    </h3>
                    <p className="text-sm text-gray-500 text-center max-w-md mb-4">
                        {isOwner 
                            ? "Document your build journey by adding progress steps. Each step can include photos and descriptions of your work."
                            : "This project doesn't have any build steps documented yet."
                        }
                    </p>
                    {isOwner && (
                        <button 
                            onClick={() => setShowAddStepModal(true)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                        >
                            Add First Step
                        </button>
                    )}
                </div>
            )}

            {/* Steps List */}
            {project?.steps?.map((step) => {
                const isExpanded = expandedSteps.has(step.id);
                
                return (
                    <div
                        key={step.id}
                        className="bg-white rounded-lg shadow-sm overflow-hidden"
                    >
                        {/* Step Header - Always visible and clickable */}
                        <div 
                            className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleStep(step.id)}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {step.description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {step.images.length > 0 && (
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                            {step.images.length} photo{step.images.length !== 1 ? 's' : ''}
                                        </span>
                                    )}
                                    <button className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors">
                                        {isExpanded ? (
                                            <ChevronUp size={18} className="text-gray-700" />
                                        ) : (
                                            <ChevronDown size={18} className="text-gray-700" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Collapsible Content */}
                        {isExpanded && step.images.length > 0 && (
                            <div className="p-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-3">
                                    Progress Photos
                                </h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {step.images.map((image, imageIndex) => (
                                        <div
                                            key={image.id}
                                            className="relative rounded-lg overflow-hidden bg-gray-100 group cursor-pointer"
                                            onClick={() => openImageModal(step.images, imageIndex)}
                                        >
                                            <Image
                                                src={image.url}
                                                alt={image.caption || "Progress photo"}
                                                className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
                                                width={400}
                                                height={400}
                                            />
                                            {image.caption && (
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                                    <p className="text-white text-xs">
                                                        {image.caption}
                                                    </p>
                                                </div>
                                            )}
                                            {/* Hover overlay */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 rounded-full p-2">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Add Step Modal - Only render for project owners */}
            {isOwner && (
                <AddBuildStepModal
                    isOpen={showAddStepModal}
                    onClose={() => setShowAddStepModal(false)}
                    onSave={handleSaveStep}
                />
            )}

            {/* Image View Modal */}
            <ImageViewModal
                isOpen={imageModal.isOpen}
                onClose={closeImageModal}
                images={imageModal.images}
                currentIndex={imageModal.currentIndex}
                onNavigate={navigateImage}
            />
        </div>
    );
};

export default ProjectProgressTabContents;
