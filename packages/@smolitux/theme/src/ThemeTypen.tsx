import React, { forwardRef } from 'react';

export type ThemeTypenProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ThemeTypen = forwardRef<HTMLButtonElement, ThemeTypenProps>(
  ({ children, ...props }, ref) => (
    <button type="button" ref={ref} {...props}>
      {children}
    </button>
  )
);

export default ThemeTypen;
