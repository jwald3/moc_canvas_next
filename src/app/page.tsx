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
                <section className="py-12 md:py-16 lg:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <div className="text-amber-600 font-medium mb-2">
                                    Featured Projects
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Latest Community Builds
                                </h2>
                            </div>
                            <Link
                                href="/projects"
                                className="group flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors"
                            >
                                View All Projects
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featuredBuilds.map((build) => (
                                <div
                                    key={build.id}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100"
                                    onClick={() => handleViewBuild(build.id)}
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={build.image}
                                            alt={build.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <div className="flex items-center gap-2 text-white mb-2">
                                                    <Star
                                                        className="fill-amber-400 text-amber-400"
                                                        size={16}
                                                    />
                                                    <span className="text-sm">
                                                        {build.likes} likes
                                                    </span>
                                                    <span className="text-sm">
                                                        •
                                                    </span>
                                                    <span className="text-sm">
                                                        {build.views} views
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {build.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="text-xs bg-white/20 text-white px-2 py-1 rounded-full backdrop-blur-sm"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                <Users
                                                    size={14}
                                                    className="text-gray-600"
                                                />
                                            </div>
                                            <span className="text-gray-600 text-sm">
                                                {build.creator}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                                            {build.name}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
				
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
                <section className="py-24 bg-white relative overflow-hidden">
                    {/* Background decorative elements */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: 'url("/grid.svg")',
                            backgroundSize: "40px 40px",
                            backgroundRepeat: "repeat",
                        }}
                    />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Explore Popular Themes
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Discover amazing builds across different LEGO®
                                themes and find inspiration for your next
                                project
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {popularThemes.map((theme) => (
                                <Link
                                    key={theme.id}
                                    href={`/explore?theme=${theme.id}`}
                                    className={`relative group overflow-hidden rounded-2xl p-4 transition-all duration-300 bg-white hover:shadow-xl border border-gray-100`}
                                >
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-[0.08] group-hover:opacity-[0.12] transition-opacity`}
                                    />
                                    <div className="relative p-4">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${theme.color} flex items-center justify-center shadow-lg`}
                                            >
                                                <div className="text-white">
                                                    {iconMap[theme.iconType as keyof typeof iconMap]}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                                                    {theme.name}
                                                </h3>
                                                <p className="text-gray-500">
                                                    {theme.count}
                                                </p>
                                            </div>
                                            <div className="ml-auto">
                                                <div
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br ${theme.color} text-white opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 -translate-x-4 transition-all duration-300`}
                                                >
                                                    <ChevronRight size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* View All Themes Button */}
                        <div className="mt-12 text-center">
                            <Link
                                href="/themes"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-colors group"
                            >
                                View All Themes
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </section>

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
