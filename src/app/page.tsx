"use client";
import React from "react";
import HomeHero from "@/components/home/HomeHero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ExploreThemes from "@/components/home/ExploreThemes";
import CallToActionSection from "@/components/home/CallToActionSection";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { useRouter } from "next/navigation";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
            <ProjectProvider router={useRouter()}>
                <main>
                    <HomeHero />
                    <FeaturedProjects />
                    <ExploreThemes />
                    <CallToActionSection />
                </main>
            </ProjectProvider>

            {/* CSS for hiding scrollbars */}
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default HomePage;
