import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import FeaturedBuildCard from "./FeaturedBuildCard";
import { useProjectContext } from "@/contexts/ProjectContext";

const FeaturedProjects = () => {
    const router = useRouter();
    const { filteredSavedProjects } = useProjectContext();

    const handleViewBuild = (id: string) => {
        router.push(`/projects/${id}`);
    };

    return (
        <section className="py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
            {/* Decorative elements - subtle version to match ExploreThemes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#ffd700]/5 via-[#da5249]/5 to-[#4a9eff]/5 rounded-full opacity-40 blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#4a9eff]/5 via-[#da5249]/5 to-[#ffd700]/5 rounded-full opacity-40 blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl text-[#da5249] font-medium mb-3 border-2 border-[#da5249]/10 text-sm shadow-md">
                            <Sparkles size={16} className="text-[#da5249]" />
                            <span>Featured Projects</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                            Latest Community Builds
                        </h2>
                    </div>
                    <Link
                        href="/projects"
                        className="group flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl text-slate-600 hover:text-[#da5249] transition-colors border-2 border-slate-100 hover:border-[#da5249]/10 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                        View All Projects
                        <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    <div className="md:col-span-2 lg:col-span-1">
                        <FeaturedBuildCard
                            key={filteredSavedProjects[0]?.id}
                            build={filteredSavedProjects[0]}
                            handleViewBuild={handleViewBuild}
                        />
                    </div>
                    {filteredSavedProjects.slice(1, 3).map((build) => (
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
