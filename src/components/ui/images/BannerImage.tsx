import AppImage, { AppImageProps } from "./AppImage";

export type BannerImageProps = AppImageProps & {
    height?: number;
}

export default function BannerImage({ height, ...props }: BannerImageProps) {
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