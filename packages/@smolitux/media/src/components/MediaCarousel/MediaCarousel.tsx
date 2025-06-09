// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useState, useEffect, useRef } from 'react';
import { Card, Button } from '@smolitux/core';

export interface MediaItem {
  /** Eindeutige ID des Medienelements */
  id: string;
  /** Titel des Medienelements */
  title: string;
  /** Beschreibung des Medienelements */
  description?: string;
  /** URL des Medienelements */
  url: string;
  /** Thumbnail-URL des Medienelements */
  thumbnailUrl: string;
  /** Typ des Medienelements */
  type: 'audio' | 'video' | 'image';
  /** Ersteller des Medienelements */
  creator?: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  /** Erstellungsdatum des Medienelements */
  createdAt?: Date;
  /** Dauer des Medienelements (in Sekunden) */
  duration?: number;
  /** Anzahl der Aufrufe */
  views?: number;
  /** Anzahl der Likes */
  likes?: number;
  /** Ist das Medienelement ein Premium-Inhalt? */
  isPremium?: boolean;
  /** Zusätzliche Metadaten zum Medienelement */
  metadata?: Record<string, unknown>;
}

export interface MediaCarouselProps {
  /** Titel des Karussells */
  title?: string;
  /** Beschreibung des Karussells */
  description?: string;
  /** Medienelemente */
  items: MediaItem[];
  /** Anzahl der sichtbaren Elemente */
  visibleItems?: number;
  /** Callback beim Klicken auf ein Medienelement */
  onItemClick?: (item: MediaItem) => void;
  /** Callback beim Klicken auf einen Ersteller */
  onCreatorClick?: (creatorId: string) => void;
  /** Callback beim Klicken auf "Alle anzeigen" */
  onViewAll?: () => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Ist die Komponente im Ladezustand? */
  loading?: boolean;
  /** Automatisches Scrollen aktivieren */
  autoScroll?: boolean;
  /** Intervall für automatisches Scrollen (in ms) */
  autoScrollInterval?: number;
  /** Layout-Variante */
  variant?: 'default' | 'featured' | 'compact';
}

/**
 * MediaCarousel-Komponente für die Anzeige von Medienelementen in einem Karussell
 */
