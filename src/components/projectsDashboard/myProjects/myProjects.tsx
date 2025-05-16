import React from "react";
import { useProjectContext } from "@/contexts/ProjectContext";
import { projects } from "@/data/sample-data";
import NewProjectCard from "./newProjectCard";
import MyProjectsMobileView from "./myProjectsMobileView";
import MyProjectsDesktopView from "./myProjectsDesktopView";
import MyProjectsSeeAllControl from "./myProjectsSeeAllControl";
import NoMyProjectsCard from "./noMyProjectsCard";

const MyProjects = () => {
    const {
        isMobile,
        filteredMyProjects,
    } = useProjectContext();
    return (
        <div>
            {/* My Projects Header Section */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">
                        My Projects
                    </h2>
                    <p className="text-sm text-gray-500">
                        {projects.length} project
                        {projects.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <MyProjectsSeeAllControl />
            </div>

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
