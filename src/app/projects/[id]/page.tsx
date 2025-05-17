"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import SingleProjectHeader from "@/components/singleProject/singleProjectHeader";
import SingleProjectHeroBanner from "@/components/singleProject/singleProjectHeroBanner";
import SingleProjectInfo from "@/components/singleProject/singleProjectInfo";
import SingleProjectTabs from "@/components/singleProject/singleProjectTabs";
import ProjectNotesTabContents from "@/components/singleProject/projectNotesTabContents";
import ProjectPartsTabContents from "@/components/singleProject/projectPartsTabContents";
import ProjectGalleryTabContents from "@/components/singleProject/projectGalleryTabContents";
import ProjectProgressTabContents from "@/components/singleProject/projectProgressTabContents";
import { ProjectHomeProvider, useProjectHomeContext } from "@/contexts/ProjectHomeContext";

const ProjectContent = () => {
    const { project, activeTab, handleAddStep } = useProjectHomeContext();

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <SingleProjectHeader />

            <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                    <SingleProjectHeroBanner />
                    <SingleProjectInfo />
                </div>

                <SingleProjectTabs />

                {activeTab === "progress" && (
                    <ProjectProgressTabContents />
                )}
                {activeTab === "gallery" && (
                    <ProjectGalleryTabContents />
                )}
                {activeTab === "parts" && (
                    <ProjectPartsTabContents />
                )}
                {activeTab === "notes" && <ProjectNotesTabContents />}
            </div>

            <div className="fixed bottom-6 right-6">
                <button 
                    onClick={handleAddStep}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
                >
                    <Plus size={24} />
                </button>
            </div>
        </div>
    );
};

const ProjectDetailsPage = () => {
    const router = useRouter();
    const params = useParams();
    const projectId = params?.id as string;

    if (!projectId) {
        return <div>Loading...</div>;
    }

    return (
        <ProjectHomeProvider router={router} projectId={projectId}>
            <ProjectContent />
        </ProjectHomeProvider>
    );
};

export default ProjectDetailsPage;
