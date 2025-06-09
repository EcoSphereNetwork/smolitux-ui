export type ClassValue = string | number | boolean | null | undefined | ClassDictionary | ClassArray;
export interface ClassDictionary { [key: string]: any }
export interface ClassArray extends Array<ClassValue> {}

/**
 * Combine class names conditionally.
 * @param inputs - Strings, arrays or objects of class names.
 * @returns A single space-separated class string.
 * @example
 * cn('base', { active: true }, ['extra']) // 'base active extra'
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  const push = (value: ClassValue): void => {
    if (!value && value !== 0) return;
    if (typeof value === 'string' || typeof value === 'number') {
      classes.push(String(value));
    } else if (Array.isArray(value)) {
      value.forEach(push);
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([k, v]) => {
        if (v) classes.push(k);
      });
    }
  };

  inputs.forEach(push);

  // remove duplicates while preserving order
  return Array.from(new Set(classes)).join(' ');
}
