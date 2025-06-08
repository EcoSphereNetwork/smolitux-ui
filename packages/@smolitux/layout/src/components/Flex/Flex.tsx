// packages/@smolitux/layout/src/components/Flex/Flex.tsx
import React, { forwardRef } from 'react';

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

export type ResponsiveProp<T> = T | { [key in Breakpoint]?: T };

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Flex-Richtung */
  direction?: ResponsiveProp<'row' | 'row-reverse' | 'column' | 'column-reverse'>;
  /** Abstand zwischen Flex-Items */
  gap?: ResponsiveProp<0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12>;
  /** Ausrichtung der Items entlang der Hauptachse */
  justifyContent?: ResponsiveProp<'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'>;
  /** Ausrichtung der Items entlang der Kreuzachse */
  alignItems?: ResponsiveProp<'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'>;
  /** Flex-Wrap-Verhalten */
  wrap?: ResponsiveProp<'nowrap' | 'wrap' | 'wrap-reverse'>;
  /** Als Inline-Flex anzeigen */
  inline?: boolean;
  /** Volle Breite einnehmen */
  fullWidth?: boolean;
  /** Volle Höhe einnehmen */
  fullHeight?: boolean;
}

/**
 * Flexible Flexbox-Komponente für einfache Layouts
 * 
 * @example
 * ```tsx
 * <Flex gap={4} alignItems="center">
 *   <Icon name="user" />
 *   <span>Benutzername</span>
 * </Flex>
 * ```
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(({
  direction = 'row',
  gap = 0,
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  wrap = 'nowrap',
  inline = false,
  fullWidth = false,
  fullHeight = false,
  className = '',
  children,
  ...rest
}, ref) => {
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

  const classes = [
    inline ? 'inline-flex' : 'flex',
    getClasses(direction, 'flex', {
      'row': 'row',
      'row-reverse': 'row-reverse',
      'column': 'col',
      'column-reverse': 'col-reverse',
    }),
    getClasses(gap, 'gap'),
    getClasses(justifyContent, 'justify', {
      'flex-start': 'start',
      'flex-end': 'end',
      'center': 'center',
      'space-between': 'between',
      'space-around': 'around',
      'space-evenly': 'evenly',
    }),
    getClasses(alignItems, 'items', {
      'flex-start': 'start',
      'flex-end': 'end',
      'center': 'center',
      'stretch': 'stretch',
      'baseline': 'baseline',
    }),
    getClasses(wrap, 'flex'),
    fullWidth ? 'w-full' : '',
    fullHeight ? 'h-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
});

Flex.displayName = 'Flex';

export default Flex;
