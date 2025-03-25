import React, { useRef, useEffect } from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertProps {
  /** Typ der Benachrichtigung */
  type: AlertType;
  /** Titel der Benachrichtigung */
  title?: string;
  /** Nachrichtentext */
  message: string | React.ReactNode;
  /** Callback zum Schließen der Benachrichtigung */
  onClose?: () => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Icon anzeigen */
  showIcon?: boolean;
  /** Schließbar machen */
  closable?: boolean;
  /** Automatisch schließen nach X Millisekunden (0 = nicht automatisch schließen) */
  autoClose?: number;
  /** Zusätzlicher Inhalt (z.B. Aktions-Buttons) */
  children?: React.ReactNode;
  /** ID für Barrierefreiheit */
  id?: string;
  /** Ob der Alert beim Laden fokussiert werden soll (für Screenreader) */
  autoFocus?: boolean;
}

/**
 * Alert-Komponente für Feedback und Benachrichtigungen
 * 
 * @example
 * ```tsx
 * <Alert type="success" title="Erfolg" message="Die Aktion wurde erfolgreich ausgeführt." />
 * <Alert type="error" message="Es ist ein Fehler aufgetreten." closable onClose={handleClose} />
 * <Alert type="warning" title="Achtung" message="Diese Aktion kann nicht rückgängig gemacht werden." />
 * <Alert type="info" message="Die Wartungsarbeiten beginnen in 5 Minuten." autoClose={5000} />
 * ```
 */
export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onClose,
  className = '',
  showIcon = true,
  closable = false,
  autoClose = 0,
  children,
  id,
  autoFocus = false
}) => {
  const alertRef = useRef<HTMLDivElement>(null);
  const alertId = id || `alert-${Math.random().toString(36).substr(2, 9)}`;
  const titleId = `${alertId}-title`;
  const messageId = `${alertId}-message`;
  
  // Auto-Close Funktionalität
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (autoClose > 0 && onClose) {
      timeoutId = setTimeout(() => {
        onClose();
      }, autoClose);
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [autoClose, onClose]);
  
  // Auto-Focus für Screenreader
  useEffect(() => {
    if (autoFocus && alertRef.current) {
      alertRef.current.focus();
    }
  }, [autoFocus]);

  // Stil-Varianten basierend auf dem Typ
  const typeStyles = {
    success: {
      background: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-300 dark:border-green-800',
      titleColor: 'text-green-800 dark:text-green-300',
      textColor: 'text-green-700 dark:text-green-400',
      icon: (
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      ariaLive: 'polite'
    },
    error: {
      background: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-300 dark:border-red-800',
      titleColor: 'text-red-800 dark:text-red-300',
      textColor: 'text-red-700 dark:text-red-400',
      icon: (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      ariaLive: 'assertive'
    },
    warning: {
      background: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-300 dark:border-yellow-800',
      titleColor: 'text-yellow-800 dark:text-yellow-300',
      textColor: 'text-yellow-700 dark:text-yellow-400',
      icon: (
        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      ),
      ariaLive: 'polite'
    },
    info: {
      background: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-300 dark:border-blue-800',
      titleColor: 'text-blue-800 dark:text-blue-300',
      textColor: 'text-blue-700 dark:text-blue-400',
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      ariaLive: 'polite'
    }
  };

  const styles = typeStyles[type];
  
  // Keyboard-Handler für Schließen-Button
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && onClose) {
      onClose();
    }
  };

  return (
    <div 
      ref={alertRef}
      id={alertId}
      className={`p-4 border rounded-lg ${styles.background} ${styles.border} ${className}`} 
      role="alert"
      aria-live="polite"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={messageId}
      tabIndex={autoFocus ? 0 : undefined}
      onKeyDown={handleKeyDown}
    >
      <div className="flex">
        {showIcon && (
          <div className="flex-shrink-0">
            {styles.icon}
          </div>
        )}
        <div className={`${showIcon ? 'ml-3' : ''} flex-1`}>
          {title && (
            <h3 id={titleId} className={`text-sm font-medium ${styles.titleColor}`}>{title}</h3>
          )}
          <div id={messageId} className={`text-sm ${styles.textColor} ${title ? 'mt-2' : ''}`}>
            {message}
          </div>
          {children && <div className="mt-3">{children}</div>}
        </div>
        {(closable || onClose) && (
          <button
            type="button"
            className={`ml-auto -mx-1.5 -my-1.5 ${styles.textColor} hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
            onClick={onClose}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;