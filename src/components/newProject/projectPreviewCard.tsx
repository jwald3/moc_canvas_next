import { Clock } from 'lucide-react'
import React from "react";
import Image from "next/image";
import { useNewProjectContext } from "@/contexts/NewProjectContext";

const ProjectPreviewCard = () => {
    const { imagePreview, projectName, tags, selectedStatus, description, isSubmitting, handleSubmit } = useNewProjectContext();

    const statusOptions = [
        { value: "Planning", color: "bg-blue-100 text-blue-800" },
        { value: "In Progress", color: "bg-yellow-100 text-yellow-800" },
        { value: "On Hold", color: "bg-orange-100 text-orange-800" },
        { value: "Completed", color: "bg-green-100 text-green-800" },
    ] as const;

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
                        <Image
                            src={imagePreview.url}
                            alt="Project Preview"
                            className="w-full aspect-video object-cover"
                            width={800}
                            height={450}
                        />
                    ) : (
                        <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
                            <Image 
                                src="https://k4dys96b1y.ufs.sh/f/hEcHYuoY4CW6R4yHIFUVXuE3ZH0COAIBJyGoUNcV1jbzRWql"
                                alt="Default Preview"
                                className="w-full h-full object-cover"
                                width={800}
                                height={450}
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
                        className={`text-xs px-3 py-1.5 rounded-full ${
                            statusOptions.find(
                                (status) => status.value === selectedStatus
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
                    className={`w-full ${
                        isSubmitting 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'text-white py-2 rounded-lg font-medium transition-colors'
                    }`}
                    style={!isSubmitting ? {
                        background: 'linear-gradient(to right, #da5249, #c4483f)',
                    } : {}}
                    onMouseEnter={(e) => {
                        if (!isSubmitting) {
                            e.currentTarget.style.background = 'linear-gradient(to right, #c4483f, #b03d35)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isSubmitting) {
                            e.currentTarget.style.background = 'linear-gradient(to right, #da5249, #c4483f)';
                        }
                    }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Creating Project...
                        </div>
                    ) : (
                        'Create Project'
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProjectPreviewCard;
