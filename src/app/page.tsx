import AppImage from "@/components/ui/images/AppImage";
import AvatarImage from "@/components/ui/images/AvatarImage";
import BannerImage from "@/components/ui/images/BannerImage";
import HeroBanner from "@/components/ui/images/HeroBanner";
import ThumbnailImage from "@/components/ui/images/ThumbnailImage";

export default function Home() {
    return (
        <div className="flex flex-col gap-4">
            <HeroBanner
                imageUrl="/images/app-image-demo.jpg"
                title="Welcome to Our Website"
                subtitle="Discover amazing products and services tailored just for you"
                height={600}
                textPosition="center"
                overlayColor="rgba(0, 0, 0, 0.5)"
            />
            <ThumbnailImage
                src="/images/app-image-demo.jpg"
                alt="App Image Demo"
                variant="thumbnail"
                aspectRatio="auto"
                rounded={true}
            />
            <AvatarImage
                src="/images/app-image-demo.jpg"
                alt="App Image Demo"
                variant="avatar"
                aspectRatio="auto"
            />
        </div>
    );
}
