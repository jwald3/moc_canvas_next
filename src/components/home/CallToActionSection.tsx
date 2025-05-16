import React from "react";
import {
    Star,
    Users,
    Trophy,
} from "lucide-react";

const CallToActionSection = () => {
    return (
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
                        Join our community of builders, track your collection,
                        and share your creations with the world.
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
    );
};

export default CallToActionSection;
