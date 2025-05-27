import React from "react";
import SavedProjectsSeeAllControl from "./savedProjectsSeeAllControl";
import { useProjectContext } from "@/contexts/ProjectContext";

const SavedProjectsHeader = () => {
    const { filteredSavedProjects } = useProjectContext();
    
    return (
        <div className="flex justify-between items-center mb-6">
            <div>
                <h2 className="text-xl font-bold text-gray-800">
                    Saved Projects
                </h2>
                <p className="text-sm text-gray-500">
                    {filteredSavedProjects.length} project
                    {filteredSavedProjects.length !== 1 ? "s" : ""}
                </p>
            </div>
            {filteredSavedProjects.length > 0 && <SavedProjectsSeeAllControl />}
        </div>
    );
};

export default SavedProjectsHeader;
