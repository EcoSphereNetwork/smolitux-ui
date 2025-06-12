import React, { forwardRef } from 'react';
import { clsx } from '@smolitux/utils';

/**
 * Props for the Button component
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the component */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  /** Size variant of the component */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Button component
 *
 * @description
 * A versatile button component with multiple variants and sizes.
 *
 * @example
 * ```tsx
 * <Button variant="primary">Content</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      disabled = false,
      type = 'button',
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      className={clsx(
        'smx-button',
        `smx-button--${variant}`,
        `smx-button--${size}`,
        { 'smx-button--disabled': disabled },
        className
      )}
      disabled={disabled}
      data-testid="Button"
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';

export default Button;
