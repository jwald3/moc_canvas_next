import { useProjectContext } from "@/contexts/ProjectContext";
import React from "react";
import SavedProjectsMobileView from "./savedProjectsMobileView";
import NoSavedProjectsCard from "./noSavedProjectsCard";
import SavedProjectsHeader from "./savedProjectsHeader";
import SavedProjectsDesktopView from "./savedProjectsDesktopView";

const SavedProjects = () => {
    const {
        filteredSavedProjects,
        isMobile,
    } = useProjectContext();
    return (
        <div className="mt-12">
            <SavedProjectsHeader />

            {/* Add empty states for both sections */}
            {filteredSavedProjects.length === 0 && (
                <NoSavedProjectsCard />
            )}

            {/* Desktop View */}
            {!isMobile && filteredSavedProjects.length > 0 && (
                <SavedProjectsDesktopView />
            )}

            {/* Mobile View - My Projects */}
            {isMobile && filteredSavedProjects.length > 0 && (
                <SavedProjectsMobileView />
            )}
        </div>
    );
};

export default SavedProjects;
