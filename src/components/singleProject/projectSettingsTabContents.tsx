import React, { useState } from "react";
import { useProjectHomeContext } from "@/contexts/ProjectHomeContext";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { AlertCircle, Trash2, Globe, Lock, Settings2, FileText } from "lucide-react";

const ProjectSettingsTabContents = () => {
    const { project, isLoading, updateProject } = useProjectHomeContext();
    const [isPublic, setIsPublic] = useState(project?.public ?? false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(project?.title || "");
    const [description, setDescription] = useState(project?.description || "");

    if (isLoading) {
        return (
            <div className="space-y-6 pb-12 animate-pulse">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="space-y-4">
                        <div className="h-12 bg-gray-200 rounded"></div>
                        <div className="h-12 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    const handleVisibilityChange = () => {
        setIsPublic(!isPublic);
    };

    const handleDeleteProject = async () => {
        if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            return;
        }

        try {
            setIsDeleting(true);
            const response = await fetch(`/api/projects/${project?.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete project');
            window.location.href = '/projects';
        } catch (error) {
            console.error('Error deleting project:', error);
            setIsDeleting(false);
        }
    };

    const handleEditToggle = async () => {
        if (isEditing) {
            await handleSaveChanges();
        }
        setIsEditing(!isEditing);
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`/api/projects/${project?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    title, 
                    description 
                }),
            });

            if (!response.ok) throw new Error('Failed to update project');
            
            const updatedProject = await response.json();
            updateProject(updatedProject);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    return (
        <div className="space-y-6 pb-12">
            {/* Project Details */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-gray-600" />
                            <h3 className="text-lg font-medium text-gray-900">Project Details</h3>
                        </div>
                        <Button
                            variant={isEditing ? "default" : "outline"}
                            onClick={handleEditToggle}
                            className={`gap-2 py-2 px-4 ${
                                isEditing 
                                    ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                                    : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                            {isEditing ? (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Save Changes
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    Edit Details
                                </>
                            )}
                        </Button>
                    </div>
                </div>
                
                <div className={`p-6 space-y-6 transition-colors ${isEditing ? "bg-blue-50/20" : ""}`}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Project Name
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={!isEditing}
                                className={`w-full px-3 py-2 border rounded-md transition-colors
                                    ${isEditing 
                                        ? "bg-white border-indigo-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" 
                                        : "bg-gray-50 border-gray-200"
                                    }
                                `}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                disabled={!isEditing}
                                rows={3}
                                className={`w-full px-3 py-2 border rounded-md transition-colors
                                    ${isEditing 
                                        ? "bg-white border-indigo-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" 
                                        : "bg-gray-50 border-gray-200"
                                    }
                                `}
                            />
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex items-center gap-2 pt-2 text-sm text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Click &#39;Save Changes&#39; when you&#39;re done editing
                        </div>
                    )}
                </div>
            </div>

            {/* Project Settings */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                    <div className="flex items-center gap-2">
                        <Settings2 className="w-5 h-5 text-gray-600" />
                        <h3 className="text-lg font-medium text-gray-900">Project Settings</h3>
                    </div>
                </div>
                
                <div className="p-6">
                    {/* Visibility Toggle */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                {isPublic ? (
                                    <Globe className="w-5 h-5 text-blue-500" />
                                ) : (
                                    <Lock className="w-5 h-5 text-gray-600" />
                                )}
                                <h4 className="font-medium text-gray-900">Project Visibility</h4>
                            </div>
                            <p className="text-sm text-gray-600">
                                {isPublic 
                                    ? "Anyone can view this project" 
                                    : "Only you can view this project"}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`text-sm ${!isPublic ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                Private
                            </span>
                            <Switch 
                                checked={isPublic} 
                                onCheckedChange={handleVisibilityChange}
                                className="data-[state=checked]:bg-blue-500"
                            />
                            <span className={`text-sm ${isPublic ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                Public
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-red-100">
                <div className="border-b border-red-100 bg-red-50/50 px-6 py-4">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <h3 className="text-lg font-medium text-red-500">Danger Zone</h3>
                    </div>
                </div>
                
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900">Delete Project</h4>
                            <p className="text-sm text-gray-500">
                                Once deleted, you cannot recover this project
                            </p>
                        </div>
                        <Button 
                            variant="destructive"
                            onClick={handleDeleteProject}
                            disabled={isDeleting}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {isDeleting ? "Deleting..." : "Delete Project"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectSettingsTabContents;
