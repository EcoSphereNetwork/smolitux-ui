import React, { useEffect, useRef } from 'react';

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
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Schließen bei Klick auf Overlay */
  closeOnOverlayClick?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * Modal-Komponente zum Anzeigen von Inhalten in einem Overlay
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  className = ''
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Schließen mit Escape-Taste
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  // Focus Lock innerhalb des Modals
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);
  
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
  
  // Größen-spezifische Klassen
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full m-5'
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeOnOverlayClick ? onClose : undefined}
      ></div>
      
      {/* Modal-Container */}
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        {/* Modal-Box */}
        <div 
          ref={modalRef}
          className={`relative rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transform transition-all w-full ${sizeClasses[size]} ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal-Header */}
          {title && (
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <h3 id="modal-title" className="text-lg font-medium text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                onClick={onClose}
                aria-label="Close"
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
                  ></path>
                </svg>
              </button>
            </div>
          )}
          
          {/* Modal-Body */}
          <div className="p-6">{children}</div>
          
          {/* Modal-Footer */}
          {footer && (
            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
