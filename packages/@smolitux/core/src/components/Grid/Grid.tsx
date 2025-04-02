import React, { forwardRef } from 'react';

export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
export type GridRows = 1 | 2 | 3 | 4 | 5 | 6 | 'auto';
export type GridJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export type GridAlign = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
export type GridFlow = 'row' | 'column' | 'row-dense' | 'column-dense';
export type GridAutoFlow = 'auto' | 'min' | 'max' | 'fr';
export type GridBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Anzahl der Spalten
   */
  columns?: GridColumns | { [key in GridBreakpoint]?: GridColumns };
  
  /**
   * Anzahl der Zeilen
   */
  rows?: GridRows | { [key in GridBreakpoint]?: GridRows };
  
  /**
   * Abstand zwischen den Elementen
   */
  gap?: GridGap | { [key in GridBreakpoint]?: GridGap };
  
  /**
   * Abstand zwischen den Spalten
   */
  columnGap?: GridGap | { [key in GridBreakpoint]?: GridGap };
  
  /**
   * Abstand zwischen den Zeilen
   */
  rowGap?: GridGap | { [key in GridBreakpoint]?: GridGap };
  
  /**
   * Horizontale Ausrichtung der Elemente
   */
  justifyItems?: GridJustify | { [key in GridBreakpoint]?: GridJustify };
  
  /**
   * Vertikale Ausrichtung der Elemente
   */
  alignItems?: GridAlign | { [key in GridBreakpoint]?: GridAlign };
  
  /**
   * Horizontale Ausrichtung des Grids
   */
  justifyContent?: GridJustify | { [key in GridBreakpoint]?: GridJustify };
  
  /**
   * Vertikale Ausrichtung des Grids
   */
  alignContent?: GridAlign | { [key in GridBreakpoint]?: GridAlign };
  
  /**
   * Flussrichtung des Grids
   */
  flow?: GridFlow | { [key in GridBreakpoint]?: GridFlow };
  
  /**
   * Automatische Spaltengrößen
   */
  autoColumns?: GridAutoFlow | { [key in GridBreakpoint]?: GridAutoFlow };
  
  /**
   * Automatische Zeilengrößen
   */
  autoRows?: GridAutoFlow | { [key in GridBreakpoint]?: GridAutoFlow };
  
  /**
   * Gibt an, ob das Grid die volle Breite einnehmen soll
   */
  fullWidth?: boolean;
  
  /**
   * Gibt an, ob das Grid die volle Höhe einnehmen soll
   */
  fullHeight?: boolean;
  
  /**
   * Zusätzliche CSS-Klassen
   */
  className?: string;
  
  /**
   * Der Inhalt des Grids
   */
  children?: React.ReactNode;
}

