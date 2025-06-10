import { cn, ClassValue } from './cn';

/**
 * A utility for conditionally joining class names together.
 * This is an alias for the `cn` function to provide compatibility with the clsx library.
 * 
 * @param inputs - Class values to be conditionally joined
 * @returns A string of joined class names
 */
export function clsx(...inputs: ClassValue[]): string {
  return cn(...inputs);
}

export default clsx;