import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { UploadDropzone } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";

interface AddBuildStepModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (stepData: { title: string; description: string; images: string[] }) => Promise<void>;
}

type ImageUploadResponse = Array<{
    url: string;
    name: string;
    size: number;
}>;

const AddBuildStepModal: React.FC<AddBuildStepModalProps> = ({ isOpen, onClose, onSave }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUploadComplete = (res: ImageUploadResponse) => {
        if (res && res.length > 0) {
            setImages(prev => [...prev, ...res.map(r => r.url)]);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        if (!title.trim()) return;
        
        setIsSubmitting(true);
        try {
            await onSave({
                title: title.trim(),
                description: description.trim(),
                images
            });
            
            // Reset form
            setTitle("");
            setDescription("");
            setImages([]);
            onClose();
        } catch (error) {
            console.error('Error saving build step:', error);
            alert('Failed to save build step. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setTitle("");
            setDescription("");
            setImages([]);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Add Build Step</h2>
                    <button
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Step Title *
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Built the foundation, Added the roof..."
                            disabled={isSubmitting}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:opacity-50"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe what you did in this step, any challenges you faced, or tips for others..."
                            rows={4}
                            disabled={isSubmitting}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:opacity-50"
                        />
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Progress Photos
                        </label>
                        
                        {/* Uploaded Images Preview */}
                        {images.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                                {images.map((imageUrl, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={imageUrl}
                                            alt={`Upload ${index + 1}`}
                                            className="w-full aspect-square object-cover rounded-lg"
                                        />
                                        <button
                                            onClick={() => removeImage(index)}
                                            disabled={isSubmitting}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Upload Area */}
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                            <UploadDropzone
                                endpoint="imageUploader"
                                onClientUploadComplete={handleUploadComplete}
                                onUploadError={(error: Error) => {
                                    console.error("Upload error:", error);
                                    alert("Failed to upload image. Please try again.");
                                }}
                                appearance={{
                                    container: "w-full flex flex-col items-center gap-4 py-4",
                                    allowedContent: "text-gray-500 text-sm",
                                    button: "ut-ready:bg-indigo-600 ut-ready:hover:bg-indigo-700",
                                    uploadIcon: "text-indigo-600 w-8 h-8",
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                    <button
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!title.trim() || isSubmitting}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <Plus size={16} />
                                Add Step
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddBuildStepModal; 