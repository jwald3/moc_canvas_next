"use client";

import React, { useState } from "react";
import {
    ChevronLeft,
    Plus,
    Image,
    Tag,
    Clock,
    Trash2,
    X,
    Upload,
    Save,
    Info,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { statusOptions, BuildSection, ImageType } from "@/data/sample-data";
import TipsCard from "@/components/newProject/tipsCard";
import NewProjectHeader from "@/components/newProject/newProjectHeader";
import ProjectPreviewCard from "@/components/newProject/projectPreviewCard";
import NewProjectBasicInfo from "@/components/newProject/newProjectBasicInfo";

// Mock tag suggestions
const tagSuggestions = [
    "Star Wars",
    "UCS",
    "Technic",
    "City",
    "Creator",
    "Architecture",
    "Ideas",
    "MOC",
    "Microscale",
    "Space",
    "Castle",
    "Harry Potter",
    "Modular",
    "Vehicle",
    "Building",
    "Minifigure",
    "Seasonal",
];

const NewProjectPage = () => {
    const router = useRouter();

    // State with proper typing
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("Planning");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [showTagSuggestions, setShowTagSuggestions] = useState(false);
    const [showImageUpload, setShowImageUpload] = useState(false);
    const [images, setImages] = useState<ImageType[]>([]);
    const [imagePreview, setImagePreview] = useState<ImageType | null>(null);
    const [imageTitle, setImageTitle] = useState("");
    const [buildSections, setBuildSections] = useState<BuildSection[]>([
        { id: 1, sectionTitle: "", description: "", images: [] },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle tag input
    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTagInput(value);
        setShowTagSuggestions(value.length > 0);
    };

    // Add tag
    const addTag = (tag: string) => {
        if (tag && !tags.includes(tag) && tag.length <= 30) {
            setTags([...tags, tag]);
            setTagInput("");
            setShowTagSuggestions(false);
        } else if (tag.length > 30) {
            alert("Tag must be 30 characters or less");
        }
    };

    // Remove tag
    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    // Handle key press in tag input
    const handleTagKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && tagInput) {
            e.preventDefault();
            addTag(tagInput);
        }
    };

    // Mock image upload
    const handleImageUpload = () => {
        if (imageTitle) {
            const newImageUrl = `/api/placeholder/800/600?text=${encodeURIComponent(
                imageTitle
            )}`;
            const newImage: ImageType = {
                id: Date.now(),
                url: newImageUrl,
                title: imageTitle,
            };

            if (imagePreview) {
                setImages([...images, newImage]);
            } else {
                setImagePreview(newImage);
            }

            setImageTitle("");
            setShowImageUpload(false);
        }
    };

    // Add image to section
    const addImageToSection = (sectionId: number) => {
        setBuildSections(
            buildSections.map((section) => {
                if (section.id === sectionId) {
                    const newImage: ImageType = {
                        id: Date.now(),
                        url: `/api/placeholder/400/300?text=${encodeURIComponent(
                            section.sectionTitle
                        )}`,
                        title: section.sectionTitle,
                    };
                    return {
                        ...section,
                        images: [...section.images, newImage],
                    };
                }
                return section;
            })
        );
    };

    // Remove section
    const removeSection = (sectionId: number) => {
        if (buildSections.length > 1) {
            setBuildSections(
                buildSections.filter((section) => section.id !== sectionId)
            );
        }
    };

    // Add new section
    const addNewSection = () => {
        setBuildSections([
            ...buildSections,
            {
                id: Date.now(),
                sectionTitle: "",
                description: "",
                images: [],
            },
        ]);
    };

    // Update section field
    const updateSectionField = (
        sectionId: number,
        field: keyof BuildSection,
        value: string
    ) => {
        setBuildSections(
            buildSections.map((section) => {
                if (section.id === sectionId) {
                    return { ...section, [field]: value };
                }
                return section;
            })
        );
    };

    // Remove image
    const removeImage = (imageId: number) => {
        setImages(images.filter((img) => img.id !== imageId));
    };

    // Handle form submission
    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            console.log({
                name: projectName,
                description,
                status: selectedStatus,
                tags,
                mainImage: imagePreview,
                additionalImages: images,
                buildSections: buildSections,
            });

            setIsSubmitting(false);
            alert("Project created successfully!");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <NewProjectHeader
                isSubmitting={isSubmitting}
                handleSubmit={handleSubmit}
            />

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main form section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Tips Card */}
                        <TipsCard />

                        {/* Basic Info Card */}
                        <NewProjectBasicInfo 
                            projectName={projectName}
                            setProjectName={setProjectName}
                            description={description}
                            setDescription={setDescription}
                            selectedStatus={selectedStatus}
                            setSelectedStatus={setSelectedStatus}
                            tagInput={tagInput}
                            setTagInput={setTagInput}
                            showTagSuggestions={showTagSuggestions}
                            handleTagInputChange={handleTagInputChange}
                            handleTagKeyPress={handleTagKeyPress}
                            tags={tags}
                            addTag={addTag}
                            removeTag={removeTag}
                            tagSuggestions={tagSuggestions}
                        />

                        {/* Project Images Card */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="border-b border-gray-100 px-6 py-4">
                                <h2 className="text-lg font-medium text-gray-800">
                                    Project Images
                                </h2>
                            </div>
                            <div className="p-6">
                                {/* Main Project Image */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                                        Main Project Image
                                    </h3>

                                    {!imagePreview ? (
                                        <div
                                            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-yellow-500 transition-colors"
                                            onClick={() =>
                                                setShowImageUpload(true)
                                            }
                                        >
                                            <div className="mx-auto h-12 w-12 text-gray-400">
                                                <Image size={48} />
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Click to upload your main
                                                    project image
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    PNG, JPG, GIF up to 5MB
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative rounded-lg overflow-hidden border border-gray-200">
                                            <img
                                                src={imagePreview.url}
                                                alt={imagePreview.title}
                                                className="w-full aspect-video object-cover"
                                            />
                                            <div className="absolute top-2 right-2 flex space-x-2">
                                                <button
                                                    type="button"
                                                    className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
                                                    onClick={() =>
                                                        setImagePreview(null)
                                                    }
                                                >
                                                    <Trash2
                                                        size={16}
                                                        className="text-red-500"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Additional Images */}
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-sm font-medium text-gray-700">
                                            Additional Images
                                        </h3>
                                        <button
                                            type="button"
                                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                                            onClick={() =>
                                                setShowImageUpload(true)
                                            }
                                        >
                                            <Plus size={16} className="mr-1" />{" "}
                                            Add Image
                                        </button>
                                    </div>

                                    {images.length > 0 ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {images.map((image) => (
                                                <div
                                                    key={image.id}
                                                    className="relative rounded-lg overflow-hidden border border-gray-200"
                                                >
                                                    <img
                                                        src={image.url}
                                                        alt={image.title}
                                                        className="w-full aspect-square object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button
                                                            type="button"
                                                            className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
                                                            onClick={() =>
                                                                removeImage(
                                                                    image.id
                                                                )
                                                            }
                                                        >
                                                            <Trash2
                                                                size={16}
                                                                className="text-red-500"
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 italic">
                                            No additional images added yet
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Build Sections Card */}
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
                                                {section.sectionTitle ||
                                                    `Section ${index + 1}`}
                                            </h3>
                                            {buildSections.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="text-gray-400 hover:text-red-500"
                                                    onClick={() =>
                                                        removeSection(
                                                            section.id
                                                        )
                                                    }
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
                                                            addImageToSection(
                                                                section.id
                                                            )
                                                        }
                                                    >
                                                        <Plus
                                                            size={14}
                                                            className="mr-1"
                                                        />{" "}
                                                        Add Photo
                                                    </button>
                                                </div>

                                                {section.images.length > 0 ? (
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                        {section.images.map(
                                                            (
                                                                image,
                                                                imgIndex
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        image.id
                                                                    }
                                                                    className="relative rounded overflow-hidden border border-gray-200"
                                                                >
                                                                    <img
                                                                        src={
                                                                            image.url
                                                                        }
                                                                        alt={`Section ${
                                                                            index +
                                                                            1
                                                                        } Image ${
                                                                            imgIndex +
                                                                            1
                                                                        }`}
                                                                        className="w-full aspect-square object-cover"
                                                                    />
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                ) : (
                                                    <p className="text-xs text-gray-500 italic">
                                                        No images added for this
                                                        section
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
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Preview Card - Scrolls below Tips */}
                        <ProjectPreviewCard
                            imagePreview={
                                imagePreview
                                    ? { url: imagePreview.url }
                                    : { url: "/images/app-image-demo.jpg" }
                            }
                            projectName={projectName}
                            tags={tags}
                            selectedStatus={selectedStatus}
                            description={description}
                            isSubmitting={isSubmitting}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </div>

            {/* Image Upload Modal */}
            {showImageUpload && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center px-4">
                        <div className="fixed inset-0 bg-black opacity-50 transition-opacity"></div>

                        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-10">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Add Image
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-gray-500"
                                    onClick={() => setShowImageUpload(false)}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="imageTitle"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Image Title
                                    </label>
                                    <input
                                        type="text"
                                        id="imageTitle"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                        placeholder="e.g., Main View"
                                        value={imageTitle}
                                        onChange={(e) =>
                                            setImageTitle(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Upload Image
                                    </label>
                                    <div
                                        className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-yellow-500 transition-colors"
                                        onClick={handleImageUpload}
                                    >
                                        <div className="mx-auto h-12 w-12 text-gray-400">
                                            <Upload size={36} />
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Click to upload or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                PNG, JPG, GIF up to 5MB
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4 space-x-3 border-t border-gray-100">
                                    <button
                                        type="button"
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                        onClick={() =>
                                            setShowImageUpload(false)
                                        }
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                        onClick={handleImageUpload}
                                        disabled={!imageTitle}
                                    >
                                        Add Image
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewProjectPage;
