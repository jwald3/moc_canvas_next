import React from "react";
import { useProjectHomeContext } from "@/contexts/ProjectHomeContext";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { ProjectObject } from "@/types/hand_spun_datatypes";

const ProjectGalleryTabContents = () => {
    const { project, isLoading } = useProjectHomeContext();
    
    const allImages = [
        ...(project?.steps || []).flatMap((step) => step.images),
        ...((project as unknown as ProjectObject)?.images || [])
    ];

    if (isLoading) {
        return (
            <div className="space-y-6 pb-12 animate-pulse">
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div 
                                key={i} 
                                className="aspect-square bg-gray-200 rounded-lg"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!allImages.length) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="bg-gray-50 rounded-full p-4 mb-4">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No images yet
                </h3>
                <p className="text-sm text-gray-500 text-center max-w-sm">
                    Add images to your build progress steps to see them all collected here in the gallery.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-12">
            <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="text-lg font-medium mb-4">Image Gallery</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {allImages.map((image) => (
                        <div
                            key={image.id}
                            className="relative rounded-lg overflow-hidden aspect-square"
                        >
                            <Image
                                src={image.url}
                                alt="Project image"
                                className="object-cover"
                                fill
                            />
                            <div className="absolute top-0 left-0 bg-black/60 text-white px-2 py-1 text-xs">
                                {image.type === "reference" ? "Reference" : 
                                 image.type === "standalone" ? "Additional" : "My Build"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectGalleryTabContents;
