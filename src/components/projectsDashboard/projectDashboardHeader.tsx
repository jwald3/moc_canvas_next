import React from "react";
import { Plus } from "lucide-react";

interface ProjectDashboardHeaderProps {
    handleCreateProject: (e: React.MouseEvent | number) => void;
}

const ProjectDashboardHeader = ({
    handleCreateProject,
}: ProjectDashboardHeaderProps) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">
                    Project Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                    Manage and track all your projects in one place
                </p>
            </div>
            <button
                className="mt-4 sm:mt-0 bg-card-gradient hover-gradient text-white px-4 py-2 rounded-full flex items-center transition-all shadow-md hover:shadow-lg font-semibold text-shadow"
                onClick={handleCreateProject}
            >
                <Plus size={18} className="mr-2" />
                Add New Project
            </button>
        </div>
    );
};

export default ProjectDashboardHeader;
