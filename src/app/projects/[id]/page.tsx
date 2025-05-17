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
import ProjectGalleryTabContents from "@/components/singleProject/projectGalleryTabContents";
import ProjectProgressTabContents from "@/components/singleProject/projectProgressTabContents";

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

            <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                    {/* Project Hero Image */}
                    <SingleProjectHeroBanner project={project} />

                    {/* Project Info */}
                    <SingleProjectInfo project={project} />
                </div>

                {/* Tabs */}
                <SingleProjectTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                {/* Progress Tab Content */}
                {activeTab === "progress" && (
                    <ProjectProgressTabContents project={project} />
                )}

                {/* Gallery Tab Content */}
                {activeTab === "gallery" && (
                    <ProjectGalleryTabContents project={project} />
                )}

                {/* Parts Tab Content */}
                {activeTab === "parts" && (
                    <ProjectPartsTabContents project={project} />
                )}

                {/* Notes Tab Content */}
                {activeTab === "notes" && <ProjectNotesTabContents />}
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
