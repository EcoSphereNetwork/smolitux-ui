import React, { forwardRef } from 'react';
import { Box, BoxProps } from './Box';

export interface FlexProps extends BoxProps {
  /** Direction of the flex container */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /** Alignment of items along the main axis */
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  /** Alignment of items along the cross axis */
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  /** Wrapping behavior */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  /** Gap between items */
  gap?: number | string;
}

/**
 * Flex is a layout component that uses flexbox to arrange its children.
 * It extends the Box component with flexbox-specific properties.
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction = 'row',
      justify = 'flex-start',
      align = 'stretch',
      wrap = 'nowrap',
      gap,
      style,
      className = '',
      ...rest
    },
    ref
  ) => {
    const flexStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: direction,
      justifyContent: justify,
      alignItems: align,
      flexWrap: wrap,
      gap,
      ...style,
    };

    return <Box ref={ref} className={className} style={flexStyle} {...rest} />;
  }
);

Flex.displayName = 'Flex';
