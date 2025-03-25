// packages/@smolitux/core/src/components/Button/Button.tsx
import React from 'react';
import { useTheme } from '@smolitux/theme';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visuelle Variante des Buttons */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  /** Größe des Buttons */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Button auf volle Breite */
  fullWidth?: boolean;
  /** Icon vor dem Text */
  leftIcon?: React.ReactNode;
  /** Icon nach dem Text */
  rightIcon?: React.ReactNode;
  /** Loading-Zustand */
  loading?: boolean;
}

/**
 * Button-Komponente für Benutzerinteraktionen
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  loading = false,
  disabled,
  className = '',
  ...props
}) => {
  const { themeMode } = useTheme();
  
  // Varianten-spezifische Klassen
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white',
    outline: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
    link: 'text-primary-600 dark:text-primary-400 underline hover:text-primary-700 dark:hover:text-primary-300 p-0'
  };
  
  // Größen-spezifische Klassen
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  // Allgemeine Button-Klassen
  const buttonClasses = [
    'font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
    'transition duration-150 ease-in-out',
    'inline-flex items-center justify-center',
    disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    fullWidth ? 'w-full' : '',
    variantClasses[variant],
    variant !== 'link' ? sizeClasses[size] : '',
    className
  ].join(' ');
  
  return (
    <button 
      disabled={disabled || loading} 
      className={buttonClasses}
      {...props}
    >
      {loading ? (
        <>
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

// packages/@smolitux/core/src/components/Card/Card.tsx
import React, { ReactNode } from 'react';

export interface CardProps {
  /** Karteninhalt */
  children: ReactNode;
  /** Titel der Karte */
  title?: string;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Footer-Inhalt */
  footer?: ReactNode;
  /** Kein Padding im Inhaltsbereich */
  noPadding?: boolean;
  /** Hover-Effekt aktivieren */
  hoverable?: boolean;
  /** Rand anzeigen */
  bordered?: boolean;
  /** Header-Aktion (z.B. Button oder Icon) */
  headerAction?: ReactNode;
}

/**
 * Card-Komponente für abgegrenzte Inhalte
 */
export const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  footer,
  noPadding = false,
  hoverable = false,
  bordered = true,
  headerAction
}) => {
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 
        shadow rounded-lg 
        ${bordered ? 'border border-gray-200 dark:border-gray-700' : ''} 
        ${hoverable ? 'transition-shadow duration-200 hover:shadow-md' : ''} 
        ${className}
      `}
    >
      {title && (
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
          {headerAction && (
            <div>{headerAction}</div>
          )}
        </div>
      )}
      
      <div className={noPadding ? '' : 'p-4'}>
        {children}
      </div>
      
      {footer && (
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
          {footer}
        </div>
      )}
    </div>
  );
};

// packages/@smolitux/core/src/components/Input/Input.tsx
import React, { forwardRef } from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Text-Label */
  label?: string;
  /** Hilfetexzt */
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

Select.displayName = 'Select'; ? `${uniqueId}-error` : undefined}
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

// packages/@smolitux/core/src/components/Select/Select.tsx
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
          aria-describedby={error
