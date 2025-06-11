import React, { forwardRef } from 'react';

/**
 * Props for {@link ThemeTypen}.
 */
export type ThemeTypenProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Minimal button used in theme demonstrations.
 */
export const ThemeTypen = forwardRef<HTMLButtonElement, ThemeTypenProps>(
  ({ children, ...props }, ref) => (
    <button type="button" ref={ref} {...props}>
      {children}
    </button>
  )
);

export default ThemeTypen;
