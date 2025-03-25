import React from 'react';

export interface BadgeProps {
  /** Anzeigetext */
  children: React.ReactNode;
  /** Variante der Badge */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  /** Größe der Badge */
  size?: 'sm' | 'md' | 'lg'; 
  /** Abgerundeter Stil */
  rounded?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Optional Icon */
  icon?: React.ReactNode;
}

/**
 * Badge-Komponente zum Anzeigen von Status oder Kennzeichnungen
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  className = '',
  icon
}) => {
  // Varianten-spezifische Klassen
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
    success: 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300',
    warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300',
    error: 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300',
    info: 'bg-info-100 text-info-800 dark:bg-info-900/30 dark:text-info-300'
  };

  // Größen-spezifische Klassen
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2.5 py-0.5',
    lg: 'text-sm px-3 py-1'
  };

  // Form-Klassen
  const roundedClass = rounded ? 'rounded-full' : 'rounded-md';

  // Kombinierte Klassen
  const badgeClasses = [
    'inline-flex items-center font-medium',
    variantClasses[variant],
    sizeClasses[size],
    roundedClass,
    className
  ].join(' ');

  return (
    <span className={badgeClasses}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
