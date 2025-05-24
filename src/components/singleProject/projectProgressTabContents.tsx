import React from "react";
import {
    Image as LucideImage,
    Plus,
} from "lucide-react";
import Image from "next/image";
import { useProjectHomeContext } from "@/contexts/ProjectHomeContext";

const ProjectProgressTabContents = () => {
    const { project, isLoading } = useProjectHomeContext();
    
    console.log('ProjectProgressTabContents:', { isLoading, hasSteps: project?.steps?.length });

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

    if (!project?.steps?.length) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="bg-gray-50 rounded-full p-4 mb-4">
                    <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Start Your Build Journey
                </h3>
                <p className="text-sm text-gray-500 text-center max-w-md mb-4">
                    Document your build journey by adding progress steps. Each step can include photos and descriptions of your work.
                </p>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                    Add First Step
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4 pb-8">
            {project?.steps?.map((step) => (
                <div
                    key={step.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                    {/* Step Header */}
                    <div className="p-4 border-b border-gray-100">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {step.description}
                                </p>
                            </div>
                            <button className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                                <LucideImage size={18} className="text-gray-700" />
                            </button>
                        </div>
                    </div>

                    {/* Images */}
                    {step.images.length > 0 && (
                        <div className="p-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">
                                Progress Photos
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {step.images.map((image) => (
                                    <div
                                        key={image.id}
                                        className="relative rounded-lg overflow-hidden bg-gray-100 group"
                                    >
                                        <Image
                                            src={image.url}
                                            alt={image.caption}
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
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProjectProgressTabContents;
