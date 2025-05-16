import { Star } from "lucide-react";
import React from "react";
import { useProjectContext } from "@/contexts/ProjectContext";

const noSavedProjectsCard = () => {
    const { activeTags, searchQuery } = useProjectContext();

    return (
        <div className="bg-white rounded-lg p-8 shadow-sm text-center border border-gray-200 mb-6">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Star size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
                No saved projects found
            </h3>
            <p className="text-gray-500 mb-4">
                {activeTags.length > 0 || searchQuery
                    ? "Try adjusting your filters or search terms."
                    : "Click the star icon on any project to save it for later. Your saved projects will appear here."}
            </p>
        </div>
    );
};

export default noSavedProjectsCard;
