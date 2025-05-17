"use client";

import React, { useState } from "react";
import {
    ChevronLeft,
    Plus,
    Image,
    Users,
    Bookmark,
    Share2,
    Square,
    CheckSquare,
    Clock,
    Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { projects, projectDetails } from "@/data/sample-data";
import SingleProjectHeader from "@/components/singleProject/singleProjectHeader";
import SingleProjectHeroBanner from "@/components/singleProject/singleProjectHeroBanner";
import SingleProjectInfo from "@/components/singleProject/singleProjectInfo";
import SingleProjectTabs from "@/components/singleProject/singleProjectTabs";
import ProjectNotesTabContents from "@/components/singleProject/projectNotesTabContents";
import ProjectPartsTabContents from "@/components/singleProject/projectPartsTabContents";

const ProjectDetailsPage = ({ params }: { params: { id: string } }) => {
    // State
    const [activeTab, setActiveTab] = useState("progress");
    const router = useRouter();

    // Get basic project data
    const basicProject = projects.find((p) => p.id === parseInt(params.id));
    // Get detailed project data
    const details = projectDetails[parseInt(params.id)];

    // Combine basic and detailed data
    const project = basicProject
        ? {
              ...basicProject,
              ...details,
          }
        : null;

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <SingleProjectHeader project={project} />

            {/* Project Hero */}
            <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                    {/* Project Hero Image */}
                    <SingleProjectHeroBanner project={project} />

                    {/* Project Info */}
                    <SingleProjectInfo project={project} />
                </div>

                {/* Tabs */}
                <SingleProjectTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Progress Tab Content */}
                {activeTab === "progress" && (
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
                                                        <Clock
                                                            size={12}
                                                            className="mr-1"
                                                        />
                                                        Completed
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <button className="p-1 rounded hover:bg-gray-100">
                                            <Image
                                                size={18}
                                                className="text-gray-700"
                                            />
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
                                                                                (
                                                                                    img
                                                                                ) =>
                                                                                    img.type ===
                                                                                    "reference"
                                                                            )!
                                                                                .url
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
                                                                                (
                                                                                    img
                                                                                ) =>
                                                                                    img.type ===
                                                                                    "progress"
                                                                            )!
                                                                                .url
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
                                                            (img) =>
                                                                img.type ===
                                                                "progress"
                                                        )
                                                        .slice(1) // Skip the first one used in the comparison
                                                        .map((image) => (
                                                            <div
                                                                key={image.id}
                                                                className="relative rounded-lg overflow-hidden bg-gray-100"
                                                            >
                                                                <img
                                                                    src={
                                                                        image.url
                                                                    }
                                                                    alt="Build progress"
                                                                    className="w-full aspect-square object-cover"
                                                                />
                                                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs">
                                                                    {image.url
                                                                        .split(
                                                                            "?text="
                                                                        )[1]
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
                )}

                {/* Gallery Tab Content */}
                {activeTab === "gallery" && (
                    <div className="space-y-6 pb-12">
                        <div className="bg-white rounded-xl shadow-sm p-4">
                            <h3 className="text-lg font-medium mb-4">
                                Image Gallery
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {(project.steps || [])
                                    .flatMap((step) => step.images)
                                    .map((image) => (
                                        <div
                                            key={image.id}
                                            className="relative rounded-lg overflow-hidden"
                                        >
                                            <img
                                                src={image.url}
                                                alt="Project image"
                                                className="w-full aspect-square object-cover"
                                            />
                                            <div className="absolute top-0 left-0 bg-black/60 text-white px-2 py-1 text-xs">
                                                {image.type === "reference"
                                                    ? "Reference"
                                                    : "My Build"}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Parts Tab Content */}
                {activeTab === "parts" && (
                    <ProjectPartsTabContents project={project} />
                )}

                {/* Notes Tab Content */}
                {activeTab === "notes" && (
                    <ProjectNotesTabContents />
                )}
            </div>

            {/* Add Step Button - Fixed at bottom */}
            <div className="fixed bottom-6 right-6">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center">
                    <Plus size={24} />
                </button>
            </div>
        </div>
    );
};

export default ProjectDetailsPage;
