// packages/@smolitux/core/src/components/Dialog/Dialog.tsx
import React, { useEffect, useRef } from 'react';
import { Button } from '../Button/Button';

export interface DialogProps {
  /** Ist der Dialog geöffnet? */
  isOpen: boolean;
  /** Callback zum Schließen des Dialogs */
  onClose: () => void;
  /** Titel des Dialogs */
  title?: React.ReactNode;
  /** Inhalt des Dialogs */
  children: React.ReactNode;
  /** Text für den Bestätigen-Button */
  confirmLabel?: string;
  /** Text für den Abbrechen-Button */
  cancelLabel?: string;
  /** Callback beim Klick auf Bestätigen */
  onConfirm?: () => void;
  /** Callback beim Klick auf Abbrechen */
  onCancel?: () => void;
  /** Variante des Dialogs */
  variant?: 'info' | 'success' | 'warning' | 'error' | 'confirm';
  /** Benutzerdefinierte Buttons im Footer */
  footerButtons?: React.ReactNode;
  /** Größe des Dialogs */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Icon des Dialogs */
  icon?: React.ReactNode;
  /** Schließen bei Klick auf Overlay */
  closeOnOverlayClick?: boolean;
  /** Schließen bei ESC-Taste */
  closeOnEsc?: boolean;
  /** Fokus auf den Dialog setzen */
  initialFocus?: boolean;
  /** Animation beim Öffnen/Schließen */
  animated?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Z-Index-Wert */
  zIndex?: number;
  /** Beschreibung für Screenreader */
  description?: string;
  /** ID für den Dialog */
  id?: string;
  /** Ob der Dialog ein Alert-Dialog ist */
  isAlertDialog?: boolean;
  /** Ob der Dialog beim Schließen den vorherigen Fokus wiederherstellen soll */
  returnFocus?: boolean;
  /** Ob der Dialog blockierend sein soll (kein Klick außerhalb möglich) */
  blocking?: boolean;
  /** Ob der Dialog eine bestimmte Aktion erfordert */
  requiresAction?: boolean;
  /** Ob der Bestätigen-Button deaktiviert sein soll */
  confirmDisabled?: boolean;
  /** Ob der Bestätigen-Button im Ladezustand sein soll */
  confirmLoading?: boolean;
  /** Ob der Dialog eine Rolle als Vollbild-Dialog haben soll */
  isFullscreenDialog?: boolean;
  /** Benutzerdefinierte Breite des Dialogs */
  width?: string;
  /** Benutzerdefinierte Höhe des Dialogs */
  height?: string;
}

/**
 * Dialog-Komponente für Interaktionen und Bestätigungen
 *
 * @example
 * ```tsx
 * <Dialog
 *   isOpen={isDialogOpen}
 *   onClose={() => setDialogOpen(false)}
 *   title="Bestätigung"
 *   onConfirm={() => handleConfirm()}
 * >
 *   Möchten Sie diese Aktion wirklich durchführen?
 * </Dialog>
 * ```
 */
