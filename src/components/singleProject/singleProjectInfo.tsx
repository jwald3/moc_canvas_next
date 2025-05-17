import React from "react";
import { Users } from "lucide-react";
import { useProjectHomeContext } from "@/contexts/ProjectHomeContext";

const SingleProjectInfo = () => {
    const { project } = useProjectHomeContext();

    return (
        <div className="p-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                {/* Description */}
                <div className="flex-1">
                    <p className="text-gray-600 mb-4">{project?.description}</p>
                </div>

                {/* Stats */}
                <div className="flex flex-col sm:items-end gap-4">
                    {/* Stats Information */}
                    <div className="w-full sm:w-64">
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>
                                {project?.stats?.completedSteps} of{" "}
                                {project?.stats?.totalSteps} steps complete
                            </span>
                            <span>
                                {project?.stats?.completedPieces} pieces used
                            </span>
                        </div>
                    </div>

                    {/* Collaborators */}
                    <div className="flex flex-col">
                        <div className="flex items-center mb-2">
                            <Users size={16} className="text-gray-500 mr-2" />
                            <span className="text-sm text-gray-700 font-medium">
                                People
                            </span>
                        </div>
                        <button className="text-xs text-indigo-600 font-medium">
                            + Add People
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProjectInfo;
