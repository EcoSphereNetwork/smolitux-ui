# @smolitux/utils - Paket-spezifische Anweisungen

## Paket-Übersicht

Das `@smolitux/utils`-Paket enthält Utility-Funktionen und Hilfsmethoden, die von allen anderen Paketen der Smolitux UI-Bibliothek verwendet werden. Diese Funktionen sind allgemein und nicht spezifisch für eine bestimmte Komponente.

## Kategorien

Das Utils-Paket enthält Funktionen in folgenden Kategorien:

### DOM-Utilities

- `getElementSize`: Ermittelt die Größe eines DOM-Elements
- `getElementPosition`: Ermittelt die Position eines DOM-Elements
- `getScrollPosition`: Ermittelt die aktuelle Scroll-Position
- `isElementVisible`: Prüft, ob ein Element sichtbar ist
- `isElementInViewport`: Prüft, ob ein Element im Viewport ist
- `focusElement`: Fokussiert ein Element
- `trapFocus`: Fängt den Fokus innerhalb eines Elements
- `getActiveElement`: Ermittelt das aktive Element

### React-Utilities

- `useClickOutside`: Hook zum Erkennen von Klicks außerhalb eines Elements
- `useKeyPress`: Hook zum Erkennen von Tastatureingaben
- `useMediaQuery`: Hook zum Abfragen von Media Queries
- `useLocalStorage`: Hook zum Zugriff auf den Local Storage
- `useSessionStorage`: Hook zum Zugriff auf den Session Storage
- `useDebounce`: Hook zum Debouncing von Werten
- `useThrottle`: Hook zum Throttling von Werten
- `usePrevious`: Hook zum Zugriff auf den vorherigen Wert
- `useUpdateEffect`: Hook, der nur bei Updates ausgeführt wird
- `useIsomorphicLayoutEffect`: Hook, der isomorphic layoutEffect verwendet

### String-Utilities

- `capitalize`: Wandelt den ersten Buchstaben in einen Großbuchstaben um
- `truncate`: Kürzt einen String auf eine bestimmte Länge
- `slugify`: Wandelt einen String in einen URL-freundlichen Slug um
- `camelCase`: Wandelt einen String in camelCase um
- `kebabCase`: Wandelt einen String in kebab-case um
- `snakeCase`: Wandelt einen String in snake_case um
- `pascalCase`: Wandelt einen String in PascalCase um

### Array-Utilities

- `chunk`: Teilt ein Array in Chunks auf
- `unique`: Entfernt Duplikate aus einem Array
- `flatten`: Flacht ein verschachteltes Array ab
- `groupBy`: Gruppiert ein Array nach einem Schlüssel
- `sortBy`: Sortiert ein Array nach einem Schlüssel
- `shuffle`: Mischt ein Array
- `range`: Erstellt ein Array mit einer Zahlenreihe

### Object-Utilities

- `pick`: Wählt bestimmte Eigenschaften aus einem Objekt aus
- `omit`: Entfernt bestimmte Eigenschaften aus einem Objekt
- `merge`: Führt mehrere Objekte zusammen
- `deepMerge`: Führt mehrere Objekte tief zusammen
- `deepClone`: Erstellt eine tiefe Kopie eines Objekts
- `isEqual`: Prüft, ob zwei Objekte gleich sind
- `isEmpty`: Prüft, ob ein Objekt leer ist

### Date-Utilities

- `formatDate`: Formatiert ein Datum
- `parseDate`: Parst einen String zu einem Datum
- `addDays`: Fügt Tage zu einem Datum hinzu
- `subtractDays`: Subtrahiert Tage von einem Datum
- `getDaysDifference`: Ermittelt die Anzahl der Tage zwischen zwei Daten
- `isDateBefore`: Prüft, ob ein Datum vor einem anderen liegt
- `isDateAfter`: Prüft, ob ein Datum nach einem anderen liegt
- `isDateBetween`: Prüft, ob ein Datum zwischen zwei anderen liegt

### Number-Utilities

- `clamp`: Begrenzt einen Wert auf einen Bereich
- `random`: Generiert eine Zufallszahl
- `round`: Rundet eine Zahl auf eine bestimmte Anzahl von Dezimalstellen
- `formatNumber`: Formatiert eine Zahl
- `parseNumber`: Parst einen String zu einer Zahl
- `toFixed`: Rundet eine Zahl auf eine bestimmte Anzahl von Dezimalstellen

