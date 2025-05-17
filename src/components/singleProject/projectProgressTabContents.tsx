import React from "react";
import {
    Image as LucideImage,
} from "lucide-react";
import Image from "next/image";
import { useProjectHomeContext } from "@/contexts/ProjectHomeContext";


const ProjectProgressTabContents = () => {
    const { project } = useProjectHomeContext();

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
