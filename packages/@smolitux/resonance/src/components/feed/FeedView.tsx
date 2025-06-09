// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex } from '../primitives';
import { Button } from '@smolitux/core';
import { FeedItem, FeedItemData } from './FeedItem';
import { FeedFilter, FilterOption } from './FeedFilter';
import { FeedSidebar } from './FeedSidebar';

export interface FeedViewProps {
  /** Feed-Daten */
  feedItems: FeedItemData[];
  /** Aktiver Filter */
  activeFilter?: string;
  /** Verfügbare Filter */
  filters?: FilterOption[];
  /** Callback für Filterwechsel */
  onFilterChange?: (filter: string) => void;
  /** Callback für Laden weiterer Beiträge */
  onLoadMore?: () => void;
  /** Callback für Like */
  onLike?: (id: string) => void;
  /** Callback für Kommentar */
  onComment?: (id: string) => void;
  /** Callback für Share */
  onShare?: (id: string) => void;
  /** Callback für Klick auf einen Beitrag */
  onPostClick?: (id: string) => void;
  /** Ob weitere Beiträge geladen werden */
  isLoading?: boolean;
  /** Ob weitere Beiträge verfügbar sind */
  hasMore?: boolean;
  /** Ob die Sidebar angezeigt werden soll */
  showSidebar?: boolean;
  /** Sidebar-Props */
  sidebarProps?: React.ComponentProps<typeof FeedSidebar>;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * FeedView-Komponente für die Anzeige des personalisierten Feeds.
 * Zeigt Beiträge verschiedener Formate an und bietet Filtermöglichkeiten.
 */
export const FeedView: React.FC<FeedViewProps> = ({
  feedItems,
  activeFilter = 'latest',
  filters = [
    { id: 'latest', label: 'Latest' },
    { id: 'trending', label: 'Trending' },
    { id: 'following', label: 'Following' },
  ],
  onFilterChange,
  onLoadMore,
  onLike,
  onComment,
  onShare,
  onPostClick,
  isLoading = false,
  hasMore = true,
  showSidebar = true,
  sidebarProps,
  className = '',
  style,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Überprüfe die Bildschirmgröße
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Implementiere Infinite Scrolling
  useEffect(() => {
    if (!loadMoreRef.current || !onLoadMore || isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [onLoadMore, isLoading, hasMore]);

  return (
    <Flex
      className={`feed-view ${className}`}
      style={{
        width: '100%',
        ...style,
      }}
    >
      <Box
        style={{
          flex: 1,
          maxWidth: showSidebar && !isMobile ? 'calc(100% - 324px)' : '100%',
        }}
      >
        {/* Filter */}
        <FeedFilter
          filters={filters}
          activeFilter={activeFilter}
          onChange={(filterId) => {
            if (onFilterChange) onFilterChange(filterId);
          }}
        />

        {/* Feed Items */}
        <Box className="feed-items">
          {feedItems.length === 0 ? (
            <Box
              style={{
                padding: '32px 16px',
                textAlign: 'center',
                color: '#6b7280',
              }}
            >
              No posts to show. Follow more users or check back later.
            </Box>
          ) : (
            feedItems.map((item) => (
              <FeedItem
                key={item.id}
                item={item}
                onLike={onLike}
                onComment={onComment}
                onShare={onShare}
                onClick={onPostClick}
              />
            ))
          )}

          {/* Load More */}
          {feedItems.length > 0 && (
            <Box
              ref={loadMoreRef}
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '16px',
              }}
            >
              {isLoading ? (
                <Button disabled>
                  <svg
                    className="animate-spin mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </Button>
              ) : hasMore ? (
                <Button onClick={onLoadMore}>Load More</Button>
              ) : (
                <Box style={{ color: '#6b7280' }}>No more posts to load</Box>
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* Sidebar */}
      {showSidebar && !isMobile && (
        <Box style={{ marginLeft: '24px' }}>
          <FeedSidebar {...sidebarProps} />
        </Box>
      )}
    </Flex>
  );
};
