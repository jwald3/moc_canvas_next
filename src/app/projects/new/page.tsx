"use client";

import React from "react";
import TipsCard from "@/components/newProject/tipsCard";
import NewProjectHeader from "@/components/newProject/newProjectHeader";
import ProjectPreviewCard from "@/components/newProject/projectPreviewCard";
import NewProjectBasicInfo from "@/components/newProject/newProjectBasicInfo";
import NewProjectImageUpload from "@/components/newProject/newProjectImageUpload";
import NewProjectBuildSections from "@/components/newProject/newProjectBuildSections";
import NewProjectImageUploadModal from "@/components/newProject/newProjectImageUploadModal";
import { NewProjectProvider, useNewProjectContext } from "@/contexts/NewProjectContext";

const NewProjectContent = () => {
    const {
        showImageUpload,
    } = useNewProjectContext();

    return (
        <div className="min-h-screen bg-gray-50">
            <NewProjectHeader />

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main form section */}
                    <div className="lg:col-span-2 space-y-6">
                        <TipsCard />
                        <NewProjectBasicInfo />
                        <NewProjectImageUpload />
                        <NewProjectBuildSections />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <ProjectPreviewCard />
                    </div>
                </div>
            </div>

            {showImageUpload && (
                <NewProjectImageUploadModal />
            )}
        </div>
    );
};

const NewProjectPage = () => {
    return (
        <NewProjectProvider>
            <NewProjectContent />
        </NewProjectProvider>
    );
};

export default NewProjectPage;
