import React, { forwardRef } from 'react';
import { clsx } from '@smolitux/utils';

/**
 * Props for the Button component
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the button is an icon button */
  isIconButton?: boolean;
  /** ID of the button */
  id?: string;
  /** Content to display inside the component */
  children?: React.ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Visual variant of the component */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  /** Size variant of the component */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
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
export const Button = forwardRef<HTMLDivElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'smx-button',
          `smx-button--${variant}`,
          `smx-button--${size}`,
          {
            'smx-button--disabled': disabled,
          },
          className
        )}
        onClick={disabled ? undefined : onClick}
        aria-disabled={disabled}
        data-testid="Button"
        {...props}
      >
        {children}
      </div>
    );
  }
);

Button.displayName = 'Button';

export default Button;
