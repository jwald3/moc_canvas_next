import AppImage, { AppImageProps } from "./AppImage";

export type ThumbnailImageProps = AppImageProps;

export default function ThumbnailImage({ ...props }: ThumbnailImageProps) {
    return (
        <div className="relative w-full h-full">
            <AppImage
                variant="thumbnail"
                {...props}
                className="w-full h-full object-cover"
                width={300}
                height={300}
            />
        </div>
    );
}
