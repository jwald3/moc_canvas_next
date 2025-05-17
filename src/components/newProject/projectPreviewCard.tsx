import { Clock } from 'lucide-react'
import React from "react";
import { Image } from "lucide-react";
import { statusOptions } from "@/data/sample-data";

interface ProjectPreviewCardProps {
    imagePreview: { url: string };
    projectName: string;
    tags: string[];
    selectedStatus: string;
    description: string;
    isSubmitting: boolean;
    handleSubmit: () => void;
}

const projectPreviewCard = ({
    imagePreview,
    projectName,
    tags,
    selectedStatus,
    description,
    isSubmitting,
    handleSubmit,
}: ProjectPreviewCardProps) => {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-6">
            <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-lg font-medium text-gray-800">
                    Project Preview
                </h2>
            </div>
            <div className="p-6">
                <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
                    {imagePreview?.url && imagePreview.url !== "/images/app-image-demo.jpg" ? (
                        <img
                            src={imagePreview.url}
                            alt="Project Preview"
                            className="w-full aspect-video object-cover"
                        />
                    ) : (
                        <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
                            <img 
                                src="/images/app-image-demo.jpg"
                                alt="Default Preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>

                <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {projectName || "Project Name"}
                </h3>

                <div className="flex flex-wrap gap-2 mb-3">
                    {tags.length > 0 ? (
                        tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-black/40 text-white text-xs px-2 py-1 rounded"
                            >
                                {tag}
                            </span>
                        ))
                    ) : (
                        <span className="text-xs text-gray-500 italic">
                            Tags will appear here
                        </span>
                    )}
                </div>

                <div className="mb-4">
                    <span
                        className={`text-xs px-2 py-1 rounded-full ${
                            statusOptions.find(
                                (s) => s.value === selectedStatus
                            )?.color || "bg-gray-100 text-gray-700"
                        }`}
                    >
                        {selectedStatus}
                    </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {description ||
                        "Your project description will appear here..."}
                </p>

                <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center">
                        <Clock size={16} className="text-gray-400 mr-2" />
                        <span>Created today</span>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-100 px-6 py-4">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white py-2 rounded-lg font-medium transition-colors"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Creating Project..." : "Create Project"}
                </button>
            </div>
        </div>
    );
};

export default projectPreviewCard;
