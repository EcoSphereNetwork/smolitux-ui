import React from 'react';
import { GalleryConfig } from '../../types';

export interface ImageItem {
  /** Eindeutige ID */
  id: string;
  /** Bildquelle */
  src: string;
  /** Alternativtext */
  alt: string;
}

export interface ImageGalleryProps extends Partial<GalleryConfig> {
  /** Anzuzeigende Bilder */
  images: ImageItem[];
  /** Klick-Callback */
  onImageClick?: (image: ImageItem) => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  columns = 3,
  gap = 'medium',
  onImageClick,
  className = '',
}) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  }[columns];

  const gapClasses = {
    none: 'gap-0',
    small: 'gap-2',
    medium: 'gap-4',
    large: 'gap-6',
  }[gap];

  return (
    <div
      data-testid="image-gallery"
      className={`grid ${gridClasses} ${gapClasses} ${className}`}
    >
      {images.map((img) => (
        <button
          key={img.id}
          type="button"
          onClick={() => onImageClick?.(img)}
          className="focus:outline-none"
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
};

export default ImageGallery;
