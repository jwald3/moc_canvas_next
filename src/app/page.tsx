import AppImage from "@/components/ui/images/AppImage";
import AvatarImage from "@/components/ui/images/AvatarImage";
import ThumbnailImage from "@/components/ui/images/ThumbnailImage";

export default function Home() {
    return (
        <div>
            {/* <AppImage
                src="/images/app-image-demo.jpg"
                alt="App Image Demo"
                variant="default"
                aspectRatio="auto"
                rounded={true}
            /> */}
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
