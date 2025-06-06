import React from "react";
import { Info, Trash2, Plus, X } from "lucide-react";
import { useNewProjectContext } from "@/contexts/NewProjectContext";
import Image from "next/image";

const NewProjectBuildSections = () => {

    const { buildSections, addNewSection, removeSection, updateSectionField, addImageToSection, setBuildSections } = useNewProjectContext();

    // Helper function to generate consistent IDs
    const getSectionFieldId = (sectionId: string, fieldName: string) => {
        return `${sectionId}-${fieldName}`;
    };

    const removeSectionImage = (sectionId: string, imageId: string) => {
        setBuildSections(
            buildSections.map((section) => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        images: section.images.filter((img) => img.id !== imageId),
                    };
                }
                return section;
            })
        );
    };

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
                                {section.title || `Section ${index + 1}`}
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 hover:text-red-500"
                                onClick={() => removeSection(section.id)}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor={getSectionFieldId(section.id, 'title')}
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Section Title
                                </label>
                                <input
                                    type="text"
                                    id={getSectionFieldId(section.id, 'title')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#da5249]"
                                    style={{
                                        '--tw-ring-color': '#da5249',
                                    } as React.CSSProperties}
                                    placeholder="e.g., Cockpit Details, Hidden Features"
                                    value={section.title}
                                    onChange={(e) =>
                                        updateSectionField(
                                            section.id,
                                            "title",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor={getSectionFieldId(section.id, 'description')}
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Description
                                </label>
                                <textarea
                                    id={getSectionFieldId(section.id, 'description')}
                                    rows={2}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#da5249]"
                                    style={{
                                        '--tw-ring-color': '#da5249',
                                    } as React.CSSProperties}
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
                                        className="text-xs font-medium flex items-center hover:opacity-80"
                                        style={{ color: '#da5249' }}
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
                                        {section.images.map((image, imgIndex) => (
                                            <div
                                                key={image.id}
                                                className="relative rounded overflow-hidden border border-gray-200 group"
                                            >
                                                <Image
                                                    src={image.url}
                                                    alt={`${image.caption || `Section ${index + 1} Image ${imgIndex + 1}`}`}
                                                    className="w-full aspect-square object-cover"
                                                    width={300}
                                                    height={300}
                                                />
                                                <button
                                                    onClick={() => removeSectionImage(section.id, image.id)}
                                                    className="absolute top-1 right-1 p-1 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={14} className="text-gray-600" />
                                                </button>
                                            </div>
                                        ))}
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

                {buildSections.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <p className="text-sm text-gray-600 font-medium">No build sections yet</p>
                        <p className="text-xs text-gray-500 mt-1">
                            Add sections to showcase different aspects of your build
                        </p>
                    </div>
                ) : null}

                <button
                    type="button"
                    className="w-full border-2 border-dashed rounded-lg p-3 flex items-center justify-center font-medium transition-colors"
                    style={{
                        borderColor: '#f8d7d5',
                        color: '#da5249',
                        backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#da5249';
                        e.currentTarget.style.backgroundColor = '#f8d7d5';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#f8d7d5';
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={addNewSection}
                >
                    <Plus size={18} className="mr-2" />
                    Add {buildSections.length === 0 ? 'First' : 'Another'} Section
                </button>
            </div>
        </div>
    );
};

export default NewProjectBuildSections;
