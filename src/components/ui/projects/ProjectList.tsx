"use client";
import { useRef } from 'react';
import ProjectPreviewCard from './ProjectPreviewCard';

export default function ProjectList() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;
        
        const container = scrollContainerRef.current;
        const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of container width
        
        container.scrollBy({
            left: direction === 'right' ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <div className="relative group">
            <div 
                ref={scrollContainerRef}
                className="grid grid-cols-1 min-[725px]:grid-cols-none min-[725px]:flex min-[725px]:flex-row overflow-x-auto gap-6 hide-scrollbar scroll-smooth pb-4"
            >
                <ProjectPreviewCard />
                <ProjectPreviewCard />
                <ProjectPreviewCard />
                <ProjectPreviewCard />
            </div>
            {/* Scroll indicators */}
            <button 
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 hidden min-[725px]:flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-sm rounded-l-lg shadow-lg cursor-pointer hover:bg-white/90 transition-colors z-10"
            >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
            <button 
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 hidden min-[725px]:flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-sm rounded-r-lg shadow-lg cursor-pointer hover:bg-white/90 transition-colors z-10"
            >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
        </div>
    );
} 