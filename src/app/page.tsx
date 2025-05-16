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
                <section className="py-20 bg-gradient-to-br from-amber-500 to-orange-600 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
                        <div className="max-w-3xl mx-auto text-center text-white">
                            <h2 className="text-4xl font-bold mb-6">
                                Ready to Start Your LEGO® Journey?
                            </h2>
                            <p className="text-xl mb-8 text-white/90">
                                Join our community of builders, track your
                                collection, and share your creations with the
                                world.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button className="bg-white text-amber-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                                    Create Account
                                </button>
                                <button className="bg-black/20 hover:bg-black/30 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all">
                                    Learn More
                                </button>
                            </div>
                            <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/90">
                                <div className="flex items-center gap-2">
                                    <Users size={20} />
                                    <span>10,000+ Active Users</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Trophy size={20} />
                                    <span>50,000+ Projects</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star size={20} />
                                    <span>4.9/5 Average Rating</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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
