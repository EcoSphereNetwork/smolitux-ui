import React, { forwardRef, isValidElement, cloneElement } from 'react';
import { cn } from '@smolitux/utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Label content */
  children: React.ReactNode;
  /** htmlFor attribute */
  htmlFor?: string;
  /** Mark field as required */
  required?: boolean;
  /** Mark as disabled */
  disabled?: boolean;
  /** Font size */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'default' | 'subtle' | 'strong';
  /** Render child element instead of label */
  asChild?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      children,
      htmlFor,
      required = false,
      disabled = false,
      size = 'md',
      variant = 'default',
      asChild = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const classes = cn(
      'smx-label',
      {
        'text-sm': size === 'sm',
        'text-base': size === 'md',
        'text-lg': size === 'lg',
        'font-semibold': variant === 'strong',
        'text-gray-700': variant === 'subtle',
      },
      disabled && 'opacity-50 cursor-not-allowed',
      className,
    );

    if (asChild && isValidElement(children)) {
      return cloneElement(children as React.ReactElement, {
        ref,
        htmlFor,
        'aria-disabled': disabled || undefined,
        'aria-required': required || undefined,
        className: cn(classes, (children as any).props.className),
        ...rest,
      });
    }

    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={classes}
        aria-disabled={disabled || undefined}
        aria-required={required || undefined}
        {...rest}
      >
        {children}
        {required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  },
);

Label.displayName = 'Label';
export default Label;
