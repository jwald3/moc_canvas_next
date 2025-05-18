import React from "react";

interface ProjectDashboardHeaderProps {
    handleCreateProject: (e: React.MouseEvent | number) => void;
}

const ProjectDashboardHeader = ({
    handleCreateProject,
}: ProjectDashboardHeaderProps) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-6">
            <div className="w-full sm:w-auto">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Project Dashboard
                </h1>
                <p className="text-sm text-gray-600/80">
                    Manage and track all your projects in one place
                </p>
            </div>
            <button
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full flex items-center justify-center transition-colors font-medium"
                onClick={handleCreateProject}
            >
                <span className="text-xl font-normal mr-2">+</span>
                Add New Project
            </button>
        </div>
    );
};

export default ProjectDashboardHeader;
