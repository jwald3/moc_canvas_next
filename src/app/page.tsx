import AppImage from "@/components/ui/images/AppImage";
import AvatarImage from "@/components/ui/images/AvatarImage";
import BannerImage from "@/components/ui/images/BannerImage";
import HeroBanner from "@/components/ui/images/HeroBanner";
import ThumbnailImage from "@/components/ui/images/ThumbnailImage";
import ProjectPreviewCard from "@/components/ui/ProjectPreviewCard";

export default function Home() {
    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col gap-8 py-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-[32px] font-bold text-gray-900">My Projects</h1>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
                        Add New Project
                    </button>
                </div>
                <div className="flex flex-col md:flex-row overflow-x-auto gap-6 pb-6 -mx-4 px-4 sm:-mx-8 sm:px-8">
                    <ProjectPreviewCard />
                    <ProjectPreviewCard />
                    <ProjectPreviewCard />
                </div>
            </div>
        </div>
    );
}
