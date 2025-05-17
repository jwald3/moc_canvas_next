import React from "react";
import { Tag, X } from "lucide-react";
import { statusOptions } from "@/data/sample-data";
import { useNewProjectContext } from "@/contexts/NewProjectContext";

const newProjectBasicInfo = () => {

    const { projectName, setProjectName, description, setDescription, selectedStatus, setSelectedStatus, tagInput, showTagSuggestions, handleTagInputChange, tags, addTag, removeTag, handleTagKeyPress, tagSuggestions } = useNewProjectContext();
    
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-lg font-medium text-gray-800">
                    Basic Information
                </h2>
            </div>
            <div className="p-6 space-y-6">
                {/* Project Name */}
                <div>
                    <label
                        htmlFor="projectName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Project Name*
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        placeholder="e.g., LEGO Star Wars UCS Millennium Falcon"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Description*
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        placeholder="Describe your LEGO project, goals, and timeline..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Status*
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {statusOptions.map((status) => (
                            <button
                                key={status.value}
                                type="button"
                                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                                    selectedStatus === status.value
                                        ? `${status.color} ring-2 ring-offset-2 ring-gray-300`
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                                onClick={() => setSelectedStatus(status.value)}
                            >
                                {status.value}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tags (max 30 characters each)
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Tag size={16} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder="Add tags (e.g., Star Wars, UCS, Spaceship)"
                            value={tagInput}
                            onChange={handleTagInputChange}
                            onKeyPress={handleTagKeyPress}
                            maxLength={30}
                        />
                        {tagInput && showTagSuggestions && (
                            <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                                {tagSuggestions
                                    .filter(
                                        (tag) =>
                                            tag
                                                .toLowerCase()
                                                .includes(
                                                    tagInput.toLowerCase()
                                                ) && !tags.includes(tag)
                                    )
                                    .map((tag) => (
                                        <button
                                            key={tag}
                                            type="button"
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                            onClick={() => addTag(tag)}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* Tag chips */}
                    <div className="flex flex-wrap gap-2 mt-3">
                        {tags.map((tag) => (
                            <div
                                key={tag}
                                className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
                            >
                                <span>{tag}</span>
                                <button
                                    type="button"
                                    className="ml-1 text-yellow-700 hover:text-yellow-900"
                                    onClick={() => removeTag(tag)}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                        {tags.length === 0 && (
                            <p className="text-sm text-gray-500 italic">
                                No tags added yet
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default newProjectBasicInfo;
