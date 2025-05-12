import AppImage from "@/components/ui/images/AppImage";
import AvatarImage from "@/components/ui/images/AvatarImage";
import BannerImage from "@/components/ui/images/BannerImage";
import HeroBanner from "@/components/ui/images/HeroBanner";
import ThumbnailImage from "@/components/ui/images/ThumbnailImage";
import ProjectPreviewCard from "@/components/ui/ProjectPreviewCard";

export default function Home() {
    return (
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-8">
            <div className="flex flex-col gap-8 py-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">My Projects</h1>
                    <button className="bg-blue-500 hover:bg-blue-600 transition-colors text-white px-5 py-2.5 rounded-md">
                        Add New Project
                    </button>
                </div>
                <div className="flex overflow-x-auto gap-8 pb-6 -mx-6 px-6">
                    <ProjectPreviewCard />
                    <ProjectPreviewCard />
                    <ProjectPreviewCard />
                </div>
            </div>
        </div>
    );
}
