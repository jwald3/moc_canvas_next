"use client";

import React, { createContext, useContext, useState } from "react";
import { BuildSection, ImageType } from "@/data/sample-data";
import { useRouter } from "next/navigation";

// Mock tag suggestions - moved from page
const tagSuggestions = [
    "Star Wars", "UCS", "Technic", "City", "Creator", "Architecture",
    "Ideas", "MOC", "Microscale", "Space", "Castle", "Harry Potter",
    "Modular", "Vehicle", "Building", "Minifigure", "Seasonal",
];

interface NewProjectContextType {
    // State
    projectName: string;
    description: string;
    selectedStatus: string;
    tagInput: string;
    tags: string[];
    showTagSuggestions: boolean;
    showImageUpload: boolean;
    images: ImageType[];
    imagePreview: ImageType | null;
    imageTitle: string;
    buildSections: BuildSection[];
    isSubmitting: boolean;
    tagSuggestions: string[];
    selectedFile: File | null;
    activeSectionId: number | null;
    setBuildSections: React.Dispatch<React.SetStateAction<BuildSection[]>>;

    // Setters
    setProjectName: (name: string) => void;
    setDescription: (desc: string) => void;
    setSelectedStatus: (status: string) => void;
    setTagInput: (input: string) => void;
    setShowImageUpload: (show: boolean) => void;
    setImageTitle: (title: string) => void;
    setImagePreview: (preview: ImageType | null) => void;
    setSelectedFile: (file: File | null) => void;
    setActiveSectionId: (id: number | null) => void;

    // Handlers
    handleTagInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
    handleTagKeyPress: (e: React.KeyboardEvent) => void;
    handleFileSelect: (file: File) => void;
    handleImageUpload: () => void;
    addImageToSection: (sectionId: number) => void;
    removeSection: (sectionId: number) => void;
    addNewSection: () => void;
    updateSectionField: (sectionId: number, field: keyof BuildSection, value: string) => void;
    removeImage: (imageId: number) => void;
    handleSubmit: (e?: React.FormEvent) => void;
}

const NewProjectContext = createContext<NewProjectContextType | undefined>(undefined);

interface NewProjectProviderProps {
    children: React.ReactNode;
}

export const NewProjectProvider = ({ children }: NewProjectProviderProps) => {
    // State management
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
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [activeSectionId, setActiveSectionId] = useState<number | null>(null);

    // Handlers
    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTagInput(value);
        setShowTagSuggestions(value.length > 0);
    };

    const addTag = (tag: string) => {
        if (tag && !tags.includes(tag) && tag.length <= 30) {
            setTags([...tags, tag]);
            setTagInput("");
            setShowTagSuggestions(false);
        } else if (tag.length > 30) {
            alert("Tag must be 30 characters or less");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleTagKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && tagInput) {
            e.preventDefault();
            addTag(tagInput);
        }
    };

    const handleFileSelect = (file: File) => {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid image file (PNG, JPG, or GIF)');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        setSelectedFile(file);
    };

    const handleImageUpload = () => {
        if (imageTitle && selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            const newImage: ImageType = {
                id: Date.now(),
                url: imageUrl,
                title: imageTitle,
            };

            if (activeSectionId) {
                // Add image to build section
                setBuildSections(
                    buildSections.map((section) => {
                        if (section.id === activeSectionId) {
                            return {
                                ...section,
                                images: [...section.images, newImage],
                            };
                        }
                        return section;
                    })
                );
                setActiveSectionId(null);
            } else {
                // Add image to main project images
                if (imagePreview) {
                    setImages([...images, newImage]);
                } else {
                    setImagePreview(newImage);
                }
            }

            setImageTitle("");
            setSelectedFile(null);
            setShowImageUpload(false);
        }
    };

    const addImageToSection = (sectionId: number) => {
        setActiveSectionId(sectionId);
        setShowImageUpload(true);
    };

    const removeSection = (sectionId: number) => {
        if (buildSections.length > 1) {
            setBuildSections(buildSections.filter((section) => section.id !== sectionId));
        }
    };

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

    const removeImage = (imageId: number) => {
        setImages(images.filter((img) => img.id !== imageId));
    };

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

    const value = {
        // State
        projectName,
        description,
        selectedStatus,
        tagInput,
        tags,
        showTagSuggestions,
        showImageUpload,
        images,
        imagePreview,
        imageTitle,
        buildSections,
        isSubmitting,
        tagSuggestions,
        selectedFile,
        activeSectionId,
        setBuildSections,

        // Setters
        setProjectName,
        setDescription,
        setSelectedStatus,
        setTagInput,
        setShowImageUpload,
        setImageTitle,
        setImagePreview,
        setSelectedFile,
        setActiveSectionId,

        // Handlers
        handleTagInputChange,
        addTag,
        removeTag,
        handleTagKeyPress,
        handleFileSelect,
        handleImageUpload,
        addImageToSection,
        removeSection,
        addNewSection,
        updateSectionField,
        removeImage,
        handleSubmit,
    };

    return (
        <NewProjectContext.Provider value={value}>
            {children}
        </NewProjectContext.Provider>
    );
};

export const useNewProjectContext = () => {
    const context = useContext(NewProjectContext);
    if (context === undefined) {
        throw new Error("useNewProject must be used within a NewProjectProvider");
    }
    return context;
};
