// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
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
  /** Zusätzliche Beschreibung für Screenreader */
  description?: string;
  /** Benutzerdefinierte Klasse für den Header */
  headerClassName?: string;
  /** Benutzerdefinierte Klasse für den Content */
  contentClassName?: string;
  /** Callback beim Öffnen des Panels */
  onOpen?: () => void;
  /** Callback beim Schließen des Panels */
  onClose?: () => void;
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
  description,
  headerClassName = '',
  contentClassName = '',
  onOpen,
  onClose,
  ...rest
}) => {
  const {
    openItems,
    toggleItem,
    variant,
    iconStyle,
    id: accordionId,
    i18n,
  } = useAccordionContext();
  const isOpen = openItems.includes(id);
  const [liveText, setLiveText] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Refs für Animationen
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  // Content-Höhe anpassen wenn isOpen sich ändert oder der Inhalt sich ändert
  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        // Wenn geöffnet, messen wir die tatsächliche Höhe
        setContentHeight(contentRef.current.scrollHeight);

        // Callback beim Öffnen
        if (onOpen) {
          onOpen();
        }

        // Setze Live-Text für Screenreader
        setLiveText(i18n.expand);
      } else {
        // Wenn geschlossen, setzen wir auf 0
        setContentHeight(0);

        // Callback beim Schließen
        if (onClose) {
          onClose();
        }

        // Setze Live-Text für Screenreader
        setLiveText(i18n.collapse);
      }

      // Entferne den Live-Text nach einer kurzen Zeit
      const timer = setTimeout(() => {
        setLiveText(null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, children, onOpen, onClose, i18n]);

  // Icon basierend auf dem Stil und Zustand
  const renderIcon = () => {
    if (iconStyle === 'none') return null;

    const iconClasses = `transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`;

    switch (iconStyle) {
      case 'arrow':
        return (
          <svg
            className={`w-5 h-5 ${iconClasses}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        );
      case 'plus':
        return (
          <svg
            className={`w-5 h-5 ${isOpen ? 'transform rotate-45' : ''} transition-transform duration-300`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        );
      case 'chevron':
      default:
        return (
          <svg
            className={`w-5 h-5 ${iconClasses}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        );
    }
  };

  // Varianten-spezifische Klassen
  const variantClasses = {
    default: 'border-b border-gray-200 dark:border-gray-700 last:border-b-0',
    bordered: 'border-b border-gray-200 dark:border-gray-700 last:border-b-0',
    separated: 'border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden',
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`} {...rest}>
      {/* Header */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => !disabled && toggleItem(id)}
        className={`
          flex items-center justify-between w-full p-4 text-left
          ${isOpen ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'}
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50'}
          transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500
          ${headerClassName}
        `}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        id={`accordion-button-${id}`}
        aria-disabled={disabled}
      >
        <div className="flex items-center">
          {/* Optional Icon vor dem Titel */}
          {icon && (
            <span className="mr-3" aria-hidden="true">
              {icon}
            </span>
          )}

          {/* Titel */}
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</h3>
        </div>

        {/* Toggle-Icon */}
        <div className="ml-6 flex items-center">{renderIcon()}</div>
      </button>

      {/* Screenreader-Beschreibung */}
      {description && (
        <div id={`accordion-description-${id}`} className="sr-only">
          {description}
        </div>
      )}

      {/* Live-Region für Screenreader-Ankündigungen */}
      {liveText && (
        <div className="sr-only" aria-live="polite">
          {liveText}
        </div>
      )}

      {/* Content mit Animation */}
      <div
        id={`accordion-content-${id}`}
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? (contentHeight !== undefined ? `${contentHeight}px` : 'none') : '0',
          visibility: isOpen ? 'visible' : 'hidden',
        }}
        aria-hidden={!isOpen}
        aria-labelledby={`accordion-button-${id}`}
        role="region"
        tabIndex={isOpen ? 0 : -1}
        {...(description && { 'aria-describedby': `accordion-description-${id}` })}
      >
        {isOpen && (
          <div className={`p-4 bg-white dark:bg-gray-800 ${contentClassName}`}>{children}</div>
        )}
      </div>
    </div>
  );
};

export default AccordionItem;