### Color-Utilities

- `hexToRgb`: Wandelt einen Hex-Farbwert in RGB um
- `rgbToHex`: Wandelt einen RGB-Farbwert in Hex um
- `darken`: Verdunkelt eine Farbe
- `lighten`: Hellt eine Farbe auf
- `getContrastColor`: Ermittelt eine Kontrastfarbe
- `isColorLight`: Prüft, ob eine Farbe hell ist
- `isColorDark`: Prüft, ob eine Farbe dunkel ist

### Validation-Utilities

- `isEmail`: Prüft, ob ein String eine gültige E-Mail-Adresse ist
- `isUrl`: Prüft, ob ein String eine gültige URL ist
- `isPhoneNumber`: Prüft, ob ein String eine gültige Telefonnummer ist
- `isPostalCode`: Prüft, ob ein String eine gültige Postleitzahl ist
- `isIban`: Prüft, ob ein String eine gültige IBAN ist
- `isCreditCard`: Prüft, ob ein String eine gültige Kreditkartennummer ist
- `isStrongPassword`: Prüft, ob ein String ein starkes Passwort ist

## Richtlinien

Bei der Entwicklung von Utility-Funktionen solltest du folgende Richtlinien beachten:

1. **Typsicherheit**: Alle Funktionen müssen vollständig typisiert sein
2. **Testbarkeit**: Alle Funktionen müssen umfassend getestet werden
3. **Dokumentation**: Alle Funktionen müssen dokumentiert sein
4. **Performance**: Alle Funktionen müssen performant sein
5. **Wiederverwendbarkeit**: Alle Funktionen müssen wiederverwendbar sein

## Beispiel-Implementierung

```typescript
/**
 * Clamps a value between a minimum and maximum value.
 *
 * @param value - The value to clamp
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns The clamped value
 *
 * @example
 * ```ts
 * clamp(5, 0, 10); // 5
 * clamp(-5, 0, 10); // 0
 * clamp(15, 0, 10); // 10
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Debounces a function.
 *
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @param immediate - Whether to call the function immediately
 * @returns The debounced function
 *
 * @example
 * ```ts
 * const debouncedFunc = debounce(() => {
 *   console.log('Debounced');
 * }, 500);
 *
 * // Call the debounced function
 * debouncedFunc();
 * ```
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function(this: any, ...args: Parameters<T>): void {
    const context = this;

    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

/**
 * Formats a date.
 *
 * @param date - The date to format
 * @param format - The format string
 * @returns The formatted date
 *
 * @example
 * ```ts
 * formatDate(new Date(), 'YYYY-MM-DD'); // '2023-01-01'
 * formatDate(new Date(), 'DD.MM.YYYY'); // '01.01.2023'
 * formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'); // '2023-01-01 12:00:00'
 * ```
 */
export function formatDate(date: Date, format: string): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * Checks if a value is empty.
 *
 * @param value - The value to check
 * @returns Whether the value is empty
 *
 * @example
 * ```ts
 * isEmpty(''); // true
 * isEmpty(null); // true
 * isEmpty(undefined); // true
 * isEmpty([]); // true
 * isEmpty({}); // true
 * isEmpty('hello'); // false
 * isEmpty([1, 2, 3]); // false
 * isEmpty({ a: 1 }); // false
 * ```
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
}

/**
 * Generates a random string.
 *
 * @param length - The length of the string
 * @param chars - The characters to use
 * @returns The random string
 *
 * @example
 * ```ts
 * randomString(10); // 'a1b2c3d4e5'
 * randomString(5, 'ABC'); // 'ABCAB'
 * ```
 */
export function randomString(
  length: number,
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = '';
  const charsLength = chars.length;

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }

  return result;
}

/**
 * Truncates a string.
 *
 * @param str - The string to truncate
 * @param length - The maximum length
 * @param end - The string to append at the end
 * @returns The truncated string
 *
 * @example
 * ```ts
 * truncate('Hello, world!', 5); // 'Hello...'
 * truncate('Hello, world!', 5, '...more'); // 'Hello...more'
 * ```
 */
export function truncate(str: string, length: number, end = '...'): string {
  if (str.length <= length) {
    return str;
  }

  return str.slice(0, length) + end;
}
```