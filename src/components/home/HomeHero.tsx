import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Star,
} from "lucide-react";
import UsageStats from "@/components/home/UsageStats";

const HomeHero = () => {
    return (
        <section className="relative min-h-[25vh] lg:min-h-[45vh] flex items-center bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-200 to-yellow-200 rounded-full opacity-20 blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20 blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2.5 py-1 lg:px-4 lg:py-2 rounded-full text-amber-600 font-medium mb-3 lg:mb-6 border border-amber-100 text-xs lg:text-base">
                            <Star size={12} className="fill-amber-500 lg:size-[14px]" />
                            <span>The Ultimate LEGO® Building Platform</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-3 lg:mb-6 leading-tight">
                            Track Your LEGO® Journey
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 mt-1 lg:mt-2">
                                Brick by Brick
                            </span>
                        </h1>
                        <p className="text-base lg:text-lg text-gray-600 mb-4 lg:mb-8">
                            Join thousands of LEGO® enthusiasts in documenting
                            builds, sharing creations, and connecting with the
                            community.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 mb-6 lg:mb-8">
                            <Link
                                href="/projects"
                                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm lg:text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-center"
                            >
                                Start Building
                            </Link>
                            <Link
                                href="/explore"
                                className="bg-white hover:bg-gray-50 text-gray-800 px-5 py-2.5 rounded-xl font-semibold text-sm lg:text-base shadow-md hover:shadow-lg transition-all border border-gray-200 text-center"
                            >
                                Explore Projects
                            </Link>
                        </div>
                        <UsageStats />
                    </div>
                    <div className="relative md:hidden mb-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl transform rotate-6 scale-105"></div>
                        <Image
                            src="/images/millennium-falcon.jpg"
                            alt="Featured LEGO build"
                            width={400}
                            height={300}
                            className="relative rounded-2xl shadow-xl w-full object-cover"
                            priority
                        />
                    </div>
                    <div className="relative hidden md:block">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl transform rotate-6 scale-105"></div>
                        <Image
                            src="/images/millennium-falcon.jpg"
                            alt="Featured LEGO build"
                            width={500}
                            height={375}
                            className="relative rounded-3xl shadow-2xl w-full object-cover max-w-md mx-auto"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeHero;
