"use client";

import React, { createContext, useContext, useState } from "react";
import { ProjectBuildStepObject, ProjectImageObject } from "@/types/hand_spun_datatypes";
import { v4 as uuidv4 } from 'uuid';

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
    images: ProjectImageObject[];
    imagePreview: ProjectImageObject | null;
    imageTitle: string;
    buildSections: ProjectBuildStepObject[];
    isSubmitting: boolean;
    tagSuggestions: string[];
    selectedFile: File | null;
    activeSectionId: string | null;
    setBuildSections: React.Dispatch<React.SetStateAction<ProjectBuildStepObject[]>>;

    // Setters
    setProjectName: (name: string) => void;
    setDescription: (desc: string) => void;
    setSelectedStatus: (status: string) => void;
    setTagInput: (input: string) => void;
    setShowImageUpload: (show: boolean) => void;
    setImageTitle: (title: string) => void;
    setImagePreview: (preview: ProjectImageObject | null) => void;
    setSelectedFile: (file: File | null) => void;
    setActiveSectionId: (id: string | null) => void;

    // Handlers
    handleTagInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
    handleTagKeyPress: (e: React.KeyboardEvent) => void;
    handleFileSelect: (file: File) => void;
    handleImageUpload: () => void;
    addImageToSection: (sectionId: string) => void;
    removeSection: (sectionId: string) => void;
    addNewSection: () => void;
    updateSectionField: (sectionId: string, field: keyof ProjectBuildStepObject, value: string) => void;
    removeImage: (imageId: string) => void;
    handleSubmit: (e?: React.FormEvent) => void;
    addImage: (image: ProjectImageObject) => void;
}

const NewProjectContext = createContext<NewProjectContextType | undefined>(undefined);

interface NewProjectProviderProps {
    children: React.ReactNode;
}

// Create a utility function for generating deterministic IDs
const generateDeterministicId = (index: number) => `section-${index + 1}`;

export const NewProjectProvider = ({ children }: NewProjectProviderProps) => {
    // State management
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("Planning");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [showTagSuggestions, setShowTagSuggestions] = useState(false);
    const [showImageUpload, setShowImageUpload] = useState(false);
    const [images, setImages] = useState<ProjectImageObject[]>([]);
    const [imagePreview, setImagePreview] = useState<ProjectImageObject | null>(null);
    const [imageTitle, setImageTitle] = useState("");
    const [buildSections, setBuildSections] = useState<ProjectBuildStepObject[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

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
            const newImage: ProjectImageObject = {
                id: uuidv4(),
                buildStepId: activeSectionId || "",
                url: imageUrl,
                caption: imageTitle,
                order: 0,
                // Set type based on whether it's a section image or standalone
                type: activeSectionId ? "progress" : "standalone"
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
                // Check additional images limit for standalone images
                const standaloneImageCount = images.filter(img => img.type === "standalone").length;
                if (standaloneImageCount >= 10) {
                    alert("You can only add up to 10 additional project images");
                    return;
                }
                
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

    const addImageToSection = (sectionId: string) => {
        setActiveSectionId(sectionId);
        setShowImageUpload(true);
    };

    const removeSection = (sectionId: string) => {
        setBuildSections(prevSections => {
            const updatedSections = prevSections.filter(section => section.id !== sectionId);
            // Update the order of remaining sections
            return updatedSections.map((section, index) => ({
                ...section,
                order: index
            }));
        });
    };

    const addNewSection = () => {
        setBuildSections(prevSections => {
            const newSectionIndex = prevSections.length;
            return [
                ...prevSections,
                {
                    id: generateDeterministicId(newSectionIndex),
                    projectId: "",
                    title: "",
                    description: "",
                    images: [],
                    order: newSectionIndex
                },
            ];
        });
    };

    const updateSectionField = (
        sectionId: string,
        field: keyof ProjectBuildStepObject,
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

    const removeImage = (imageId: string) => {
        setImages(images.filter((img) => img.id !== imageId));
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setIsSubmitting(true);

        try {
            // Prepare the project data
            const projectData = {
                title: projectName,
                description,
                status: selectedStatus,
                tags,
                mainImage: imagePreview,
                images: images,
                buildSections: buildSections.map(section => ({
                    title: section.title,
                    description: section.description,
                    images: section.images
                }))
            };

            // Make the API call
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                throw new Error('Failed to create project');
            }

            const createdProject = await response.json();
            
            alert("Project created successfully!");
            
            window.location.href = `/projects/${createdProject.id}`;
        } catch (error) {
            console.error('Error creating project:', error);
            alert("Failed to create project. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const addImage = (image: ProjectImageObject) => {
        // Count only standalone images (not progress images in sections)
        const standaloneImageCount = images.filter(img => img.type === "standalone").length;
        
        if (standaloneImageCount >= 10) {
            alert("You can only add up to 10 additional project images");
            return;
        }
        
        setImages(prev => [...prev, image]);
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
        addImage,
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
