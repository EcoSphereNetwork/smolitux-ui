// packages/@smolitux/core/src/components/Accordion/AccordionItem.tsx
import React, { useRef, useState, useEffect } from 'react';
import { useAccordionContext } from './Accordion';

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Titel des Panels */
  title: React.ReactNode;
  /** Eindeutige ID des Panels */
  id: string;
  /** Icon vor dem Titel */
  icon?: React.ReactNode;
  /** Deaktiviert das Panel */
  disabled?: boolean;
  /** Inhalt des Panels */
  children: React.ReactNode;
}

/**
 * AccordionItem-Komponente für Accordion
 * 
 * @example
 * ```tsx
 * <AccordionItem id="section1" title="Abschnitt 1">
 *   Inhalt von Abschnitt 1...
 * </AccordionItem>
 * ```
 */
export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  id,
  icon,
  disabled = false,
  children,
  className = '',
  ...rest
}) => {
  const { openItems, toggleItem, variant, iconStyle } = useAccordionContext();
  const isOpen = openItems.includes(id);
  
  // Refs für Animationen
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);
  
  // Content-Höhe anpassen wenn isOpen sich ändert oder der Inhalt sich ändert
  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        // Wenn geöffnet, messen wir die tatsächliche Höhe
        setContentHeight(contentRef.current.scrollHeight);
      } else {
        // Wenn geschlossen, setzen wir auf 0
        setContentHeight(0);
      }
    }
  }, [isOpen, children]);
  
  // Icon basierend auf dem Stil und Zustand
  const renderIcon = () => {
    if (iconStyle === 'none') return null;
    
    const iconClasses = `transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`;
    
    switch (iconStyle) {
      case 'arrow':
        return (
          <svg className={`w-5 h-5 ${iconClasses}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        );
      case 'plus':
        return (
          <svg className={`w-5 h-5 ${isOpen ? 'transform rotate-45' : ''} transition-transform duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
      case 'chevron':
      default:
        return (
          <svg className={`w-5 h-5 ${iconClasses}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        );
    }
  };
  
  // Varianten-spezifische Klassen
  const variantClasses = {
    default: 'border-b border-gray-200 dark:border-gray-700 last:border-b-0',
    bordered: 'border-b border-gray-200 dark:border-gray-700 last:border-b-0',
    separated: 'border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden'
  };
  
  return (
    <div 
      className={`${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => !disabled && toggleItem(id)}
        className={`
          flex items-center justify-between w-full p-4 text-left
          ${isOpen ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'}
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50'}
          transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500
        `}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
      >
        <div className="flex items-center">
          {/* Optional Icon vor dem Titel */}
          {icon && <span className="mr-3">{icon}</span>}
          
          {/* Titel */}
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        </div>
        
        {/* Toggle-Icon */}
        <div className="ml-6 flex items-center">
          {renderIcon()}
        </div>
      </button>
      
      {/* Content mit Animation */}
      <div
        id={`accordion-content-${id}`}
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ 
          maxHeight: contentHeight !== undefined ? `${contentHeight}px` : undefined,
          display: isOpen ? 'block' : 'none'
        }}
        aria-hidden={!isOpen}
      >
        <div className="p-4 bg-white dark:bg-gray-800">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
