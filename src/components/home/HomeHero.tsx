import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Star,
} from "lucide-react";
import UsageStats from "@/components/home/UsageStats";

const HomeHero = () => {
    return (
        <section className="relative min-h-[25vh] lg:min-h-[45vh] flex items-center bg-gradient-to-br from-[#fff7e6] via-white to-[#ffebe6]">
            {/* Fun decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#ffd700]/30 via-[#da5249]/20 to-[#4a9eff]/20 rounded-full opacity-40 blur-3xl transform translate-x-1/3 -translate-y-1/3 animate-float-slow"></div>
                <div className="absolute -top-20 left-40 w-32 h-32 bg-[#ffd700]/20 rounded-xl rotate-12 animate-float"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#4a9eff]/20 via-[#da5249]/20 to-[#ffd700]/30 rounded-full opacity-40 blur-3xl transform -translate-x-1/3 translate-y-1/3 animate-float"></div>
                <div className="absolute bottom-20 right-40 w-24 h-24 bg-[#da5249]/20 rounded-xl -rotate-12 animate-float-slow"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 lg:px-6 lg:py-3 rounded-2xl text-[#da5249] font-bold mb-3 lg:mb-6 border-2 border-[#da5249]/20 text-xs lg:text-base shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-default">
                            <Star size={16} className="fill-[#da5249] lg:size-[20px] animate-pulse" />
                            <span>The Ultimate LEGO® Building Platform</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-slate-800 mb-3 lg:mb-6 leading-tight">
                            Build Something
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#da5249] to-[#4a9eff] mt-1 lg:mt-2 animate-gradient bg-300">
                                Extraordinary!
                            </span>
                        </h1>
                        <p className="text-base lg:text-lg text-slate-600 mb-6 lg:mb-8">
                            Join our incredible community of master builders! Document your creations, 
                            share your masterpieces, and connect with fellow LEGO® enthusiasts.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-8 lg:mb-10">
                            <Link
                                href="/projects"
                                className="bg-gradient-to-r from-[#da5249] to-[#c4483f] hover:from-[#c4483f] hover:to-[#b33d34] text-white px-8 py-4 rounded-2xl font-bold text-sm lg:text-base shadow-lg shadow-[#da5249]/30 hover:shadow-xl hover:shadow-[#da5249]/40 transition-all transform hover:-translate-y-1 text-center group"
                            >
                                Start Building 
                                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                            </Link>
                            <Link
                                href="/explore"
                                className="bg-white hover:bg-slate-50 text-slate-800 px-8 py-4 rounded-2xl font-bold text-sm lg:text-base shadow-lg hover:shadow-xl transition-all border-2 border-slate-200 text-center hover:-translate-y-1 group"
                            >
                                Explore Projects
                                <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
                            </Link>
                        </div>
                        <UsageStats />
                    </div>
                    <div className="relative md:hidden mb-6 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/30 via-[#da5249]/30 to-[#4a9eff]/30 rounded-3xl transform rotate-6 scale-105 group-hover:rotate-3 transition-transform"></div>
                        <Image
                            src="/images/millennium-falcon.jpg"
                            alt="Featured LEGO build"
                            width={400}
                            height={300}
                            className="relative rounded-3xl shadow-xl w-full object-cover transform rotate-3 group-hover:rotate-0 transition-transform duration-500"
                            priority
                        />
                    </div>
                    <div className="relative hidden md:block group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/30 via-[#da5249]/30 to-[#4a9eff]/30 rounded-3xl transform rotate-6 scale-105 group-hover:rotate-3 transition-transform"></div>
                        <Image
                            src="/images/millennium-falcon.jpg"
                            alt="Featured LEGO build"
                            width={500}
                            height={375}
                            className="relative rounded-3xl shadow-2xl w-full object-cover max-w-md mx-auto transform rotate-3 group-hover:rotate-0 transition-transform duration-500"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeHero;
