import React, { useState } from "react";
import { useProjectHomeContext } from "@/contexts/ProjectHomeContext";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { AlertCircle, Trash2, Globe, Lock, Settings2, FileText } from "lucide-react";

const ProjectSettingsTabContents = () => {
    const { project, isLoading } = useProjectHomeContext();
    const [isPublic, setIsPublic] = useState(project?.stats?.public ?? false);
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

    const handleEditToggle = () => {
        if (isEditing) {
            handleSaveChanges();
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
            
            // Update the project in context would be ideal here
            // For now, we'll just exit edit mode
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    return (
        <div className="space-y-6 pb-12 max-w-3xl mx-auto">
            {/* Project Details */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-gray-600" />
                            <h3 className="text-lg font-medium text-gray-900">Project Details</h3>
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleEditToggle}
                        >
                            {isEditing ? "Save Changes" : "Edit Details"}
                        </Button>
                    </div>
                </div>
                
                <div className="p-6 space-y-6">
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
                                className="w-full px-3 py-2 border rounded-md bg-white disabled:bg-gray-50/50"
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
                                className="w-full px-3 py-2 border rounded-md bg-white disabled:bg-gray-50/50"
                            />
                        </div>
                    </div>
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
                    <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg border border-gray-100">
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
