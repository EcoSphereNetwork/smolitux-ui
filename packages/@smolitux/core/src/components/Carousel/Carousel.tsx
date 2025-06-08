// packages/@smolitux/core/src/components/Carousel/Carousel.improved.tsx
import React, { useState, useEffect, useRef, useMemo, forwardRef, useCallback } from 'react';

// Versuche den Theme-Import, mit Fallback für Tests und Entwicklung
let useTheme: () => { themeMode: string; colors?: Record<string, any> };
try {
  useTheme = require('@smolitux/theme').useTheme;
} catch (e) {
  // Fallback für Tests und Entwicklung
  useTheme = () => ({ themeMode: 'light', colors: { primary: { 500: '#3182ce' } } });
}

export interface CarouselItem {
  /** Eindeutige ID des Items */
  id: string;
  /** Der anzuzeigende Inhalt */
  content: React.ReactNode;
  /** Beschreibungstext für Barrierefreiheit */
  ariaLabel?: string;
  /** Thumbnail für Indikator (optional) */
  thumbnail?: string;
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
  /** ARIA-Label für das Carousel */
  ariaLabel?: string;
  /** ARIA-Beschreibung für das Carousel */
  ariaDescription?: string;
  /** ID für die ARIA-Beschreibung */
  ariaDescriptionId?: string;
  /** Benutzerdefinierte Klassen für Navigationspfeile */
  arrowClassName?: string;
  /** Benutzerdefinierte Klassen für Indikatoren */
  indicatorClassName?: string;
  /** Benutzerdefinierte Klassen für aktiven Indikator */
  activeIndicatorClassName?: string;
}

/**
 * Carousel-Komponente für Bildergalerien und Content-Slider
 *
 * @example
 * ```tsx
 * <Carousel
 *   items={[
 *     { id: '1', content: <img src="/image1.jpg" alt="Bild 1" />, ariaLabel: "Bild 1 Beschreibung" },
 *     { id: '2', content: <img src="/image2.jpg" alt="Bild 2" />, ariaLabel: "Bild 2 Beschreibung" },
 *     { id: '3', content: <img src="/image3.jpg" alt="Bild 3" />, ariaLabel: "Bild 3 Beschreibung" }
 *   ]}
 *   autoPlay={5000}
 *   ariaLabel="Bildergalerie"
 *   ariaDescription="Galerie mit 3 Bildern. Verwenden Sie die Pfeiltasten, um zu navigieren."
 * />
 * ```
 */
