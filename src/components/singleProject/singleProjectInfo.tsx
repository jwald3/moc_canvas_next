import React from "react";
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProjectInfo;
