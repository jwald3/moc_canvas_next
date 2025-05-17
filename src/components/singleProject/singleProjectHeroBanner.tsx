import React from "react";
import { Project } from "@/data/sample-data";
import { useProjectHomeContext } from "@/contexts/ProjectHomeContext";

const singleProjectHeroBanner = () => {

    const { project } = useProjectHomeContext();

    return (
        <div className="w-full h-64 relative bg-gray-200">
            {project?.steps?.[0]?.images?.[0] && (
                <img
                    src={project.steps[0].images[0].url}
                    alt={project.name}
                    className="w-full h-full object-cover"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            {project?.name}
                        </h1>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {project?.tags?.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-black/40 text-white text-xs px-2 py-1 rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {project?.status}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default singleProjectHeroBanner;
