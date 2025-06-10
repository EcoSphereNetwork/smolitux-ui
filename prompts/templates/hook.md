# Hook-Template

## Hook-Struktur

```
hooks/
├── useHook.ts            # Hook-Implementierung
└── useHook.test.ts       # Hook-Tests
```

## Hook-Implementierung

```typescript
import { useState, useEffect, useCallback } from 'react';

/**
 * Hook-Parameter
 */
export interface UseHookParams {
  /** Parameter-Beschreibung */
  param1?: string;
  /** Parameter-Beschreibung */
  param2?: number;
  /** Parameter-Beschreibung */
  param3?: boolean;
}

/**
 * Hook-Rückgabewert
 */
export interface UseHookResult {
  /** Rückgabewert-Beschreibung */
  value1: string;
  /** Rückgabewert-Beschreibung */
  value2: number;
  /** Rückgabewert-Beschreibung */
  value3: boolean;
  /** Rückgabewert-Beschreibung */
  setValue1: (value: string) => void;
  /** Rückgabewert-Beschreibung */
  setValue2: (value: number) => void;
  /** Rückgabewert-Beschreibung */
  setValue3: (value: boolean) => void;
  /** Rückgabewert-Beschreibung */
  reset: () => void;
}

/**
 * Hook-Beschreibung
 * 
 * @param params - Hook-Parameter
 * @returns Hook-Rückgabewert
 * 
 * @example
 * ```tsx
 * const { value1, value2, value3, setValue1, setValue2, setValue3, reset } = useHook({
 *   param1: 'value1',
 *   param2: 42,
 *   param3: true,
 * });
 * ```
 */
export function useHook({
  param1 = '',
  param2 = 0,
  param3 = false,
}: UseHookParams = {}): UseHookResult {
  // State
  const [value1, setValue1] = useState<string>(param1);
  const [value2, setValue2] = useState<number>(param2);
  const [value3, setValue3] = useState<boolean>(param3);

  // Effects
  useEffect(() => {
    // Effect-Logik
    return () => {
      // Cleanup-Logik
    };
  }, [param1, param2, param3]);

  // Callbacks
  const reset = useCallback(() => {
    setValue1(param1);
    setValue2(param2);
    setValue3(param3);
  }, [param1, param2, param3]);

  // Rückgabewert
  return {
    value1,
    value2,
    value3,
    setValue1,
    setValue2,
    setValue3,
    reset,
  };
}

export default useHook;
```

## Hook-Tests

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useHook } from './useHook';

describe('useHook', () => {
  // Rendering-Tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { result } = renderHook(() => useHook());
      expect(result.current).toBeDefined();
    });

    it('initializes with default values', () => {
      const { result } = renderHook(() => useHook());
      expect(result.current.value1).toBe('');
      expect(result.current.value2).toBe(0);
      expect(result.current.value3).toBe(false);
    });

    it('initializes with provided values', () => {
      const { result } = renderHook(() => useHook({
        param1: 'test',
        param2: 42,
        param3: true,
      }));
      expect(result.current.value1).toBe('test');
      expect(result.current.value2).toBe(42);
      expect(result.current.value3).toBe(true);
    });
  });

  // Setter-Tests
  describe('Setters', () => {
    it('updates value1', () => {
      const { result } = renderHook(() => useHook());
      act(() => {
        result.current.setValue1('new value');
      });
      expect(result.current.value1).toBe('new value');
    });

    it('updates value2', () => {
      const { result } = renderHook(() => useHook());
      act(() => {
        result.current.setValue2(99);
      });
      expect(result.current.value2).toBe(99);
    });

    it('updates value3', () => {
      const { result } = renderHook(() => useHook());
      act(() => {
        result.current.setValue3(true);
      });
      expect(result.current.value3).toBe(true);
    });
  });

  // Reset-Tests
  describe('Reset', () => {
    it('resets to initial values', () => {
      const { result } = renderHook(() => useHook({
        param1: 'test',
        param2: 42,
        param3: true,
      }));
      
      act(() => {
        result.current.setValue1('new value');
        result.current.setValue2(99);
        result.current.setValue3(false);
      });
      
      expect(result.current.value1).toBe('new value');
      expect(result.current.value2).toBe(99);
      expect(result.current.value3).toBe(false);
      
      act(() => {
        result.current.reset();
      });
      
      expect(result.current.value1).toBe('test');
      expect(result.current.value2).toBe(42);
      expect(result.current.value3).toBe(true);
    });
  });

  // Re-render-Tests
  describe('Re-rendering', () => {
    it('updates when params change', () => {
      const { result, rerender } = renderHook(
        (props) => useHook(props),
        { initialProps: { param1: 'test', param2: 42, param3: true } }
      );
      
      expect(result.current.value1).toBe('test');
      expect(result.current.value2).toBe(42);
      expect(result.current.value3).toBe(true);
      
      rerender({ param1: 'updated', param2: 99, param3: false });
      
      expect(result.current.value1).toBe('test');
      expect(result.current.value2).toBe(42);
      expect(result.current.value3).toBe(true);
      
      act(() => {
        result.current.reset();
      });
      
      expect(result.current.value1).toBe('updated');
      expect(result.current.value2).toBe(99);
      expect(result.current.value3).toBe(false);
    });
  });

  // Edge-Case-Tests
  describe('Edge Cases', () => {
    it('handles undefined params', () => {
      const { result } = renderHook(() => useHook({
        param1: undefined,
        param2: undefined,
        param3: undefined,
      }));
      
      expect(result.current.value1).toBe('');
      expect(result.current.value2).toBe(0);
      expect(result.current.value3).toBe(false);
    });

    it('handles null params', () => {
      const { result } = renderHook(() => useHook({
        param1: null as unknown as string,
        param2: null as unknown as number,
        param3: null as unknown as boolean,
      }));
      
      expect(result.current.value1).toBe(null as unknown as string);
      expect(result.current.value2).toBe(null as unknown as number);
      expect(result.current.value3).toBe(null as unknown as boolean);
    });
  });

  // Performance-Tests
  describe('Performance', () => {
    it('memoizes callbacks', () => {
      const { result, rerender } = renderHook(() => useHook());
      
      const initialReset = result.current.reset;
      
      rerender();
      
      expect(result.current.reset).toBe(initialReset);
    });
  });
});
```

## Hook-Beispiele

### useToggle

```typescript
import { useState, useCallback } from 'react';

