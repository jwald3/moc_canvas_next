import React from "react";
import { Info, Trash2, Plus } from "lucide-react";
import { useNewProjectContext } from "@/contexts/NewProjectContext";

const newProjectBuildSections = () => {

    const { buildSections, addNewSection, removeSection, updateSectionField, addImageToSection } = useNewProjectContext();

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-800">
                    Build Showcase
                </h2>
                <div className="flex items-center text-xs text-gray-500">
                    <Info size={14} className="mr-1" />
                    Highlight different aspects of your build
                </div>
            </div>
            <div className="p-6 space-y-6">
                {buildSections.map((section, index) => (
                    <div
                        key={section.id}
                        className="border border-gray-200 rounded-lg p-4"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium text-gray-800">
                                {section.sectionTitle || `Section ${index + 1}`}
                            </h3>
                            {buildSections.length > 1 && (
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-red-500"
                                    onClick={() => removeSection(section.id)}
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor={`sectionTitle-${section.id}`}
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Section Title
                                </label>
                                <input
                                    type="text"
                                    id={`sectionTitle-${section.id}`}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                    placeholder="e.g., Cockpit Details, Hidden Features"
                                    value={section.sectionTitle}
                                    onChange={(e) =>
                                        updateSectionField(
                                            section.id,
                                            "sectionTitle",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor={`sectionDescription-${section.id}`}
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Description
                                </label>
                                <textarea
                                    id={`sectionDescription-${section.id}`}
                                    rows={2}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                    placeholder="Describe what's special about this part of your build..."
                                    value={section.description}
                                    onChange={(e) =>
                                        updateSectionField(
                                            section.id,
                                            "description",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Photos
                                    </label>
                                    <button
                                        type="button"
                                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                                        onClick={() =>
                                            addImageToSection(section.id)
                                        }
                                    >
                                        <Plus size={14} className="mr-1" /> Add
                                        Photo
                                    </button>
                                </div>

                                {section.images.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {section.images.map(
                                            (image, imgIndex) => (
                                                <div
                                                    key={image.id}
                                                    className="relative rounded overflow-hidden border border-gray-200"
                                                >
                                                    <img
                                                        src={image.url}
                                                        alt={`Section ${
                                                            index + 1
                                                        } Image ${
                                                            imgIndex + 1
                                                        }`}
                                                        className="w-full aspect-square object-cover"
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-xs text-gray-500 italic">
                                        No images added for this section
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    className="w-full border border-dashed border-yellow-300 hover:border-yellow-500 rounded-lg p-3 flex items-center justify-center text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 transition-colors"
                    onClick={addNewSection}
                >
                    <Plus size={18} className="mr-2" />
                    Add Another Section
                </button>
            </div>
        </div>
    );
};

export default newProjectBuildSections;
