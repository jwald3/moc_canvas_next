import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FeaturedBuildCard from "./FeaturedBuildCard";
import { useProjectContext } from "@/contexts/ProjectContext";

const FeaturedProjects = () => {
    const router = useRouter();

    const { filteredSavedProjects } = useProjectContext();

    const handleViewBuild = (id: string) => {
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
                    {filteredSavedProjects.map((build) => (
                        <FeaturedBuildCard
                            key={build.id}
                            build={build}
                            handleViewBuild={handleViewBuild}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
