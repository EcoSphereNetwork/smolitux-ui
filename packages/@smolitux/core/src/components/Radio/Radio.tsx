import React, { forwardRef } from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Text-Label */
  label?: string;
  /** Hilfetexzt */
  helperText?: string;
  /** Fehlermeldung */
  error?: string;
  /** Größe der Radio */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Radio-Komponente für Formulare
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  label,
  helperText,
  error,
  size = 'md',
  className = '',
  disabled = false,
  id,
  ...props
}, ref) => {
  // Generiere eine eindeutige ID, falls keine angegeben wurde
  const uniqueId = id || `radio-${Math.random().toString(36).substring(2, 9)}`;
  
  // Klassen für verschiedene Größen
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };
  
  // Klassen für verschiedene Label-Größen
  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  return (
    <div className={className}>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            id={uniqueId}
            type="radio"
            disabled={disabled}
            className={`
              ${sizeClasses[size]}
              border-gray-300 dark:border-gray-600
              text-primary-600 dark:text-primary-500
              focus:ring-primary-500 dark:focus:ring-primary-400
              ${error ? 'border-red-500 dark:border-red-400' : ''}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${uniqueId}-error` : 
              helperText ? `${uniqueId}-helper` : 
              undefined
            }
            {...props}
          />
        </div>
        {label && (
          <div className="ml-2 text-sm">
            <label 
              htmlFor={uniqueId} 
              className={`
                ${labelSizeClasses[size]}
                font-medium text-gray-700 dark:text-gray-300
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {label}
            </label>
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <div className="mt-1 ml-6 text-sm">
          {error ? (
            <p id={`${uniqueId}-error`} className="text-red-600 dark:text-red-400">
              {error}
            </p>
          ) : helperText ? (
            <p id={`${uniqueId}-helper`} className="text-gray-500 dark:text-gray-400">
              {helperText}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
});

Radio.displayName = 'Radio';

export default Radio;
