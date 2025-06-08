import React, { forwardRef } from 'react';
import { Box, BoxProps } from '../primitives/Box';

export interface ProgressBarProps extends Omit<BoxProps, 'as'> {
  /** Current value */
  value: number;
  /** Maximum value */
  max?: number;
  /** Minimum value */
  min?: number;
  /** Whether to show the value as text */
  showValue?: boolean;
  /** Format function for the value */
  formatValue?: (value: number, max: number) => string;
  /** Whether the progress bar is indeterminate */
  indeterminate?: boolean;
  /** Color scheme */
  colorScheme?: string;
  /** Size of the progress bar */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Whether the progress bar is rounded */
  rounded?: boolean;
  /** Whether to animate the progress bar */
  animated?: boolean;
  /** Additional class name for the progress element */
  progressClassName?: string;
}

/**
 * ProgressBar component for displaying progress.
 * It supports different sizes, colors, and states.
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      max = 100,
      min = 0,
      showValue = false,
      formatValue,
      indeterminate = false,
      colorScheme = 'primary',
      size = 'md',
      rounded = true,
      animated = false,
      className = '',
      progressClassName = '',
      style,
      ...rest
    },
    ref
  ) => {
    // Calculate the percentage
    const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

    // Size styles
    const sizeStyles: Record<string, React.CSSProperties> = {
      xs: { height: '0.25rem' },
      sm: { height: '0.5rem' },
      md: { height: '0.75rem' },
      lg: { height: '1rem' },
      xl: { height: '1.5rem' },
    };

    // Color styles
    const getColorStyles = (colorScheme: string): React.CSSProperties => {
      const colors: Record<string, string> = {
        primary: '#3b82f6', // blue-500
        secondary: '#6b7280', // gray-500
        success: '#10b981', // green-500
        danger: '#ef4444', // red-500
        warning: '#f59e0b', // amber-500
        info: '#3b82f6', // blue-500
      };

      return {
        backgroundColor: colors[colorScheme] || colors.primary,
      };
    };

    // Container styles
    const containerStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      backgroundColor: '#e5e7eb', // gray-200
      overflow: 'hidden',
      borderRadius: rounded ? '9999px' : '0',
      ...sizeStyles[size],
      ...style,
    };

    // Progress styles
    const progressStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: indeterminate ? '50%' : `${percentage}%`,
      transition: animated ? 'width 0.3s ease-in-out' : 'none',
      ...getColorStyles(colorScheme),
    };

    // Animation for indeterminate state
    if (indeterminate) {
      progressStyle.animation = 'progress-bar-indeterminate 1.5s infinite linear';
      progressStyle.transformOrigin = '0% 50%';
    }

    // Format the value
    const formattedValue = formatValue ? formatValue(value, max) : `${Math.round(percentage)}%`;

    return (
      <Box ref={ref} className={`progress-bar ${className}`} style={containerStyle} {...rest}>
        <Box className={`progress-bar-fill ${progressClassName}`} style={progressStyle} />
        {showValue && (
          <Box
            className="progress-bar-text"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: size === 'xs' || size === 'sm' ? 'inherit' : 'white',
              fontSize: size === 'xl' ? '1rem' : '0.75rem',
              fontWeight: 'bold',
              zIndex: 1,
            }}
          >
            {formattedValue}
          </Box>
        )}
      </Box>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
