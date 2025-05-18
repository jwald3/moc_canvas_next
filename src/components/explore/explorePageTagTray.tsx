import React from "react";

interface ExplorePageTagTrayProps {
    allTags: string[];
    activeTags: string[];
    handleTagClick: (tag: string) => void;
}

const ExplorePageTagTray = ({
    allTags,
    activeTags,
    handleTagClick,
}: ExplorePageTagTrayProps) => {
    return (
        <div className="flex flex-wrap gap-2 sm:max-w-[66%]">
            {allTags.map((tag) => (
                <button
                    key={tag}
                    className={`text-xs px-2 py-1 rounded-full transition-colors ${
                        activeTags.includes(tag)
                            ? "bg-card-gradient text-white shadow-sm"
                            : "bg-white/90 border border-orange-300 text-orange-700 hover:bg-orange-500 hover:text-white"
                    }`}
                    onClick={() => handleTagClick(tag)}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
};

export default ExplorePageTagTray;
