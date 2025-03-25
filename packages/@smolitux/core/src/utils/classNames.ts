/**
 * Utility-Funktion zum Zusammensetzen von CSS-Klassen.
 * 
 * @param classes - Eine Liste von Klassen, die zusammengesetzt werden sollen.
 *                 Kann Strings, Objekte oder Arrays enthalten.
 * @returns Ein String mit allen gültigen Klassen, durch Leerzeichen getrennt.
 * 
 * @example
 * ```tsx
 * // Einfache Strings
 * classNames('foo', 'bar'); // => 'foo bar'
 * 
 * // Mit Bedingungen
 * classNames('foo', isActive && 'active'); // => 'foo active' oder 'foo'
 * 
 * // Mit Objekten
 * classNames('foo', { active: isActive, disabled: isDisabled }); // => 'foo active' oder 'foo disabled' oder 'foo active disabled'
 * 
 * // Mit Arrays
 * classNames('foo', ['bar', 'baz']); // => 'foo bar baz'
 * ```
 */
export function classNames(...classes: (string | boolean | null | undefined | Record<string, boolean> | (string | boolean | null | undefined)[])[]) {
  return classes
    .flatMap(cls => {
      if (!cls) return [];
      
      if (typeof cls === 'string') {
        return cls;
      }
      
      if (Array.isArray(cls)) {
        return classNames(...cls);
      }
      
      if (typeof cls === 'object') {
        return Object.entries(cls)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key);
      }
      
      return [];
    })
    .filter(Boolean)
    .join(' ');
}

export default classNames;