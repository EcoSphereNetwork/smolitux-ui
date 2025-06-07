export function debounce<T extends (...args: any[]) => any>(fn: T, wait: number, immediate = false) {
  let timeout: NodeJS.Timeout | null = null;
  return function(this: any, ...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) fn.apply(this, args);
    };
    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) fn.apply(this, args);
  } as T;
}

export function throttle<T extends (...args: any[]) => any>(fn: T, wait: number) {
  let inThrottle = false;
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);
    }
  } as T;
}

export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();
  return function(this: any, ...args: Parameters<T>) {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn.apply(this, args));
    }
    return cache.get(key)!;
  } as T;
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function deepMerge<T extends object, U extends object>(target: T, source: U): T & U {
  const result = { ...target } as any;
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = deepMerge(result[key] || {}, value as any);
    } else {
      result[key] = value;
    }
  }
  return result;
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function retry<T>(fn: () => Promise<T>, attempts = 3, delayMs = 0): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (delayMs) await sleep(delayMs);
    }
  }
  throw lastError;
}

export function groupBy<T>(arr: T[], key: (item: T) => string): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const k = key(item);
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}

export function sortBy<T>(arr: T[], key: (item: T) => any): T[] {
  return [...arr].sort((a, b) => {
    const ka = key(a);
    const kb = key(b);
    if (ka > kb) return 1;
    if (ka < kb) return -1;
    return 0;
  });
}

export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
