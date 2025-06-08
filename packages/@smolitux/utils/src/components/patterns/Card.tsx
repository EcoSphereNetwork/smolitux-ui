import React, { forwardRef } from 'react';
import { Box, BoxProps } from '../primitives/Box';

export interface CardProps extends BoxProps {
  /** Whether the card has a border */
  bordered?: boolean;
  /** Whether the card has a shadow */
  shadowed?: boolean;
  /** Whether the card has rounded corners */
  rounded?: boolean;
  /** Whether the card has padding */
  padded?: boolean;
  /** Whether the card has a hover effect */
  hoverable?: boolean;
}

/**
 * Card is a container component that groups related content and actions.
 * It provides a visual boundary for its children with optional styling.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      bordered = true,
      shadowed = false,
      rounded = true,
      padded = true,
      hoverable = false,
      className = '',
      style,
      children,
      ...rest
    },
    ref
  ) => {
    const cardStyle: React.CSSProperties = {
      backgroundColor: 'white',
      border: bordered ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
      borderRadius: rounded ? '0.5rem' : '0',
      padding: padded ? '1rem' : '0',
      boxShadow: shadowed ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
      transition: hoverable ? 'box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out' : 'none',
      ...style,
    };

    const hoverClass = hoverable ? 'hover:shadow-md hover:transform hover:translate-y-[-2px]' : '';

    return (
      <Box ref={ref} className={`${className} ${hoverClass}`} style={cardStyle} {...rest}>
        {children}
      </Box>
    );
  }
);

Card.displayName = 'Card';
