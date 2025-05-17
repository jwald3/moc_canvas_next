import React from "react";
import { X, Upload } from "lucide-react";
import { useNewProjectContext } from "@/contexts/NewProjectContext";

const newProjectImageUploadModal = () => {
    
    const { showImageUpload, setShowImageUpload, imageTitle, setImageTitle, handleImageUpload } = useNewProjectContext();

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center px-4">
                <div className="fixed inset-0 bg-black opacity-50 transition-opacity"></div>

                <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-10">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                            Add Image
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500"
                            onClick={() => setShowImageUpload(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="imageTitle"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Image Title
                            </label>
                            <input
                                type="text"
                                id="imageTitle"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                placeholder="e.g., Main View"
                                value={imageTitle}
                                onChange={(e) => setImageTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Upload Image
                            </label>
                            <div
                                className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-yellow-500 transition-colors"
                                onClick={handleImageUpload}
                            >
                                <div className="mx-auto h-12 w-12 text-gray-400">
                                    <Upload size={36} />
                                </div>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        PNG, JPG, GIF up to 5MB
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 space-x-3 border-t border-gray-100">
                            <button
                                type="button"
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                onClick={() => setShowImageUpload(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                onClick={handleImageUpload}
                                disabled={!imageTitle}
                            >
                                Add Image
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default newProjectImageUploadModal;
