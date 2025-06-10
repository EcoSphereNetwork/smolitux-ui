export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
  immediate = false
): T {
  let timeout: NodeJS.Timeout | null = null;
  return function (this: unknown, ...args: Parameters<T>) {
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

export function throttle<T extends (...args: any[]) => any>(fn: T, wait: number): T {
  let inThrottle = false;
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);
    }
  } as T;
}

export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  resolver?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();
  return function (this: unknown, ...args: Parameters<T>) {
    const key = resolver ? resolver(...args) : JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn.apply(this, args));
    }
    return cache.get(key)!;
  } as T;
}

export function deepClone<T>(obj: T, seen = new Map<any, any>()): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (seen.has(obj)) return seen.get(obj);

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj) as unknown as T;
  }
  if (Array.isArray(obj)) {
    const arr: unknown[] = [];
    seen.set(obj, arr);
    obj.forEach((item, idx) => {
      arr[idx] = deepClone(item, seen);
    });
    return arr as unknown as T;
  }

  const cloned: Record<string, unknown> = {};
  seen.set(obj, cloned);
  Object.entries(obj as Record<string, unknown>).forEach(([key, value]) => {
    cloned[key] = deepClone(value as unknown, seen);
  });
  return cloned as T;
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
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface RetryOptions {
  retries?: number;
  delay?: number;
  backoff?: boolean;
}

export async function retry<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const { retries = 3, delay = 0, backoff = false } = options;
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt === retries) break;
      const wait = backoff ? delay * Math.pow(2, attempt) : delay;
      if (wait > 0) await sleep(wait);
    }
  }
  throw lastError;
}

export function groupBy<T>(
  arr: T[],
  key: keyof T | ((item: T) => string)
): Record<string, T[]> {
  if (!Array.isArray(arr)) {
    throw new TypeError('arr must be an array');
  }
  const accessor = typeof key === 'function' ? key : (item: T) => String(item[key]);
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const k = accessor(item);
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}

export function sortBy<T>(
  arr: T[],
  key: keyof T | ((item: T) => unknown),
  order: 'asc' | 'desc' = 'asc'
): T[] {
  if (!Array.isArray(arr)) {
    throw new TypeError('arr must be an array');
  }
  const accessor = typeof key === 'function' 
    ? key as (item: T) => unknown 
    : (item: T) => item[key as keyof T];
  
  return [...arr].sort((a, b) => {
    const ka = accessor(a);
    const kb = accessor(b);
    
    // Type-safe comparison using String conversion
    const strA = String(ka);
    const strB = String(kb);
    
    if (strA > strB) return order === 'asc' ? 1 : -1;
    if (strA < strB) return order === 'asc' ? -1 : 1;
    return 0;
  });
}

export function chunk<T>(arr: T[], size: number): T[][] {
  if (!Number.isInteger(size) || size <= 0) {
    throw new Error('size must be a positive integer');
  }

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
