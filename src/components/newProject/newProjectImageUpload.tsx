import React from "react";
import { Image, Trash2, Plus } from "lucide-react";
import { useNewProjectContext } from "@/contexts/NewProjectContext";

const NewProjectImageUpload = () => {
    const { imagePreview, setImagePreview, setShowImageUpload, images, removeImage } = useNewProjectContext();

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
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-yellow-500 transition-colors"
                            onClick={() => setShowImageUpload(true)}
                        >
                            <div className="mx-auto h-12 w-12 text-gray-400">
                                <Image size={48} />
                            </div>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Click to upload your main project image
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    PNG, JPG, GIF up to 5MB
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="relative rounded-lg overflow-hidden border border-gray-200">
                            <img
                                src={imagePreview.url}
                                alt={imagePreview.caption}
                                className="w-full aspect-video object-cover"
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
                            Additional Images
                        </h3>
                        <button
                            type="button"
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                            onClick={() => setShowImageUpload(true)}
                        >
                            <Plus size={16} className="mr-1" /> Add Image
                        </button>
                    </div>

                    {images.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {images.map((image) => (
                                <div
                                    key={image.id}
                                    className="relative rounded-lg overflow-hidden border border-gray-200"
                                >
                                    <img
                                        src={image.url}
                                        alt={image.caption}
                                        className="w-full aspect-square object-cover"
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
