import React, { ReactNode } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
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
  /** Variante der Karte */
  variant?: 'elevated' | 'outlined' | 'flat';
  /** Padding-Größe */
  padding?: 'none' | 'small' | 'medium' | 'large';
  /** Randradius */
  borderRadius?: 'none' | 'small' | 'medium' | 'large';
  /** Benutzerdefinierte Breite */
  width?: string;
  /** Benutzerdefinierte Höhe */
  height?: string;
  /** Benutzerdefinierte Hintergrundfarbe */
  backgroundColor?: string;
  /** Benutzerdefinierte Randfarbe */
  borderColor?: string;
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
  headerAction,
  variant = 'flat',
  padding = 'medium',
  borderRadius = 'medium',
  width,
  height,
  backgroundColor,
  borderColor,
  ...rest
}) => {
  // Varianten-Klassen
  const variantClasses = {
    elevated: 'shadow-md',
    outlined: 'border border-gray-200 dark:border-gray-700',
    flat: ''
  };

  // Padding-Klassen
  const paddingClasses = {
    none: 'p-0',
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6'
  };

  // Border-Radius-Klassen
  const borderRadiusClasses = {
    none: 'rounded-none',
    small: 'rounded-sm',
    medium: 'rounded-lg',
    large: 'rounded-xl'
  };

  return (
    <div 
      className={`
        ${backgroundColor || 'bg-white dark:bg-gray-800'} 
        shadow ${borderRadiusClasses[borderRadius]} 
        ${bordered ? borderColor || 'border border-gray-200 dark:border-gray-700' : ''} 
        ${hoverable ? 'transition-shadow duration-200 hover:shadow-lg' : ''} 
        ${variantClasses[variant]}
        ${noPadding ? '' : paddingClasses[padding]}
        ${className}
      `}
      style={{
        width: width,
        height: height
      }}
      {...rest}
      data-testid="card"
    >
      {title && (
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-4 py-3" data-testid="card-header">
          <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
          {headerAction && (
            <div>{headerAction}</div>
          )}
        </div>
      )}
      
      <div data-testid="card-content">
        {children}
      </div>
      
      {footer && (
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3" data-testid="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
