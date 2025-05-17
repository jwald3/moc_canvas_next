"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BuildSection, ImageType } from "@/data/sample-data";
import TipsCard from "@/components/newProject/tipsCard";
import NewProjectHeader from "@/components/newProject/newProjectHeader";
import ProjectPreviewCard from "@/components/newProject/projectPreviewCard";
import NewProjectBasicInfo from "@/components/newProject/newProjectBasicInfo";
import NewProjectImageUpload from "@/components/newProject/newProjectImageUpload";
import NewProjectBuildSections from "@/components/newProject/newProjectBuildSections";
import NewProjectImageUploadModal from "@/components/newProject/newProjectImageUploadModal";

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
                        <NewProjectImageUpload
                            imagePreview={imagePreview}
                            setImagePreview={
                                (preview: { url: string; title: string } | null) => 
                                    setImagePreview(preview ? { ...preview, id: Date.now() } : null)
                            }
                            setShowImageUpload={setShowImageUpload}
                            images={images}
                            removeImage={removeImage}
                        />

                        {/* Build Sections Card */}
                        <NewProjectBuildSections
                            buildSections={buildSections}
                            addSection={addNewSection}
                            removeSection={removeSection}
                            updateSectionField={updateSectionField}
                            addImageToSection={addImageToSection}
                        />
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
                <NewProjectImageUploadModal
                    showImageUpload={showImageUpload}
                    setShowImageUpload={setShowImageUpload}
                    imageTitle={imageTitle}
                    setImageTitle={setImageTitle}
                    handleImageUpload={handleImageUpload}
                />
            )}
        </div>
    );
};

export default NewProjectPage;
