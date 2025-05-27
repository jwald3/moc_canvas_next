import React from "react";
import { useProjectContext } from "@/contexts/ProjectContext";
import { useUser } from "@clerk/nextjs";

const SavedProjectsHeader = () => {
    const { filteredSavedProjects } = useProjectContext();
    const { isSignedIn } = useUser();

    return (
        <div className="flex justify-between items-center mb-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Saved Projects</h2>
                <p className="text-gray-500 text-sm">
                    {isSignedIn ? `${filteredSavedProjects.length} projects` : "0 projects"}
                </p>
            </div>
            {/* Only show "See All" if user is signed in and has saved projects */}
            {isSignedIn && filteredSavedProjects.length > 0 && (
                <button className="text-[#da5249] hover:text-[#c44a42] font-medium text-sm transition-colors">
                    See All →
                </button>
            )}
        </div>
    );
};

export default SavedProjectsHeader;
