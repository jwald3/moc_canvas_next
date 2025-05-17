import React from "react";
import AllProjectsGrid from "./allProjectsGrid";
import AllProjectsList from "./allProjectsList";
import { useAllProjectsContext } from "@/contexts/AllProjectsContext";
import NoProjectsFound from "./noProjectsFound";

const AllProjectsResultsTray = () => {
    const {
        viewMode,
        filteredProjects,
    } = useAllProjectsContext();

    return (
        <div>
            {viewMode === "grid" ? (
                <AllProjectsGrid />
            ) : (
                <AllProjectsList />
            )}

            {filteredProjects.length === 0 && (
                <NoProjectsFound />
            )}
        </div>
    );
};

export default AllProjectsResultsTray;
