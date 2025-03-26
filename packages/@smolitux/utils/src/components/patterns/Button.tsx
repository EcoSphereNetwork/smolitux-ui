import React, { forwardRef } from 'react';
import { Box, BoxProps } from '../primitives/Box';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends Omit<BoxProps, 'as'> {
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Icon to display before the button text */
  leftIcon?: React.ReactNode;
  /** Icon to display after the button text */
  rightIcon?: React.ReactNode;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Whether the button takes the full width of its container */
  fullWidth?: boolean;
  /** Button color scheme */
  colorScheme?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Button component for triggering actions or events.
 * It supports different variants, sizes, and states.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      size = 'md',
      disabled = false,
      loading = false,
      leftIcon,
      rightIcon,
      type = 'button',
      fullWidth = false,
      colorScheme = 'primary',
      className = '',
      style,
      children,
      onClick,
      ...rest
    },
    ref
  ) => {
    // Size styles
    const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
      xs: { fontSize: '0.75rem', padding: '0.25rem 0.5rem', height: '1.5rem' },
      sm: { fontSize: '0.875rem', padding: '0.375rem 0.75rem', height: '2rem' },
      md: { fontSize: '1rem', padding: '0.5rem 1rem', height: '2.5rem' },
      lg: { fontSize: '1.125rem', padding: '0.625rem 1.25rem', height: '3rem' },
      xl: { fontSize: '1.25rem', padding: '0.75rem 1.5rem', height: '3.5rem' },
    };

    // Color styles based on variant and color scheme
    const getColorStyles = (
      variant: ButtonVariant,
      colorScheme: string
    ): React.CSSProperties => {
      const colors: Record<string, { base: string; hover: string; active: string }> = {
        primary: {
          base: '#3b82f6', // blue-500
          hover: '#2563eb', // blue-600
          active: '#1d4ed8', // blue-700
        },
        secondary: {
          base: '#6b7280', // gray-500
          hover: '#4b5563', // gray-600
          active: '#374151', // gray-700
        },
        success: {
          base: '#10b981', // green-500
          hover: '#059669', // green-600
          active: '#047857', // green-700
        },
        danger: {
          base: '#ef4444', // red-500
          hover: '#dc2626', // red-600
          active: '#b91c1c', // red-700
        },
        warning: {
          base: '#f59e0b', // amber-500
          hover: '#d97706', // amber-600
          active: '#b45309', // amber-700
        },
        info: {
          base: '#3b82f6', // blue-500
          hover: '#2563eb', // blue-600
          active: '#1d4ed8', // blue-700
        },
      };

      const color = colors[colorScheme] || colors.primary;

      switch (variant) {
        case 'solid':
          return {
            backgroundColor: color.base,
            color: 'white',
            borderColor: color.base,
          };
        case 'outline':
          return {
            backgroundColor: 'transparent',
            color: color.base,
            borderColor: color.base,
          };
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            color: color.base,
            borderColor: 'transparent',
          };
        case 'link':
          return {
            backgroundColor: 'transparent',
            color: color.base,
            borderColor: 'transparent',
            textDecoration: 'underline',
          };
        default:
          return {};
      }
    };

    const colorStyles = getColorStyles(variant, colorScheme);

    // Combine all styles
    const buttonStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid',
      borderRadius: '0.375rem',
      fontWeight: 500,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      width: fullWidth ? '100%' : 'auto',
      transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
      ...sizeStyles[size],
      ...colorStyles,
      ...style,
    };

    // Handle click event
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !loading && onClick) {
        onClick(event);
      }
    };

    return (
      <Box
        as="button"
        ref={ref}
        type={type}
        className={className}
        style={buttonStyle}
        disabled={disabled || loading}
        onClick={handleClick}
        {...rest}
      >
        {loading && (
          <span
            className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"
            role="status"
          />
        )}
        {leftIcon && !loading && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Box>
    );
  }
);

Button.displayName = 'Button';