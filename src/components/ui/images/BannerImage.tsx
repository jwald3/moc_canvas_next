import AppImage, { AppImageProps } from "./AppImage";

export type BannerImageProps = AppImageProps & {
    title?: string;
    height?: number;
}

export default function BannerImage({ title, height, ...props }: BannerImageProps) {
    return (
        <div className="relative w-full h-full">
            <AppImage
                variant="banner"
                aspectRatio="auto"
                height={height}
                {...props}
            />
            
        </div>
    );
}