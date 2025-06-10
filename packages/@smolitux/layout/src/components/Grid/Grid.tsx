// 🛠 FIXME [Codex]: Props nicht typisiert – Fehlerbehebung erforderlich
import React, { forwardRef } from 'react';
import type {
  GridBreakpoint,
  GridGap,
  GridJustify,
  GridAlign,
} from '../../types';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: number | { [key in GridBreakpoint]?: number };
  gap?: GridGap | { [key in GridBreakpoint]?: GridGap };
  columnGap?: GridGap | { [key in GridBreakpoint]?: GridGap };
  rowGap?: GridGap | { [key in GridBreakpoint]?: GridGap };
  justify?: GridJustify | { [key in GridBreakpoint]?: GridJustify };
  align?: GridAlign | { [key in GridBreakpoint]?: GridAlign };
}

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  xs?: number | 'auto';
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xl?: number | 'auto';
  xxl?: number | 'auto';
  order?: number;
}

const gapMap: Record<GridGap, string> = {
  none: '0',
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
};

const justifyMap: Record<GridJustify, string> = {
  start: 'start',
  center: 'center',
  end: 'end',
  'space-between': 'between',
  'space-around': 'around',
  'space-evenly': 'evenly',
};

const alignMap: Record<GridAlign, string> = {
  start: 'start',
  center: 'center',
  end: 'end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const getPrefix = (bp: GridBreakpoint) =>
  bp === 'sm' ? 'sm:' : bp === 'md' ? 'md:' : bp === 'lg' ? 'lg:' : bp === 'xl' ? 'xl:' : '2xl:';

const responsive = (
  prop: unknown,
  prefix: string,
  map: Record<string, string>
) => {
  if (prop === undefined) return '';

  const convert = (value: unknown) => {
    const key = String(value);
    return map[key] ?? key;
  };

  if (typeof prop === 'object' && prop !== null) {
    return Object.entries(prop as Record<string, unknown>)
      .map(([bp, val]) => `${getPrefix(bp as GridBreakpoint)}${prefix}-${convert(val)}`)
      .join(' ');
  }

  return `${prefix}-${convert(prop)}`;
};

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      cols = 12,
      gap = 'none',
      columnGap,
      rowGap,
      justify = 'start',
      align = 'stretch',
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const colsClasses =
      typeof cols === 'object'
        ? Object.entries(cols)
            .map(([bp, v]) => `${getPrefix(bp as GridBreakpoint)}grid-cols-${v}`)
            .join(' ')
        : `grid-cols-${cols}`;

    const gapClasses = responsive(gap, 'gap', gapMap);
    const columnGapClasses = columnGap ? responsive(columnGap, 'gap-x', gapMap) : '';
    const rowGapClasses = rowGap ? responsive(rowGap, 'gap-y', gapMap) : '';
    const justifyClasses = responsive(justify, 'justify', justifyMap);
    const alignClasses = responsive(align, 'items', alignMap);

    const classes =
      `grid ${colsClasses} ${gapClasses} ${columnGapClasses} ${rowGapClasses} ${justifyClasses} ${alignClasses} ${className}`
        .trim()
        .replace(/\s+/g, ' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ xs = 12, sm, md, lg, xl, xxl, order, className = '', children, ...rest }, ref) => {
    const span = (v: number | 'auto') => (v === 'auto' ? 'auto' : `span-${v}`);

    const classes = [
      `col-${span(xs)}`,
      sm !== undefined ? `sm:col-${span(sm)}` : '',
      md !== undefined ? `md:col-${span(md)}` : '',
      lg !== undefined ? `lg:col-${span(lg)}` : '',
      xl !== undefined ? `xl:col-${span(xl)}` : '',
      xxl !== undefined ? `2xl:col-${span(xxl)}` : '',
      order !== undefined ? `order-${order}` : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  }
);

GridItem.displayName = 'Grid.Item';

export interface GridComponent extends React.ForwardRefExoticComponent<
  GridProps & React.RefAttributes<HTMLDivElement>
> {
  Item: React.ForwardRefExoticComponent<
    GridItemProps & React.RefAttributes<HTMLDivElement>
  >;
}

const GridWithItem = Grid as GridComponent;
GridWithItem.Item = GridItem;

export default GridWithItem;
