import React, { forwardRef } from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
}

/**
 * Basic button component.
 * It forwards its ref and allows styling via `variant` and `size` props.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children = 'Button',
      variant = 'primary',
      size = 'medium',
      className = '',
      ...rest
    },
    ref
  ) => (
    <button
      ref={ref}
      className={`button button-${variant} button-${size} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';
