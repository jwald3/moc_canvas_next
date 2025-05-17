// AppImage.tsx
import Image, { ImageProps } from 'next/image';

// Define our extended props
export type AppImageProps = {
  // Core props
  src: string;
  alt: string;
  
  // Optional overrides with defaults
  quality?: number;
  priority?: boolean;
  fill?: boolean;
  
  // Component-specific additions
  variant?: 'default' | 'banner' | 'thumbnail' | 'avatar';
  aspectRatio?: 'auto' | '1:1' | '16:9' | '4:3' | '3:2';
  rounded?: boolean | 'sm' | 'md' | 'lg' | 'full';
  
  // Conditional props - only used in certain contexts
  overlay?: boolean;
  caption?: string;

  // Pass-through for native props
} & Omit<ImageProps, 'src' | 'alt'>;

export default function AppImage({
  src,
  alt,
  quality = 85,
  priority = false,
  fill = false,
  variant = 'default',
  aspectRatio = 'auto',
  rounded = false,
  overlay = false,
  caption,
  className = '',
  width,
  height,
  ...rest
}: AppImageProps) {
  // Determine classes based on props
  const containerClasses = `app-image app-image--${variant} ${className}`;
  const imageClasses = [
    'app-image__img',
    rounded === true ? 'rounded-md' : rounded ? `rounded-${rounded}` : '',
    aspectRatio !== 'auto' ? `aspect-${aspectRatio.replace(':', '-')}` : '',
  ].filter(Boolean).join(' ');
  
  // Set variant-specific default sizes
  const getDefaultDimensions = () => {
    if (width && height) return { width, height };
    
    switch (variant) {
      case 'banner':
        return { width: 1200, height: 400 };
      case 'thumbnail':
        return { width: 300, height: 200 };
      case 'avatar':
        return { width: 64, height: 64 };
      default:
        return { width: 800, height: 600 };
    }
  };
  
  const dimensions = getDefaultDimensions();
  
  return (
    <div className={containerClasses} style={{ position: 'relative' }}>
      <Image
        src={src}
        alt={alt}
        quality={quality}
        priority={priority}
        fill={fill}
        width={!fill ? dimensions.width : undefined}
        height={!fill ? dimensions.height : undefined}
        className={imageClasses}
        sizes={
          variant === 'banner' 
            ? '100vw' 
            : variant === 'thumbnail' 
              ? '(max-width: 768px) 100vw, 300px' 
              : '(max-width: 768px) 100vw, 800px'
        }
        // Use Next.js built-in fallback handling
        placeholder={rest.placeholder || 'empty'}
        {...rest}
      />
      
      {overlay && (
        <div className="app-image__overlay absolute inset-0 bg-black bg-opacity-30" />
      )}
      
      {caption && (
        <div className="app-image__caption text-sm text-gray-600 mt-1">
          {caption}
        </div>
      )}
    </div>
  );
}