import AppImage, { AppImageProps } from "./AppImage";

export type AvatarImageProps = AppImageProps;

export default function AvatarImage({ ...props }: AvatarImageProps) {
    return (
        <div className="relative w-full h-full">
            <AppImage
                variant="avatar"
                {...props}
                width={64}
                height={64}
                rounded="full"
                style={{ objectFit: 'cover' }}
                className="rounded-full"
            />
        </div>
    );
}