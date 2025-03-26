import React, { forwardRef } from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS class names */
  className?: string;
  /** Inline CSS styles */
  style?: React.CSSProperties;
  /** Element to render as */
  as?: React.ElementType;
  /** Children elements */
  children?: React.ReactNode;
}

/**
 * Box is a basic layout component that serves as a wrapper for other components.
 * It provides a way to apply styling and layout properties to its children.
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ as: Component = 'div', className = '', style, children, ...rest }, ref) => {
    return (
      <Component ref={ref} className={className} style={style} {...rest}>
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';