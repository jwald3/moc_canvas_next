import React from "react";
import { useProjectHomeContext } from "@/contexts/ProjectHomeContext";

const ProjectGalleryTabContents = () => {
    const { project } = useProjectHomeContext();
    
    return (
        <div className="space-y-6 pb-12">
            <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="text-lg font-medium mb-4">Image Gallery</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {(project?.steps || [])
                        .flatMap((step) => step.images)
                        .map((image) => (
                            <div
                                key={image.id}
                                className="relative rounded-lg overflow-hidden"
                            >
                                <img
                                    src={image.url}
                                    alt="Project image"
                                    className="w-full aspect-square object-cover"
                                />
                                <div className="absolute top-0 left-0 bg-black/60 text-white px-2 py-1 text-xs">
                                    {image.type === "reference"
                                        ? "Reference"
                                        : "My Build"}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectGalleryTabContents;
