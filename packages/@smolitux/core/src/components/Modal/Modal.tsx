import React, { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalPosition = 'center' | 'top' | 'right' | 'bottom' | 'left';

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
  usePortal = true,
  blocking = false,
  scrollable = true,
  centered = true,
  static: isStatic = false,
  disableBodyScroll = true,
  modalProps = {},
  overlayProps = {},
  onOpen,
  onClosed
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalId = id || `modal-${Math.random().toString(36).substr(2, 9)}`;
  const titleId = `${modalId}-title`;
  const bodyId = `${modalId}-body`;
  
  // Speichern des vorherigen Fokus
  useEffect(() => {
    if (isOpen && returnFocus) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
    
    return () => {
      if (returnFocus && previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, returnFocus]);
  
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
  
  // Focus Lock innerhalb des Modals
  useEffect(() => {
    if (isOpen && modalRef.current && initialFocus) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        setTimeout(() => {
          (focusableElements[0] as HTMLElement).focus();
        }, 0);
      } else {
        modalRef.current.focus();
      }
    }
  }, [isOpen, initialFocus]);
  
  // Tab-Fokus innerhalb des Modals halten
  const handleTabKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab' && modalRef.current) {
      const focusableElements = Array.from(
        modalRef.current.querySelectorAll(
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
  }, []);
  
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    }
    return undefined;
  }, [isOpen, handleTabKey]);
  
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
      const timer = setTimeout(() => {
        onClosed();
      }, animated ? 300 : 0);
      
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
    full: 'max-w-full m-5'
  };
  
  // Positions-spezifische Klassen
  const positionClasses = {
    center: 'items-center justify-center',
    top: 'items-start justify-center pt-10',
    right: 'items-center justify-end pr-10',
    bottom: 'items-end justify-center pb-10',
    left: 'items-center justify-start pl-10'
  };
  
  // Animations-Klassen
  const animationClasses = animated ? {
    overlay: isAnimating ? 'animate-fadeIn' : '',
    modal: isAnimating ? 'animate-scaleIn' : ''
  } : { overlay: '', modal: '' };
  
  // Styling-Klassen
  const styleClasses = {
    shadow: shadow ? 'shadow-xl' : '',
    rounded: rounded ? 'rounded-lg' : '',
    bordered: bordered ? 'border border-gray-200 dark:border-gray-700' : ''
  };
  
  if (!isOpen) return null;
  
  const modalContent = (
    <div 
      className={`fixed inset-0 z-50 overflow-y-auto ${scrollable ? '' : 'overflow-hidden'}`}
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={bodyId}
      {...modalProps}
    >
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${animationClasses.overlay} ${overlayClassName}`}
        onClick={closeOnOverlayClick && !isStatic && !blocking ? onClose : undefined}
        aria-hidden="true"
        {...overlayProps}
      ></div>
      
      {/* Modal-Container */}
      <div className={`flex min-h-screen p-4 ${positionClasses[position]}`}>
        {/* Modal-Box */}
        <div 
          ref={modalRef}
          id={modalId}
          className={`relative bg-white dark:bg-gray-800 text-left transform transition-all w-full ${sizeClasses[size]} ${styleClasses.shadow} ${styleClasses.rounded} ${styleClasses.bordered} ${animationClasses.modal} ${className}`}
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
        >
          {/* Modal-Header */}
          {(title || showCloseButton) && (
            <div className={`border-b border-gray-200 dark:border-gray-700 px-6 py-4 ${headerClassName}`}>
              {title && (
                <h3 id={titleId} className="text-lg font-medium text-gray-900 dark:text-white">
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
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
          <div id={bodyId} className={`p-6 ${bodyClassName}`}>{children}</div>
          
          {/* Modal-Footer */}
          {footer && (
            <div className={`border-t border-gray-200 dark:border-gray-700 px-6 py-4 ${footerClassName}`}>
              {footer}
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
