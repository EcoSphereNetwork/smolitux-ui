/**
 * Generiert eine eindeutige ID
 * @returns Eindeutige ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Kürzt einen Text auf eine bestimmte Länge
 * @param text Der zu kürzende Text
 * @param maxLength Die maximale Länge
 * @returns Gekürzter Text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Verzögert die Ausführung einer Funktion
 * @param ms Verzögerung in Millisekunden
 * @returns Promise, das nach der Verzögerung aufgelöst wird
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Gruppiert ein Array nach einem Schlüssel
 * @param array Das zu gruppierende Array
 * @param key Der Schlüssel, nach dem gruppiert werden soll
 * @returns Gruppiertes Objekt
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * Sortiert ein Array nach einem Schlüssel
 * @param array Das zu sortierende Array
 * @param key Der Schlüssel, nach dem sortiert werden soll
 * @param direction Die Sortierrichtung ('asc' oder 'desc')
 * @returns Sortiertes Array
 */
export function sortBy<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}