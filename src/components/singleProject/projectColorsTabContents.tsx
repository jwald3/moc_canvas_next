import React, { useState, useEffect } from "react";
import { useProjectHomeContext } from "@/contexts/ProjectHomeContext";
import colors from "@/lib/colors";
import { Palette, Check, X } from "lucide-react";

const ProjectColorsTabContents = () => {
    const { project, isLoading, isOwner } = useProjectHomeContext();
    const [selectedColors, setSelectedColors] = useState<number[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Initialize selected colors from localStorage for now
    useEffect(() => {
        if (project?.id) {
            const stored = localStorage.getItem(`project-colors-${project.id}`);
            if (stored) {
                try {
                    setSelectedColors(JSON.parse(stored));
                } catch (error) {
                    console.error('Error parsing stored colors:', error);
                }
            }
        }
    }, [project?.id]);

    // Filter colors based on search term
    const filteredColors = colors.filter(color => 
        color.bricklinkColorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        color.semanticThemes.some(theme => 
            theme.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleColorToggle = (colorId: number) => {
        if (!isEditing) return;

        setSelectedColors(prev => {
            if (prev.includes(colorId)) {
                return prev.filter(id => id !== colorId);
            } else if (prev.length < 8) {
                return [...prev, colorId];
            }
            return prev;
        });
    };

    const handleSave = async () => {
        if (!project?.id) return;

        setIsSaving(true);
        try {
            localStorage.setItem(`project-colors-${project.id}`, JSON.stringify(selectedColors));
            
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating color palette:', error);
            alert('Failed to update color palette. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        // Restore from localStorage
        if (project?.id) {
            const stored = localStorage.getItem(`project-colors-${project.id}`);
            if (stored) {
                try {
                    setSelectedColors(JSON.parse(stored));
                } catch (error) {
                    setSelectedColors([]);
                }
            } else {
                setSelectedColors([]);
            }
        }
        setIsEditing(false);
    };

    const getSelectedColorObjects = () => {
        return colors.filter(color => selectedColors.includes(color.bricklinkColorId));
    };

    if (isLoading) {
        return (
            <div className="space-y-6 pb-12 animate-pulse">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                        {[...Array(24)].map((_, i) => (
                            <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-12">
            {/* Selected Colors Display */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Palette className="w-5 h-5 text-gray-600" />
                            <h3 className="text-lg font-medium text-gray-900">Project Colors</h3>
                        </div>
                        {isOwner && !isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                            >
                                Edit Colors
                            </button>
                        )}
                        {isEditing && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleCancel}
                                    disabled={isSaving}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Save Colors
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6">
                    {selectedColors.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="bg-gray-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <Palette className="w-8 h-8 text-gray-400" />
                            </div>
                            <h4 className="font-medium text-gray-900 mb-2">No colors selected</h4>
                            <p className="text-sm text-gray-500 mb-4">
                                {isOwner 
                                    ? "Select up to 8 LEGO colors that best represent your build. This helps others understand your project's color scheme at a glance."
                                    : "This project doesn't have any colors selected yet."
                                }
                            </p>
                            {isOwner && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                                >
                                    Select Colors
                                </button>
                            )}
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-medium text-gray-900">
                                    Selected Colors ({selectedColors.length}/8)
                                </h4>
                                {isEditing && (
                                    <p className="text-sm text-gray-500">
                                        Click colors below to add or remove them
                                    </p>
                                )}
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {getSelectedColorObjects().map((color) => (
                                    <div
                                        key={color.bricklinkColorId}
                                        className={`relative group ${
                                            isEditing ? 'cursor-pointer' : ''
                                        }`}
                                        onClick={() => handleColorToggle(color.bricklinkColorId)}
                                    >
                                        <div 
                                            className="aspect-square rounded-lg border-2 border-gray-200 relative overflow-hidden"
                                            style={{ backgroundColor: color.hexCode }}
                                        >
                                            {isEditing && (
                                                <div className="absolute top-2 right-2">
                                                    <div className="bg-red-500 text-white rounded-full p-1">
                                                        <X className="w-3 h-3" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {color.bricklinkColorName}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Color Picker (only show when editing) */}
            {isEditing && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                        <h3 className="text-lg font-medium text-gray-900">Choose Colors</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Select up to 8 colors from the LEGO color palette
                        </p>
                    </div>

                    <div className="p-6">
                        {/* Search */}
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Search colors by name or theme (e.g., 'red', 'ocean', 'metallic')..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            />
                        </div>

                        {/* Selection Status */}
                        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <p className="text-sm text-gray-600">
                                {selectedColors.length}/8 colors selected
                            </p>
                            {selectedColors.length >= 8 && (
                                <p className="text-sm text-amber-600">
                                    Maximum colors reached. Remove a color to add another.
                                </p>
                            )}
                        </div>

                        {/* Color Grid - Tighter layout */}
                        <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                            <div className="max-h-80 overflow-y-auto overflow-x-hidden">
                                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-1">
                                    {filteredColors.map((color) => {
                                        const isSelected = selectedColors.includes(color.bricklinkColorId);
                                        const canSelect = selectedColors.length < 8 || isSelected;

                                        return (
                                            <div
                                                key={color.bricklinkColorId}
                                                className={`relative group cursor-pointer ${
                                                    !canSelect ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                                onClick={() => canSelect && handleColorToggle(color.bricklinkColorId)}
                                                title={color.bricklinkColorName}
                                            >
                                                <div 
                                                    className={`aspect-square rounded border-2 transition-all ${
                                                        isSelected 
                                                            ? 'border-indigo-500 ring-1 ring-indigo-500/30' 
                                                            : 'border-gray-300 hover:border-gray-400'
                                                    }`}
                                                    style={{ backgroundColor: color.hexCode }}
                                                >
                                                    {isSelected && (
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="bg-indigo-500 text-white rounded-full p-0.5">
                                                                <Check className="w-2 h-2" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {filteredColors.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No colors found matching your search.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectColorsTabContents; 