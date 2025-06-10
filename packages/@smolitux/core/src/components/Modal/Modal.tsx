// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import './animations.css';

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalPosition = 'center' | 'top' | 'right' | 'bottom' | 'left';
export type ModalAnimation =
  | 'fade'
  | 'scale'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'none';

export interface ModalProps {
  /** Ist der Modal sichtbar? */
  isOpen: boolean;
  /** Callback zum Schließen des Modals */
  onClose: () => void;
  /** Modal-Titel */
  title?: React.ReactNode;
  /** Modal-Inhalt */
  children: React.ReactNode;
  /** Footer-Inhalt (z.B. Aktions-Buttons) */
  footer?: React.ReactNode;
  /** Größe des Modals */
  size?: ModalSize;
  /** Position des Modals */
  position?: ModalPosition;
  /** Schließen bei Klick auf Overlay */
  closeOnOverlayClick?: boolean;
  /** Schließen bei Escape-Taste */
  closeOnEsc?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Zusätzliche CSS-Klassen für das Modal-Element selbst */
  contentClassName?: string;
  /** Zusätzliche CSS-Klassen für den Header */
  headerClassName?: string;
  /** Zusätzliche CSS-Klassen für den Body */
  bodyClassName?: string;
  /** Zusätzliche CSS-Klassen für den Footer */
  footerClassName?: string;
  /** Zusätzliche CSS-Klassen für das Overlay */
  overlayClassName?: string;
  /** ID für Barrierefreiheit */
  id?: string;
  /** Ob der Modal beim Öffnen animiert werden soll */
  animated?: boolean;
  /** Animation-Typ für den Modal */
  animation?: ModalAnimation;
  /** Ob der Modal einen Schließen-Button haben soll */
  showCloseButton?: boolean;
  /** Ob der Modal einen Schatten haben soll */
  shadow?: boolean;
  /** Ob der Modal abgerundete Ecken haben soll */
  rounded?: boolean;
  /** Ob der Modal einen Rahmen haben soll */
  bordered?: boolean;
  /** Ob der Modal beim Öffnen fokussiert werden soll */
  initialFocus?: boolean;
  /** Ob der Modal beim Schließen den vorherigen Fokus wiederherstellen soll */
  returnFocus?: boolean;
  /** Alias für returnFocus, entspricht restoreFocus in der Dokumentation */
  restoreFocus?: boolean;
  /** Ob der Modal ein Portal verwenden soll */
  usePortal?: boolean;
  /** Ob der Modal blockierend sein soll (kein Klick außerhalb möglich) */
  blocking?: boolean;
  /** Ob der Modal scrollbar sein soll */
  scrollable?: boolean;
  /** Ob der Modal zentriert sein soll */
  centered?: boolean;
  /** Ob der Modal statisch sein soll (kein Schließen bei Klick außerhalb) */
  static?: boolean;
  /** Ob der Modal beim Öffnen den Body-Scroll deaktivieren soll */
  disableBodyScroll?: boolean;
  /** Zusätzliche Attribute für das Modal-Element */
  modalProps?: React.HTMLAttributes<HTMLDivElement>;
  /** Zusätzliche Attribute für das Overlay-Element */
  overlayProps?: React.HTMLAttributes<HTMLDivElement>;
  /** Callback, wenn der Modal vollständig geöffnet ist */
  onOpen?: () => void;
  /** Callback, wenn der Modal vollständig geschlossen ist */
  onClosed?: () => void;
  /** Benutzerdefinierte Breite des Modals */
  width?: string;
  /** Benutzerdefinierte Höhe des Modals */
  height?: string;
  /** Ob Standard-Footer-Buttons angezeigt werden sollen */
  footerButtons?: boolean;
  /** Text für den Abbrechen-Button */
  cancelButtonText?: string;
  /** Text für den Bestätigen-Button */
  confirmButtonText?: string;
  /** Callback für den Abbrechen-Button */
  onCancel?: () => void;
  /** Callback für den Bestätigen-Button */
  onConfirm?: () => void;
  /** Benutzerdefinierter Header-Inhalt */
  header?: React.ReactNode;
  /** Beschreibung des Modals für Screenreader */
  description?: string;
  /** Ob der Modal eine Rolle als Alert-Dialog haben soll */
  isAlertDialog?: boolean;
  /** Ob der Modal eine Rolle als Vollbild-Dialog haben soll */
  isFullscreenDialog?: boolean;
  /** Lokalisierungsobjekt */
  i18n?: {
    /** Text für den Schließen-Button */
    close?: string;
    /** Text für den Abbrechen-Button */
    cancel?: string;
    /** Text für den Bestätigen-Button */
    confirm?: string;
    /** Text für Screenreader, wenn der Modal geöffnet wird */
    modalOpened?: string;
    /** Text für Screenreader, wenn der Modal geschlossen wird */
    modalClosed?: string;
  };
  /** Fokussiertes Element beim Öffnen des Modals (CSS-Selektor oder Ref) */
  initialFocusRef?: React.RefObject<HTMLElement> | string;
  /** Ob der Modal eine Rolle als Form-Dialog haben soll */
  isFormDialog?: boolean;
  /** Ob der Tab-Index des Modals angepasst werden soll */
  tabIndex?: number;
  /** Ob der Modal eine Rolle als Bestätigungs-Dialog haben soll */
  isConfirmationDialog?: boolean;
  /** Ob der Modal eine Rolle als Informations-Dialog haben soll */
  isInformationDialog?: boolean;
  /** Ob der Modal eine Rolle als Fehler-Dialog haben soll */
  isErrorDialog?: boolean;
  /** Ob der Modal eine Rolle als Erfolgs-Dialog haben soll */
  isSuccessDialog?: boolean;
  /** Ob der Modal eine Rolle als Warn-Dialog haben soll */
  isWarningDialog?: boolean;
  /** Ob der Modal eine Rolle als Hilfe-Dialog haben soll */
  isHelpDialog?: boolean;
  /** Ob der Modal eine Rolle als Status-Dialog haben soll */
  isStatusDialog?: boolean;
  /** Ob der Fokus automatisch auf den ersten interaktiven Element gesetzt werden soll */
  autoFocus?: boolean;
  /** Ob der Fokus-Trap aktiviert werden soll */
  trapFocus?: boolean;
}

