import AppImage from "@/components/ui/images/AppImage";
import AvatarImage from "@/components/ui/images/AvatarImage";
import BannerImage from "@/components/ui/images/BannerImage";
import ThumbnailImage from "@/components/ui/images/ThumbnailImage";

export default function Home() {
    return (
        <div className="flex flex-col gap-4">
			<BannerImage
				src="/images/app-image-demo.jpg"
				alt="App Image Demo"
				variant="banner"
				aspectRatio="auto"
				rounded={true}
				title="App Image Demo"
				height={300}
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
