"use client";

import React from "react";
import { useParams } from "next/navigation";
import SingleProjectHeader from "@/components/singleProject/singleProjectHeader";
import SingleProjectHeroBanner from "@/components/singleProject/singleProjectHeroBanner";
import SingleProjectInfo from "@/components/singleProject/singleProjectInfo";
import SingleProjectTabs from "@/components/singleProject/singleProjectTabs";
import ProjectNotesTabContents from "@/components/singleProject/projectNotesTabContents";
import ProjectGalleryTabContents from "@/components/singleProject/projectGalleryTabContents";
import ProjectProgressTabContents from "@/components/singleProject/projectProgressTabContents";
import ProjectColorsTabContents from "@/components/singleProject/projectColorsTabContents";
import { ProjectHomeProvider, useProjectHomeContext } from "@/contexts/ProjectHomeContext";
import ProjectDetailsSkeleton from "@/components/singleProject/projectDetailsSkeleton";
import ProjectSettingsTabContents from "@/components/singleProject/projectSettingsTabContents";

const ProjectContent = () => {
    const { project, activeTab } = useProjectHomeContext();

    if (!project) {
        return <ProjectDetailsSkeleton />;
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
                {activeTab === "colors" && (
                    <ProjectColorsTabContents />
                )}
                {activeTab === "notes" && <ProjectNotesTabContents />}
                {activeTab === "settings" && <ProjectSettingsTabContents />}
            </div>
        </div>
    );
};

const ProjectDetailsPage = () => {
    const params = useParams();
    const projectId = params?.id as string;

    if (!projectId) {
        return <ProjectDetailsSkeleton />;
    }

    return (
        <ProjectHomeProvider projectId={projectId}>
            <ProjectContent />
        </ProjectHomeProvider>
    );
};

export default ProjectDetailsPage;
