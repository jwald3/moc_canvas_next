import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useProjectHomeContext } from "@/contexts/ProjectHomeContext";
import { UploadButton } from "@/components/ui/UploadThing";

// Keep this simplified type
type ImageUploadResponse = Array<{
    url: string;
    name: string;
    size: number;
}>;

const SingleProjectHeroBanner = () => {
    const { project, isLoading, handleMainImageUpload } = useProjectHomeContext();
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);

    const handleUploadComplete = (res: ImageUploadResponse) => {
        console.log("Upload complete:", res);
        if (res && res.length > 0) {
            handleMainImageUpload(res[0].url);
            setShowUploadModal(false);
        }
    };

    const openUploadModal = useCallback(() => {
        console.log("Opening upload modal");
        setShowUploadModal(true);
    }, []);

    const closeUploadModal = useCallback(() => {
        console.log("Closing upload modal");
        setShowUploadModal(false);
    }, []);

    // New handlers for preview modal
    const openPreviewModal = useCallback(() => {
        setShowPreviewModal(true);
    }, []);

    const closePreviewModal = useCallback(() => {
        setShowPreviewModal(false);
    }, []);

    // Separate component for the upload modal to ensure it renders properly
    const UploadModal = () => (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]" style={{zIndex: 9999}}>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-lg font-medium mb-4">Add Project Cover Image</h3>
                <div className="mb-6 flex flex-col items-center">
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={handleUploadComplete}
                        onUploadError={(error: Error) => {
                            console.error("Upload error:", error);
                        }}
                        appearance={{
                            button: "bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded",
                            container: "w-full flex flex-col items-center gap-4",
                            allowedContent: "text-gray-500 text-sm",
                        }}
                    />
                </div>
                <div className="flex justify-end">
                    <button 
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={closeUploadModal}
                        type="button"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

    // New ImagePreviewModal component
    const ImagePreviewModal = () => (
        <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
            onClick={closePreviewModal}
        >
            <div className="relative max-w-[90vw] max-h-[90vh]">
                <Image
                    src={project?.mainImage?.url || ''}
                    alt={project?.title || "Project image"}
                    width={1920}
                    height={1080}
                    className="object-contain max-h-[90vh]"
                    onClick={(e) => e.stopPropagation()}
                />
                <button 
                    className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    onClick={closePreviewModal}
                    type="button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>
    );

    return (
        <div className="w-full h-64 relative bg-gray-200">
            {/* Banner Image or Placeholder */}
            {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : project?.mainImage ? (
                <div className="relative w-full h-full cursor-pointer" onClick={openPreviewModal}>
                    <Image
                        src={project.mainImage.url}
                        alt={project.title || "Project image"}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            ) : (
                <button 
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors border-none"
                    onClick={openUploadModal}
                    type="button"
                >
                    <span className="text-gray-500 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                        </svg>
                        Click to add a cover image
                    </span>
                </button>
            )}

            {/* Modals */}
            {showUploadModal && <UploadModal />}
            {showPreviewModal && <ImagePreviewModal />}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none"></div>
            
            {/* Project Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            {isLoading ? "Loading..." : project?.title}
                        </h1>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {!isLoading && project?.tags?.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-black/40 text-white text-xs px-2 py-1 rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium pointer-events-auto">
                        {isLoading ? "..." : project?.status}
                    </div>
                </div>
            </div>
            
            {/* Edit Button for Existing Image */}
            {project?.mainImage && (
                <button 
                    className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    onClick={openUploadModal}
                    type="button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
            )}
        </div>
    );
};

export default SingleProjectHeroBanner;
