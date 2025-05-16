import React from "react";
import { useProjectContext } from "@/contexts/ProjectContext";
import NewProjectCard from "./newProjectCard";
import MyProjectsMobileView from "./myProjectsMobileView";
import MyProjectsDesktopView from "./myProjectsDesktopView";
import NoMyProjectsCard from "./noMyProjectsCard";
import MyProjectsHeader from "./myProjectsHeader";

const MyProjects = () => {
    const {
        isMobile,
        filteredMyProjects,
    } = useProjectContext();
    return (
        <div>
            {/* My Projects Header Section */}
            <MyProjectsHeader />

            {/* Add empty states for both sections */}
            {filteredMyProjects.length === 0 && (
                <NoMyProjectsCard />
            )}

            {/* Desktop View */}
            {!isMobile && filteredMyProjects.length > 0 && (
                <MyProjectsDesktopView />
            )}

            {/* Mobile View - My Projects */}
            {isMobile && filteredMyProjects.length > 0 && (
                <MyProjectsMobileView />
            )}

            {/* Create New Project Card */}
            <NewProjectCard />
        </div>
    );
};

export default MyProjects;
