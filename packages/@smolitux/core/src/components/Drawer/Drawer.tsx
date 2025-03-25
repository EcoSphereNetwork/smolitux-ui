// packages/@smolitux/core/src/components/Drawer/Drawer.tsx
import React, { useEffect, useRef } from 'react';

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
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  
  // ESC-Taste zum Schließen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
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
  
  // Focus Trap
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      const focusableElements = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);
  
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
        };
      case 'right':
        return {
          ...commonStyles,
          right: 0,
          top: 0,
          bottom: 0,
          width: typeof width === 'number' ? `${width}px` : width,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        };
      case 'top':
        return {
          ...commonStyles,
          top: 0,
          left: 0,
          right: 0,
          height: typeof height === 'number' ? `${height}px` : height,
          transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
        };
      case 'bottom':
        return {
          ...commonStyles,
          bottom: 0,
          left: 0,
          right: 0,
          height: typeof height === 'number' ? `${height}px` : height,
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
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
      />
      
      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        className={`
          bg-white dark:bg-gray-800 shadow-xl flex flex-col
          ${isHorizontal ? 'h-full' : 'w-full'}
          ${className}
        `}
        style={getPositionStyles()}
      >
        {/* Header */}
        {showHeader && (
          <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center">
            <h2 id="drawer-title" className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h2>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
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
                />
              </svg>
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className="flex-grow overflow-y-auto p-4">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
            {footer}
          </div>
        )}
      </div>
    </>
  );
};

export default Drawer;