/**
 * Grid-Komponente für Layout-Strukturen
 * 
 * @example
 * ```tsx
 * <Grid columns={3} gap="md">
 *   <div>Element 1</div>
 *   <div>Element 2</div>
 *   <div>Element 3</div>
 * </Grid>
 * ```
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(({
  columns = 1,
  rows,
  gap = 'none',
  columnGap,
  rowGap,
  justifyItems,
  alignItems,
  justifyContent,
  alignContent,
  flow,
  autoColumns,
  autoRows,
  fullWidth = false,
  fullHeight = false,
  className = '',
  children,
  ...rest
}, ref) => {
  // Hilfsfunktion zum Generieren von Klassen für responsive Eigenschaften
  const getResponsiveClasses = (
    prop: any,
    classPrefix: string,
    valueMap: Record<string, Record<string | number, string>>
  ): string => {
    if (prop === undefined) return '';
    
    if (typeof prop === 'object') {
      return Object.entries(prop)
        .map(([breakpoint, value]) => {
          const breakpointPrefix = breakpoint === 'sm' ? 'sm:' :
                                  breakpoint === 'md' ? 'md:' :
                                  breakpoint === 'lg' ? 'lg:' :
                                  breakpoint === 'xl' ? 'xl:' :
                                  breakpoint === '2xl' ? '2xl:' : '';
          
          return `${breakpointPrefix}${classPrefix}-${valueMap[breakpoint][value]}`;
        })
        .join(' ');
    }
    
    return `${classPrefix}-${valueMap['base'][prop]}`;
  };
  
  // Spalten-Klassen
  const columnsMap: Record<string, Record<string | number, string>> = {
    base: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
      'auto': 'grid-cols-auto',
    },
    sm: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
      'auto': 'grid-cols-auto',
    },
    md: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
      'auto': 'grid-cols-auto',
    },
    lg: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
      'auto': 'grid-cols-auto',
    },
    xl: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
      'auto': 'grid-cols-auto',
    },
    '2xl': {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
      'auto': 'grid-cols-auto',
    },
  };
  
  // Zeilen-Klassen
  const rowsMap: Record<string, Record<string | number, string>> = {
    base: {
      1: 'grid-rows-1',
      2: 'grid-rows-2',
      3: 'grid-rows-3',
      4: 'grid-rows-4',
      5: 'grid-rows-5',
      6: 'grid-rows-6',
      'auto': 'grid-rows-auto',
    },
    sm: {
      1: 'grid-rows-1',
      2: 'grid-rows-2',
      3: 'grid-rows-3',
      4: 'grid-rows-4',
      5: 'grid-rows-5',
      6: 'grid-rows-6',
      'auto': 'grid-rows-auto',
    },
    md: {
      1: 'grid-rows-1',
      2: 'grid-rows-2',
      3: 'grid-rows-3',
      4: 'grid-rows-4',
      5: 'grid-rows-5',
      6: 'grid-rows-6',
      'auto': 'grid-rows-auto',
    },
    lg: {
      1: 'grid-rows-1',
      2: 'grid-rows-2',
      3: 'grid-rows-3',
      4: 'grid-rows-4',
      5: 'grid-rows-5',
      6: 'grid-rows-6',
      'auto': 'grid-rows-auto',
    },
    xl: {
      1: 'grid-rows-1',
      2: 'grid-rows-2',
      3: 'grid-rows-3',
      4: 'grid-rows-4',
      5: 'grid-rows-5',
      6: 'grid-rows-6',
      'auto': 'grid-rows-auto',
    },
    '2xl': {
      1: 'grid-rows-1',
      2: 'grid-rows-2',
      3: 'grid-rows-3',
      4: 'grid-rows-4',
      5: 'grid-rows-5',
      6: 'grid-rows-6',
      'auto': 'grid-rows-auto',
    },
  };
  
  // Gap-Klassen
  const gapMap: Record<string, Record<string, string>> = {
    base: {
      'none': 'gap-0',
      'xs': 'gap-1',
      'sm': 'gap-2',
      'md': 'gap-4',
      'lg': 'gap-6',
      'xl': 'gap-8',
    },
    sm: {
      'none': 'gap-0',
      'xs': 'gap-1',
      'sm': 'gap-2',
      'md': 'gap-4',
      'lg': 'gap-6',
      'xl': 'gap-8',
    },
    md: {
      'none': 'gap-0',
      'xs': 'gap-1',
      'sm': 'gap-2',
      'md': 'gap-4',
      'lg': 'gap-6',
      'xl': 'gap-8',
    },
    lg: {
      'none': 'gap-0',
      'xs': 'gap-1',
      'sm': 'gap-2',
      'md': 'gap-4',
      'lg': 'gap-6',
      'xl': 'gap-8',
    },
    xl: {
      'none': 'gap-0',
      'xs': 'gap-1',
      'sm': 'gap-2',
      'md': 'gap-4',
      'lg': 'gap-6',
      'xl': 'gap-8',
    },
    '2xl': {
      'none': 'gap-0',
      'xs': 'gap-1',
      'sm': 'gap-2',
      'md': 'gap-4',
      'lg': 'gap-6',
      'xl': 'gap-8',
    },
  };
  
  // Column-Gap-Klassen
  const columnGapMap: Record<string, Record<string, string>> = {
    base: {
      'none': 'gap-x-0',
      'xs': 'gap-x-1',
      'sm': 'gap-x-2',
      'md': 'gap-x-4',
      'lg': 'gap-x-6',
      'xl': 'gap-x-8',
    },
    sm: {
      'none': 'gap-x-0',
      'xs': 'gap-x-1',
      'sm': 'gap-x-2',
      'md': 'gap-x-4',
      'lg': 'gap-x-6',
      'xl': 'gap-x-8',
    },
    md: {
      'none': 'gap-x-0',
      'xs': 'gap-x-1',
      'sm': 'gap-x-2',
      'md': 'gap-x-4',
      'lg': 'gap-x-6',
      'xl': 'gap-x-8',
    },
    lg: {
      'none': 'gap-x-0',
      'xs': 'gap-x-1',
      'sm': 'gap-x-2',
      'md': 'gap-x-4',
      'lg': 'gap-x-6',
      'xl': 'gap-x-8',
    },
    xl: {
      'none': 'gap-x-0',
      'xs': 'gap-x-1',
      'sm': 'gap-x-2',
      'md': 'gap-x-4',
      'lg': 'gap-x-6',
      'xl': 'gap-x-8',
    },
    '2xl': {
      'none': 'gap-x-0',
      'xs': 'gap-x-1',
      'sm': 'gap-x-2',
      'md': 'gap-x-4',
      'lg': 'gap-x-6',
      'xl': 'gap-x-8',
    },
  };
  
  // Row-Gap-Klassen
  const rowGapMap: Record<string, Record<string, string>> = {
    base: {
      'none': 'gap-y-0',
      'xs': 'gap-y-1',
      'sm': 'gap-y-2',
      'md': 'gap-y-4',
      'lg': 'gap-y-6',
      'xl': 'gap-y-8',
    },
    sm: {
      'none': 'gap-y-0',
      'xs': 'gap-y-1',
      'sm': 'gap-y-2',
      'md': 'gap-y-4',
      'lg': 'gap-y-6',
      'xl': 'gap-y-8',
    },
    md: {
      'none': 'gap-y-0',
      'xs': 'gap-y-1',
      'sm': 'gap-y-2',
      'md': 'gap-y-4',
      'lg': 'gap-y-6',
      'xl': 'gap-y-8',
    },
    lg: {
      'none': 'gap-y-0',
      'xs': 'gap-y-1',
      'sm': 'gap-y-2',
      'md': 'gap-y-4',
      'lg': 'gap-y-6',
      'xl': 'gap-y-8',
    },
    xl: {
      'none': 'gap-y-0',
      'xs': 'gap-y-1',
      'sm': 'gap-y-2',
      'md': 'gap-y-4',
      'lg': 'gap-y-6',
      'xl': 'gap-y-8',
    },
    '2xl': {
      'none': 'gap-y-0',
      'xs': 'gap-y-1',
      'sm': 'gap-y-2',
      'md': 'gap-y-4',
      'lg': 'gap-y-6',
      'xl': 'gap-y-8',
    },
  };
  
  // Justify-Items-Klassen
  const justifyItemsMap: Record<string, Record<string, string>> = {
    base: {
      'start': 'justify-items-start',
      'end': 'justify-items-end',
      'center': 'justify-items-center',
      'stretch': 'justify-items-stretch',
    },
    sm: {
      'start': 'sm:justify-items-start',
      'end': 'sm:justify-items-end',
      'center': 'sm:justify-items-center',
      'stretch': 'sm:justify-items-stretch',
    },
    md: {
      'start': 'md:justify-items-start',
      'end': 'md:justify-items-end',
      'center': 'md:justify-items-center',
      'stretch': 'md:justify-items-stretch',
    },
    lg: {
      'start': 'lg:justify-items-start',
      'end': 'lg:justify-items-end',
      'center': 'lg:justify-items-center',
      'stretch': 'lg:justify-items-stretch',
    },
    xl: {
      'start': 'xl:justify-items-start',
      'end': 'xl:justify-items-end',
      'center': 'xl:justify-items-center',
      'stretch': 'xl:justify-items-stretch',
    },
    '2xl': {
      'start': '2xl:justify-items-start',
      'end': '2xl:justify-items-end',
      'center': '2xl:justify-items-center',
      'stretch': '2xl:justify-items-stretch',
    },
  };
  
  // Align-Items-Klassen
  const alignItemsMap: Record<string, Record<string, string>> = {
    base: {
      'start': 'items-start',
      'end': 'items-end',
      'center': 'items-center',
      'stretch': 'items-stretch',
      'baseline': 'items-baseline',
    },
    sm: {
      'start': 'sm:items-start',
      'end': 'sm:items-end',
      'center': 'sm:items-center',
      'stretch': 'sm:items-stretch',
      'baseline': 'sm:items-baseline',
    },
    md: {
      'start': 'md:items-start',
      'end': 'md:items-end',
      'center': 'md:items-center',
      'stretch': 'md:items-stretch',
      'baseline': 'md:items-baseline',
    },
    lg: {
      'start': 'lg:items-start',
      'end': 'lg:items-end',
      'center': 'lg:items-center',
      'stretch': 'lg:items-stretch',
      'baseline': 'lg:items-baseline',
    },
    xl: {
      'start': 'xl:items-start',
      'end': 'xl:items-end',
      'center': 'xl:items-center',
      'stretch': 'xl:items-stretch',
      'baseline': 'xl:items-baseline',
    },
    '2xl': {
      'start': '2xl:items-start',
      'end': '2xl:items-end',
      'center': '2xl:items-center',
      'stretch': '2xl:items-stretch',
      'baseline': '2xl:items-baseline',
    },
  };
  
  // Justify-Content-Klassen
  const justifyContentMap: Record<string, Record<string, string>> = {
    base: {
      'start': 'justify-start',
      'end': 'justify-end',
      'center': 'justify-center',
      'between': 'justify-between',
      'around': 'justify-around',
      'evenly': 'justify-evenly',
    },
    sm: {
      'start': 'sm:justify-start',
      'end': 'sm:justify-end',
      'center': 'sm:justify-center',
      'between': 'sm:justify-between',
      'around': 'sm:justify-around',
      'evenly': 'sm:justify-evenly',
    },
    md: {
      'start': 'md:justify-start',
      'end': 'md:justify-end',
      'center': 'md:justify-center',
      'between': 'md:justify-between',
      'around': 'md:justify-around',
      'evenly': 'md:justify-evenly',
    },
    lg: {
      'start': 'lg:justify-start',
      'end': 'lg:justify-end',
      'center': 'lg:justify-center',
      'between': 'lg:justify-between',
      'around': 'lg:justify-around',
      'evenly': 'lg:justify-evenly',
    },
    xl: {
      'start': 'xl:justify-start',
      'end': 'xl:justify-end',
      'center': 'xl:justify-center',
      'between': 'xl:justify-between',
      'around': 'xl:justify-around',
      'evenly': 'xl:justify-evenly',
    },
    '2xl': {
      'start': '2xl:justify-start',
      'end': '2xl:justify-end',
      'center': '2xl:justify-center',
      'between': '2xl:justify-between',
      'around': '2xl:justify-around',
      'evenly': '2xl:justify-evenly',
    },
  };
  
  // Align-Content-Klassen
  const alignContentMap: Record<string, Record<string, string>> = {
    base: {
      'start': 'content-start',
      'end': 'content-end',
      'center': 'content-center',
      'between': 'content-between',
      'around': 'content-around',
      'evenly': 'content-evenly',
    },
    sm: {
      'start': 'sm:content-start',
      'end': 'sm:content-end',
      'center': 'sm:content-center',
      'between': 'sm:content-between',
      'around': 'sm:content-around',
      'evenly': 'sm:content-evenly',
    },
    md: {
      'start': 'md:content-start',
      'end': 'md:content-end',
      'center': 'md:content-center',
      'between': 'md:content-between',
      'around': 'md:content-around',
      'evenly': 'md:content-evenly',
    },
    lg: {
      'start': 'lg:content-start',
      'end': 'lg:content-end',
      'center': 'lg:content-center',
      'between': 'lg:content-between',
      'around': 'lg:content-around',
      'evenly': 'lg:content-evenly',
    },
    xl: {
      'start': 'xl:content-start',
      'end': 'xl:content-end',
      'center': 'xl:content-center',
      'between': 'xl:content-between',
      'around': 'xl:content-around',
      'evenly': 'xl:content-evenly',
    },
    '2xl': {
      'start': '2xl:content-start',
      'end': '2xl:content-end',
      'center': '2xl:content-center',
      'between': '2xl:content-between',
      'around': '2xl:content-around',
      'evenly': '2xl:content-evenly',
    },
  };
  
  // Flow-Klassen
  const flowMap: Record<string, Record<string, string>> = {
    base: {
      'row': 'grid-flow-row',
      'column': 'grid-flow-col',
      'row-dense': 'grid-flow-row-dense',
      'column-dense': 'grid-flow-col-dense',
    },
    sm: {
      'row': 'sm:grid-flow-row',
      'column': 'sm:grid-flow-col',
      'row-dense': 'sm:grid-flow-row-dense',
      'column-dense': 'sm:grid-flow-col-dense',
    },
    md: {
      'row': 'md:grid-flow-row',
      'column': 'md:grid-flow-col',
      'row-dense': 'md:grid-flow-row-dense',
      'column-dense': 'md:grid-flow-col-dense',
    },
    lg: {
      'row': 'lg:grid-flow-row',
      'column': 'lg:grid-flow-col',
      'row-dense': 'lg:grid-flow-row-dense',
      'column-dense': 'lg:grid-flow-col-dense',
    },
    xl: {
      'row': 'xl:grid-flow-row',
      'column': 'xl:grid-flow-col',
      'row-dense': 'xl:grid-flow-row-dense',
      'column-dense': 'xl:grid-flow-col-dense',
    },
    '2xl': {
      'row': '2xl:grid-flow-row',
      'column': '2xl:grid-flow-col',
      'row-dense': '2xl:grid-flow-row-dense',
      'column-dense': '2xl:grid-flow-col-dense',
    },
  };
  
  // Auto-Columns-Klassen
  const autoColumnsMap: Record<string, Record<string, string>> = {
    base: {
      'auto': 'auto-cols-auto',
      'min': 'auto-cols-min',
      'max': 'auto-cols-max',
      'fr': 'auto-cols-fr',
    },
    sm: {
      'auto': 'sm:auto-cols-auto',
      'min': 'sm:auto-cols-min',
      'max': 'sm:auto-cols-max',
      'fr': 'sm:auto-cols-fr',
    },
    md: {
      'auto': 'md:auto-cols-auto',
      'min': 'md:auto-cols-min',
      'max': 'md:auto-cols-max',
      'fr': 'md:auto-cols-fr',
    },
    lg: {
      'auto': 'lg:auto-cols-auto',
      'min': 'lg:auto-cols-min',
      'max': 'lg:auto-cols-max',
      'fr': 'lg:auto-cols-fr',
    },
    xl: {
      'auto': 'xl:auto-cols-auto',
      'min': 'xl:auto-cols-min',
      'max': 'xl:auto-cols-max',
      'fr': 'xl:auto-cols-fr',
    },
    '2xl': {
      'auto': '2xl:auto-cols-auto',
      'min': '2xl:auto-cols-min',
      'max': '2xl:auto-cols-max',
      'fr': '2xl:auto-cols-fr',
    },
  };
  
  // Auto-Rows-Klassen
  const autoRowsMap: Record<string, Record<string, string>> = {
    base: {
      'auto': 'auto-rows-auto',
      'min': 'auto-rows-min',
      'max': 'auto-rows-max',
      'fr': 'auto-rows-fr',
    },
    sm: {
      'auto': 'sm:auto-rows-auto',
      'min': 'sm:auto-rows-min',
      'max': 'sm:auto-rows-max',
      'fr': 'sm:auto-rows-fr',
    },
    md: {
      'auto': 'md:auto-rows-auto',
      'min': 'md:auto-rows-min',
      'max': 'md:auto-rows-max',
      'fr': 'md:auto-rows-fr',
    },
    lg: {
      'auto': 'lg:auto-rows-auto',
      'min': 'lg:auto-rows-min',
      'max': 'lg:auto-rows-max',
      'fr': 'lg:auto-rows-fr',
    },
    xl: {
      'auto': 'xl:auto-rows-auto',
      'min': 'xl:auto-rows-min',
      'max': 'xl:auto-rows-max',
      'fr': 'xl:auto-rows-fr',
    },
    '2xl': {
      'auto': '2xl:auto-rows-auto',
      'min': '2xl:auto-rows-min',
      'max': '2xl:auto-rows-max',
      'fr': '2xl:auto-rows-fr',
    },
  };
  
  // Generiere die Klassen für die verschiedenen Eigenschaften
  const columnsClasses = typeof columns === 'object'
    ? Object.entries(columns).map(([breakpoint, value]) => {
        const prefix = breakpoint === 'sm' ? 'sm:' :
                      breakpoint === 'md' ? 'md:' :
                      breakpoint === 'lg' ? 'lg:' :
                      breakpoint === 'xl' ? 'xl:' :
                      breakpoint === '2xl' ? '2xl:' : '';
        return `${prefix}${columnsMap['base'][value]}`;
      }).join(' ')
    : columnsMap['base'][columns];
  
  const rowsClasses = rows
    ? (typeof rows === 'object'
      ? Object.entries(rows).map(([breakpoint, value]) => {
          const prefix = breakpoint === 'sm' ? 'sm:' :
                        breakpoint === 'md' ? 'md:' :
                        breakpoint === 'lg' ? 'lg:' :
                        breakpoint === 'xl' ? 'xl:' :
                        breakpoint === '2xl' ? '2xl:' : '';
          return `${prefix}${rowsMap['base'][value]}`;
        }).join(' ')
      : rowsMap['base'][rows])
    : '';
  
  const gapClasses = typeof gap === 'object'
    ? Object.entries(gap).map(([breakpoint, value]) => {
        const prefix = breakpoint === 'sm' ? 'sm:' :
                      breakpoint === 'md' ? 'md:' :
                      breakpoint === 'lg' ? 'lg:' :
                      breakpoint === 'xl' ? 'xl:' :
                      breakpoint === '2xl' ? '2xl:' : '';
        return `${prefix}${gapMap['base'][value]}`;
      }).join(' ')
    : gapMap['base'][gap];
  
  const columnGapClasses = columnGap
    ? (typeof columnGap === 'object'
      ? Object.entries(columnGap).map(([breakpoint, value]) => {
          const prefix = breakpoint === 'sm' ? 'sm:' :
                        breakpoint === 'md' ? 'md:' :
                        breakpoint === 'lg' ? 'lg:' :
                        breakpoint === 'xl' ? 'xl:' :
                        breakpoint === '2xl' ? '2xl:' : '';
          return `${prefix}${columnGapMap['base'][value]}`;
        }).join(' ')
      : columnGapMap['base'][columnGap])
    : '';
  
  const rowGapClasses = rowGap
    ? (typeof rowGap === 'object'
      ? Object.entries(rowGap).map(([breakpoint, value]) => {
          const prefix = breakpoint === 'sm' ? 'sm:' :
                        breakpoint === 'md' ? 'md:' :
                        breakpoint === 'lg' ? 'lg:' :
                        breakpoint === 'xl' ? 'xl:' :
                        breakpoint === '2xl' ? '2xl:' : '';
          return `${prefix}${rowGapMap['base'][value]}`;
        }).join(' ')
      : rowGapMap['base'][rowGap])
    : '';
  
  const justifyItemsClasses = justifyItems
    ? (typeof justifyItems === 'object'
      ? Object.entries(justifyItems).map(([breakpoint, value]) => justifyItemsMap[breakpoint][value]).join(' ')
      : justifyItemsMap['base'][justifyItems])
    : '';
  
  const alignItemsClasses = alignItems
    ? (typeof alignItems === 'object'
      ? Object.entries(alignItems).map(([breakpoint, value]) => alignItemsMap[breakpoint][value]).join(' ')
      : alignItemsMap['base'][alignItems])
    : '';
  
  const justifyContentClasses = justifyContent
    ? (typeof justifyContent === 'object'
      ? Object.entries(justifyContent).map(([breakpoint, value]) => justifyContentMap[breakpoint][value]).join(' ')
      : justifyContentMap['base'][justifyContent])
    : '';
  
  const alignContentClasses = alignContent
    ? (typeof alignContent === 'object'
      ? Object.entries(alignContent).map(([breakpoint, value]) => alignContentMap[breakpoint][value]).join(' ')
      : alignContentMap['base'][alignContent])
    : '';
  
  const flowClasses = flow
    ? (typeof flow === 'object'
      ? Object.entries(flow).map(([breakpoint, value]) => flowMap[breakpoint][value]).join(' ')
      : flowMap['base'][flow])
    : '';
  
  const autoColumnsClasses = autoColumns
    ? (typeof autoColumns === 'object'
      ? Object.entries(autoColumns).map(([breakpoint, value]) => autoColumnsMap[breakpoint][value]).join(' ')
      : autoColumnsMap['base'][autoColumns])
    : '';
  
  const autoRowsClasses = autoRows
    ? (typeof autoRows === 'object'
      ? Object.entries(autoRows).map(([breakpoint, value]) => autoRowsMap[breakpoint][value]).join(' ')
      : autoRowsMap['base'][autoRows])
    : '';
  
  // Kombiniere alle Klassen
  const gridClasses = `
    grid
    ${columnsClasses}
    ${rowsClasses}
    ${gapClasses}
    ${columnGapClasses}
    ${rowGapClasses}
    ${justifyItemsClasses}
    ${alignItemsClasses}
    ${justifyContentClasses}
    ${alignContentClasses}
    ${flowClasses}
    ${autoColumnsClasses}
    ${autoRowsClasses}
    ${fullWidth ? 'w-full' : ''}
    ${fullHeight ? 'h-full' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <div
      ref={ref}
      className={gridClasses}
      {...rest}
    >
      {children}
    </div>
  );
});

Grid.displayName = 'Grid';

export default Grid;