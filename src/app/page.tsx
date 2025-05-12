"use client";
import { useRef } from 'react';
import AppImage from "@/components/ui/images/AppImage";
import AvatarImage from "@/components/ui/images/AvatarImage";
import BannerImage from "@/components/ui/images/BannerImage";
import HeroBanner from "@/components/ui/images/HeroBanner";
import ThumbnailImage from "@/components/ui/images/ThumbnailImage";
import ProjectPreviewCard from "@/components/ui/ProjectPreviewCard";

export default function Home() {
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
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col gap-8 py-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-[32px] font-bold text-gray-900">My Projects</h1>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
                        Add New Project
                    </button>
                </div>
                <div className="relative group">
                    <div 
                        ref={scrollContainerRef}
                        className="grid sm:grid-cols-2 md:grid-cols-none md:flex md:flex-row overflow-x-auto gap-6 hide-scrollbar scroll-smooth"
                    >
                        <ProjectPreviewCard />
                        <ProjectPreviewCard />
                        <ProjectPreviewCard />
                        <ProjectPreviewCard />
                    </div>
                    {/* Scroll indicators */}
                    <button 
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-sm rounded-l-lg shadow-lg cursor-pointer hover:bg-white/90 transition-colors z-10"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <button 
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-sm rounded-r-lg shadow-lg cursor-pointer hover:bg-white/90 transition-colors z-10"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
