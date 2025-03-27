// packages/@smolitux/core/src/components/Carousel/Carousel.tsx
import React, { useState, useEffect, useRef, useMemo, forwardRef } from 'react';
import { useTheme } from '@smolitux/theme';
// Falls der Import fehlschlägt, verwenden wir einen Fallback
const useThemeLocal = () => ({ themeMode: 'light' });

export interface CarouselItem {
  /** Eindeutige ID des Items */
  id: string;
  /** Der anzuzeigende Inhalt */
  content: React.ReactNode;
  /** Beschreibungstext für Barrierefreiheit */
  ariaLabel?: string;
}

export interface CarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Items im Carousel */
  items: CarouselItem[];
  /** Gewählter Item-Index (kontrollierter Modus) */
  activeIndex?: number;
  /** Standard-Item-Index */
  defaultActiveIndex?: number;
  /** Callback bei Änderung des aktiven Items */
  onChange?: (index: number) => void;
  /** Verhältnis der Höhe zur Breite (z.B. 16:9, 4:3) */
  aspectRatio?: '1:1' | '4:3' | '16:9' | '21:9' | string;
  /** Automatischer Wechsel in ms (0 für deaktiviert) */
  autoPlay?: number;
  /** Pausieren bei Hover */
  pauseOnHover?: boolean;
  /** Infinite Scrolling */
  infinite?: boolean;
  /** Navigationspfeile anzeigen */
  showArrows?: boolean;
  /** Indikatoren anzeigen */
  showIndicators?: boolean;
  /** Indikatoren als Thumbnails anzeigen */
  thumbnails?: boolean;
  /** Slide-Animation */
  animation?: 'slide' | 'fade' | 'none';
  /** Swipe-Gesten aktivieren */
  enableSwipe?: boolean;
  /** Benutzerdefinierte Pfeil-Komponenten */
  customArrows?: {
    prev?: React.ReactNode;
    next?: React.ReactNode;
  };
  /** Callback beim Start des Autoplay */
  onAutoplayStart?: () => void;
  /** Callback beim Stopp des Autoplay */
  onAutoplayStop?: () => void;
  /** Ist das Carousel deaktiviert? */
  disabled?: boolean;
}

/**
 * Carousel-Komponente für Bildergalerien und Content-Slider
 * 
 * @example
 * ```tsx
 * <Carousel
 *   items={[
 *     { id: '1', content: <img src="/image1.jpg" alt="Bild 1" /> },
 *     { id: '2', content: <img src="/image2.jpg" alt="Bild 2" /> },
 *     { id: '3', content: <img src="/image3.jpg" alt="Bild 3" /> }
 *   ]}
 *   autoPlay={5000}
 * />
 * ```
 */
