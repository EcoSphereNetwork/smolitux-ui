// packages/@smolitux/core/src/components/Flex/Flex.tsx
import React, { forwardRef } from 'react';
import './Flex.css';

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type FlexJustify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
export type FlexGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string | number;
export type FlexGrow = boolean | number;
export type FlexShrink = boolean | number;
export type FlexBasis = 'auto' | string | number;

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Flex-Richtung */
  direction?: FlexDirection;
  /** Flex-Umbruch */
  wrap?: FlexWrap;
  /** Ausrichtung entlang der Hauptachse */
  justify?: FlexJustify;
  /** Ausrichtung entlang der Querachse */
  align?: FlexAlign;
  /** Ausrichtung von mehreren Zeilen/Spalten */
  alignContent?: FlexAlign;
  /** Abstand zwischen Elementen */
  gap?: FlexGap;
  /** Horizontaler Abstand zwischen Elementen */
  rowGap?: FlexGap;
  /** Vertikaler Abstand zwischen Elementen */
  columnGap?: FlexGap;
  /** Flex-Container als Inline-Element */
  inline?: boolean;
  /** Volle Breite des Containers */
  fullWidth?: boolean;
  /** Volle Höhe des Containers */
  fullHeight?: boolean;
  /** Flex-Container füllt den verfügbaren Platz */
  flex?: boolean | string;
  /** Flex-Container wächst */
  grow?: FlexGrow;
  /** Flex-Container schrumpft */
  shrink?: FlexShrink;
  /** Basis-Größe des Flex-Containers */
  basis?: FlexBasis;
  /** Kinder-Elemente */
  children?: React.ReactNode;
}

export interface FlexItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ausrichtung des Elements */
  align?: FlexAlign;
  /** Element wächst */
  grow?: FlexGrow;
  /** Element schrumpft */
  shrink?: FlexShrink;
  /** Basis-Größe des Elements */
  basis?: FlexBasis;
  /** Reihenfolge des Elements */
  order?: number;
  /** Element füllt den verfügbaren Platz */
  flex?: boolean | string;
  /** Kinder-Elemente */
  children?: React.ReactNode;
}

/**
 * Flex-Komponente für flexibles Layout
 * 
 * @example
 * ```tsx
 * <Flex direction="row" justify="space-between" align="center">
 *   <FlexItem>Item 1</FlexItem>
 *   <FlexItem>Item 2</FlexItem>
 * </Flex>
 * ```
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(({
  direction = 'row',
  wrap = 'nowrap',
  justify = 'flex-start',
  align = 'stretch',
  alignContent,
  gap = 'none',
  rowGap,
  columnGap,
  inline = false,
  fullWidth = false,
  fullHeight = false,
  flex,
  grow,
  shrink,
  basis,
  className = '',
  style,
  children,
  ...rest
}, ref) => {
  // Konvertiere Gap-Werte
  const convertGapValue = (value: FlexGap): string => {
    if (value === 'none') return '0';
    if (typeof value === 'number') return `${value}px`;
    
    const gapValues = {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    };
    
    return gapValues[value as keyof typeof gapValues] || value;
  };
  
  // Konvertiere Flex-Werte
  const getFlexValue = (): string | undefined => {
    if (flex === undefined) return undefined;
    if (flex === true) return '1';
    return flex.toString();
  };
  
  // Konvertiere Grow-Werte
  const getGrowValue = (): string | undefined => {
    if (grow === undefined) return undefined;
    if (grow === true) return '1';
    return grow.toString();
  };
  
  // Konvertiere Shrink-Werte
  const getShrinkValue = (): string | undefined => {
    if (shrink === undefined) return undefined;
    if (shrink === true) return '1';
    return shrink.toString();
  };
  
  // Zusammengesetzte Klassen
  const classes = [
    'smolitux-flex',
    `smolitux-flex-direction-${direction}`,
    `smolitux-flex-wrap-${wrap}`,
    `smolitux-flex-justify-${justify}`,
    `smolitux-flex-align-${align}`,
    alignContent && `smolitux-flex-align-content-${alignContent}`,
    inline && 'smolitux-flex-inline',
    fullWidth && 'smolitux-flex-full-width',
    fullHeight && 'smolitux-flex-full-height',
    className
  ].filter(Boolean).join(' ');
  
  // Zusammengesetzte Styles
  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(gap !== 'none' && { gap: convertGapValue(gap) }),
    ...(rowGap && { rowGap: convertGapValue(rowGap) }),
    ...(columnGap && { columnGap: convertGapValue(columnGap) }),
    ...(getFlexValue() && { flex: getFlexValue() }),
    ...(getGrowValue() && { flexGrow: getGrowValue() }),
    ...(getShrinkValue() && { flexShrink: getShrinkValue() }),
    ...(basis && { flexBasis: typeof basis === 'number' ? `${basis}px` : basis })
  };
  
  return (
    <div
      ref={ref}
      className={classes}
      style={combinedStyle}
      {...rest}
    >
      {children}
    </div>
  );
});

/**
 * FlexItem-Komponente für einzelne Elemente in einem Flex-Container
 * 
 * @example
 * ```tsx
 * <FlexItem grow>Wachsendes Element</FlexItem>
 * ```
 */
export const FlexItem = forwardRef<HTMLDivElement, FlexItemProps>(({
  align,
  grow,
  shrink,
  basis,
  order,
  flex,
  className = '',
  style,
  children,
  ...rest
}, ref) => {
  // Konvertiere Flex-Werte
  const getFlexValue = (): string | undefined => {
    if (flex === undefined) return undefined;
    if (flex === true) return '1';
    return flex.toString();
  };
  
  // Konvertiere Grow-Werte
  const getGrowValue = (): string | undefined => {
    if (grow === undefined) return undefined;
    if (grow === true) return '1';
    return grow.toString();
  };
  
  // Konvertiere Shrink-Werte
  const getShrinkValue = (): string | undefined => {
    if (shrink === undefined) return undefined;
    if (shrink === true) return '1';
    return shrink.toString();
  };
  
  // Zusammengesetzte Klassen
  const classes = [
    'smolitux-flex-item',
    align && `smolitux-flex-item-align-${align}`,
    className
  ].filter(Boolean).join(' ');
  
  // Zusammengesetzte Styles
  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(getFlexValue() && { flex: getFlexValue() }),
    ...(getGrowValue() && { flexGrow: getGrowValue() }),
    ...(getShrinkValue() && { flexShrink: getShrinkValue() }),
    ...(basis && { flexBasis: typeof basis === 'number' ? `${basis}px` : basis }),
    ...(order !== undefined && { order })
  };
  
  return (
    <div
      ref={ref}
      className={classes}
      style={combinedStyle}
      {...rest}
    >
      {children}
    </div>
  );
});

Flex.displayName = 'Flex';
FlexItem.displayName = 'FlexItem';

export default Flex;