import React from "react";
import AllProjectsGrid from "./allProjectsGrid";
import AllProjectsList from "./allProjectsList";
import { useAllProjectsContext } from "@/contexts/AllProjectsContext";
import NoProjectsFound from "./noProjectsFound";

const AllProjectsResultsTray = () => {
    const {
        viewMode,
        filteredProjects,
        currentPage,
        setCurrentPage,
        totalPages,
    } = useAllProjectsContext();

    return (
        <div className="space-y-4">
            {viewMode === "grid" ? (
                <AllProjectsGrid />
            ) : (
                <AllProjectsList />
            )}

            {filteredProjects.length === 0 ? (
                <NoProjectsFound />
            ) : (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300"
                    >
                        Previous
                    </button>
                    <span className="mx-4">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllProjectsResultsTray;
