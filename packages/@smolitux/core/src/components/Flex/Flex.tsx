// FIXME: Props nicht typisiert
import React, { forwardRef } from 'react';

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type FlexJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
export type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export type FlexGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type FlexBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Die Richtung des Flex-Containers
   */
  direction?: FlexDirection | { [key in FlexBreakpoint]?: FlexDirection };

  /**
   * Die Umbrucheigenschaft des Flex-Containers
   */
  wrap?: FlexWrap | { [key in FlexBreakpoint]?: FlexWrap };

  /**
   * Die horizontale Ausrichtung der Elemente
   */
  justify?: FlexJustify | { [key in FlexBreakpoint]?: FlexJustify };

  /**
   * Die vertikale Ausrichtung der Elemente
   */
  align?: FlexAlign | { [key in FlexBreakpoint]?: FlexAlign };

  /**
   * Die Ausrichtung der Zeilen im Flex-Container
   */
  alignContent?: FlexAlign | { [key in FlexBreakpoint]?: FlexAlign };

  /**
   * Der Abstand zwischen den Elementen
   */
  gap?: FlexGap | { [key in FlexBreakpoint]?: FlexGap };

  /**
   * Der horizontale Abstand zwischen den Elementen
   */
  columnGap?: FlexGap | { [key in FlexBreakpoint]?: FlexGap };

  /**
   * Der vertikale Abstand zwischen den Elementen
   */
  rowGap?: FlexGap | { [key in FlexBreakpoint]?: FlexGap };

  /**
   * Gibt an, ob der Flex-Container die volle Breite einnehmen soll
   */
  fullWidth?: boolean;

  /**
   * Gibt an, ob der Flex-Container die volle Höhe einnehmen soll
   */
  fullHeight?: boolean;

  /**
   * Gibt an, ob der Flex-Container als Inline-Flex-Container gerendert werden soll
   */
  inline?: boolean;

  /**
   * Zusätzliche CSS-Klassen
   */
  className?: string;

  /**
   * Der Inhalt des Flex-Containers
   */
  children?: React.ReactNode;
}

