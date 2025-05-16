"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ChevronRight,
    Star,
    TrendingUp,
    Gift,
    Users,
    BookOpen,
    Trophy,
    Plus,
} from "lucide-react";
import {
    featuredBuilds,
    categories,
    popularThemes,
} from "@/data/sample-data";
import HomeHero from "@/components/home/HomeHero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ThemeTile from "@/components/home/ThemeTile";
import ExploreThemes from "@/components/home/ExploreThemes";
import CallToActionSection from "@/components/home/CallToActionSection";

// Add this mapping object near the top of the file, after the imports
const iconMap = {
    TrendingUp: <TrendingUp size={16} />,
    Star: <Star size={16} />,
    Gift: <Gift size={16} />,
    Users: <Users size={16} />,
    BookOpen: <BookOpen size={16} />,
    Trophy: <Trophy size={16} />,
    Plus: <Plus size={16} />
};

const HomePage = () => {
    // State
    const [activeCategory, setActiveCategory] = useState("All");
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const router = useRouter();

    // Auto-rotate featured builds
    useEffect(() => {
        const interval = setInterval(() => {
            setFeaturedIndex(
                (prevIndex) => (prevIndex + 1) % featuredBuilds.length
            );
        }, 6000);

        return () => clearInterval(interval);
    }, [featuredBuilds.length]);

    // Navigation handlers
    const navigateFeatured = (direction: "prev" | "next") => {
        if (direction === "prev") {
            setFeaturedIndex((prevIndex) =>
                prevIndex === 0 ? featuredBuilds.length - 1 : prevIndex - 1
            );
        } else {
            setFeaturedIndex(
                (prevIndex) => (prevIndex + 1) % featuredBuilds.length
            );
        }
    };

    // Item detail handlers
    const handleViewBuild = (id: number) => {
        router.push(`/projects/${id}`);
    };

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
    };

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
            <main>
                {/* Hero Section */}
                <HomeHero />

                {/* Featured Builds */}
                <FeaturedProjects />
				
                {/* Categories Nav */}
                <section className="bg-gradient-to-r from-orange-500 to-yellow-500 py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="flex overflow-x-auto pb-2 hide-scrollbar">
                            <div className="flex space-x-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.name}
                                        className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap ${
                                            activeCategory === category.name
                                                ? "bg-white text-yellow-600 shadow-md"
                                                : "bg-yellow-600/20 text-white hover:bg-yellow-600/30"
                                        } transition-colors`}
                                        onClick={() =>
                                            handleCategoryClick(category.name)
                                        }
                                    >
                                        <span className="mr-2">
                                            {iconMap[category.iconType as keyof typeof iconMap]}
                                        </span>
                                        <span>{category.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Community Highlights */}
                <section id="community" className="py-8 bg-gray-50">
                    {/* ... Community content from sample_home.tsx ... */}
                </section>

                {/* Popular Themes */}
                <ExploreThemes />

                {/* Call to Action */}
                <CallToActionSection />
            </main>

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
