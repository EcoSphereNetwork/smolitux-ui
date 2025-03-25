import React, { forwardRef } from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Text-Label */
  label?: string;
  /** Hilfetext */
  helperText?: string;
  /** Fehlermeldung */
  error?: string;
  /** Links ausgerichtetes Icon */
  leftIcon?: React.ReactNode;
  /** Rechts ausgerichtetes Icon */
  rightIcon?: React.ReactNode;
  /** Größe des Inputs */
  size?: 'sm' | 'md' | 'lg';
  /** Visuelle Variante */
  variant?: 'outline' | 'filled' | 'unstyled';
  /** Volle Breite */
  fullWidth?: boolean;
}

/**
 * Input-Komponente für Textfelder
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  size = 'md',
  variant = 'outline',
  fullWidth = false,
  className = '',
  disabled = false,
  id,
  ...props
}, ref) => {
  // Generiere eine eindeutige ID, falls keine angegeben wurde
  const uniqueId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  // Klassen für verschiedene Größen
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg'
  };
  
  // Klassen für verschiedene Varianten
  const variantClasses = {
    outline: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700',
    filled: 'border-0 bg-gray-100 dark:bg-gray-800',
    unstyled: 'border-0 bg-transparent px-0 py-0'
  };
  
  // Zustandsabhängige Klassen
  const stateClasses = error
    ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500'
    : 'focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400';
  
  // Zusätzlicher Padding für Icons
  const iconPadding = leftIcon ? 'pl-10' : '';
  
  // Basis-Klassen für den Input
  const inputClasses = [
    'block rounded-md focus:outline-none focus:ring-2',
    'transition duration-150 ease-in-out',
    'appearance-none',
    'w-full',
    'text-gray-900 dark:text-white',
    'placeholder-gray-400 dark:placeholder-gray-500',
    sizeClasses[size],
    variantClasses[variant],
    stateClasses,
    iconPadding,
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    className
  ].join(' ');
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={uniqueId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          id={uniqueId}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${uniqueId}-error` : undefined}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <div className="mt-1 text-sm">
          {error ? (
            <p id={`${uniqueId}-error`} className="text-red-600 dark:text-red-400">
              {error}
            </p>
          ) : helperText ? (
            <p className="text-gray-500 dark:text-gray-400">
              {helperText}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