export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(({
  items,
  activeIndex: controlledActiveIndex,
  defaultActiveIndex = 0,
  onChange,
  aspectRatio = '16:9',
  autoPlay = 0,
  pauseOnHover = true,
  infinite = true,
  showArrows = true,
  showIndicators = true,
  thumbnails = false,
  animation = 'slide',
  enableSwipe = true,
  customArrows,
  onAutoplayStart,
  onAutoplayStop,
  disabled = false,
  className = '',
  ...rest
}, ref) => {
  const { themeMode } = useTheme ? useTheme() : useThemeLocal();
  
  // Kontrolliert vs. unkontrolliert
  const isControlled = controlledActiveIndex !== undefined;
  const [internalActiveIndex, setInternalActiveIndex] = useState(() => {
    if (items.length === 0) return 0;
    return Math.min(defaultActiveIndex, items.length - 1);
  });
  
  // Aktueller aktiver Index basierend auf dem Kontroll-Modus
  const activeIndex = isControlled ? controlledActiveIndex : internalActiveIndex;
  
  // Refs für DOM-Elemente und Timer
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideTrackRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  
  // State für Pause bei Hover
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Berechnung des Seitenverhältnisses
  const aspectRatioPadding = useMemo(() => {
    if (aspectRatio.includes(':')) {
      const [width, height] = aspectRatio.split(':').map(Number);
      return `${(height / width) * 100}%`;
    }
    return aspectRatio;
  }, [aspectRatio]);
  
  // Pagination-Berechnungen
  const totalItems = items.length;
  const showPrev = infinite || activeIndex > 0;
  const showNext = infinite || activeIndex < totalItems - 1;
  
  // Berechnete Styles basierend auf dem aktiven Index
  const slideTrackStyle = useMemo(() => {
    if (animation === 'slide') {
      return {
        transform: `translateX(-${activeIndex * 100}%)`,
        transition: isAnimating ? 'transform 300ms ease-in-out' : 'none'
      };
    } else if (animation === 'fade') {
      return {}; // Fade wird mit CSS-Klassen gehandhabt
    }
    return {};
  }, [activeIndex, animation, isAnimating]);
  
  // Slide-Wechsel-Funktionen
  const goToSlide = (index: number) => {
    if (disabled || totalItems === 0) return;
    
    let newIndex = index;
    
    if (infinite) {
      // Wenn Infinite, wrap around
      if (newIndex < 0) {
        newIndex = totalItems - 1;
      } else if (newIndex >= totalItems) {
        newIndex = 0;
      }
    } else {
      // Ohne Infinite, beschränken
      newIndex = Math.max(0, Math.min(totalItems - 1, newIndex));
    }
    
    if (newIndex !== activeIndex) {
      setIsAnimating(true);
      
      // Im unkontrollierten Modus setzen wir den internen Status
      if (!isControlled) {
        setInternalActiveIndex(newIndex);
      }
      
      // Callback auslösen
      if (onChange) {
        onChange(newIndex);
      }
      
      // Animation-Flag nach Abschluss zurücksetzen
      setTimeout(() => {
        setIsAnimating(false);
      }, 350);
    }
  };
  
  const goToNext = () => {
    if (disabled) return;
    goToSlide(activeIndex + 1);
  };
  
  const goToPrev = () => {
    if (disabled) return;
    goToSlide(activeIndex - 1);
  };
  
  // Autoplay-Steuerung
  const startAutoPlay = () => {
    if (autoPlay > 0 && !isPaused && !disabled) {
      stopAutoPlay();
      
      autoPlayTimerRef.current = setTimeout(() => {
        goToNext();
      }, autoPlay);
      
      if (onAutoplayStart) {
        onAutoplayStart();
      }
    }
  };
  
  const stopAutoPlay = () => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
      
      if (onAutoplayStop) {
        onAutoplayStop();
      }
    }
  };
  
  // Mouse-Events für Pause-on-Hover
  const handleMouseEnter = () => {
    if (pauseOnHover && autoPlay > 0) {
      setIsPaused(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (pauseOnHover && autoPlay > 0) {
      setIsPaused(false);
    }
  };
  
  // Touch-Events für Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enableSwipe || disabled) return;
    
    touchStartXRef.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!enableSwipe || touchStartXRef.current === null || disabled) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartXRef.current - touchEndX;
    
    // Minimale Swipe-Distanz
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    
    touchStartXRef.current = null;
  };
  
  // Autoplay starten/stoppen bei Änderungen
  useEffect(() => {
    if (autoPlay > 0 && !isPaused && !disabled) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    
    return () => {
      stopAutoPlay();
    };
  }, [autoPlay, isPaused, activeIndex, disabled]);
  
  // Komponenten-Stil-Klassen
  const carouselClasses = [
    'relative overflow-hidden rounded-lg',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Renderfunktion für vorherigen/nächsten Button
  const renderArrows = () => {
    if (!showArrows || totalItems <= 1) return null;
    
    return (
      <>
        {/* Previous Button */}
        {showPrev && (
          <button
            type="button"
            className={`
              absolute top-1/2 left-2 z-10 -translate-y-1/2
              p-2 rounded-full
              bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50
              hover:bg-opacity-75 dark:hover:bg-opacity-75
              ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
            aria-label="Vorheriges Bild"
            onClick={goToPrev}
            disabled={disabled}
          >
            {customArrows?.prev || (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800 dark:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            )}
          </button>
        )}
        
        {/* Next Button */}
        {showNext && (
          <button
            type="button"
            className={`
              absolute top-1/2 right-2 z-10 -translate-y-1/2
              p-2 rounded-full
              bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50
              hover:bg-opacity-75 dark:hover:bg-opacity-75
              ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
            aria-label="Nächstes Bild"
            onClick={goToNext}
            disabled={disabled}
          >
            {customArrows?.next || (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800 dark:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
        )}
      </>
    );
  };
  
  // Render-Funktion für Indikatoren
  const renderIndicators = () => {
    if (!showIndicators || totalItems <= 1) return null;
    
    return (
      <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center">
        <div className="flex space-x-2">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`
                ${thumbnails ? 'w-10 h-10 border-2' : 'w-3 h-3 rounded-full'}
                ${activeIndex === index
                  ? thumbnails
                    ? 'border-primary-500 dark:border-primary-400 opacity-100'
                    : 'bg-primary-500 dark:bg-primary-400'
                  : thumbnails
                    ? 'border-transparent opacity-60 hover:opacity-100'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }
                transition-all duration-200
                ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index ? 'true' : 'false'}
              onClick={() => !disabled && goToSlide(index)}
            >
              {thumbnails && item.content ? (
                <div className="w-full h-full overflow-hidden object-cover rounded">
                  {/* Thumbnail-Inhalt - hier könnte ein spezifisches Thumbnail-Rendering implementiert werden */}
                  {typeof item.content === 'string' ? (
                    <img src={item.content} alt={item.ariaLabel || `Slide ${index + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {index + 1}
                    </div>
                  )}
                </div>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={carouselClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {/* Hauptcontainer mit Aspect Ratio */}
      <div 
        className="relative w-full" 
        style={{ paddingBottom: aspectRatioPadding }}
      >
        {/* Slide-Container */}
        <div 
          ref={carouselRef}
          className="absolute inset-0"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slide Track für "slide"-Animation */}
          {animation === 'slide' ? (
            <div
              ref={slideTrackRef}
              className="flex h-full transition-transform duration-300 ease-in-out"
              style={slideTrackStyle}
            >
              {items.map((item, index) => (
                <div 
                  key={item.id}
                  className="w-full h-full flex-shrink-0" 
                  aria-hidden={activeIndex !== index}
                  aria-label={item.ariaLabel}
                >
                  {item.content}
                </div>
              ))}
            </div>
          ) : (
            /* Fade Animation oder keine Animation */
            <div className="h-full relative">
              {items.map((item, index) => (
                <div 
                  key={item.id}
                  className={`
                    absolute inset-0 
                    ${animation === 'fade' ? 'transition-opacity duration-300 ease-in-out' : ''}
                    ${activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                  `} 
                  aria-hidden={activeIndex !== index}
                  aria-label={item.ariaLabel}
                >
                  {item.content}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Navigation Controls */}
      {renderArrows()}
      {renderIndicators()}
      
      {/* Animationsstile */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
});

Carousel.displayName = 'Carousel';

export default Carousel;
