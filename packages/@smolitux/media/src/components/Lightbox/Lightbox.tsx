import React, { useEffect, useRef } from 'react';

export interface LightboxProps {
  /** Whether the lightbox is open */
  open: boolean;
  /** Callback when the lightbox should be closed */
  onClose: () => void;
  /** Source URL for the image to display */
  src: string;
  /** Alternative text for the image */
  alt?: string;
  /** Additional class name */
  className?: string;
}

/**
 * Lightbox component for displaying an image in a modal overlay.
 * Supports closing via overlay click or Escape key for accessibility.
 */
export const Lightbox: React.FC<LightboxProps> = ({
  open,
  onClose,
  src,
  alt = '',
  className = '',
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/75 ${className}`}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <img src={src} alt={alt} className="max-h-full max-w-full" />
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl"
      >
        ×
      </button>
    </div>
  );
};

export default Lightbox;
