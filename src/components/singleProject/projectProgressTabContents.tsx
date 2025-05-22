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
                    No build progress yet
                </h3>
                <p className="text-sm text-gray-500 text-center max-w-sm">
                    Document your build journey by adding progress steps. Each step can include photos and descriptions of your work.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-12">
            {project?.steps?.map((step) => (
                <div
                    key={step.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                    {/* Step Header */}
                    <div className="p-4 border-b border-gray-100">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                            <button className="p-1 rounded hover:bg-gray-100">
                                <LucideImage size={18} className="text-gray-700" />
                            </button>
                        </div>
                    </div>

                    {/* Images */}
                    {step.images.length > 0 && (
                        <div className="p-4 border-b border-gray-100">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">
                                Images
                            </h4>

                            {/* Show all images in a grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {step.images.map((image) => (
                                    <div
                                        key={image.id}
                                        className="relative rounded-lg overflow-hidden bg-gray-100"
                                    >
                                        <Image
                                            src={image.url}
                                            alt={image.caption}
                                            className="w-full aspect-square object-cover"
                                            width={400}
                                            height={400}
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs">
                                            {image.caption}
                                        </div>
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
