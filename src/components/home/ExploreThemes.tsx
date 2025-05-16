import React from "react";
import Link from "next/link";
import {
    ChevronRight,
} from "lucide-react";
import {
    popularThemes,
} from "@/data/sample-data";
import ThemeTile from "@/components/home/ThemeTile";

const ExploreThemes = () => {
    return (
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
                        Discover amazing builds across different LEGO® themes
                        and find inspiration for your next project
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {popularThemes.map((theme) => (
                        <ThemeTile key={theme.id} theme={theme} />
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
    );
};

export default ExploreThemes;
