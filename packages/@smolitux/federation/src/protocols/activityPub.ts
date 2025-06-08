export interface ActivityPubActor {
  id: string;
  type: string;
  name?: string;
  url?: string;
  inbox?: string;
  outbox?: string;
  [key: string]: unknown;
}

import { SearchResult } from '../types';

export async function fetchActivityPub<T = unknown>(
  url: string,
  init: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/activity+json',
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Network error ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function searchActivityPub(
  endpoint: string,
  query: string
): Promise<SearchResult[]> {
  const urlObj = new URL(endpoint);
  urlObj.searchParams.set('q', query);

  const data = await fetchActivityPub<{ items: SearchResult[] }>(urlObj.toString());
  return data.items;
}
