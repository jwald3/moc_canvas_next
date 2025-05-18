import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Star,
    Blocks,
    Share2,
    Users,
    Sparkles
} from "lucide-react";
import UsageStats from "@/components/home/UsageStats";

const HomeHero = () => {
    return (
        <section className="relative min-h-[unset] lg:min-h-[45vh] flex items-center bg-gradient-to-br from-[#fff7e6] via-white to-[#ffebe6] py-6 lg:py-0">
            {/* Fun decorative elements - make them smaller on mobile */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-gradient-to-br from-[#ffd700]/30 via-[#da5249]/20 to-[#4a9eff]/20 rounded-full opacity-40 blur-3xl transform translate-x-1/3 -translate-y-1/3 animate-float-slow"></div>
                <div className="absolute -top-10 left-20 lg:-top-20 lg:left-40 w-16 lg:w-32 h-16 lg:h-32 bg-[#ffd700]/20 rounded-xl rotate-12 animate-float"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#4a9eff]/20 via-[#da5249]/20 to-[#ffd700]/30 rounded-full opacity-40 blur-3xl transform -translate-x-1/3 translate-y-1/3 animate-float"></div>
                <div className="absolute bottom-20 right-40 w-24 h-24 bg-[#da5249]/20 rounded-xl -rotate-12 animate-float-slow"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-12 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 items-center">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 lg:px-6 lg:py-3 rounded-xl lg:rounded-2xl text-[#da5249] font-bold mb-3 lg:mb-6 border-2 border-[#da5249]/20 text-xs lg:text-base shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-default">
                            <Star size={14} className="fill-[#da5249] lg:size-[20px] animate-pulse" />
                            <span>The Ultimate LEGO® Building Platform</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl lg:text-6xl font-black text-slate-800 mb-2 lg:mb-6 leading-tight">
                            Build Something
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#da5249] to-[#4a9eff] mt-0.5 lg:mt-2 animate-gradient bg-300">
                                Extraordinary!
                            </span>
                        </h1>
                        <p className="text-sm lg:text-lg text-slate-600 mb-4 lg:mb-8">
                            Join our incredible community of master builders! Document your creations, 
                            share your masterpieces, and connect with fellow LEGO® enthusiasts.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 mb-6 lg:mb-10">
                            <Link
                                href="/projects"
                                className="bg-gradient-to-r from-[#da5249] to-[#c4483f] hover:from-[#c4483f] hover:to-[#b33d34] text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-bold text-sm lg:text-base shadow-lg shadow-[#da5249]/30 hover:shadow-xl hover:shadow-[#da5249]/40 transition-all transform hover:-translate-y-1 text-center group flex-1 sm:flex-initial"
                            >
                                Start Building 
                                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                            </Link>
                            <Link
                                href="/explore"
                                className="bg-white hover:bg-slate-50 text-slate-800 px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-bold text-sm lg:text-base shadow-lg hover:shadow-xl transition-all border-2 border-slate-200 text-center hover:-translate-y-1 group flex-1 sm:flex-initial"
                            >
                                Explore Projects
                                <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
                            </Link>
                        </div>
                        <UsageStats />
                    </div>
                    <div className="md:hidden grid grid-cols-2 gap-3 mt-6 mb-2">
                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border-2 border-[#da5249]/10 shadow-lg group hover:-translate-y-1 transition-all">
                            <div className="bg-gradient-to-br from-[#ffd700] to-[#da5249] w-10 h-10 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                <Blocks className="text-white w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-slate-800 text-sm">Build & Track</h3>
                            <p className="text-xs text-slate-600 mt-1">Document your LEGO® builds step by step</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border-2 border-[#da5249]/10 shadow-lg group hover:-translate-y-1 transition-all">
                            <div className="bg-gradient-to-br from-[#da5249] to-[#4a9eff] w-10 h-10 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                <Share2 className="text-white w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-slate-800 text-sm">Share</h3>
                            <p className="text-xs text-slate-600 mt-1">Show off your creations to the world</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border-2 border-[#da5249]/10 shadow-lg group hover:-translate-y-1 transition-all">
                            <div className="bg-gradient-to-br from-[#4a9eff] to-[#ffd700] w-10 h-10 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                <Users className="text-white w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-slate-800 text-sm">Community</h3>
                            <p className="text-xs text-slate-600 mt-1">Connect with fellow builders</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border-2 border-[#da5249]/10 shadow-lg group hover:-translate-y-1 transition-all">
                            <div className="bg-gradient-to-br from-[#ffd700] to-[#da5249] w-10 h-10 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                <Sparkles className="text-white w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-slate-800 text-sm">Get Inspired</h3>
                            <p className="text-xs text-slate-600 mt-1">Discover amazing creations</p>
                        </div>
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
