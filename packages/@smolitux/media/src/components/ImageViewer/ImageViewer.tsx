import React, { useState, useRef, useEffect, forwardRef } from 'react';
import type { MediaSrc } from '../../types';

export interface ImageViewerProps {
  /** Bildquelle als URL oder File */
  src: MediaSrc;
  /** Alternativtext des Bildes */
  alt?: string;
  /** Zoomen erlauben */
  zoomable?: boolean;
  /** Initialer Zoomfaktor */
  initialZoom?: number;
  /** Callback bei Zoom-Änderung */
  onZoomChange?: (zoom: number) => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * Einfache Komponente zur Anzeige eines Bildes mit optionaler Zoomfunktion.
 */
export const ImageViewer = forwardRef<HTMLDivElement, ImageViewerProps>(
  (
    {
      src,
      alt = '',
      zoomable = false,
      initialZoom = 1,
      onZoomChange,
      className = '',
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [zoom, setZoom] = useState(initialZoom);
    const [srcUrl, setSrcUrl] = useState('');

    // handle file src
    useEffect(() => {
      if (typeof src === 'string') {
        setSrcUrl(src);
        return;
      }
      const url = URL.createObjectURL(src);
      setSrcUrl(url);
      return () => URL.revokeObjectURL(url);
    }, [src]);

    useEffect(() => {
      onZoomChange?.(zoom);
    }, [zoom, onZoomChange]);

    const changeZoom = (delta: number) => {
      setZoom((z) => Math.min(Math.max(z + delta, 0.5), 3));
    };

    // keyboard controls for accessibility
    useEffect(() => {
      if (!zoomable) return;
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          changeZoom(0.1);
        }
        if (e.key === '-') {
          e.preventDefault();
          changeZoom(-0.1);
        }
      };
      const node = containerRef.current;
      node?.addEventListener('keydown', handleKey);
      return () => node?.removeEventListener('keydown', handleKey);
    }, [zoomable]);

    return (
      <div
        ref={ref ? (el) => {
          if (typeof ref === 'function') ref(el);
          if (containerRef) containerRef.current = el;
        } : containerRef}
        tabIndex={zoomable ? 0 : -1}
        className={`inline-block overflow-hidden ${className}`}
        aria-label="Image viewer"
      >
        <img
          ref={imgRef}
          src={srcUrl}
          alt={alt}
          style={{ transform: `scale(${zoom})` }}
          className="transition-transform duration-200 origin-center"
        />
        {zoomable && (
          <div className="mt-2 flex gap-2" aria-hidden="true">
            <button
              type="button"
              onClick={() => changeZoom(0.1)}
              aria-label="Zoom in"
              className="p-1 border rounded"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => changeZoom(-0.1)}
              aria-label="Zoom out"
              className="p-1 border rounded"
            >
              -
            </button>
          </div>
        )}
      </div>
    );
  },
);

ImageViewer.displayName = 'ImageViewer';

export default ImageViewer;
