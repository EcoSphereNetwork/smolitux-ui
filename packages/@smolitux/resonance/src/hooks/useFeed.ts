import { useState, useEffect } from 'react';

/**
 * Hook für die Verwaltung von Feed-Daten
 * @param options Optionen für den Feed
 * @returns Feed-Daten und Funktionen
 */
export function useFeed(options: any = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(options.initialFilter || 'latest');
  const [hasMore, setHasMore] = useState(true);

  // Simulierte Daten-Fetch-Funktion
  const fetchItems = async () => {
    setLoading(true);
    setError(null);

    try {
      // In einer realen Implementierung würde hier ein API-Aufruf stehen
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulierte Daten
      const newItems = [];
      setItems((prevItems) => [...prevItems, ...newItems]);
      setHasMore(newItems.length > 0);
    } catch (err) {
      setError(err);
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
  const changeFilter = (newFilter) => {
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
