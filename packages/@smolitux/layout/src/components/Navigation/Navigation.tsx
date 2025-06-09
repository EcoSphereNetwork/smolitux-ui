import React, { forwardRef } from 'react';
import type { ResponsiveProp } from '../../types';
import { cn } from '@smolitux/utils';

export interface NavigationItem {
  id: string;
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  /** Navigation items */
  items: NavigationItem[];
  /** Orientation of the item list */
  orientation?: ResponsiveProp<'horizontal' | 'vertical'>;
  /** Gap between items */
  gap?: ResponsiveProp<0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12>;
  /** Accessible label for the nav element */
  ariaLabel?: string;
}

const getClasses = <T extends string | number>(
  prop: ResponsiveProp<T> | undefined,
  prefix: string,
  map?: Record<string, string>
) => {
  if (prop === undefined) return '';
  const convert = (value: any) => (map ? map[value] || value : value);
  if (typeof prop === 'object') {
    return Object.entries(prop)
      .map(([bp, val]) => `${bp}:${prefix}-${convert(val)}`)
      .join(' ');
  }
  return `${prefix}-${convert(prop)}`;
};

export const Navigation = forwardRef<HTMLElement, NavigationProps>(
  (
    {
      items,
      orientation = 'horizontal',
      gap = 2,
      ariaLabel = 'Main Navigation',
      className = '',
      ...rest
    },
    ref
  ) => {
    const listClasses = cn(
      'flex',
      getClasses(orientation, 'flex', { horizontal: 'row', vertical: 'col' }),
      getClasses(gap, 'gap'),
      className
    );

    return (
      <nav ref={ref} aria-label={ariaLabel} {...rest}>
        <ul className={listClasses}>
          {items.map((item) => (
            <li key={item.id} className="list-none">
              {item.href ? (
                <a href={item.href} onClick={item.onClick} className="block">
                  {item.label}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="block bg-transparent border-0 p-0"
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
);

Navigation.displayName = 'Navigation';

export default Navigation;
