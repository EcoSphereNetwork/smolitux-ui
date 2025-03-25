// packages/@smolitux/layout/src/components/Grid/Grid.tsx
import React, { forwardRef } from 'react';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Container-Modus aktivieren (für Grid-Container) */
  container?: boolean;
  /** Item-Modus aktivieren (für Grid-Items) */
  item?: boolean;
  /** Abstand zwischen Grid-Items */
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  /** Horizontaler Abstand zwischen Grid-Items */
  columnSpacing?: GridProps['spacing'];
  /** Vertikaler Abstand zwischen Grid-Items */
  rowSpacing?: GridProps['spacing'];
  /** Ausrichtung der Items entlang der Hauptachse */
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  /** Ausrichtung der Items entlang der Kreuzachse */
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  /** Flex-Direction der Items */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  /** Flex-Wrap-Verhalten */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  /** Anzahl der Spalten für xs-Bildschirme (0px+) */
  xs?: number | 'auto' | boolean;
  /** Anzahl der Spalten für sm-Bildschirme (640px+) */
  sm?: number | 'auto' | boolean;
  /** Anzahl der Spalten für md-Bildschirme (768px+) */
  md?: number | 'auto' | boolean;
  /** Anzahl der Spalten für lg-Bildschirme (1024px+) */
  lg?: number | 'auto' | boolean;
  /** Anzahl der Spalten für xl-Bildschirme (1280px+) */
  xl?: number | 'auto' | boolean;
  /** Anzahl der Spalten für 2xl-Bildschirme (1536px+) */
  xxl?: number | 'auto' | boolean;
}

const GRID_COLS = 12;

/**
 * Grid-Komponente für responsive Layouts
 * 
 * @example
 * ```tsx
 * <Grid container spacing={4}>
 *   <Grid item xs={12} md={6}>
 *     <Card>Inhalt 1</Card>
 *   </Grid>
 *   <Grid item xs={12} md={6}>
 *     <Card>Inhalt 2</Card>
 *   </Grid>
 * </Grid>
 * ```
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(({
  container = false,
  item = false,
  spacing = 0,
  columnSpacing,
  rowSpacing,
  justifyContent,
  alignItems,
  direction,
  wrap = 'wrap',
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  className = '',
  children,
  ...rest
}, ref) => {
  // Spacing-Klassen umrechnen
  const getSpacing = (value: number | undefined) => {
    if (value === undefined) return '';
    return `gap-${value}`;
  };

  // Responsive Col-Span-Klassen generieren
  const getColumnClass = (breakpoint: string, value: number | 'auto' | boolean | undefined) => {
    if (value === undefined) return '';
    if (value === 'auto') return `${breakpoint}:col-auto`;
    if (value === true) return `${breakpoint}:col`;
    if (typeof value === 'number') return `${breakpoint}:col-span-${value}`;
    return '';
  };

  // CSS-Klassen zusammenstellen
  const classes = [
    // Container-Klassen
    container ? 'grid' : '',
    container && spacing !== undefined ? getSpacing(spacing) : '',
    container && columnSpacing !== undefined ? `gap-x-${columnSpacing}` : '',
    container && rowSpacing !== undefined ? `gap-y-${rowSpacing}` : '',
    
    // Item-Klassen
    item ? 'col-span-full' : '', // Default auf volle Breite
    item ? getColumnClass('', xs) : '',
    item ? getColumnClass('sm', sm) : '',
    item ? getColumnClass('md', md) : '',
    item ? getColumnClass('lg', lg) : '',
    item ? getColumnClass('xl', xl) : '',
    item ? getColumnClass('2xl', xxl) : '',
    
    // Flexbox-Eigenschaften
    justifyContent ? `justify-${justifyContent}` : '',
    alignItems ? `items-${alignItems}` : '',
    direction ? `flex-${direction}` : '',
    wrap ? `flex-${wrap}` : '',
    
    // Benutzerdefinierte Klassen
    className
  ].filter(Boolean).join(' ');
  
  // Container-spezifische Logik
  let gridTemplateColumns = '';
  if (container) {
    gridTemplateColumns = 'grid-cols-12'; // Default 12-Spalten-Grid
  }
  
  return (
    <div
      ref={ref}
      className={`${classes} ${container ? gridTemplateColumns : ''}`}
      {...rest}
    >
      {children}
    </div>
  );
});

Grid.displayName = 'Grid';

export default Grid;
