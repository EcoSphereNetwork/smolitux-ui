import React, { forwardRef } from 'react';
import { clsx } from '@smolitux/utils';

/**
 * FormField size variants
 */
export type FormFieldSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * FormField visual variants
 */
export type FormFieldVariant = 'outline' | 'filled' | 'flushed' | 'unstyled';

/**
 * Label placement options
 */
export type LabelPlacement = 'top' | 'left' | 'right';

/**
 * FormField props
 */
export interface FormFieldProps {
  /** The form field content */
  children: React.ReactNode;
  
  /** The label text */
  label?: React.ReactNode;
  
  /** The field name */
  name?: string;
  
  /** The field ID */
  id?: string;
  
  /** The size of the form field */
  size?: FormFieldSize;
  
  /** The visual variant of the form field */
  variant?: FormFieldVariant;
  
  /** The label placement */
  labelPlacement?: LabelPlacement;
  
  /** The width of the label (for left/right placement) */
  labelWidth?: string | number;
  
  /** Helper text to display below the field */
  helperText?: React.ReactNode;
  
  /** Error message to display */
  errorMessage?: React.ReactNode;
  
  /** Whether the field has an error */
  isInvalid?: boolean;
  
  /** Whether the field is required */
  required?: boolean;
  
  /** Whether the field is disabled */
  disabled?: boolean;
  
  /** Whether the field is read-only */
  readOnly?: boolean;
  
  /** Whether the field is loading */
  loading?: boolean;
  
  /** Whether to show a character counter */
  showCounter?: boolean;
  
  /** Maximum character length for counter */
  maxLength?: number;
  
  /** Current value for counter */
  value?: string;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Additional styles */
  style?: React.CSSProperties;
}

/**
 * FormField component
 *
 * A wrapper component that provides consistent styling and layout for form fields.
 * It includes support for labels, helper text, error messages, and various layout options.
 */
export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      children,
      label,
      name,
      id,
      size = 'md',
      variant = 'outline',
      labelPlacement = 'top',
      labelWidth,
      helperText,
      errorMessage,
      isInvalid = false,
      required = false,
      disabled = false,
      readOnly = false,
      loading = false,
      showCounter = false,
      maxLength,
      value,
      className,
      style,
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const fieldId = id || (name ? `field-${name}` : undefined);
    
    // Calculate character count for counter
    const characterCount = value ? value.length : 0;
    
    // CSS classes for the container
    const containerClasses = clsx(
      'form-field',
      `form-field--${size}`,
      `form-field--${variant}`,
      {
        'form-field--horizontal': labelPlacement !== 'top',
        'form-field--reverse': labelPlacement === 'right',
        'form-field--invalid': isInvalid,
        'form-field--disabled': disabled,
        'form-field--readonly': readOnly,
        'form-field--loading': loading,
      },
      className
    );
    
    // CSS classes for the label
    const labelClasses = clsx(
      'form-field__label',
      {
        'form-field__label--required': required,
      }
    );
    
    // CSS classes for helper text
    const helperTextClasses = clsx(
      'form-field__helper-text',
      {
        'form-field__helper-text--error': isInvalid,
      }
    );
    
    // Label styles for horizontal layout
    const labelStyles: React.CSSProperties = {};
    if (labelPlacement !== 'top' && labelWidth) {
      labelStyles.width = typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth;
    }
    
    return (
      <div ref={ref} className={containerClasses} style={style} data-testid="FormField">
        {/* Label */}
        {label && (
          <label htmlFor={fieldId} className={labelClasses} style={labelStyles}>
            {label}
            {required && <span className="form-field__required-indicator" aria-label="required">*</span>}
          </label>
        )}
        
        {/* Field content wrapper */}
        <div className="form-field__content">
          {/* Loading indicator */}
          {loading && (
            <div className="form-field__loading" aria-hidden="true">
              <div className="form-field__spinner" />
            </div>
          )}
          
          {/* Field content */}
          <div className="form-field__field">
            {children}
          </div>
          
          {/* Helper text or error message */}
          {(helperText || errorMessage) && (
            <div className={helperTextClasses}>
              {isInvalid && errorMessage ? errorMessage : helperText}
            </div>
          )}
          
          {/* Character counter */}
          {showCounter && maxLength && (
            <div className="form-field__counter">
              <span className={characterCount > maxLength ? 'form-field__counter--over-limit' : ''}>
                {characterCount}
              </span>
              <span className="form-field__counter-separator">/</span>
              <span>{maxLength}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
