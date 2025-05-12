/*
    // it's going to be a card component that includes a thumbnail, a title and tag(s), and an "updated _ ago" timestamp.
*/

import ThumbnailImage from "./images/ThumbnailImage";
import { Clock } from "lucide-react";
import React from "react";

export default function ProjectPreviewCard({
    title = "Kitchen Renovation",
    tags = ["Star Wars", "Sci-Fi", "Disney", "Space"],
    updatedTime = "2 days ago",
    imageSrc = "/images/app-image-demo.jpg",
    imageAlt = "Project Image",
}) {

    // handle tags - if three or more, show "and _ more"
    const tagString = tags.length > 3 ? `${tags.slice(0, 3).join(", ")} and ${tags.length - 3} more` : tags.join(", ");

    return (
        <div className="w-[400px] flex-shrink-0 rounded-xl overflow-hidden shadow-lg bg-white">
            {/* Thumbnail container */}
            <div className="relative h-[225px]">
                {/* Image portion with gradient overlay */}
                <ThumbnailImage 
                    src={imageSrc} 
                    alt={imageAlt} 
                    fill={true} 
                    variant="thumbnail"
                    aspectRatio="16:9"
                    rounded={true}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Text portion - positioned at bottom of image */}
                <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h2 className="text-1xl font-bold mb-2">{title}</h2>
                    {/* Tags */}
                    <div className="flex items-center gap-2 text-sm">
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                            <line x1="7" y1="7" x2="7.01" y2="7" />
                        </svg>
                        {/* make the tag string a smaller font size */}
                        <span className="opacity-90 text-xs">
                            {tagString}
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom section with timestamp and button */}
            <div className="px-6 py-5 flex items-center justify-between">
                {/* Timestamp */}
                <div className="flex items-center text-gray-600 text-sm gap-1.5">
                    <Clock size={16} />
                    <span>Updated {updatedTime}</span>
                </div>

                {/* Button */}
                <button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors">
                    View Project
                </button>
            </div>
        </div>
    );
}
