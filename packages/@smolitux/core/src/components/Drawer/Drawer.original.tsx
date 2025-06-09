// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
// packages/@smolitux/core/src/components/Drawer/Drawer.tsx
import React, { useEffect, useRef, useCallback, useState } from 'react';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
  /** Ist der Drawer sichtbar? */
  isOpen: boolean;
  /** Callback zum Schließen des Drawers */
  onClose: () => void;
  /** Position des Drawers */
  placement?: DrawerPlacement;
  /** Breite des Drawers (für left/right) */
  width?: string | number;
  /** Höhe des Drawers (für top/bottom) */
  height?: string | number;
  /** Titel des Drawers */
  title?: React.ReactNode;
  /** Footer-Inhalt */
  footer?: React.ReactNode;
  /** Inhalt des Drawers */
  children: React.ReactNode;
  /** Beim Klick auf Overlay schließen */
  closeOnOverlayClick?: boolean;
  /** Header-Anzeige */
  showHeader?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Z-Index-Wert */
  zIndex?: number;
  /** ID für den Drawer */
  id?: string;
  /** ARIA-Label für den Drawer (falls kein Titel vorhanden) */
  ariaLabel?: string;
  /** ARIA-Beschreibung für den Drawer */
  ariaDescription?: string;
  /** ID des Elements, das den Fokus erhält, wenn der Drawer geschlossen wird */
  returnFocusToId?: string;
  /** Element, das den Fokus erhält, wenn der Drawer geschlossen wird */
  returnFocusToElement?: HTMLElement;
  /** Ob der Drawer initial den Fokus erhalten soll */
  initialFocus?: boolean;
  /** Ob der Drawer automatisch geschlossen werden soll, wenn der Benutzer außerhalb klickt */
  autoFocus?: boolean;
}

/**
 * Drawer-Komponente für Seitennavigationen und Panels
 *
 * @example
 * ```tsx
 * <Drawer
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Seitenmenü"
 *   ariaDescription="Navigation mit Hauptmenüpunkten"
 * >
 *   <p>Drawer-Inhalt</p>
 * </Drawer>
 * ```
 */
