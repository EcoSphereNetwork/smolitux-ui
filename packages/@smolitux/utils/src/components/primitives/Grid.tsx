import React, { forwardRef } from 'react';
import { Box, BoxProps } from './Box';

export interface GridProps extends BoxProps {
  /** Number of columns */
  columns?: number | string;
  /** Number of rows */
  rows?: number | string;
  /** Gap between items */
  gap?: number | string;
  /** Column gap */
  columnGap?: number | string;
  /** Row gap */
  rowGap?: number | string;
  /** Template areas */
  areas?: string;
  /** Auto columns */
  autoColumns?: string;
  /** Auto rows */
  autoRows?: string;
  /** Auto flow */
  autoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
}

/**
 * Grid is a layout component that uses CSS Grid to arrange its children.
 * It extends the Box component with grid-specific properties.
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      columns,
      rows,
      gap,
      columnGap,
      rowGap,
      areas,
      autoColumns,
      autoRows,
      autoFlow,
      style,
      className = '',
      ...rest
    },
    ref
  ) => {
    const gridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns,
      gridTemplateRows: typeof rows === 'number' ? `repeat(${rows}, 1fr)` : rows,
      gap,
      columnGap,
      rowGap,
      gridTemplateAreas: areas,
      gridAutoColumns: autoColumns,
      gridAutoRows: autoRows,
      gridAutoFlow: autoFlow,
      ...style,
    };

    return <Box ref={ref} className={className} style={gridStyle} {...rest} />;
  }
);

Grid.displayName = 'Grid';
