import React, { forwardRef } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Options für das Dropdown */
  options: SelectOption[];
  /** Text-Label */
  label?: string;
  /** Hilfetexzt */
  helperText?: string;
  /** Fehlermeldung */
  error?: string;
  /** Größe des Selects */
  size?: 'sm' | 'md' | 'lg';
  /** Volle Breite */
  fullWidth?: boolean;
  /** Links ausgerichtetes Icon */
  leftIcon?: React.ReactNode;
}

/**
 * Select-Komponente für Dropdown-Auswahl
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  options,
  label,
  helperText,
  error,
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false,
  id,
  leftIcon,
  ...props
}, ref) => {
  // Generiere eine eindeutige ID, falls keine angegeben wurde
  const uniqueId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
  
  // Klassen für verschiedene Größen
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg'
  };
  
  // Zustandsabhängige Klassen
  const stateClasses = error
    ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500'
    : 'focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400';
  
  // Zusätzlicher Padding für Icons
  const iconPadding = leftIcon ? 'pl-10' : '';
  
  // Basis-Klassen für den Select
  const selectClasses = [
    'block rounded-md focus:outline-none focus:ring-2',
    'transition duration-150 ease-in-out',
    'appearance-none',
    'w-full',
    'text-gray-900 dark:text-white',
    'bg-white dark:bg-gray-700',
    'border border-gray-300 dark:border-gray-600',
    'pr-8', // Platz für den Pfeil
    sizeClasses[size],
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
        
        <select
          ref={ref}
          id={uniqueId}
          disabled={disabled}
          className={selectClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${uniqueId}-error` : undefined}
          {...props}
        >
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value} 
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Dropdown-Pfeil */}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
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

Select.displayName = 'Select';

export default Select;
