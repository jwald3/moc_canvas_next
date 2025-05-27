import { useProjectContext } from "@/contexts/ProjectContext";
import { useUser } from "@clerk/nextjs";
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
    const { isSignedIn } = useUser();
    
    return (
        <div className="mt-12">
            <SavedProjectsHeader />

            {/* Show NoSavedProjectsCard if not signed in OR no saved projects */}
            {(!isSignedIn || filteredSavedProjects.length === 0) && (
                <NoSavedProjectsCard />
            )}

            {/* Only show projects if signed in and has projects */}
            {isSignedIn && filteredSavedProjects.length > 0 && (
                <>
                    {/* Desktop View */}
                    {!isMobile && (
                        <SavedProjectsDesktopView />
                    )}

                    {/* Mobile View */}
                    {isMobile && (
                        <SavedProjectsMobileView />
                    )}
                </>
            )}
        </div>
    );
};

export default SavedProjects;
