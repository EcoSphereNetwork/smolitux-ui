import { useState, useEffect } from 'react';

/**
 * Hook für die Verwaltung von Feed-Daten
 * @param options Optionen für den Feed
 * @returns Feed-Daten und Funktionen
 */
export interface UseFeedOptions {
  initialFilter?: string;
}

export interface FeedItem {
  id: string;
  [key: string]: unknown;
}

export function useFeed(options: UseFeedOptions = {}): {
  items: FeedItem[];
  loading: boolean;
  error: Error | null;
  filter: string;
  hasMore: boolean;
  loadMore: () => void;
  changeFilter: (newFilter: string) => void;
} {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<string>(options.initialFilter || 'latest');
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Simulierte Daten-Fetch-Funktion
  const fetchItems = async () => {
    setLoading(true);
    setError(null);

    try {
      // In einer realen Implementierung würde hier ein API-Aufruf stehen
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulierte Daten
      const newItems: FeedItem[] = [];
      setItems((prevItems) => [...prevItems, ...newItems]);
      setHasMore(newItems.length > 0);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  // Initialer Fetch
  useEffect(() => {
    fetchItems();
  }, [filter]);

  // Funktion zum Laden weiterer Elemente
  const loadMore = () => {
    if (!loading && hasMore) {
      fetchItems();
    }
  };

  // Funktion zum Ändern des Filters
  const changeFilter = (newFilter: string) => {
    if (newFilter !== filter) {
      setItems([]);
      setHasMore(true);
      setFilter(newFilter);
    }
  };

  return {
    items,
    loading,
    error,
    filter,
    hasMore,
    loadMore,
    changeFilter,
  };
}
