'use client'

import React from "react";
import { Image as Trash2 } from "lucide-react";
import { useNewProjectContext } from "@/contexts/NewProjectContext";
import Image from "next/image";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";
import { ProjectImageObject } from "@/types/hand_spun_datatypes";


const NewProjectImageUpload = () => {
    const { imagePreview, setImagePreview, images, removeImage, addImage } = useNewProjectContext();

    const handleAdditionalImageUpload = (res: {
        url: string;
        key: string;
    }[]) => {
        if (res?.[0]) {
            const newImage: ProjectImageObject = {
                url: res[0].url,
                id: res[0].key,
                caption: "",
                type: "standalone" as const,
                order: images.length
            };
            if (typeof addImage === 'function') {
                addImage(newImage);
            }
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-lg font-medium text-gray-800">Project Images</h2>
                <p className="text-sm text-gray-500 mt-1">Add photos to showcase your project</p>
            </div>
            <div className="p-6 space-y-8">
                {/* Main Project Image */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-700">Main Project Image</h3>
                            <p className="text-xs text-gray-500 mt-1">This will be your project&apos;s cover image</p>
                        </div>
                    </div>

                    {!imagePreview ? (
                        <UploadDropzone
                            endpoint="imageUploader"
                            onClientUploadComplete={(res: { url: string; key: string; }[]) => {
                                if (res?.[0]) {
                                    setImagePreview({
                                        url: res[0].url,
                                        id: res[0].key,
                                        caption: "",
                                        buildStepId: "",
                                        order: 0
                                    });
                                }
                            }}
                            onUploadError={(error: Error) => {
                                console.error(error);
                                alert("Upload failed");
                            }}
                        />
                    ) : (
                        <div className="relative rounded-xl overflow-hidden bg-gray-50 border border-gray-200 group">
                            <Image
                                src={imagePreview.url}
                                alt={imagePreview.caption || "Main project image"}
                                width={1200}
                                height={675}
                                className="w-full aspect-video object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-all duration-200">
                                <button
                                    type="button"
                                    onClick={() => setImagePreview(null)}
                                    className="absolute bottom-3 right-3 p-2.5 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors group/btn"
                                >
                                    <Trash2 size={18} className="text-gray-400 group-hover/btn:hover:opacity-80 transition-colors" style={{ color: '#da5249' }} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Additional Images */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-700">Additional Images</h3>
                            <p className="text-xs text-gray-500 mt-1">
                                {images.length}/10 images • Add more details to your project
                            </p>
                        </div>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={handleAdditionalImageUpload}
                            onUploadError={(error: Error) => {
                                console.error(error);
                                alert("Upload failed");
                            }}
                            className="ut-button:text-white ut-button:rounded-lg ut-button:px-4 ut-button:py-2.5 ut-button:transition-colors ut-button:shadow-sm"
                            style={{
                                '--ut-button-bg': '#da5249',
                                '--ut-button-bg-hover': '#c4483f',
                            } as React.CSSProperties}
                        />
                    </div>

                    {images.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {images.map((image) => (
                                <div
                                    key={image.id}
                                    className="group relative rounded-xl overflow-hidden bg-gray-50 border border-gray-200 aspect-square hover:transition-colors"
                                    style={{
                                        '--hover-border-color': '#da5249'
                                    } as React.CSSProperties}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = '#da5249';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = '#e5e7eb';
                                    }}
                                >
                                    <Image
                                        src={image.url}
                                        alt={image.caption || "Project image"}
                                        className="w-full h-full object-cover"
                                        width={400}
                                        height={400}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200">
                                        <button
                                            type="button"
                                            onClick={() => removeImage(image.id)}
                                            className="absolute bottom-3 right-3 p-2.5 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors group/btn"
                                        >
                                            <Trash2 size={18} className="text-gray-400 group-hover/btn:hover:opacity-80 transition-colors" style={{ color: '#da5249' }} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <div className="max-w-sm mx-auto">
                                <p className="text-sm text-gray-600 font-medium">No additional images yet</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Add more images to show different angles or details of your project
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewProjectImageUpload;