export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
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
      ariaLabel = 'Bildergalerie',
      ariaDescription,
      ariaDescriptionId = 'carousel-description',
      arrowClassName = '',
      indicatorClassName = '',
      activeIndicatorClassName = '',
      ...rest
    },
    ref
  ) => {
    const { themeMode, colors } = useTheme();

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

    // Generiere eine eindeutige ID für das Carousel
    const carouselId = useMemo(() => `carousel-${Math.random().toString(36).substring(2, 11)}`, []);

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
          transition: isAnimating ? 'transform 300ms ease-in-out' : 'none',
        };
      } else if (animation === 'fade') {
        return {}; // Fade wird mit CSS-Klassen gehandhabt
      }
      return {};
    }, [activeIndex, animation, isAnimating]);

    // Slide-Wechsel-Funktionen
    const goToSlide = useCallback(
      (index: number) => {
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

          // Fokus auf das aktive Slide setzen für Screenreader
          if (carouselRef.current) {
            const activeSlide = carouselRef.current.querySelector(
              `[data-slide-index="${newIndex}"]`
            );
            if (activeSlide) {
              (activeSlide as HTMLElement).focus();
            }
          }
        }
      },
      [activeIndex, disabled, infinite, isControlled, onChange, totalItems]
    );

    const goToNext = useCallback(() => {
      if (disabled) return;
      goToSlide(activeIndex + 1);
    }, [activeIndex, disabled, goToSlide]);

    const goToPrev = useCallback(() => {
      if (disabled) return;
      goToSlide(activeIndex - 1);
    }, [activeIndex, disabled, goToSlide]);

    // Autoplay-Steuerung
    const startAutoPlay = useCallback(() => {
      if (autoPlay > 0 && !isPaused && !disabled) {
        stopAutoPlay();

        autoPlayTimerRef.current = setTimeout(() => {
          goToNext();
        }, autoPlay);

        if (onAutoplayStart) {
          onAutoplayStart();
        }
      }
    }, [autoPlay, disabled, goToNext, isPaused, onAutoplayStart]);

    const stopAutoPlay = useCallback(() => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;

        if (onAutoplayStop) {
          onAutoplayStop();
        }
      }
    }, [onAutoplayStop]);

    // Pause-Funktion für Barrierefreiheit
    const togglePause = useCallback(() => {
      setIsPaused((prev) => !prev);
    }, []);

    // Mouse-Events für Pause-on-Hover
    const handleMouseEnter = useCallback(() => {
      if (pauseOnHover && autoPlay > 0) {
        setIsPaused(true);
      }
    }, [autoPlay, pauseOnHover]);

    const handleMouseLeave = useCallback(() => {
      if (pauseOnHover && autoPlay > 0) {
        setIsPaused(false);
      }
    }, [autoPlay, pauseOnHover]);

    // Touch-Events für Swipe
    const handleTouchStart = useCallback(
      (e: React.TouchEvent) => {
        if (!enableSwipe || disabled) return;

        touchStartXRef.current = e.touches[0].clientX;
      },
      [disabled, enableSwipe]
    );

    const handleTouchEnd = useCallback(
      (e: React.TouchEvent) => {
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
      },
      [disabled, enableSwipe, goToNext, goToPrev]
    );

    // Tastatur-Navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            goToPrev();
            break;
          case 'ArrowRight':
            e.preventDefault();
            goToNext();
            break;
          case 'Home':
            e.preventDefault();
            goToSlide(0);
            break;
          case 'End':
            e.preventDefault();
            goToSlide(totalItems - 1);
            break;
          case ' ':
          case 'Spacebar': // Für ältere Browser
            e.preventDefault();
            if (autoPlay > 0) {
              togglePause();
            }
            break;
          default:
            break;
        }
      },
      [autoPlay, disabled, goToNext, goToPrev, goToSlide, togglePause, totalItems]
    );

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
    }, [autoPlay, isPaused, activeIndex, disabled, startAutoPlay, stopAutoPlay]);

    // Komponenten-Stil-Klassen
    const carouselClasses = [
      'relative overflow-hidden rounded-lg',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Gemeinsame Klassen für Fokus-Zustände
    const focusClasses =
      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500';

    // Renderfunktion für vorherigen/nächsten Button
    const renderArrows = () => {
      if (!showArrows || totalItems <= 1) return null;

      const baseArrowClasses = `
      p-2 rounded-full
      bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50
      hover:bg-opacity-75 dark:hover:bg-opacity-75
      ${focusClasses}
      ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      ${arrowClassName}
    `;

      return (
        <>
          {/* Previous Button */}
          {showPrev && (
            <button
              type="button"
              className={`
              absolute top-1/2 left-2 z-10 -translate-y-1/2
              ${baseArrowClasses}
            `}
              aria-label="Vorheriges Bild"
              aria-controls={carouselId}
              onClick={goToPrev}
              disabled={disabled}
              tabIndex={0}
              data-testid="carousel-prev-button"
            >
              {customArrows?.prev || (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-800 dark:text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
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
              ${baseArrowClasses}
            `}
              aria-label="Nächstes Bild"
              aria-controls={carouselId}
              onClick={goToNext}
              disabled={disabled}
              tabIndex={0}
              data-testid="carousel-next-button"
            >
              {customArrows?.next || (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-800 dark:text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
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

      const baseIndicatorClasses = `
      transition-all duration-200
      ${focusClasses}
      ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      ${indicatorClassName}
    `;

      return (
        <div
          className="absolute bottom-2 left-0 right-0 z-10 flex justify-center"
          role="tablist"
          aria-label="Bildauswahl"
          data-testid="carousel-indicators"
        >
          <div className="flex space-x-2">
            {items.map((item, index) => {
              const isActive = activeIndex === index;
              const indicatorLabel = item.ariaLabel || `Bild ${index + 1} anzeigen`;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`
                  ${baseIndicatorClasses}
                  ${thumbnails ? 'w-10 h-10 border-2' : 'w-3 h-3 rounded-full'}
                  ${
                    isActive
                      ? thumbnails
                        ? `border-primary-500 dark:border-primary-400 opacity-100 ${activeIndicatorClassName}`
                        : `bg-primary-500 dark:bg-primary-400 ${activeIndicatorClassName}`
                      : thumbnails
                        ? 'border-transparent opacity-60 hover:opacity-100'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }
                `}
                  aria-label={indicatorLabel}
                  aria-selected={isActive ? 'true' : 'false'}
                  aria-controls={`${carouselId}-slide-${index}`}
                  role="tab"
                  tabIndex={0}
                  onClick={() => !disabled && goToSlide(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      !disabled && goToSlide(index);
                    }
                  }}
                  data-testid={`carousel-indicator-${index}`}
                >
                  {thumbnails && (
                    <div className="w-full h-full overflow-hidden object-cover rounded">
                      {/* Thumbnail-Inhalt */}
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={`Thumbnail für ${indicatorLabel}`}
                          className="w-full h-full object-cover"
                          aria-hidden="true"
                        />
                      ) : typeof item.content === 'string' ? (
                        <img
                          src={item.content}
                          alt={`Thumbnail für ${indicatorLabel}`}
                          className="w-full h-full object-cover"
                          aria-hidden="true"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {index + 1}
                        </div>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      );
    };

    // Render-Funktion für Pause-Button
    const renderPauseButton = () => {
      if (autoPlay <= 0) return null;

      return (
        <button
          type="button"
          className={`
          absolute top-2 right-2 z-10
          p-2 rounded-full
          bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50
          hover:bg-opacity-75 dark:hover:bg-opacity-75
          ${focusClasses}
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
          aria-label={isPaused ? 'Wiedergabe starten' : 'Wiedergabe pausieren'}
          aria-pressed={isPaused}
          onClick={togglePause}
          disabled={disabled}
          tabIndex={0}
          data-testid="carousel-pause-button"
        >
          {isPaused ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-800 dark:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-800 dark:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </button>
      );
    };

    // Render-Funktion für ARIA-Beschreibung
    const renderDescription = () => {
      if (!ariaDescription) return null;

      return (
        <div id={ariaDescriptionId} className="sr-only">
          {ariaDescription}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        id={carouselId}
        className={carouselClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        role="region"
        aria-label={ariaLabel}
        aria-roledescription="carousel"
        aria-describedby={ariaDescription ? ariaDescriptionId : undefined}
        tabIndex={0}
        data-testid="carousel"
        {...rest}
      >
        {renderDescription()}

        {/* Hauptcontainer mit Aspect Ratio */}
        <div className="relative w-full" style={{ paddingBottom: aspectRatioPadding }}>
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
                aria-live={isPaused ? 'polite' : 'off'}
                data-testid="carousel-slide-track"
              >
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    id={`${carouselId}-slide-${index}`}
                    className="w-full h-full flex-shrink-0"
                    aria-hidden={activeIndex !== index ? 'true' : 'false'}
                    aria-label={item.ariaLabel || `Bild ${index + 1}`}
                    role="tabpanel"
                    tabIndex={activeIndex === index ? 0 : -1}
                    data-slide-index={index}
                    aria-roledescription="slide"
                    data-testid={`carousel-slide-${index}`}
                  >
                    {item.content}
                  </div>
                ))}
              </div>
            ) : (
              /* Fade Animation oder keine Animation */
              <div
                className="h-full relative"
                aria-live={isPaused ? 'polite' : 'off'}
                data-testid="carousel-fade-container"
              >
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    id={`${carouselId}-slide-${index}`}
                    className={`
                    absolute inset-0 
                    ${animation === 'fade' ? 'transition-opacity duration-300 ease-in-out' : ''}
                    ${activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                  `}
                    aria-hidden={activeIndex !== index ? 'true' : 'false'}
                    aria-label={item.ariaLabel || `Bild ${index + 1}`}
                    role="tabpanel"
                    tabIndex={activeIndex === index ? 0 : -1}
                    data-slide-index={index}
                    aria-roledescription="slide"
                    data-testid={`carousel-slide-${index}`}
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
        {renderPauseButton()}

        {/* Status-Anzeige für Screenreader */}
        <div className="sr-only" aria-live="polite" data-testid="carousel-status">
          {`Bild ${activeIndex + 1} von ${totalItems}${isPaused ? ', Wiedergabe pausiert' : ''}`}
        </div>

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
  }
);

Carousel.displayName = 'Carousel';

export default Carousel;
