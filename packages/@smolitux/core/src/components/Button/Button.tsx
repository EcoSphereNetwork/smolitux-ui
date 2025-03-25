import React, { memo, forwardRef } from 'react';
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
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * Button-Komponente für Benutzerinteraktionen
 * 
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>Klick mich</Button>
 * <Button variant="outline" size="sm" leftIcon={<Icon />}>Mit Icon</Button>
 * <Button loading disabled>Loading...</Button>
 * ```
 */
export const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  loading = false,
  disabled,
  className = '',
  onClick,
  type = 'button',
  ...props
}, ref) => {
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

  // Behandlung von Keyboard-Events für bessere Barrierefreiheit
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event as unknown as React.MouseEvent<HTMLButtonElement>);
    }
    props.onKeyDown?.(event);
  };
  
  return (
    <button 
      ref={ref}
      disabled={disabled || loading} 
      className={buttonClasses}
      onClick={onClick}
      type={type}
      role="button"
      aria-disabled={disabled || loading}
      aria-busy={loading}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {loading ? (
        <>
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2" aria-hidden="true">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2" aria-hidden="true">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}));

Button.displayName = 'Button';