export const MediaCarousel: React.FC<MediaCarouselProps> = ({
  title,
  description,
  items,
  visibleItems = 4,
  onItemClick,
  onCreatorClick,
  onViewAll,
  className = '',
  loading = false,
  autoScroll = false,
  autoScrollInterval = 5000,
  variant = 'default',
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hovering, setHovering] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Automatisches Scrollen
  useEffect(() => {
    if (autoScroll && !hovering && items.length > visibleItems) {
      const startAutoScroll = () => {
        if (autoScrollTimerRef.current) {
          clearInterval(autoScrollTimerRef.current);
        }

        autoScrollTimerRef.current = setInterval(() => {
          if (carouselRef.current) {
            const carousel = carouselRef.current;
            const currentScroll = carousel.scrollLeft;
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;

            // Wenn am Ende angekommen, zurück zum Anfang
            if (currentScroll >= maxScroll - 10) {
              carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
              // Sonst zum nächsten Element scrollen
              const itemWidth = carousel.clientWidth / visibleItems;
              carousel.scrollTo({
                left: currentScroll + itemWidth,
                behavior: 'smooth',
              });
            }
          }
        }, autoScrollInterval);
      };

      startAutoScroll();

      return () => {
        if (autoScrollTimerRef.current) {
          clearInterval(autoScrollTimerRef.current);
        }
      };
    }
  }, [autoScroll, autoScrollInterval, visibleItems, hovering, items.length]);

  // Auf Medienelement klicken
  const handleItemClick = (item: MediaItem) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  // Auf Ersteller klicken
  const handleCreatorClick = (creatorId: string, event: React.MouseEvent) => {
    event.stopPropagation();

    if (onCreatorClick) {
      onCreatorClick(creatorId);
    }
  };

  // Nach links scrollen
  const scrollLeft = () => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const itemWidth = carousel.clientWidth / visibleItems;
    carousel.scrollTo({
      left: carousel.scrollLeft - itemWidth * Math.floor(visibleItems / 2),
      behavior: 'smooth',
    });
  };

  // Nach rechts scrollen
  const scrollRight = () => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const itemWidth = carousel.clientWidth / visibleItems;
    carousel.scrollTo({
      left: carousel.scrollLeft + itemWidth * Math.floor(visibleItems / 2),
      behavior: 'smooth',
    });
  };

  // Scroll-Position speichern
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft } = event.currentTarget;
    setScrollPosition(scrollLeft);
  };

  // Dauer formatieren (mm:ss)
  const formatDuration = (seconds?: number): string => {
    if (!seconds) return '';

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Anzahl formatieren (1.2k, 3.4M)
  const formatCount = (count?: number): string => {
    if (!count) return '';

    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  // Datum formatieren
  const formatDate = (date?: Date): string => {
    if (!date) return '';

    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Platzhalter für den Ladezustand
  const renderPlaceholders = () => {
    return Array.from({ length: visibleItems }).map((_, index) => (
      <div
        key={`placeholder-${index}`}
        className="flex-shrink-0 animate-pulse"
        style={{ width: `calc(100% / ${visibleItems})` }}
      >
        <div
          className={`${variant === 'featured' && index === 0 ? 'aspect-[16/9]' : 'aspect-video'} bg-gray-200 dark:bg-gray-700 rounded-lg`}
        />
        <div className="p-3 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        </div>
      </div>
    ));
  };

  // Featured-Variante
  if (variant === 'featured') {
    return (
      <div className={className}>
        {/* Header */}
        {(title || description) && (
          <div className="flex items-center justify-between mb-4">
            <div>
              {title && (
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
              )}

              {description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
              )}
            </div>

            {onViewAll && (
              <Button variant="outline" size="sm" onClick={onViewAll}>
                Alle anzeigen
              </Button>
            )}
          </div>
        )}

        {/* Karussell */}
        <div
          className="relative group"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* Scroll-Buttons */}
          {items.length > visibleItems && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Nach links scrollen"
                style={{
                  display: scrollPosition > 0 ? 'block' : 'none',
                }}
              >
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Nach rechts scrollen"
                style={{
                  display:
                    carouselRef.current &&
                    scrollPosition <
                      (carouselRef.current?.scrollWidth || 0) -
                        (carouselRef.current?.clientWidth || 0) -
                        10
                      ? 'block'
                      : 'none',
                }}
              >
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Elemente */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto hide-scrollbar pb-4 -mx-2"
            onScroll={handleScroll}
          >
            {loading ? (
              renderPlaceholders()
            ) : items.length === 0 ? (
              <div className="w-full py-12 text-center text-gray-500 dark:text-gray-400">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                  />
                </svg>
                <p className="text-lg font-medium">Keine Medien verfügbar</p>
                <p className="mt-2">Es wurden keine Medien gefunden.</p>
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex-shrink-0 px-2 ${index === 0 ? 'md:w-1/2' : `md:w-1/4`}`}
                  style={{ width: index === 0 ? '100%' : `calc(100% / ${visibleItems - 1})` }}
                >
                  <Card
                    className="h-full overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleItemClick(item)}
                  >
                    {/* Thumbnail */}
                    <div
                      className={`relative ${index === 0 ? 'aspect-[16/9]' : 'aspect-video'} bg-gray-200 dark:bg-gray-700 overflow-hidden`}
                    >
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Typ-Badge */}
                      <div className="absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-medium bg-black/60 text-white">
                        {item.type === 'audio' && 'Audio'}
                        {item.type === 'video' && 'Video'}
                        {item.type === 'image' && 'Bild'}
                      </div>

                      {/* Premium-Badge */}
                      {item.isPremium && (
                        <div className="absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium bg-yellow-500 text-white">
                          Premium
                        </div>
                      )}

                      {/* Dauer */}
                      {item.duration && (
                        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md text-xs font-medium bg-black/60 text-white">
                          {formatDuration(item.duration)}
                        </div>
                      )}
                    </div>

                    {/* Inhalt */}
                    <div className="p-3">
                      <h3
                        className={`${index === 0 ? 'text-lg' : 'text-sm'} font-semibold text-gray-900 dark:text-white line-clamp-2`}
                      >
                        {item.title}
                      </h3>

                      {/* Ersteller */}
                      {item.creator && (
                        <div
                          className="mt-2 flex items-center"
                          onClick={(e) => handleCreatorClick(item.creator!.id, e)}
                        >
                          {item.creator.avatarUrl ? (
                            <img
                              src={item.creator.avatarUrl}
                              alt={item.creator.name}
                              className="w-5 h-5 rounded-full mr-1"
                            />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-bold mr-1">
                              {item.creator.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 truncate">
                            {item.creator.name}
                          </span>
                        </div>
                      )}

                      {/* Statistiken */}
                      {(item.views !== undefined || item.likes !== undefined) && (
                        <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-3">
                          {item.views !== undefined && (
                            <span className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              {formatCount(item.views)}
                            </span>
                          )}

                          {item.likes !== undefined && (
                            <span className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                              {formatCount(item.likes)}
                            </span>
                          )}

                          {item.createdAt && <span>{formatDate(item.createdAt)}</span>}
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // Kompakte Variante
  if (variant === 'compact') {
    return (
      <div className={className}>
        {/* Header */}
        {(title || description) && (
          <div className="flex items-center justify-between mb-4">
            <div>
              {title && (
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
              )}

              {description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
              )}
            </div>

            {onViewAll && (
              <Button variant="outline" size="sm" onClick={onViewAll}>
                Alle anzeigen
              </Button>
            )}
          </div>
        )}

        {/* Karussell */}
        <div
          className="relative group"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* Scroll-Buttons */}
          {items.length > visibleItems && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Nach links scrollen"
                style={{
                  display: scrollPosition > 0 ? 'block' : 'none',
                }}
              >
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Nach rechts scrollen"
                style={{
                  display:
                    carouselRef.current &&
                    scrollPosition <
                      (carouselRef.current?.scrollWidth || 0) -
                        (carouselRef.current?.clientWidth || 0) -
                        10
                      ? 'block'
                      : 'none',
                }}
              >
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Elemente */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto hide-scrollbar pb-4 -mx-2"
            onScroll={handleScroll}
          >
            {loading ? (
              renderPlaceholders()
            ) : items.length === 0 ? (
              <div className="w-full py-12 text-center text-gray-500 dark:text-gray-400">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                  />
                </svg>
                <p className="text-lg font-medium">Keine Medien verfügbar</p>
                <p className="mt-2">Es wurden keine Medien gefunden.</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 px-2"
                  style={{ width: `calc(100% / ${visibleItems})` }}
                >
                  <div
                    className="flex items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                    onClick={() => handleItemClick(item)}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Typ-Icon */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        {item.type === 'audio' && (
                          <svg
                            className="w-6 h-6 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                          </svg>
                        )}
                        {item.type === 'video' && (
                          <svg
                            className="w-6 h-6 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                        {item.type === 'image' && (
                          <svg
                            className="w-6 h-6 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                          </svg>
                        )}
                      </div>

                      {/* Dauer */}
                      {item.duration && (
                        <div className="absolute bottom-0 right-0 px-1 py-0.5 text-xs font-medium bg-black/60 text-white">
                          {formatDuration(item.duration)}
                        </div>
                      )}
                    </div>

                    {/* Inhalt */}
                    <div className="ml-3 flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.title}
                      </h3>

                      {/* Ersteller */}
                      {item.creator && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {item.creator.name}
                        </p>
                      )}

                      {/* Statistiken */}
                      {item.views !== undefined && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatCount(item.views)} Aufrufe
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // Standard-Variante
  return (
    <div className={className}>
      {/* Header */}
      {(title || description) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>}

            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
            )}
          </div>

          {onViewAll && (
            <Button variant="outline" size="sm" onClick={onViewAll}>
              Alle anzeigen
            </Button>
          )}
        </div>
      )}

      {/* Karussell */}
      <div
        className="relative group"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Scroll-Buttons */}
        {items.length > visibleItems && (
          <>
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Nach links scrollen"
              style={{
                display: scrollPosition > 0 ? 'block' : 'none',
              }}
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Nach rechts scrollen"
              style={{
                display:
                  carouselRef.current &&
                  scrollPosition <
                    (carouselRef.current?.scrollWidth || 0) -
                      (carouselRef.current?.clientWidth || 0) -
                      10
                    ? 'block'
                    : 'none',
              }}
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Elemente */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto hide-scrollbar pb-4 -mx-2"
          onScroll={handleScroll}
        >
          {loading ? (
            renderPlaceholders()
          ) : items.length === 0 ? (
            <div className="w-full py-12 text-center text-gray-500 dark:text-gray-400">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
              <p className="text-lg font-medium">Keine Medien verfügbar</p>
              <p className="mt-2">Es wurden keine Medien gefunden.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 px-2"
                style={{ width: `calc(100% / ${visibleItems})` }}
              >
                <Card
                  className="h-full overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Typ-Badge */}
                    <div className="absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-medium bg-black/60 text-white">
                      {item.type === 'audio' && 'Audio'}
                      {item.type === 'video' && 'Video'}
                      {item.type === 'image' && 'Bild'}
                    </div>

                    {/* Premium-Badge */}
                    {item.isPremium && (
                      <div className="absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium bg-yellow-500 text-white">
                        Premium
                      </div>
                    )}

                    {/* Dauer */}
                    {item.duration && (
                      <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md text-xs font-medium bg-black/60 text-white">
                        {formatDuration(item.duration)}
                      </div>
                    )}
                  </div>

                  {/* Inhalt */}
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Ersteller */}
                    {item.creator && (
                      <div
                        className="mt-2 flex items-center"
                        onClick={(e) => handleCreatorClick(item.creator!.id, e)}
                      >
                        {item.creator.avatarUrl ? (
                          <img
                            src={item.creator.avatarUrl}
                            alt={item.creator.name}
                            className="w-5 h-5 rounded-full mr-1"
                          />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-bold mr-1">
                            {item.creator.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 truncate">
                          {item.creator.name}
                        </span>
                      </div>
                    )}

                    {/* Statistiken */}
                    {(item.views !== undefined || item.likes !== undefined) && (
                      <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-3">
                        {item.views !== undefined && (
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            {formatCount(item.views)}
                          </span>
                        )}

                        {item.likes !== undefined && (
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                            {formatCount(item.likes)}
                          </span>
                        )}

                        {item.createdAt && <span>{formatDate(item.createdAt)}</span>}
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
