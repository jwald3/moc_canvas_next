import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Bookmark, Share2 } from "lucide-react";
import { useProjectHomeContext } from "@/contexts/ProjectHomeContext";
import { useUser } from "@clerk/nextjs";

const SingleProjectHeader = () => {
    const router = useRouter();
    const { project, isOwner } = useProjectHomeContext();
    const { user } = useUser();
    const [isSaved, setIsSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Check if project is saved by current user
    useEffect(() => {
        const checkSavedStatus = async () => {
            if (!user || !project || isOwner) return;

            try {
                const response = await fetch(`/api/projects/${project.id}/save/status`);
                if (response.ok) {
                    const data = await response.json();
                    setIsSaved(data.saved);
                }
            } catch (error) {
                console.error('Error checking saved status:', error);
            }
        };

        checkSavedStatus();
    }, [user, project, isOwner]);

    const handleSaveToggle = async () => {
        if (!user || !project || isOwner) return;

        setIsLoading(true);
        try {
            const method = isSaved ? 'DELETE' : 'POST';
            const response = await fetch(`/api/projects/${project.id}/save`, {
                method,
            });

            if (response.ok) {
                const data = await response.json();
                setIsSaved(data.saved);
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to update saved status');
            }
        } catch (error) {
            console.error('Error toggling save status:', error);
            alert('Failed to update saved status');
        } finally {
            setIsLoading(false);
        }
    };

    const handleShare = async () => {
        if (navigator.share && project) {
            try {
                await navigator.share({
                    title: project.title,
                    text: project.description,
                    url: window.location.href,
                });
            } catch (error) {
                // Fallback to clipboard
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
                console.log(error)
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            className="mr-3 p-2 rounded-full hover:bg-gray-100"
                            onClick={() => router.back()}
                        >
                            <ChevronLeft size={20} className="text-gray-700" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-800">
                            {project?.title}
                        </h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        {/* Only show save button for non-owners and authenticated users */}
                        {user && !isOwner && (
                            <button 
                                className={`p-2 rounded-full transition-colors ${
                                    isSaved 
                                        ? 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200' 
                                        : 'hover:bg-gray-100 text-gray-700'
                                }`}
                                onClick={handleSaveToggle}
                                disabled={isLoading}
                                title={isSaved ? 'Remove from saved' : 'Save project'}
                            >
                                <Bookmark 
                                    size={20} 
                                    className={isLoading ? 'animate-pulse' : ''}
                                    fill={isSaved ? 'currentColor' : 'none'}
                                />
                            </button>
                        )}
                        <button 
                            className="p-2 rounded-full hover:bg-gray-100"
                            onClick={handleShare}
                            title="Share project"
                        >
                            <Share2 size={20} className="text-gray-700" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProjectHeader;
