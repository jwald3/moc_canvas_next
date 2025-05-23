'use client'

import React from "react";
import { Image as Trash2 } from "lucide-react";
import { useNewProjectContext } from "@/contexts/NewProjectContext";
import Image from "next/image";
import { UploadDropzone } from "@/utils/uploadthing";
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
                <h2 className="text-lg font-medium text-gray-800">
                    Project Images
                </h2>
            </div>
            <div className="p-6">
                {/* Main Project Image */}
                <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                        Main Project Image
                    </h3>

                    {!imagePreview ? (
                        <div className="ut-button:bg-yellow-500 ut-button:text-white ut-button:rounded-md ut-button:px-4 ut-button:py-2 ut-button:hover:bg-yellow-600">
                            <UploadDropzone
                                endpoint="imageUploader"
                                onClientUploadComplete={(res: {
                                    url: string;
                                    key: string;
                                }[]) => {
                                    console.log("res", res);

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
                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-yellow-500 transition-colors ut-upload-icon:text-gray-400"
                            />
                        </div>
                    ) : (
                        <div className="relative rounded-lg overflow-hidden border border-gray-200">
                            <Image
                                src={imagePreview.url}
                                alt={imagePreview.caption || "Main project image"}
                                className="w-full aspect-video object-cover"
                                width={800}
                                height={450}
                            />
                            <div className="absolute top-2 right-2 flex space-x-2">
                                <button
                                    type="button"
                                    className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
                                    onClick={() => setImagePreview(null)}
                                >
                                    <Trash2
                                        size={16}
                                        className="text-red-500"
                                    />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Additional Images */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-medium text-gray-700">
                            Additional Project Images
                        </h3>
                        <UploadDropzone
                            endpoint="imageUploader"
                            onClientUploadComplete={handleAdditionalImageUpload}
                            onUploadError={(error: Error) => {
                                console.error(error);
                                alert("Upload failed");
                            }}
                            className="w-auto"
                        />
                    </div>

                    {images.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {images.map((image) => (
                                <div
                                    key={image.id}
                                    className="relative rounded-lg overflow-hidden border border-gray-200"
                                >
                                    <Image
                                        src={image.url}
                                        alt={image.caption || "Project image"}
                                        className="w-full aspect-square object-cover"
                                        width={400}
                                        height={400}
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            type="button"
                                            className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
                                            onClick={() =>
                                                removeImage(image.id)
                                            }
                                        >
                                            <Trash2
                                                size={16}
                                                className="text-red-500"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 italic">
                            No additional images added yet
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewProjectImageUpload;
