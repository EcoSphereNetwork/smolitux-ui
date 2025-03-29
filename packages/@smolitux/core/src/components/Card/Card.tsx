import React, { ReactNode } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Karteninhalt */
  children: ReactNode;
  /** Titel der Karte */
  title?: string;
  /** Untertitel der Karte */
  subtitle?: string;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Footer-Inhalt */
  footer?: ReactNode;
  /** Header-Inhalt */
  header?: ReactNode;
  /** Bild-Inhalt */
  image?: ReactNode;
  /** Kein Padding im Inhaltsbereich */
  noPadding?: boolean;
  /** Hover-Effekt aktivieren */
  hoverable?: boolean;
  /** Rand anzeigen */
  bordered?: boolean;
  /** Header-Aktion (z.B. Button oder Icon) */
  headerAction?: ReactNode;
  /** Variante der Karte */
  variant?: 'elevated' | 'outlined' | 'flat' | 'default';
  /** Padding-Größe */
  padding?: 'none' | 'small' | 'medium' | 'large' | string;
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
  /** Größe der Karte */
  size?: 'sm' | 'md' | 'lg';
  /** Schatten anzeigen */
  shadow?: boolean;
  /** Abgerundete Ecken */
  rounded?: boolean;
  /** Hintergrundfarbe (für Tests) */
  bgColor?: string;
}

/**
 * Card-Komponente für abgegrenzte Inhalte
 */
export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  className = '',
  footer,
  header,
  image,
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
  size,
  shadow = false,
  rounded = false,
  bgColor,
  ...rest
}) => {
  // Varianten-Klassen
  const variantClasses = {
    elevated: 'shadow-md',
    outlined: 'border border-gray-200 dark:border-gray-700',
    flat: '',
    default: ''
  };

  // Padding-Klassen
  const paddingClasses = {
    none: 'p-0',
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6'
  };
  
  // Größen-Klassen
  const sizeClasses = {
    sm: 'card-sm',
    md: 'card-md',
    lg: 'card-lg'
  };

  // Border-Radius-Klassen
  const borderRadiusClasses = {
    none: 'rounded-none',
    small: 'rounded-sm',
    medium: 'rounded-lg',
    large: 'rounded-xl'
  };

  // Generiere eine eindeutige ID für ARIA-Attribute
  const cardId = `card-${Math.random().toString(36).substr(2, 9)}`;
  const headerId = `${cardId}-header`;
  const contentId = `${cardId}-content`;
  const footerId = `${cardId}-footer`;
  
  // Bestimme die richtige ARIA-Rolle
  const getAriaRole = () => {
    // Wenn die Karte klickbar ist (z.B. durch einen onClick-Handler), sollte sie als Button fungieren
    if (rest.onClick) {
      return 'button';
    }
    
    // Standardmäßig verwenden wir 'region', um einen abgegrenzten Bereich zu kennzeichnen
    return 'region';
  };
  
  // Bestimme, ob die Karte fokussierbar sein sollte
  const shouldBeFocusable = () => {
    return !!rest.onClick;
  };
  
  // Bestimme den Padding-Wert
  const paddingValue = typeof padding === 'string' && !['none', 'small', 'medium', 'large'].includes(padding) 
    ? '' // Wenn es ein benutzerdefinierter String ist, verwenden wir ihn als Style
    : paddingClasses[padding as 'none' | 'small' | 'medium' | 'large'];

  return (
    <div 
      className={`
        card
        card-${variant}
        ${backgroundColor || bgColor || 'bg-white dark:bg-gray-800'} 
        ${shadow ? 'card-shadow shadow-lg' : 'shadow'} ${borderRadiusClasses[borderRadius]} 
        ${bordered ? 'card-bordered ' + (borderColor || 'border border-gray-200 dark:border-gray-700') : ''} 
        ${hoverable ? 'card-hoverable transition-shadow duration-200 hover:shadow-lg' : ''} 
        ${rest.onClick ? 'card-clickable cursor-pointer' : ''}
        ${variant === 'default' ? 'card-default' : ''}
        ${variant === 'outlined' ? 'card-outlined' : ''}
        ${variant === 'elevated' ? 'card-elevated' : ''}
        ${size ? sizeClasses[size] : ''}
        ${rounded ? 'card-rounded' : ''}
        ${noPadding ? '' : paddingValue}
        ${className}
      `}
      style={{
        width: width,
        height: height,
        ...(typeof padding === 'string' && !['none', 'small', 'medium', 'large'].includes(padding) ? { padding } : {}),
        ...(bgColor ? { backgroundColor: bgColor } : {})
      }}
      id={cardId}
      role={getAriaRole()}
      aria-labelledby={title ? headerId : undefined}
      tabIndex={shouldBeFocusable() ? 0 : undefined}
      data-testid="card"
      data-variant={variant}
      data-hoverable={hoverable ? 'true' : undefined}
      {...rest}
    >
      {header ? (
        <div 
          className="card-header flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-4 py-3" 
          data-testid="card-header"
          id={headerId}
        >
          {header}
        </div>
      ) : title && (
        <div 
          className="card-header flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-4 py-3" 
          data-testid="card-header"
          id={headerId}
        >
          <div>
            <h3 className="card-title font-medium text-gray-900 dark:text-white">{title}</h3>
            {subtitle && <p className="card-subtitle text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>}
          </div>
          {headerAction && (
            <div>{headerAction}</div>
          )}
        </div>
      )}
      
      {image && (
        <div className="card-image" data-testid="card-image">
          {image}
        </div>
      )}
      
      <div 
        data-testid="card-content"
        id={contentId}
        className={noPadding ? '' : paddingClasses[padding]}
      >
        {children}
      </div>
      
      {footer && (
        <div 
          className="card-footer border-t border-gray-200 dark:border-gray-700 px-4 py-3" 
          data-testid="card-footer"
          id={footerId}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
