// packages/@smolitux/layout/src/components/Flex/Flex.tsx
import React, { forwardRef } from 'react';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Flex-Richtung */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  /** Abstand zwischen Flex-Items */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  /** Ausrichtung der Items entlang der Hauptachse */
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  /** Ausrichtung der Items entlang der Kreuzachse */
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  /** Flex-Wrap-Verhalten */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  /** Als Inline-Flex anzeigen */
  inline?: boolean;
  /** Volle Breite einnehmen */
  fullWidth?: boolean;
  /** Volle Höhe einnehmen */
  fullHeight?: boolean;
  /** Responsive Richtung für verschiedene Breakpoints */
  responsive?: boolean;
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
  responsive = false,
  className = '',
  children,
  ...rest
}, ref) => {
  // Responsive Richtung (z.B. column auf Mobilgeräten, row auf Desktop)
  const directionClass = responsive
    ? direction === 'row' 
      ? 'flex-col md:flex-row' 
      : direction === 'column'
      ? 'flex-col' 
      : `flex-${direction}`
    : `flex-${direction}`;
  
  // CSS-Klassen zusammenstellen
  const classes = [
    // Flex-Basis
    inline ? 'inline-flex' : 'flex',
    
    // Richtung und responsive Anpassung
    directionClass,
    
    // Gap zwischen Items
    gap > 0 ? `gap-${gap}` : '',
    
    // Ausrichtung
    `justify-${justifyContent}`,
    `items-${alignItems}`,
    
    // Wrapping
    `flex-${wrap}`,
    
    // Größe
    fullWidth ? 'w-full' : '',
    fullHeight ? 'h-full' : '',
    
    // Benutzerdefinierte Klassen
    className
  ].filter(Boolean).join(' ');

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
