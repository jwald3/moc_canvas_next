import React from "react";
import { X } from "lucide-react";
import { useProjectContext } from "@/contexts/ProjectContext";

const ProjectTagTray = () => {
    const { allTags, activeTags, handleTagClick, setActiveTags } = useProjectContext();

    return (
        <div className="mt-3 mb-8 flex flex-wrap gap-2">
            {allTags.map((tag) => (
                <button
                    key={tag}
                    className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                        activeTags.includes(tag)
                            ? "bg-card-gradient text-white shadow-md"
                            : "bg-white border-2 border-[#da5249] text-[#da5249] hover:bg-[#da5249] hover:text-white"
                    }`}
                    onClick={() => handleTagClick(tag)}
                >
                    {tag}
                </button>
            ))}
            {activeTags.length > 0 && (
                <button
                    className="text-xs px-3 py-1.5 rounded-full bg-red-100 text-red-700 hover:bg-red-200 flex items-center transition-all"
                    onClick={() => setActiveTags([])}
                >
                    Clear Filter <X size={12} className="ml-1" />
                </button>
            )}
        </div>
    );
};

export default ProjectTagTray;
