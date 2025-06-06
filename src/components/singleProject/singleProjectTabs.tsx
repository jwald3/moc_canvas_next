import React from "react";
import { useProjectHomeContext } from "@/contexts/ProjectHomeContext";

const SingleProjectTabs = () => {
    const { activeTab, setActiveTab, isOwner } = useProjectHomeContext();
    
    return (
        <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-6 overflow-x-auto">
                <button
                    className={`pb-4 px-1 whitespace-nowrap ${
                        activeTab === "progress"
                            ? "border-b-2 border-indigo-600 text-indigo-600"
                            : "text-gray-500 hover:text-gray-700"
                    } font-medium`}
                    onClick={() => setActiveTab("progress")}
                >
                    Build Progress
                </button>
                <button
                    className={`pb-4 px-1 whitespace-nowrap ${
                        activeTab === "gallery"
                            ? "border-b-2 border-indigo-600 text-indigo-600"
                            : "text-gray-500 hover:text-gray-700"
                    } font-medium`}
                    onClick={() => setActiveTab("gallery")}
                >
                    Gallery
                </button>
                <button
                    className={`pb-4 px-1 whitespace-nowrap ${
                        activeTab === "colors"
                            ? "border-b-2 border-indigo-600 text-indigo-600"
                            : "text-gray-500 hover:text-gray-700"
                    } font-medium`}
                    onClick={() => setActiveTab("colors")}
                >
                    Colors
                </button>
                <button
                    className={`pb-4 px-1 whitespace-nowrap ${
                        activeTab === "notes"
                            ? "border-b-2 border-indigo-600 text-indigo-600"
                            : "text-gray-500 hover:text-gray-700"
                    } font-medium`}
                    onClick={() => setActiveTab("notes")}
                >
                    Notes
                </button>
                {isOwner && (
                    <button
                        className={`pb-4 px-1 whitespace-nowrap ${
                            activeTab === "settings"
                                ? "border-b-2 border-indigo-600 text-indigo-600"
                                : "text-gray-500 hover:text-gray-700"
                        } font-medium`}
                        onClick={() => setActiveTab("settings")}
                    >
                        Settings
                    </button>
                )}
            </nav>
        </div>
    );
};

export default SingleProjectTabs;