export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  confirmLabel = 'Bestätigen',
  cancelLabel = 'Abbrechen',
  onConfirm,
  onCancel,
  variant = 'info',
  footerButtons,
  size = 'md',
  icon,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  initialFocus = true,
  animated = true,
  className = '',
  zIndex = 50,
  description,
  id,
  isAlertDialog = false,
  returnFocus = true,
  blocking = false,
  requiresAction = false,
  confirmDisabled = false,
  confirmLoading = false,
  isFullscreenDialog = false,
  width,
  height,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Speichern des vorherigen Fokus
  useEffect(() => {
    if (isOpen && returnFocus) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }

    return () => {
      if (
        returnFocus &&
        previousFocusRef.current &&
        typeof previousFocusRef.current.focus === 'function'
      ) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, returnFocus]);

  // Schließen mit Escape-Taste
  useEffect(() => {
    if (!closeOnEsc || blocking || requiresAction) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEsc, blocking, requiresAction]);

  // Verhindern des Body-Scrollings
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

  // Fokus auf Dialog oder Confirm-Button
  useEffect(() => {
    if (isOpen && initialFocus) {
      // Verzögerung für Animation
      const timer = setTimeout(() => {
        if (confirmButtonRef.current && !confirmDisabled) {
          confirmButtonRef.current.focus();
        } else if (dialogRef.current) {
          dialogRef.current.focus();
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isOpen, initialFocus, confirmDisabled]);

  // Tab-Fokus innerhalb des Dialogs halten
  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = Array.from(
          dialogRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ) as HTMLElement[];

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  // Cancel-Handler
  const handleCancel = () => {
    if (requiresAction || blocking) {
      return;
    }

    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  // Confirm-Handler
  const handleConfirm = () => {
    if (confirmDisabled) {
      return;
    }

    if (onConfirm) {
      onConfirm();
    }

    if (!confirmLoading) {
      onClose();
    }
  };

  // Wenn nicht offen, nicht rendern
  if (!isOpen) {
    return null;
  }

  // Größenklassen für den Dialog
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full m-5',
  };

  // Varianten-Icon und -Farbe
  const getVariantProps = () => {
    switch (variant) {
      case 'success':
        return {
          iconColor: 'text-green-500 dark:text-green-400',
          icon: icon || (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        };
      case 'error':
        return {
          iconColor: 'text-red-500 dark:text-red-400',
          icon: icon || (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        };
      case 'warning':
        return {
          iconColor: 'text-yellow-500 dark:text-yellow-400',
          icon: icon || (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        };
      case 'confirm':
        return {
          iconColor: 'text-blue-500 dark:text-blue-400',
          icon: icon || (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        };
      case 'info':
      default:
        return {
          iconColor: 'text-blue-500 dark:text-blue-400',
          icon: icon || (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        };
    }
  };

  const { iconColor, icon: variantIcon } = getVariantProps();

  // Generiere IDs für Barrierefreiheit
  const dialogId = id || `dialog-${Math.random().toString(36).substr(2, 9)}`;
  const titleId = `${dialogId}-title`;
  const descriptionId = description ? `${dialogId}-description` : undefined;
  const bodyId = `${dialogId}-body`;

  return (
    <div
      className={`fixed inset-0 z-${zIndex} overflow-y-auto`}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : bodyId}
      role={isAlertDialog ? 'alertdialog' : 'dialog'}
      aria-modal="true"
      id={dialogId}
    >
      {/* Overlay */}
      <div
        data-testid="dialog-overlay"
        className={`fixed inset-0 bg-black bg-opacity-50 ${animated ? 'transition-opacity duration-300 ease-out' : ''}`}
        onClick={closeOnOverlayClick && !blocking && !requiresAction ? handleCancel : undefined}
        aria-hidden="true"
      />

      {/* Dialog Positioning */}
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Dialog Panel */}
        <div
          ref={dialogRef}
          className={`
            relative bg-white dark:bg-gray-800 
            rounded-lg shadow-xl text-left 
            overflow-hidden 
            w-full
            ${sizeClasses[size]}
            ${animated ? 'transform transition-all duration-300 ease-out' : ''}
            ${isFullscreenDialog ? 'h-full m-0 max-w-full' : ''}
            ${className}
          `}
          tabIndex={-1}
          style={{
            ...(width ? { width } : {}),
            ...(height ? { height } : {}),
          }}
        >
          {/* Dialog Header */}
          {title && (
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
              {variantIcon && (
                <div className={`mr-3 flex-shrink-0 ${iconColor}`}>{variantIcon}</div>
              )}
              <h3 id={titleId} className="text-lg font-medium text-gray-900 dark:text-white">
                {title}
              </h3>
              {!requiresAction && !blocking && (
                <button
                  type="button"
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  onClick={handleCancel}
                  aria-label="Schließen"
                  disabled={requiresAction || blocking}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Dialog Content */}
          <div id={bodyId} className="p-6">
            {description && (
              <div id={descriptionId} className="sr-only">
                {description}
              </div>
            )}
            {variantIcon && !title && (
              <div className={`mb-4 flex-shrink-0 ${iconColor} flex justify-center`}>
                {variantIcon}
              </div>
            )}
            <div className="text-gray-700 dark:text-gray-300">{children}</div>
          </div>

          {/* Dialog Footer */}
          <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex flex-shrink-0 flex-wrap justify-end gap-2">
            {footerButtons ? (
              footerButtons
            ) : (
              <>
                {!requiresAction && (
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={blocking || requiresAction}
                  >
                    {cancelLabel}
                  </Button>
                )}
                <Button
                  ref={confirmButtonRef}
                  variant="primary"
                  onClick={handleConfirm}
                  disabled={confirmDisabled}
                  isLoading={confirmLoading}
                >
                  {confirmLabel}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