/**
 * Flex-Komponente für flexible Layouts
 *
 * @example
 * ```tsx
 * <Flex direction="row" align="center" justify="space-between">
 *   <div>Element 1</div>
 *   <div>Element 2</div>
 * </Flex>
 * ```
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction = 'row',
      wrap = 'nowrap',
      justify = 'flex-start',
      align = 'stretch',
      alignContent,
      gap = 'none',
      columnGap,
      rowGap,
      fullWidth = false,
      fullHeight = false,
      inline = false,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    // Hilfsfunktion zum Generieren von Klassen für responsive Eigenschaften
    const getResponsiveClasses = (
      prop: any,
      classPrefix: string,
      valueMap: Record<string, Record<string, string>>
    ): string => {
      if (prop === undefined) return '';

      if (typeof prop === 'object') {
        return Object.entries(prop)
          .map(([breakpoint, value]) => {
            const breakpointPrefix =
              breakpoint === 'sm'
                ? 'sm:'
                : breakpoint === 'md'
                  ? 'md:'
                  : breakpoint === 'lg'
                    ? 'lg:'
                    : breakpoint === 'xl'
                      ? 'xl:'
                      : breakpoint === '2xl'
                        ? '2xl:'
                        : '';

            return `${breakpointPrefix}${classPrefix}-${valueMap[breakpoint][value as string]}`;
          })
          .join(' ');
      }

      return `${classPrefix}-${valueMap['base'][prop]}`;
    };

    // Flex-Direction-Klassen
    const directionMap: Record<string, Record<string, string>> = {
      base: {
        row: 'row',
        'row-reverse': 'row-reverse',
        column: 'col',
        'column-reverse': 'col-reverse',
      },
      sm: {
        row: 'row',
        'row-reverse': 'row-reverse',
        column: 'col',
        'column-reverse': 'col-reverse',
      },
      md: {
        row: 'row',
        'row-reverse': 'row-reverse',
        column: 'col',
        'column-reverse': 'col-reverse',
      },
      lg: {
        row: 'row',
        'row-reverse': 'row-reverse',
        column: 'col',
        'column-reverse': 'col-reverse',
      },
      xl: {
        row: 'row',
        'row-reverse': 'row-reverse',
        column: 'col',
        'column-reverse': 'col-reverse',
      },
      '2xl': {
        row: 'row',
        'row-reverse': 'row-reverse',
        column: 'col',
        'column-reverse': 'col-reverse',
      },
    };

    // Flex-Wrap-Klassen
    const wrapMap: Record<string, Record<string, string>> = {
      base: {
        nowrap: 'nowrap',
        wrap: 'wrap',
        'wrap-reverse': 'wrap-reverse',
      },
      sm: {
        nowrap: 'nowrap',
        wrap: 'wrap',
        'wrap-reverse': 'wrap-reverse',
      },
      md: {
        nowrap: 'nowrap',
        wrap: 'wrap',
        'wrap-reverse': 'wrap-reverse',
      },
      lg: {
        nowrap: 'nowrap',
        wrap: 'wrap',
        'wrap-reverse': 'wrap-reverse',
      },
      xl: {
        nowrap: 'nowrap',
        wrap: 'wrap',
        'wrap-reverse': 'wrap-reverse',
      },
      '2xl': {
        nowrap: 'nowrap',
        wrap: 'wrap',
        'wrap-reverse': 'wrap-reverse',
      },
    };

    // Justify-Content-Klassen
    const justifyMap: Record<string, Record<string, string>> = {
      base: {
        'flex-start': 'start',
        'flex-end': 'end',
        center: 'center',
        'space-between': 'between',
        'space-around': 'around',
        'space-evenly': 'evenly',
      },
      sm: {
        'flex-start': 'start',
        'flex-end': 'end',
        center: 'center',
        'space-between': 'between',
        'space-around': 'around',
        'space-evenly': 'evenly',
      },
      md: {
        'flex-start': 'start',
        'flex-end': 'end',
        center: 'center',
        'space-between': 'between',
        'space-around': 'around',
        'space-evenly': 'evenly',
      },
      lg: {
        'flex-start': 'start',
        'flex-end': 'end',
        center: 'center',
        'space-between': 'between',
        'space-around': 'around',
        'space-evenly': 'evenly',
      },
      xl: {
        'flex-start': 'start',
        'flex-end': 'end',
        center: 'center',
        'space-between': 'between',
        'space-around': 'around',
        'space-evenly': 'evenly',
      },
      '2xl': {
        'flex-start': 'start',
        'flex-end': 'end',
        center: 'center',
        'space-between': 'between',
        'space-around': 'around',
        'space-evenly': 'evenly',
      },
    };

    // Align-Items-Klassen
    const alignMap: Record<string, Record<string, string>> = {
      base: {
        'flex-start': 'start',
        'flex-end': 'end',
        center: 'center',
        stretch: 'stretch',
        baseline: 'baseline',
      },
      sm: {
        'flex-start': 'start',
        'flex-end': 'end',
        center: 'center',
        stretch: 'stretch',
        baseline: 'baseline',
      },
      md: {
        'flex-start': 'start',
        'flex-end': 'end',
        center: 'center',
        stretch: 'stretch',
        baseline: 'baseline',
      },
      lg: {
        'flex-start': 'start',
        'flex-end': 'end',
        center: 'center',
        stretch: 'stretch',
        baseline: 'baseline',
      },
      xl: {
        'flex-start': 'start',
        'flex-end': 'end',
        center: 'center',
        stretch: 'stretch',
        baseline: 'baseline',
      },
      '2xl': {
        'flex-start': 'start',
        'flex-end': 'end',
        center: 'center',
        stretch: 'stretch',
        baseline: 'baseline',
      },
    };

    // Align-Content-Klassen
    const alignContentMap: Record<string, Record<string, string>> = {
      base: {
        'flex-start': 'start',
        'flex-end': 'end',
        center: 'center',
        stretch: 'stretch',
        baseline: 'baseline',
      },
      sm: {
        'flex-start': 'start',
        'flex-end': 'end',
        center: 'center',
        stretch: 'stretch',
        baseline: 'baseline',
      },
      md: {
        'flex-start': 'start',
        'flex-end': 'end',
        center: 'center',
        stretch: 'stretch',
        baseline: 'baseline',
      },
      lg: {
        'flex-start': 'start',
        'flex-end': 'end',
        center: 'center',
        stretch: 'stretch',
        baseline: 'baseline',
      },
      xl: {
        'flex-start': 'start',
        'flex-end': 'end',
        center: 'center',
        stretch: 'stretch',
        baseline: 'baseline',
      },
      '2xl': {
        'flex-start': 'start',
        'flex-end': 'end',
        center: 'center',
        stretch: 'stretch',
        baseline: 'baseline',
      },
    };

    // Gap-Klassen
    const gapMap: Record<string, Record<string, string>> = {
      base: {
        none: '0',
        xs: '1',
        sm: '2',
        md: '4',
        lg: '6',
        xl: '8',
      },
      sm: {
        none: '0',
        xs: '1',
        sm: '2',
        md: '4',
        lg: '6',
        xl: '8',
      },
      md: {
        none: '0',
        xs: '1',
        sm: '2',
        md: '4',
        lg: '6',
        xl: '8',
      },
      lg: {
        none: '0',
        xs: '1',
        sm: '2',
        md: '4',
        lg: '6',
        xl: '8',
      },
      xl: {
        none: '0',
        xs: '1',
        sm: '2',
        md: '4',
        lg: '6',
        xl: '8',
      },
      '2xl': {
        none: '0',
        xs: '1',
        sm: '2',
        md: '4',
        lg: '6',
        xl: '8',
      },
    };

    // Generiere die Klassen für die verschiedenen Eigenschaften
    const directionClasses =
      typeof direction === 'object'
        ? Object.entries(direction)
            .map(([breakpoint, value]) => {
              const prefix =
                breakpoint === 'sm'
                  ? 'sm:'
                  : breakpoint === 'md'
                    ? 'md:'
                    : breakpoint === 'lg'
                      ? 'lg:'
                      : breakpoint === 'xl'
                        ? 'xl:'
                        : breakpoint === '2xl'
                          ? '2xl:'
                          : '';
              return `${prefix}flex-${directionMap['base'][value]}`;
            })
            .join(' ')
        : `flex-${directionMap['base'][direction]}`;

    const wrapClasses =
      typeof wrap === 'object'
        ? Object.entries(wrap)
            .map(([breakpoint, value]) => {
              const prefix =
                breakpoint === 'sm'
                  ? 'sm:'
                  : breakpoint === 'md'
                    ? 'md:'
                    : breakpoint === 'lg'
                      ? 'lg:'
                      : breakpoint === 'xl'
                        ? 'xl:'
                        : breakpoint === '2xl'
                          ? '2xl:'
                          : '';
              return `${prefix}flex-${wrapMap['base'][value]}`;
            })
            .join(' ')
        : `flex-${wrapMap['base'][wrap]}`;

    const justifyClasses =
      typeof justify === 'object'
        ? Object.entries(justify)
            .map(([breakpoint, value]) => {
              const prefix =
                breakpoint === 'sm'
                  ? 'sm:'
                  : breakpoint === 'md'
                    ? 'md:'
                    : breakpoint === 'lg'
                      ? 'lg:'
                      : breakpoint === 'xl'
                        ? 'xl:'
                        : breakpoint === '2xl'
                          ? '2xl:'
                          : '';
              return `${prefix}justify-${justifyMap['base'][value]}`;
            })
            .join(' ')
        : `justify-${justifyMap['base'][justify]}`;

    const alignClasses =
      typeof align === 'object'
        ? Object.entries(align)
            .map(([breakpoint, value]) => {
              const prefix =
                breakpoint === 'sm'
                  ? 'sm:'
                  : breakpoint === 'md'
                    ? 'md:'
                    : breakpoint === 'lg'
                      ? 'lg:'
                      : breakpoint === 'xl'
                        ? 'xl:'
                        : breakpoint === '2xl'
                          ? '2xl:'
                          : '';
              return `${prefix}items-${alignMap['base'][value]}`;
            })
            .join(' ')
        : `items-${alignMap['base'][align]}`;

    const alignContentClasses = alignContent
      ? typeof alignContent === 'object'
        ? Object.entries(alignContent)
            .map(([breakpoint, value]) => {
              const prefix =
                breakpoint === 'sm'
                  ? 'sm:'
                  : breakpoint === 'md'
                    ? 'md:'
                    : breakpoint === 'lg'
                      ? 'lg:'
                      : breakpoint === 'xl'
                        ? 'xl:'
                        : breakpoint === '2xl'
                          ? '2xl:'
                          : '';
              return `${prefix}content-${alignContentMap['base'][value]}`;
            })
            .join(' ')
        : `content-${alignContentMap['base'][alignContent]}`
      : '';

    const gapClasses =
      typeof gap === 'object'
        ? Object.entries(gap)
            .map(([breakpoint, value]) => {
              const prefix =
                breakpoint === 'sm'
                  ? 'sm:'
                  : breakpoint === 'md'
                    ? 'md:'
                    : breakpoint === 'lg'
                      ? 'lg:'
                      : breakpoint === 'xl'
                        ? 'xl:'
                        : breakpoint === '2xl'
                          ? '2xl:'
                          : '';
              return `${prefix}gap-${gapMap['base'][value]}`;
            })
            .join(' ')
        : `gap-${gapMap['base'][gap]}`;

    const columnGapClasses = columnGap
      ? typeof columnGap === 'object'
        ? Object.entries(columnGap)
            .map(([breakpoint, value]) => {
              const prefix =
                breakpoint === 'sm'
                  ? 'sm:'
                  : breakpoint === 'md'
                    ? 'md:'
                    : breakpoint === 'lg'
                      ? 'lg:'
                      : breakpoint === 'xl'
                        ? 'xl:'
                        : breakpoint === '2xl'
                          ? '2xl:'
                          : '';
              return `${prefix}gap-x-${gapMap['base'][value]}`;
            })
            .join(' ')
        : `gap-x-${gapMap['base'][columnGap]}`
      : '';

    const rowGapClasses = rowGap
      ? typeof rowGap === 'object'
        ? Object.entries(rowGap)
            .map(([breakpoint, value]) => {
              const prefix =
                breakpoint === 'sm'
                  ? 'sm:'
                  : breakpoint === 'md'
                    ? 'md:'
                    : breakpoint === 'lg'
                      ? 'lg:'
                      : breakpoint === 'xl'
                        ? 'xl:'
                        : breakpoint === '2xl'
                          ? '2xl:'
                          : '';
              return `${prefix}gap-y-${gapMap['base'][value]}`;
            })
            .join(' ')
        : `gap-y-${gapMap['base'][rowGap]}`
      : '';

    // Kombiniere alle Klassen
    const flexClasses = `
    ${inline ? 'inline-flex' : 'flex'}
    ${directionClasses}
    ${wrapClasses}
    ${justifyClasses}
    ${alignClasses}
    ${alignContentClasses}
    ${gapClasses}
    ${columnGapClasses}
    ${rowGapClasses}
    ${fullWidth ? 'w-full' : ''}
    ${fullHeight ? 'h-full' : ''}
    ${className}
  `
      .trim()
      .replace(/\s+/g, ' ');

    return (
      <div ref={ref} className={flexClasses} {...rest}>
        {children}
      </div>
    );
  }
);

Flex.displayName = 'Flex';

export default Flex;
