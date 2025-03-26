import React, { forwardRef } from 'react';
import { Box, BoxProps } from './Box';

export interface TextProps extends BoxProps {
  /** Font weight */
  weight?: 'normal' | 'bold' | 'light' | 'medium' | 'semibold' | number;
  /** Font size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | string | number;
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Text color */
  color?: string;
  /** Text transform */
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  /** Text decoration */
  decoration?: 'none' | 'underline' | 'line-through';
  /** Line height */
  lineHeight?: string | number;
  /** Letter spacing */
  letterSpacing?: string | number;
  /** Font family */
  fontFamily?: string;
  /** Truncate text with ellipsis */
  truncate?: boolean;
  /** Number of lines to show before truncating */
  lineClamp?: number;
}

/**
 * Text is a component for displaying text with various typographic styles.
 * It extends the Box component with text-specific properties.
 */
export const Text = forwardRef<HTMLDivElement, TextProps>(
  (
    {
      as = 'span',
      weight,
      size,
      align,
      color,
      transform,
      decoration,
      lineHeight,
      letterSpacing,
      fontFamily,
      truncate,
      lineClamp,
      style,
      className = '',
      ...rest
    },
    ref
  ) => {
    const textStyle: React.CSSProperties = {
      fontWeight: weight,
      fontSize: size,
      textAlign: align,
      color,
      textTransform: transform,
      textDecoration: decoration,
      lineHeight,
      letterSpacing,
      fontFamily,
      ...(truncate && {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }),
      ...(lineClamp && {
        display: '-webkit-box',
        WebkitLineClamp: lineClamp,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }),
      ...style,
    };

    return <Box as={as} ref={ref} className={className} style={textStyle} {...rest} />;
  }
);

Text.displayName = 'Text';