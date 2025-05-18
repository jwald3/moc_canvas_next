import React from "react";
import Link from "next/link";
import {
    Users,
    Trophy,
    Star,
} from "lucide-react";

const CallToActionSection = () => {
    return (
        <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#da5249] to-[#c4483f] relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#ffd700]/20 via-white/10 to-transparent rounded-full opacity-40 blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-transparent via-white/10 to-[#4a9eff]/20 rounded-full opacity-40 blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
                        Ready to Start Your LEGO® Journey?
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl mb-8 text-white/90">
                        Join our community of builders, track your collection,
                        and share your creations with the world.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                        <Link
                            href="/signup"
                            className="bg-white hover:bg-slate-50 text-[#da5249] px-8 py-4 rounded-xl font-bold text-sm lg:text-base shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-all transform hover:-translate-y-0.5 text-center group"
                        >
                            Create Account
                            <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                        </Link>
                        <Link
                            href="/about"
                            className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 px-8 py-4 rounded-xl font-bold text-sm lg:text-base shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-all hover:-translate-y-0.5 text-center group"
                        >
                            Learn More
                            <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-white/90">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                            <div className="flex items-center justify-center gap-2 text-sm lg:text-base">
                                <Users className="w-4 h-4 lg:w-5 lg:h-5" />
                                <span>10,000+ Active Users</span>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                            <div className="flex items-center justify-center gap-2 text-sm lg:text-base">
                                <Trophy className="w-4 h-4 lg:w-5 lg:h-5" />
                                <span>50,000+ Projects</span>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                            <div className="flex items-center justify-center gap-2 text-sm lg:text-base">
                                <Star className="w-4 h-4 lg:w-5 lg:h-5" />
                                <span>4.9/5 Average Rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToActionSection;
