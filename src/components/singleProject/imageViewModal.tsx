import React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ImageViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: Array<{
        id: string;
        url: string;
        caption?: string | null;
    }>;
    currentIndex: number;
    onNavigate: (index: number) => void;
}

const ImageViewModal: React.FC<ImageViewModalProps> = ({
    isOpen,
    onClose,
    images,
    currentIndex,
    onNavigate,
}) => {
    if (!isOpen || !images.length) return null;

    const currentImage = images[currentIndex];
    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < images.length - 1;

    const handlePrevious = () => {
        if (hasPrevious) {
            onNavigate(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (hasNext) {
            onNavigate(currentIndex + 1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            onClose();
        } else if (e.key === "ArrowLeft") {
            handlePrevious();
        } else if (e.key === "ArrowRight") {
            handleNext();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999]"
            onClick={onClose}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
            >
                <X size={24} />
            </button>

            {/* Navigation buttons */}
            {hasPrevious && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handlePrevious();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                >
                    <ChevronLeft size={32} />
                </button>
            )}

            {hasNext && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                >
                    <ChevronRight size={32} />
                </button>
            )}

            {/* Image container */}
            <div 
                className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={currentImage.url}
                    alt={currentImage.caption || "Progress photo"}
                    className="max-w-full max-h-full object-contain"
                    width={1200}
                    height={800}
                    unoptimized
                />
                
                {/* Caption */}
                {currentImage.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white text-center">
                            {currentImage.caption}
                        </p>
                    </div>
                )}
            </div>

            {/* Image counter */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentIndex + 1} of {images.length}
                </div>
            )}
        </div>
    );
};

export default ImageViewModal; 