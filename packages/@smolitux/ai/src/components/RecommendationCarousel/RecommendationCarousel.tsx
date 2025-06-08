import React, { useState, useEffect, useRef } from 'react';

export interface RecommendationItem {
  /** Eindeutige ID des empfohlenen Elements */
  id: string;
  /** Titel des empfohlenen Elements */
  title: string;
  /** Beschreibung des empfohlenen Elements */
  description?: string;
  /** URL des empfohlenen Elements */
  url: string;
  /** Thumbnail-URL des empfohlenen Elements */
  thumbnailUrl: string;
  /** Typ des empfohlenen Elements */
  type: 'audio' | 'video' | 'image' | 'post' | 'user' | 'other';
  /** Ersteller des empfohlenen Elements */
  creator?: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  /** Relevanz des empfohlenen Elements (0-100) */
  relevance?: number;
  /** Grund für die Empfehlung */
  reason?: string;
  /** Zusätzliche Metadaten zum empfohlenen Element */
  metadata?: Record<string, any>;
}

export interface RecommendationGroup {
  /** Eindeutige ID der Empfehlungsgruppe */
  id: string;
  /** Titel der Empfehlungsgruppe */
  title: string;
  /** Beschreibung der Empfehlungsgruppe */
  description?: string;
  /** Empfohlene Elemente */
  items: RecommendationItem[];
}

export interface RecommendationCarouselProps {
  /** Empfehlungsgruppen */
  groups: RecommendationGroup[];
  /** Anzahl der sichtbaren Elemente */
  visibleItems?: number;
  /** Callback beim Klicken auf ein empfohlenes Element */
  onItemClick?: (item: RecommendationItem) => void;
  /** Callback beim Klicken auf einen Ersteller */
  onCreatorClick?: (creatorId: string) => void;
  /** Callback beim Aktualisieren der Empfehlungen */
  onRefresh?: () => Promise<void>;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Ist die Komponente im Ladezustand? */
  loading?: boolean;
  /** Automatisches Scrollen aktivieren */
  autoScroll?: boolean;
  /** Intervall für automatisches Scrollen (in ms) */
  autoScrollInterval?: number;
}

/**
 * RecommendationCarousel-Komponente für die Anzeige von KI-generierten Empfehlungen
 */