/**
 * Hook-Parameter
 */
export interface UseToggleParams {
  /** Initialer Zustand */
  initialState?: boolean;
}

/**
 * Hook-Rückgabewert
 */
export interface UseToggleResult {
  /** Aktueller Zustand */
  state: boolean;
  /** Funktion zum Umschalten des Zustands */
  toggle: () => void;
  /** Funktion zum Setzen des Zustands auf true */
  setTrue: () => void;
  /** Funktion zum Setzen des Zustands auf false */
  setFalse: () => void;
  /** Funktion zum Setzen des Zustands */
  setState: (state: boolean) => void;
}

/**
 * Hook zum Umschalten eines booleschen Zustands
 * 
 * @param params - Hook-Parameter
 * @returns Hook-Rückgabewert
 * 
 * @example
 * ```tsx
 * const { state, toggle, setTrue, setFalse } = useToggle({ initialState: false });
 * 
 * return (
 *   <div>
 *     <p>State: {state ? 'true' : 'false'}</p>
 *     <button onClick={toggle}>Toggle</button>
 *     <button onClick={setTrue}>Set True</button>
 *     <button onClick={setFalse}>Set False</button>
 *   </div>
 * );
 * ```
 */
export function useToggle({
  initialState = false,
}: UseToggleParams = {}): UseToggleResult {
  // State
  const [state, setState] = useState<boolean>(initialState);

  // Callbacks
  const toggle = useCallback(() => {
    setState((prevState) => !prevState);
  }, []);

  const setTrue = useCallback(() => {
    setState(true);
  }, []);

  const setFalse = useCallback(() => {
    setState(false);
  }, []);

  // Rückgabewert
  return {
    state,
    toggle,
    setTrue,
    setFalse,
    setState,
  };
}

export default useToggle;
```

### useLocalStorage

```typescript
import { useState, useEffect, useCallback } from 'react';

/**
 * Hook-Parameter
 */
export interface UseLocalStorageParams<T> {
  /** Schlüssel für den Local Storage */
  key: string;
  /** Initialer Wert */
  initialValue?: T;
}

/**
 * Hook-Rückgabewert
 */
export interface UseLocalStorageResult<T> {
  /** Aktueller Wert */
  value: T;
  /** Funktion zum Setzen des Werts */
  setValue: (value: T | ((prevValue: T) => T)) => void;
  /** Funktion zum Zurücksetzen des Werts auf den initialen Wert */
  reset: () => void;
  /** Funktion zum Entfernen des Werts aus dem Local Storage */
  remove: () => void;
}

/**
 * Hook zum Speichern und Abrufen von Werten im Local Storage
 * 
 * @param params - Hook-Parameter
 * @returns Hook-Rückgabewert
 * 
 * @example
 * ```tsx
 * const { value, setValue, reset, remove } = useLocalStorage({
 *   key: 'theme',
 *   initialValue: 'light',
 * });
 * 
 * return (
 *   <div>
 *     <p>Theme: {value}</p>
 *     <button onClick={() => setValue('dark')}>Set Dark</button>
 *     <button onClick={() => setValue('light')}>Set Light</button>
 *     <button onClick={reset}>Reset</button>
 *     <button onClick={remove}>Remove</button>
 *   </div>
 * );
 * ```
 */
export function useLocalStorage<T>({
  key,
  initialValue,
}: UseLocalStorageParams<T>): UseLocalStorageResult<T> {
  // State
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Effects
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  // Callbacks
  const reset = useCallback(() => {
    setValue(initialValue as T);
  }, [initialValue]);

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setValue(initialValue as T);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Rückgabewert
  return {
    value,
    setValue,
    reset,
    remove,
  };
}

export default useLocalStorage;
```

### useMediaQuery

```typescript
import { useState, useEffect } from 'react';

/**
 * Hook-Parameter
 */
export interface UseMediaQueryParams {
  /** Media Query */
  query: string;
}

/**
 * Hook zum Abfragen von Media Queries
 * 
 * @param params - Hook-Parameter
 * @returns true, wenn die Media Query zutrifft, sonst false
 * 
 * @example
 * ```tsx
 * const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
 * 
 * return (
 *   <div>
 *     <p>Is Mobile: {isMobile ? 'Yes' : 'No'}</p>
 *   </div>
 * );
 * ```
 */
export function useMediaQuery({
  query,
}: UseMediaQueryParams): boolean {
  // State
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  // Effects
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    setMatches(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  // Rückgabewert
  return matches;
}

export default useMediaQuery;
```