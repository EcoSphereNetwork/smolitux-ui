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

export default Card;
