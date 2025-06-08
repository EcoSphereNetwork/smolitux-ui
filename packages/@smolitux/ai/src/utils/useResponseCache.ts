import { useEffect, useRef, useState } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache: Record<string, CacheEntry<unknown>> = {};

export function getCached<T>(key: string): T | undefined {
  const entry = cache[key] as CacheEntry<T> | undefined;
  return entry?.data;
}

export function setCached<T>(key: string, data: T): void {
  cache[key] = { data, timestamp: Date.now() };
}

export function useResponseCache<T>(
  key: string,
  fetcher: () => Promise<T>
): { data: T | undefined; error: Error | null; loading: boolean } {
  const [state, setState] = useState<{
    data: T | undefined;
    error: Error | null;
    loading: boolean;
  }>({ data: getCached<T>(key), error: null, loading: !cache[key] });

  const fetchRef = useRef(fetcher);
  fetchRef.current = fetcher;

  useEffect(() => {
    if (cache[key]) {
      return;
    }

    let isMounted = true;
    setState((s) => ({ ...s, loading: true }));
    fetchRef.current()
      .then((result) => {
        if (isMounted) {
          setCached(key, result);
          setState({ data: result, error: null, loading: false });
        }
      })
      .catch((err) => {
        if (isMounted) {
          setState({ data: undefined, error: err, loading: false });
        }
      });
    return () => {
      isMounted = false;
    };
  }, [key]);

  return state;
}