export const RecommendationCarousel: React.FC<RecommendationCarouselProps> = ({
  groups,
  visibleItems = 4,
  onItemClick,
  onCreatorClick,
  onRefresh,
  className = '',
  loading = false,
  autoScroll = false,
  autoScrollInterval = 5000,
}) => {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [scrollPositions, setScrollPositions] = useState<Record<string, number>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hovering, setHovering] = useState(false);
  const carouselRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeGroup = groups[activeGroupIndex] || null;

  // Automatisches Scrollen
  useEffect(() => {
    if (autoScroll && activeGroup && !hovering) {
      const startAutoScroll = () => {
        if (autoScrollTimerRef.current) {
          clearInterval(autoScrollTimerRef.current);
        }

        autoScrollTimerRef.current = setInterval(() => {
          if (activeGroup && carouselRefs.current[activeGroup.id]) {
            const carousel = carouselRefs.current[activeGroup.id];
            if (!carousel) return;

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
  }, [autoScroll, activeGroup, autoScrollInterval, visibleItems, hovering]);

  // Empfehlungen aktualisieren
  const handleRefresh = async () => {
    if (!onRefresh || isRefreshing) return;

    setIsRefreshing(true);

    try {
      await onRefresh();
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Empfehlungen:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Auf empfohlenes Element klicken
  const handleItemClick = (item: RecommendationItem) => {
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
  const scrollLeft = (groupId: string) => {
    const carousel = carouselRefs.current[groupId];
    if (!carousel) return;

    const itemWidth = carousel.clientWidth / visibleItems;
    carousel.scrollTo({
      left: carousel.scrollLeft - itemWidth * Math.floor(visibleItems / 2),
      behavior: 'smooth',
    });
  };

  // Nach rechts scrollen
  const scrollRight = (groupId: string) => {
    const carousel = carouselRefs.current[groupId];
    if (!carousel) return;

    const itemWidth = carousel.clientWidth / visibleItems;
    carousel.scrollTo({
      left: carousel.scrollLeft + itemWidth * Math.floor(visibleItems / 2),
      behavior: 'smooth',
    });
  };

  // Scroll-Position speichern
  const handleScroll = (groupId: string, event: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft } = event.currentTarget;

    setScrollPositions((prev) => ({
      ...prev,
      [groupId]: scrollLeft,
    }));
  };

  // Platzhalter für den Ladezustand
  const renderPlaceholders = () => {
    return Array.from({ length: visibleItems }).map((_, index) => (
      <div
        key={`placeholder-${index}`}
        className="flex-shrink-0 w-full h-full animate-pulse"
        style={{ width: `calc(100% / ${visibleItems})` }}
      >
        <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-t-lg" />
        <div className="p-3 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        </div>
      </div>
    ));
  };

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Empfehlungen für dich</h2>

        <div className="flex items-center space-x-2">
          {/* Aktualisieren-Button */}
          {onRefresh && (
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Empfehlungen aktualisieren"
            >
              <svg
                className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Tabs für Empfehlungsgruppen */}
      {groups.length > 1 && (
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4 overflow-x-auto hide-scrollbar">
          {groups.map((group, index) => (
            <button
              key={group.id}
              onClick={() => setActiveGroupIndex(index)}
              className={`py-2 px-4 text-sm font-medium whitespace-nowrap ${
                index === activeGroupIndex
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {group.title}
            </button>
          ))}
        </div>
      )}

      {/* Aktive Empfehlungsgruppe */}
      {activeGroup && (
        <div>
          {/* Beschreibung */}
          {activeGroup.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {activeGroup.description}
            </p>
          )}

          {/* Karussell */}
          <div
            className="relative group"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {/* Scroll-Buttons */}
            <button
              onClick={() => scrollLeft(activeGroup.id)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Nach links scrollen"
              style={{
                display: scrollPositions[activeGroup.id] ? 'block' : 'none',
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
              onClick={() => scrollRight(activeGroup.id)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Nach rechts scrollen"
              style={{
                display:
                  carouselRefs.current[activeGroup.id] &&
                  scrollPositions[activeGroup.id] <
                    (carouselRefs.current[activeGroup.id]?.scrollWidth || 0) -
                      (carouselRefs.current[activeGroup.id]?.clientWidth || 0) -
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

            {/* Elemente */}
            <div
              ref={(ref) => (carouselRefs.current[activeGroup.id] = ref)}
              className="flex overflow-x-auto hide-scrollbar pb-4 -mx-2"
              onScroll={(e) => handleScroll(activeGroup.id, e)}
            >
              {loading ? (
                renderPlaceholders()
              ) : activeGroup.items.length === 0 ? (
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
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <p className="text-lg font-medium">Keine Empfehlungen verfügbar</p>
                  <p className="mt-2">
                    Wir arbeiten daran, passende Empfehlungen für dich zu finden.
                  </p>
                </div>
              ) : (
                activeGroup.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 px-2"
                    style={{ width: `calc(100% / ${visibleItems})` }}
                  >
                    <div
                      className="h-full overflow-hidden hover:shadow-md transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700 rounded-lg"
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
                          {item.type === 'post' && 'Beitrag'}
                          {item.type === 'user' && 'Benutzer'}
                          {item.type === 'other' && 'Sonstiges'}
                        </div>

                        {/* Relevanz */}
                        {item.relevance !== undefined && (
                          <div className="absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium bg-primary-500/80 text-white">
                            {item.relevance}% Match
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

                        {/* Grund für die Empfehlung */}
                        {item.reason && (
                          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                            {item.reason}
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
      )}
    </div>
  );
};
