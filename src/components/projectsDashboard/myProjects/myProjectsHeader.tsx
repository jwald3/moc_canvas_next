import React from "react";
import MyProjectsSeeAllControl from "./myProjectsSeeAllControl";
import { useProjectContext } from "@/contexts/ProjectContext";

const myProjectsHeader = () => {
    const { filteredMyProjects } = useProjectContext();

    return (
        <div className="flex justify-between items-center mb-6">
            <div>
                <h2 className="text-xl font-bold text-gray-800">My Projects</h2>
                <p className="text-sm text-gray-500">
                    {filteredMyProjects.length} project
                    {filteredMyProjects.length !== 1 ? "s" : ""}
                </p>
            </div>
            <MyProjectsSeeAllControl />
        </div>
    );
};

export default myProjectsHeader;
