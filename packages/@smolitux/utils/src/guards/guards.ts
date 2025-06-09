/**
 * Type guard utilities for common JavaScript types.
 *
 * @example
 * is.string('hello'); // true
 * is.number(123); // true
 */
export const is = {
  /** Check if a value is a string */
  string(value: unknown): value is string {
    return typeof value === 'string';
  },

  /** Check if a value is a finite number */
  number(value: unknown): value is number {
    return typeof value === 'number' && !Number.isNaN(value);
  },

  /** Determine if value is an array */
  array<T>(value: unknown): value is T[] {
    return Array.isArray(value);
  },

  /** Determine if value is a plain object */
  object(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  },

  /** Determine if value is a function */
  function(value: unknown): value is Function {
    return typeof value === 'function';
  },
};
