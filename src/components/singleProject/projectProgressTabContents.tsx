import React from "react";
import {
    Image,
    Square,
    CheckSquare,
    Clock,
} from "lucide-react";
import { Project } from "@/data/sample-data";

interface ProjectProgressTabContentsProps {
    project: Project;
}

const projectProgressTabContents = ({ project }: ProjectProgressTabContentsProps) => {
    return (
        <div className="space-y-6 pb-12">
            {project.steps?.map((step) => (
                <div
                    key={step.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                    {/* Step Header */}
                    <div className="p-4 border-b border-gray-100">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start">
                                <button className="mt-1 mr-3">
                                    {step.completed ? (
                                        <CheckSquare
                                            size={20}
                                            className="text-indigo-600"
                                        />
                                    ) : (
                                        <Square
                                            size={20}
                                            className="text-gray-400"
                                        />
                                    )}
                                </button>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {step.description}
                                    </p>
                                    {step.completed && (
                                        <div className="flex items-center text-xs text-gray-500 mt-1">
                                            <Clock size={12} className="mr-1" />
                                            Completed
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button className="p-1 rounded hover:bg-gray-100">
                                <Image size={18} className="text-gray-700" />
                            </button>
                        </div>
                    </div>

                    {/* Images */}
                    {step.images.length > 0 && (
                        <div className="p-4 border-b border-gray-100">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">
                                Images
                            </h4>

                            {/* Side-by-side comparison */}
                            {step.images.some(
                                (img) => img.type === "reference"
                            ) &&
                                step.images.some(
                                    (img) => img.type === "progress"
                                ) && (
                                    <div className="mb-4">
                                        <h5 className="text-xs uppercase text-gray-500 mb-2">
                                            Reference vs. My Build
                                        </h5>

                                        {/* Desktop view - side by side */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="relative rounded-lg overflow-hidden bg-gray-100">
                                                    {step.images.find(
                                                        (img) =>
                                                            img.type ===
                                                            "reference"
                                                    ) && (
                                                        <img
                                                            src={
                                                                step.images.find(
                                                                    (img) =>
                                                                        img.type ===
                                                                        "reference"
                                                                )!.url
                                                            }
                                                            alt="Reference"
                                                            className="w-full aspect-video object-cover"
                                                        />
                                                    )}
                                                    <div className="absolute top-0 left-0 bg-indigo-600 text-white px-2 py-1 text-xs">
                                                        Reference
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="relative rounded-lg overflow-hidden bg-gray-100">
                                                    {step.images.find(
                                                        (img) =>
                                                            img.type ===
                                                            "progress"
                                                    ) && (
                                                        <img
                                                            src={
                                                                step.images.find(
                                                                    (img) =>
                                                                        img.type ===
                                                                        "progress"
                                                                )!.url
                                                            }
                                                            alt="My Build"
                                                            className="w-full aspect-video object-cover"
                                                        />
                                                    )}
                                                    <div className="absolute top-0 left-0 bg-green-600 text-white px-2 py-1 text-xs">
                                                        My Build
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            {/* Additional progress photos */}
                            {step.images.filter(
                                (img) => img.type === "progress"
                            ).length > 1 && (
                                <div className="mt-4">
                                    <h5 className="text-xs uppercase text-gray-500 mb-2">
                                        Additional Build Photos
                                    </h5>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {step.images
                                            .filter(
                                                (img) => img.type === "progress"
                                            )
                                            .slice(1) // Skip the first one used in the comparison
                                            .map((image) => (
                                                <div
                                                    key={image.id}
                                                    className="relative rounded-lg overflow-hidden bg-gray-100"
                                                >
                                                    <img
                                                        src={image.url}
                                                        alt="Build progress"
                                                        className="w-full aspect-square object-cover"
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs">
                                                        {image.url
                                                            .split("?text=")[1]
                                                            .replace(
                                                                /\+/g,
                                                                " "
                                                            )}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default projectProgressTabContents;
