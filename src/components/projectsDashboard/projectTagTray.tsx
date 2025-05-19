import React, { useState, useEffect } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useProjectContext } from "@/contexts/ProjectContext";

const ProjectTagTray = () => {
    const { allTags, activeTags, handleTagClick, setActiveTags } = useProjectContext();
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Different counts for different screen sizes
    const mobileCount = 6;
    const tabletCount = 12;
    const desktopCount = 18;
    
    // Get initial count based on window width
    const getInitialCount = () => {
        if (typeof window === 'undefined') return mobileCount;
        if (window.innerWidth >= 1024) return desktopCount;
        if (window.innerWidth >= 768) return tabletCount;
        return mobileCount;
    };

    const [initialTagCount, setInitialTagCount] = useState(getInitialCount());

    // Update initial count on window resize
    useEffect(() => {
        const handleResize = () => {
            setInitialTagCount(getInitialCount());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const shouldShowMore = allTags.length > initialTagCount;
    const visibleTags = isExpanded ? allTags : allTags.slice(0, initialTagCount);
    
    // Always show active tags even if they're not in the visible set
    const hiddenActiveTags = activeTags.filter(tag => !visibleTags.includes(tag));
    const displayTags = [...new Set([...visibleTags, ...hiddenActiveTags])];

    return (
        <div className="mt-3 mb-8">
            <div className="flex flex-wrap gap-2">
                {displayTags.map((tag) => (
                    <button
                        key={tag}
                        className={`
                            text-sm px-4 py-1.5 rounded-full transition-all duration-200
                            ${activeTags.includes(tag)
                                ? "bg-[#da5249] text-white shadow-sm hover:bg-[#c4483f]"
                                : "bg-white border border-[#da5249]/60 text-[#da5249] hover:border-[#da5249] hover:bg-[#da5249]/5"
                            }
                        `}
                        onClick={() => handleTagClick(tag)}
                    >
                        {tag}
                    </button>
                ))}
                {activeTags.length > 0 && (
                    <button
                        className="text-sm px-4 py-1.5 rounded-full bg-red-50 text-[#da5249] 
                                 hover:bg-red-100 flex items-center gap-1.5 transition-all duration-200"
                        onClick={() => setActiveTags([])}
                    >
                        Clear Filter
                        <X size={14} className="relative top-[0.5px]" />
                    </button>
                )}
            </div>
            
            {shouldShowMore && (
                <button
                    className="mt-2 text-sm text-[#da5249] hover:text-[#c4483f] flex items-center gap-1 transition-colors"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? (
                        <>Show Less <ChevronUp size={16} /></>
                    ) : (
                        <>Show More <ChevronDown size={16} /></>
                    )}
                </button>
            )}
        </div>
    );
};

export default ProjectTagTray;
