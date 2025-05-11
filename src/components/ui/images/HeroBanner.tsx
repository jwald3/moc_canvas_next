// components/HeroBanner.jsx
import React from 'react';
import Image from 'next/image';

type TextPosition = 'left' | 'center' | 'right';

interface HeroBannerProps {
  imageUrl: string;
  title?: string;
  subtitle?: string;
  height?: number;
  textPosition?: TextPosition;
  textColor?: string;
  overlayColor?: string;
  titleSize?: string;
  subtitleSize?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ 
  imageUrl, 
  title, 
  subtitle, 
  height = 500,
  textPosition = 'center',
  textColor = 'white',
  overlayColor = 'rgba(0, 0, 0, 0.4)',
  titleSize = 'text-4xl',
  subtitleSize = 'text-xl'
}) => {
  
  const alignmentClasses: Record<TextPosition, string> = {
    left: 'items-start text-left pl-10',
    center: 'items-center text-center',
    right: 'items-end text-right pr-10'
  };
  
  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>

      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title || 'Hero banner'}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />

        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: overlayColor }}
        />
      </div>
      
      <div className={`relative flex flex-col justify-center h-full w-full z-10 ${alignmentClasses[textPosition]}`}>
        {title && (
          <h1 
            className={`font-bold mb-4 ${titleSize}`}
            style={{ color: textColor }}
          >
            {title}
          </h1>
        )}
        
        {subtitle && (
          <p 
            className={`${subtitleSize} max-w-xl`}
            style={{ color: textColor }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;