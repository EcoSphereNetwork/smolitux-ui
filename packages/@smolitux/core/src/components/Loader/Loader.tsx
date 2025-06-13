import React, { forwardRef } from 'react';
import { cn } from '@smolitux/utils';

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controls visibility of the loader */
  visible: boolean;
  /** Size of the loader */
  size?: 'sm' | 'md' | 'lg' | number;
  /** Label for screen readers or visible text */
  label?: string;
  /** Visual variant of the loader */
  variant?: 'primary' | 'subtle' | 'contrast';
  /** ARIA live region politeness */
  'aria-live'?: 'polite' | 'assertive';
  /** Fullscreen centered mode for loading screens */
  fullscreen?: boolean;
}

const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  (
    {
      visible,
      size = 'md',
      label,
      variant = 'primary',
      'aria-live': ariaLive = 'polite',
      fullscreen = false,
      className,
      ...props
    },
    ref
  ) => {
    if (!visible) {
      return null;
    }

    const sizeValue = typeof size === 'number' ? size : getSizeValue(size);
    
    const loaderClasses = cn(
      'smolitux-loader',
      'inline-flex items-center justify-center',
      {
        'fixed inset-0 z-50 bg-white/80 backdrop-blur-sm': fullscreen,
        'smolitux-loader--primary': variant === 'primary',
        'smolitux-loader--subtle': variant === 'subtle',
        'smolitux-loader--contrast': variant === 'contrast',
      },
      className
    );

    const spinnerClasses = cn(
      'smolitux-loader__spinner',
      'animate-spin rounded-full border-2 border-current border-t-transparent',
      {
        'text-blue-600': variant === 'primary',
        'text-gray-400': variant === 'subtle',
        'text-white': variant === 'contrast',
      }
    );

    const labelClasses = cn(
      'smolitux-loader__label',
      'ml-2 text-sm font-medium',
      {
        'text-blue-600': variant === 'primary',
        'text-gray-600': variant === 'subtle',
        'text-white': variant === 'contrast',
      }
    );

    return (
      <div
        ref={ref}
        className={loaderClasses}
        role="status"
        aria-live={ariaLive}
        aria-label={label || 'Loading'}
        {...props}
      >
        <div className="flex items-center">
          <div
            className={spinnerClasses}
            style={{
              width: sizeValue,
              height: sizeValue,
            }}
            aria-hidden="true"
          />
          {label && (
            <span className={labelClasses}>
              {label}
            </span>
          )}
        </div>
        {!label && (
          <span className="sr-only">Loading...</span>
        )}
      </div>
    );
  }
);

function getSizeValue(size: 'sm' | 'md' | 'lg'): number {
  switch (size) {
    case 'sm':
      return 16;
    case 'md':
      return 24;
    case 'lg':
      return 32;
    default:
      return 24;
  }
}

Loader.displayName = 'Loader';

export default Loader;