"use client";
import { useRef } from 'react';
import AppImage from "@/components/ui/images/AppImage";
import AvatarImage from "@/components/ui/images/AvatarImage";
import BannerImage from "@/components/ui/images/BannerImage";
import HeroBanner from "@/components/ui/images/HeroBanner";
import ThumbnailImage from "@/components/ui/images/ThumbnailImage";
import ProjectPreviewCard from "@/components/ui/projects/ProjectPreviewCard";
import ProjectList from "@/components/ui/projects/ProjectList";

export default function Home() {
    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col gap-8 py-10 pb-12">
                <div className="flex items-center justify-between">
                    <h1 className="text-[32px] font-bold text-gray-900">My Projects</h1>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
                        Add New Project
                    </button>
                </div>
                <ProjectList />
            </div>
        </div>
    );
}
