import React, { forwardRef } from 'react';
import { cn } from '@smolitux/utils';

export interface InputProps {
  /** Current value */
  value: string;
  /** Change handler returning the new value */
  onChange: (value: string) => void;
  /** Input type */
  type?: string;
  /** Element id */
  id?: string;
  /** Name attribute */
  name?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Required flag */
  required?: boolean;
  /** Readonly flag */
  readOnly?: boolean;
  /** Autocomplete hint */
  autoComplete?: string;
  /** Autofocus on mount */
  autoFocus?: boolean;
  /** Accessible label */
  ariaLabel?: string;
  /** aria-describedby reference */
  ariaDescribedby?: string;
  /** Additional className */
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      type = 'text',
      id,
      name,
      disabled = false,
      placeholder,
      required = false,
      readOnly = false,
      autoComplete,
      autoFocus = false,
      ariaLabel,
      ariaDescribedby,
      className,
      ...rest
    },
    ref,
  ) => (
    <input
      ref={ref}
      id={id}
      name={name}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      required={required}
      readOnly={readOnly}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      className={cn(
        'smx-input border rounded px-3 py-2 text-gray-900 placeholder-gray-500',
        'focus:outline-none focus:ring-2 focus:ring-primary-500',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      {...rest}
    />
  ),
);

Input.displayName = 'Input';

export default Input;