export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  placement = 'right',
  width = 320,
  height = 320,
  title,
  footer,
  children,
  closeOnOverlayClick = true,
  showHeader = true,
  className = '',
  zIndex = 50,
  id,
  ariaLabel,
  ariaDescription,
  returnFocusToId,
  returnFocusToElement,
  initialFocus = true,
  autoFocus = true,
}) => {
  // Generiere eine eindeutige ID für den Drawer
  const uniqueId = id || `drawer-${Math.random().toString(36).substring(2, 11)}`;
  const titleId = `${uniqueId}-title`;
  const descriptionId = `${uniqueId}-description`;

  // Refs für DOM-Elemente
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);
  const lastFocusableRef = useRef<HTMLElement | null>(null);

  // Speichere das Element, das vor dem Öffnen des Drawers den Fokus hatte
  const [previouslyFocusedElement, setPreviouslyFocusedElement] = useState<HTMLElement | null>(
    null
  );

  // Funktion zum Finden aller fokussierbaren Elemente im Drawer
  const getFocusableElements = useCallback(() => {
    if (!drawerRef.current) return [];

    return Array.from(
      drawerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled') && el.getAttribute('tabindex') !== '-1');
  }, []);

  // Funktion zum Setzen des initialen Fokus
  const setInitialFocus = useCallback(() => {
    if (!isOpen || !drawerRef.current || !initialFocus) return;

    const focusableElements = getFocusableElements();

    if (focusableElements.length > 0) {
      // Speichere das erste und letzte fokussierbare Element für die Focus-Trap
      firstFocusableRef.current = focusableElements[0];
      lastFocusableRef.current = focusableElements[focusableElements.length - 1];

      // Setze den Fokus auf den Schließen-Button, wenn vorhanden, sonst auf das erste fokussierbare Element
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      } else if (firstFocusableRef.current) {
        firstFocusableRef.current.focus();
      } else {
        // Wenn keine fokussierbaren Elemente vorhanden sind, setze den Fokus auf den Drawer selbst
        drawerRef.current.focus();
      }
    } else {
      // Wenn keine fokussierbaren Elemente vorhanden sind, setze den Fokus auf den Drawer selbst
      drawerRef.current.focus();
    }
  }, [isOpen, getFocusableElements, initialFocus]);

  // ESC-Taste zum Schließen und Focus-Trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      // ESC-Taste zum Schließen
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Tab-Taste für Focus-Trap
      if (e.key === 'Tab') {
        if (!firstFocusableRef.current || !lastFocusableRef.current) return;

        // Shift+Tab: Wenn der Fokus auf dem ersten Element ist, gehe zum letzten Element
        if (e.shiftKey && document.activeElement === firstFocusableRef.current) {
          e.preventDefault();
          lastFocusableRef.current.focus();
        }
        // Tab: Wenn der Fokus auf dem letzten Element ist, gehe zum ersten Element
        else if (!e.shiftKey && document.activeElement === lastFocusableRef.current) {
          e.preventDefault();
          firstFocusableRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Scroll des Body verhindern, wenn Drawer offen
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Speichere das Element, das vor dem Öffnen des Drawers den Fokus hatte
  useEffect(() => {
    if (isOpen) {
      setPreviouslyFocusedElement(document.activeElement as HTMLElement);
    }
  }, [isOpen]);

  // Setze den Fokus zurück, wenn der Drawer geschlossen wird
  useEffect(() => {
    if (!isOpen && previouslyFocusedElement) {
      // Wenn eine ID oder ein Element zum Zurücksetzen des Fokus angegeben wurde, verwende dieses
      if (returnFocusToId) {
        const element = document.getElementById(returnFocusToId);
        if (element) {
          element.focus();
          return;
        }
      }

      if (returnFocusToElement) {
        returnFocusToElement.focus();
        return;
      }

      // Sonst setze den Fokus auf das Element, das vorher den Fokus hatte
      previouslyFocusedElement.focus();
    }
  }, [isOpen, previouslyFocusedElement, returnFocusToId, returnFocusToElement]);

  // Setze den initialen Fokus, wenn der Drawer geöffnet wird
  useEffect(() => {
    if (isOpen) {
      // Warte einen Moment, bis der Drawer vollständig gerendert ist
      const timeoutId = setTimeout(() => {
        setInitialFocus();
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, setInitialFocus]);

  // Wenn nicht offen, nicht rendern
  if (!isOpen) return null;

  // Positionierungs-Styles
  const getPositionStyles = () => {
    const commonStyles = {
      position: 'fixed',
      zIndex: zIndex + 1,
      transition: 'all 0.3s ease-in-out',
    } as React.CSSProperties;

    switch (placement) {
      case 'left':
        return {
          ...commonStyles,
          left: 0,
          top: 0,
          bottom: 0,
          width: typeof width === 'number' ? `${width}px` : width,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          className: 'left-0',
        };
      case 'right':
        return {
          ...commonStyles,
          right: 0,
          top: 0,
          bottom: 0,
          width: typeof width === 'number' ? `${width}px` : width,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          className: 'right-0',
        };
      case 'top':
        return {
          ...commonStyles,
          top: 0,
          left: 0,
          right: 0,
          height: typeof height === 'number' ? `${height}px` : height,
          transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
          className: 'top-0',
        };
      case 'bottom':
        return {
          ...commonStyles,
          bottom: 0,
          left: 0,
          right: 0,
          height: typeof height === 'number' ? `${height}px` : height,
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          className: 'bottom-0',
        };
      default:
        return commonStyles;
    }
  };

  // Horizontaler oder vertikaler Drawer?
  const isHorizontal = placement === 'left' || placement === 'right';

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        style={{ zIndex }}
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
        data-testid="drawer-overlay"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        id={uniqueId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={!title ? ariaLabel || 'Drawer' : undefined}
        aria-describedby={ariaDescription ? descriptionId : undefined}
        className={`
          bg-white dark:bg-gray-800 shadow-xl flex flex-col
          ${isHorizontal ? 'h-full' : 'w-full'}
          ${className}
          ${(getPositionStyles() as any).className || ''}
        `}
        style={getPositionStyles()}
        tabIndex={-1} // Ermöglicht Fokussierung, aber nicht in der Tab-Reihenfolge
      >
        {/* Screenreader-Beschreibung */}
        {ariaDescription && (
          <div id={descriptionId} className="sr-only">
            {ariaDescription}
          </div>
        )}

        {/* Header */}
        {showHeader && (
          <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center">
            <h2 id={titleId} className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={onClose}
              aria-label="Schließen"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">{footer}</div>
        )}
      </div>
    </>
  );
};

export default Drawer;
