import React, { useCallback } from "react";
import { X, Upload } from "lucide-react";
import { useNewProjectContext } from "@/contexts/NewProjectContext";

const NewProjectImageUploadModal = () => {
    const {
        setShowImageUpload,
        imageTitle,
        setImageTitle,
        handleImageUpload,
        selectedFile,
        handleFileSelect
    } = useNewProjectContext();

    const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    }, [handleFileSelect]);

    const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }, []);

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#da5249]"
                                style={{
                                    '--tw-ring-color': '#da5249',
                                } as React.CSSProperties}
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
                                className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer transition-colors"
                                onDrop={onDrop}
                                onDragOver={onDragOver}
                                onClick={() => document.getElementById('fileInput')?.click()}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#da5249';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#d1d5db';
                                }}
                            >
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden"
                                    accept="image/png,image/jpeg,image/gif"
                                    onChange={onFileInputChange}
                                />
                                <div className="mx-auto h-12 w-12 text-gray-400">
                                    <Upload size={36} />
                                </div>
                                <div className="mt-2">
                                    {selectedFile ? (
                                        <p className="text-sm text-gray-500">
                                            Selected: {selectedFile.name}
                                        </p>
                                    ) : (
                                        <>
                                            <p className="text-sm text-gray-500">
                                                Click to upload or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                PNG, JPG, GIF up to 5MB
                                            </p>
                                        </>
                                    )}
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
                                className="px-4 py-2 text-white rounded-md transition-colors"
                                style={{
                                    backgroundColor: '#da5249'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#c4483f';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#da5249';
                                }}
                                onClick={handleImageUpload}
                                disabled={!imageTitle || !selectedFile}
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

export default NewProjectImageUploadModal;