/**
 * Modal-Komponente zum Anzeigen von Inhalten in einem Overlay
 *
 * @example
 * ```tsx
 * <Modal isOpen={isOpen} onClose={handleClose} title="Beispiel Modal">
 *   <p>Modal-Inhalt</p>
 * </Modal>
 *
 * <Modal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   title="Beispiel mit Footer"
 *   footer={
 *     <>
 *       <Button onClick={handleClose}>Abbrechen</Button>
 *       <Button variant="primary" onClick={handleSave}>Speichern</Button>
 *     </>
 *   }
 * >
 *   <p>Modal-Inhalt mit Footer</p>
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  position = 'center',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className = '',
  contentClassName = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  overlayClassName = '',
  id,
  animated = true,
  showCloseButton = true,
  shadow = true,
  rounded = true,
  bordered = true,
  initialFocus = true,
  returnFocus = true,
  restoreFocus,
  usePortal = true,
  blocking = false,
  scrollable = true,
  centered = true,
  static: isStatic = false,
  disableBodyScroll = true,
  modalProps = {},
  overlayProps = {},
  onOpen,
  onClosed,
  width,
  height,
  footerButtons = false,
  cancelButtonText = 'Cancel',
  confirmButtonText = 'Confirm',
  onCancel,
  onConfirm,
  header,
  description,
  isAlertDialog = false,
  isFullscreenDialog = false,
  i18n = {
    close: 'Schließen',
    cancel: 'Abbrechen',
    confirm: 'Bestätigen',
    modalOpened: 'Dialog geöffnet',
    modalClosed: 'Dialog geschlossen',
  },
  initialFocusRef,
  isFormDialog = false,
  tabIndex = -1,
  isConfirmationDialog = false,
  isInformationDialog = false,
  isErrorDialog = false,
  isSuccessDialog = false,
  isWarningDialog = false,
  isHelpDialog = false,
  isStatusDialog = false,
  animation = 'scale',
  trapFocus = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const shouldReturnFocus = restoreFocus ?? returnFocus;
  const [isAnimating, setIsAnimating] = useState(false);
  const [announcement, setAnnouncement] = useState<string | null>(null);
  const modalId = id || `modal-${Math.random().toString(36).substr(2, 9)}`;
  const titleId = `${modalId}-title`;
  const bodyId = `${modalId}-body`;
  const descriptionId = description ? `${modalId}-description` : undefined;

  // Bestimme die korrekte Dialog-Rolle
  const getDialogRole = () => {
    if (isAlertDialog) return 'alertdialog';
    if (isFormDialog) return 'form';
    if (
      isConfirmationDialog ||
      isInformationDialog ||
      isErrorDialog ||
      isSuccessDialog ||
      isWarningDialog ||
      isHelpDialog ||
      isStatusDialog
    ) {
      return 'alertdialog';
    }
    return 'dialog';
  };

  // Ankündigung für Screenreader
  const announceToScreenReader = (message: string) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(null), 1000);
  };

  // Speichern des vorherigen Fokus
  useEffect(() => {
    if (isOpen && shouldReturnFocus) {
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Ankündigung für Screenreader
      announceToScreenReader(i18n.modalOpened || 'Dialog geöffnet');
    }

    return () => {
      if (!isOpen) {
        // Ankündigung für Screenreader beim Schließen
        announceToScreenReader(i18n.modalClosed || 'Dialog geschlossen');
      }

      if (
        returnFocus &&
        previousFocusRef.current &&
        typeof previousFocusRef.current.focus === 'function'
      ) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, returnFocus, i18n]);

  // Schließen mit Escape-Taste
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && closeOnEsc && !isStatic) {
        onClose();
      }
    };

    if (closeOnEsc) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }

    return undefined;
  }, [isOpen, onClose, closeOnEsc, isStatic]);

  // Fokussierbare Elemente finden
  const getFocusableElements = useCallback(() => {
    if (!modalRef.current) return [];

    // Verbesserte Selektor-Liste für fokussierbare Elemente
    return Array.from(
      modalRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'
      )
    ) as HTMLElement[];
  }, []);

  // Focus Lock innerhalb des Modals
  useEffect(() => {
    if (isOpen && initialFocus) {
      // Verzögerung für Animation
      const focusDelay = animated ? 100 : 0;

      // Wenn eine spezifische Referenz für den initialen Fokus angegeben wurde
      if (initialFocusRef) {
        let elementToFocus: HTMLElement | null = null;

        if (typeof initialFocusRef === 'string') {
          // Wenn ein CSS-Selektor angegeben wurde
          elementToFocus = modalRef.current?.querySelector(initialFocusRef) as HTMLElement;
        } else if (initialFocusRef.current) {
          // Wenn eine React-Ref angegeben wurde
          elementToFocus = initialFocusRef.current;
        }

        if (elementToFocus) {
          setTimeout(() => {
            elementToFocus?.focus();
            // Stelle sicher, dass das Element tatsächlich fokussiert ist
            if (document.activeElement !== elementToFocus) {
              modalRef.current?.focus();
            }
          }, focusDelay);
          return;
        }
      }

      // Fallback: Fokussiere das erste fokussierbare Element oder den Modal selbst
      setTimeout(() => {
        if (modalRef.current) {
          const focusableElements = getFocusableElements();

          // Priorisiere interaktive Elemente in dieser Reihenfolge:
          // 1. Schließen-Button (wenn vorhanden)
          // 2. Bestätigen-Button (wenn vorhanden)
          // 3. Abbrechen-Button (wenn vorhanden)
          // 4. Erstes fokussierbares Element
          // 5. Modal selbst

          const closeButton = modalRef.current.querySelector(
            '[data-testid="modal-close-button"]'
          ) as HTMLElement;
          const confirmButton = modalRef.current.querySelector(
            '[data-testid="modal-confirm-button"]'
          ) as HTMLElement;
          // Korrigiere den Selektor für den Abbrechen-Button
          const cancelButton = modalRef.current.querySelector(
            `button[type="button"]:not([data-testid="modal-confirm-button"]):not([data-testid="modal-close-button"])`
          ) as HTMLElement;

          if (closeButton) {
            closeButton.focus();
          } else if (confirmButton) {
            confirmButton.focus();
          } else if (cancelButton) {
            cancelButton.focus();
          } else if (focusableElements.length > 0) {
            focusableElements[0].focus();
          } else {
            modalRef.current.focus();
          }
        }
      }, focusDelay);
    }
  }, [isOpen, initialFocus, initialFocusRef, animated, getFocusableElements]);

  // Tab-Fokus innerhalb des Modals halten
  const handleTabKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = getFocusableElements();

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Aktives Element
        const activeElement = document.activeElement;

        // Wenn Shift+Tab gedrückt wird und das erste Element fokussiert ist oder
        // das aktive Element vor dem ersten fokussierbaren Element liegt
        if (
          e.shiftKey &&
          (activeElement === firstElement ||
            !focusableElements.includes(activeElement as HTMLElement) ||
            focusableElements.indexOf(activeElement as HTMLElement) <= 0)
        ) {
          e.preventDefault();
          lastElement.focus();
        }
        // Wenn Tab gedrückt wird und das letzte Element fokussiert ist oder
        // das aktive Element nach dem letzten fokussierbaren Element liegt
        else if (
          !e.shiftKey &&
          (activeElement === lastElement ||
            !focusableElements.includes(activeElement as HTMLElement) ||
            focusableElements.indexOf(activeElement as HTMLElement) >= focusableElements.length - 1)
        ) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    },
    [getFocusableElements]
  );

  useEffect(() => {
    if (isOpen && trapFocus) {
      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    }
    return undefined;
  }, [isOpen, trapFocus, handleTabKey]);

  // Verhindern des Body-Scrollings
  useEffect(() => {
    if (isOpen && disableBodyScroll) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }

    return undefined;
  }, [isOpen, disableBodyScroll]);

  // Animation
  useEffect(() => {
    if (isOpen && animated) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        if (onOpen) onOpen();
      }, 300);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [isOpen, animated, onOpen]);

  // Callback beim Schließen
  useEffect(() => {
    if (!isOpen && onClosed) {
      const timer = setTimeout(
        () => {
          onClosed();
        },
        animated ? 300 : 0
      );

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [isOpen, animated, onClosed]);

  // Größen-spezifische Klassen
  const sizeClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full m-5',
  };

  // Positions-spezifische Klassen
  const positionClasses = {
    center: 'items-center justify-center',
    top: 'items-start justify-center pt-10',
    right: 'items-center justify-end pr-10',
    bottom: 'items-end justify-center pb-10',
    left: 'items-center justify-start pl-10',
  };

  // Animations-Klassen
  const animationMap: Record<ModalAnimation, { overlay: string; modal: string }> = {
    fade: { overlay: 'animate-fadeIn', modal: 'animate-fadeIn' },
    scale: { overlay: 'animate-fadeIn', modal: 'animate-scaleIn' },
    'slide-up': { overlay: 'animate-fadeIn', modal: 'animate-slideInUp' },
    'slide-down': { overlay: 'animate-fadeIn', modal: 'animate-slideInDown' },
    'slide-left': { overlay: 'animate-fadeIn', modal: 'animate-slideInLeft' },
    'slide-right': { overlay: 'animate-fadeIn', modal: 'animate-slideInRight' },
    none: { overlay: '', modal: '' },
  };

  const animationClasses = animated ? animationMap[animation] : { overlay: '', modal: '' };

  // Styling-Klassen
  const styleClasses = {
    shadow: shadow ? 'shadow-xl' : '',
    rounded: rounded ? 'rounded-lg' : '',
    bordered: bordered ? 'border border-gray-200 dark:border-gray-700' : '',
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${scrollable ? '' : 'overflow-hidden'}`}
      aria-modal="true"
      role={getDialogRole()}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : bodyId}
      {...modalProps}
    >
      {/* Screenreader-Ankündigung */}
      {announcement && (
        <div className="sr-only" aria-live="polite">
          {announcement}
        </div>
      )}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${animationClasses.overlay} ${overlayClassName}`}
        onClick={closeOnOverlayClick && !isStatic && !blocking ? onClose : undefined}
        aria-hidden="true"
        data-testid="modal-overlay"
        {...overlayProps}
      ></div>

      {/* Modal-Container */}
      <div className={`flex min-h-screen p-4 ${positionClasses[position]}`}>
        {/* Modal-Box */}
        <div
          ref={modalRef}
          id={modalId}
          className={`relative bg-white dark:bg-gray-800 text-left transform transition-all w-full ${sizeClasses[size]} ${styleClasses.shadow} ${styleClasses.rounded} ${styleClasses.bordered} ${animationClasses.modal} ${className} ${contentClassName} ${isFullscreenDialog ? 'h-full m-0 max-w-full' : ''}`}
          onClick={(e) => e.stopPropagation()}
          tabIndex={tabIndex}
          data-testid="modal-content"
          style={{
            ...(width ? { width } : {}),
            ...(height ? { height } : {}),
          }}
        >
          {/* Modal-Header */}
          {(title || header || showCloseButton) && (
            <div
              className={`border-b border-gray-200 dark:border-gray-700 px-6 py-4 ${headerClassName}`}
            >
              {header ? (
                header
              ) : (
                <>
                  {title && (
                    <h3 id={titleId} className="text-lg font-medium text-gray-900 dark:text-white">
                      {title}
                    </h3>
                  )}
                </>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  onClick={onClose}
                  aria-label={i18n.close}
                  data-testid="modal-close-button"
                >
                  <span className="sr-only">{i18n.close}</span>
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
                    ></path>
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Modal-Body */}
          <div id={bodyId} className={`p-6 ${bodyClassName}`} data-testid="modal-body">
            {description && (
              <div id={descriptionId} className="sr-only">
                {description}
              </div>
            )}
            {children}
          </div>

          {/* Modal-Footer */}
          {(footer || footerButtons) && (
            <div
              className={`border-t border-gray-200 dark:border-gray-700 px-6 py-4 ${footerClassName}`}
            >
              {footer || (
                <div className="flex justify-end space-x-3">
                  {onCancel && (
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      onClick={() => {
                        onCancel();
                        if (!onConfirm) onClose();
                      }}
                    >
                      {i18n.cancel || cancelButtonText}
                    </button>
                  )}
                  {onConfirm && (
                    <button
                      type="button"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      onClick={() => {
                        onConfirm();
                        onClose();
                      }}
                      data-testid="modal-confirm-button"
                    >
                      {i18n.confirm || confirmButtonText}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Portal verwenden, wenn aktiviert
  if (usePortal && typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
};

export default Modal;
