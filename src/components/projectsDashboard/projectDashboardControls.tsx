import React from "react";
import ProjectTagTray from "./projectTagTray";
import ProjectDashboardSearchAndSort from "./projectDashboardSearchAndSort";

const ProjectDashboardControls = () => {
    return (
        <div>
            <ProjectDashboardSearchAndSort />
            <ProjectTagTray />
        </div>
    );
};

export default ProjectDashboardControls;
