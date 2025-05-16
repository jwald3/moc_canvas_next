import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ChevronRight,
    Star,
    Users,
} from "lucide-react";
import { featuredBuilds } from "@/data/sample-data";

const FeaturedProjects = () => {
    const router = useRouter();

    const handleViewBuild = (id: number) => {
        router.push(`/projects/${id}`);
    };

    return (
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
                                            <span className="text-sm">•</span>
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
    );
};

export default FeaturedProjects;
