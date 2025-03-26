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
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  
  // Schließen mit Escape-Taste
  useEffect(() => {
    if (!closeOnEsc) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleCancel();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEsc]);
  
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
      if (confirmButtonRef.current) {
        confirmButtonRef.current.focus();
      } else if (dialogRef.current) {
        dialogRef.current.focus();
      }
    }
  }, [isOpen, initialFocus]);
  
  // Cancel-Handler
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };
  
  // Confirm-Handler
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
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
    full: 'max-w-full m-5'
  };
  
  // Varianten-Icon und -Farbe
  const getVariantProps = () => {
    switch (variant) {
      case 'success':
        return {
          iconColor: 'text-green-500 dark:text-green-400',
          icon: icon || (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case 'error':
        return {
          iconColor: 'text-red-500 dark:text-red-400',
          icon: icon || (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case 'warning':
        return {
          iconColor: 'text-yellow-500 dark:text-yellow-400',
          icon: icon || (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case 'confirm':
        return {
          iconColor: 'text-blue-500 dark:text-blue-400',
          icon: icon || (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case 'info':
      default:
        return {
          iconColor: 'text-blue-500 dark:text-blue-400',
          icon: icon || (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
    }
  };
  
  const { iconColor, icon: variantIcon } = getVariantProps();
  
  return (
    <div
      className={`fixed inset-0 z-${zIndex} overflow-y-auto`}
      aria-labelledby="dialog-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div 
        data-testid="dialog-overlay"
        className={`fixed inset-0 bg-black bg-opacity-50 ${animated ? 'transition-opacity duration-300 ease-out' : ''}`}
        onClick={closeOnOverlayClick ? handleCancel : undefined}
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
            ${className}
          `}
          tabIndex={-1}
        >
          {/* Dialog Header */}
          {title && (
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
              {variantIcon && (
                <div className={`mr-3 flex-shrink-0 ${iconColor}`}>
                  {variantIcon}
                </div>
              )}
              <h3 id="dialog-title" className="text-lg font-medium text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                onClick={handleCancel}
                aria-label="Schließen"
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
            </div>
          )}
          
          {/* Dialog Content */}
          <div className="p-6">
            {variantIcon && !title && (
              <div className={`mb-4 flex-shrink-0 ${iconColor} flex justify-center`}>
                {variantIcon}
              </div>
            )}
            <div className="text-gray-700 dark:text-gray-300">
              {children}
            </div>
          </div>
          
          {/* Dialog Footer */}
          <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex flex-shrink-0 flex-wrap justify-end gap-2">
            {footerButtons ? (
              footerButtons
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                >
                  {cancelLabel}
                </Button>
                <Button 
                  ref={confirmButtonRef}
                  variant="primary" 
                  onClick={handleConfirm}
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
