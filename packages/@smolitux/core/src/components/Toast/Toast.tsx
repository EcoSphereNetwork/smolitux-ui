// packages/@smolitux/core/src/components/Toast/Toast.tsx
import React, { forwardRef, useState, useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Titel des Toasts */
  title?: string;
  /** Nachrichtentext */
  message: string;
  /** Typ des Toasts */
  type?: ToastType;
  /** Anzeigedauer in Millisekunden (0 für kein automatisches Schließen) */
  duration?: number;
  /** Callback zum Schließen des Toasts */
  onClose?: () => void;
  /** Ist der Toast gerade offen? */
  isOpen?: boolean;
  /** Position des Toasts */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  /** Icon anzeigen */
  showIcon?: boolean;
  /** Schließen-Button anzeigen */
  showCloseButton?: boolean;
  /** Animation beim Schließen */
  animateOut?: boolean;
  /** Benutzerdefiniertes Icon */
  icon?: React.ReactNode;
  /** Aktionen am Toast (z.B. Buttons) */
  actions?: React.ReactNode;
}

/**
 * Toast-Komponente für Benachrichtigungen
 * 
 * @example
 * ```tsx
 * <Toast
 *   type="success"
 *   title="Erfolg!"
 *   message="Die Aktion wurde erfolgreich durchgeführt."
 *   isOpen={true}
 *   onClose={() => setIsOpen(false)}
 * />
 * ```
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(({
  title,
  message,
  type = 'info',
  duration = 5000,
  onClose,
  isOpen = true,
  position = 'top-right',
  showIcon = true,
  showCloseButton = true,
  animateOut = true,
  icon,
  actions,
  className = '',
  ...rest
}, ref) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isExiting, setIsExiting] = useState(false);
  
  // Timer für automatisches Schließen
  useEffect(() => {
    setIsVisible(isOpen);
    setIsExiting(false);
    
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        close();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration]);
  
  // Schließen-Funktion mit Animation
  const close = () => {
    if (animateOut) {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300);
    } else {
      setIsVisible(false);
      onClose?.();
    }
  };
  
  // Wenn nicht sichtbar, nicht rendern
  if (!isVisible) {
    return null;
  }
  
  // Icon basierend auf Typ
  const getIcon = () => {
    if (icon) {
      return icon;
    }
    
    switch (type) {
      case 'success':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };
  
  // Farben basierend auf Typ
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800 text-green-800 dark:text-green-300';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800 text-red-800 dark:text-red-300';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300';
      case 'info':
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-300';
    }
  };
  
  // Icon-Farben basierend auf Typ
  const getIconColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-500 dark:text-green-400';
      case 'error':
        return 'text-red-500 dark:text-red-400';
      case 'warning':
        return 'text-yellow-500 dark:text-yellow-400';
      case 'info':
      default:
        return 'text-blue-500 dark:text-blue-400';
    }
  };
  
  // Position-Styles basierend auf position
  const getPositionStyles = () => {
    const baseStyles = 'fixed z-50 p-4 min-w-[320px] max-w-sm';
    
    switch (position) {
      case 'top-right':
        return `${baseStyles} top-4 right-4`;
      case 'top-left':
        return `${baseStyles} top-4 left-4`;
      case 'bottom-right':
        return `${baseStyles} bottom-4 right-4`;
      case 'bottom-left':
        return `${baseStyles} bottom-4 left-4`;
      case 'top-center':
        return `${baseStyles} top-4 left-1/2 transform -translate-x-1/2`;
      case 'bottom-center':
        return `${baseStyles} bottom-4 left-1/2 transform -translate-x-1/2`;
      default:
        return `${baseStyles} top-4 right-4`;
    }
  };
  
  // Animation basierend auf Position
  const getAnimationClass = () => {
    if (isExiting) {
      switch (position) {
        case 'top-right':
          return 'animate-slide-out-right';
        case 'top-left':
          return 'animate-slide-out-left';
        case 'bottom-right':
          return 'animate-slide-out-right';
        case 'bottom-left':
          return 'animate-slide-out-left';
        case 'top-center':
          return 'animate-slide-out-top';
        case 'bottom-center':
          return 'animate-slide-out-bottom';
        default:
          return 'animate-slide-out-right';
      }
    }
    
    switch (position) {
      case 'top-right':
        return 'animate-slide-in-right';
      case 'top-left':
        return 'animate-slide-in-left';
      case 'bottom-right':
        return 'animate-slide-in-right';
      case 'bottom-left':
        return 'animate-slide-in-left';
      case 'top-center':
        return 'animate-slide-in-top';
      case 'bottom-center':
        return 'animate-slide-in-bottom';
      default:
        return 'animate-slide-in-right';
    }
  };
  
  return (
    <div
      ref={ref}
      role="alert"
      data-testid="toast"
      className={`
        ${getPositionStyles()}
        ${getTypeStyles()}
        ${getAnimationClass()}
        rounded-lg shadow-md border
        ${className}
      `}
      {...rest}
    >
      {/* Fortschrittsbalken für automatisches Schließen */}
      {duration > 0 && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden">
          <div
            className={`h-1 ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`}
            style={{
              width: '100%',
              animation: `shrink ${duration / 1000}s linear forwards`
            }}
          />
        </div>
      )}
      
      <div className="flex p-4">
        {/* Icon */}
        {showIcon && (
          <div className={`flex-shrink-0 mr-3 ${getIconColor()}`}>
            {getIcon()}
          </div>
        )}
        
        {/* Inhalt */}
        <div className="flex-grow">
          {title && (
            <h3 className="text-sm font-medium mb-1">{title}</h3>
          )}
          <div className="text-sm">
            {message}
          </div>
          
          {/* Aktionen */}
          {actions && (
            <div className="mt-2" data-testid="toast-actions">
              {actions}
            </div>
          )}
        </div>
        
        {/* Schließen-Button */}
        {showCloseButton && (
          <button
            type="button"
            className="ml-3 flex-shrink-0 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
            onClick={close}
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Animationsstile */}
      <style jsx>{`
        @keyframes shrink {
          0% { width: 100%; }
          100% { width: 0%; }
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
        }
        
        .animate-slide-out-right {
          animation: slideOutRight 0.3s ease-in forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.3s ease-out forwards;
        }
        
        .animate-slide-out-left {
          animation: slideOutLeft 0.3s ease-in forwards;
        }
        
        .animate-slide-in-top {
          animation: slideInTop 0.3s ease-out forwards;
        }
        
        .animate-slide-out-top {
          animation: slideOutTop 0.3s ease-in forwards;
        }
        
        .animate-slide-in-bottom {
          animation: slideInBottom 0.3s ease-out forwards;
        }
        
        .animate-slide-out-bottom {
          animation: slideOutBottom 0.3s ease-in forwards;
        }
        
        @keyframes slideInRight {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes slideInLeft {
          0% { transform: translateX(-100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutLeft {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-100%); opacity: 0; }
        }
        
        @keyframes slideInTop {
          0% { transform: translateY(-100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideOutTop {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
        
        @keyframes slideInBottom {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideOutBottom {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
      `}</style>
    </div>
  );
});

Toast.displayName = 'Toast';

export default Toast;
