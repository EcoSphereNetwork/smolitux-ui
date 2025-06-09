// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useRef, useEffect, useState } from 'react';
import './animations.css';

export type AlertType = 'success' | 'error' | 'warning' | 'info';
export type AlertVariant = 'default' | 'outline' | 'filled' | 'subtle';
export type AlertAnimation = 'fade' | 'slide-right' | 'slide-down' | 'none';

export interface AlertAction {
  /** Text des Aktions-Buttons */
  label: string;
  /** Callback für den Aktions-Button */
  onClick: () => void;
  /** Variante des Aktions-Buttons */
  variant?: 'default' | 'primary' | 'secondary';
}

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
  /** Variante des Alerts */
  variant?: AlertVariant;
  /** Animation des Alerts */
  animation?: AlertAnimation;
  /** Ob der Alert animiert werden soll */
  animated?: boolean;
  /** Aktions-Buttons */
  actions?: AlertAction[];
  /** Beschreibung für Screenreader */
  description?: string;
  /** Ob der Alert kompakt sein soll */
  compact?: boolean;
  /** Ob der Alert einen Rahmen haben soll */
  bordered?: boolean;
  /** Ob der Alert abgerundete Ecken haben soll */
  rounded?: boolean;
  /** Ob der Alert einen Schatten haben soll */
  shadow?: boolean;
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
 *
 * // Mit Varianten
 * <Alert type="success" variant="outline" message="Outline-Variante" />
 * <Alert type="error" variant="filled" message="Filled-Variante" />
 * <Alert type="warning" variant="subtle" message="Subtle-Variante" />
 *
 * // Mit Animationen
 * <Alert type="info" animation="slide-right" message="Slide-Right Animation" />
 * <Alert type="success" animation="slide-down" message="Slide-Down Animation" />
 *
 * // Mit Aktions-Buttons
 * <Alert
 *   type="info"
 *   title="Information"
 *   message="Möchten Sie fortfahren?"
 *   actions={[
 *     { label: "Abbrechen", onClick: handleCancel },
 *     { label: "Fortfahren", onClick: handleContinue, variant: "primary" }
 *   ]}
 * />
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
  autoFocus = false,
  variant = 'default',
  animation = 'fade',
  animated = true,
  actions = [],
  description,
  compact = false,
  bordered = true,
  rounded = true,
  shadow = false,
}) => {
  const alertRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const alertId = id || `alert-${Math.random().toString(36).substr(2, 9)}`;
  const titleId = `${alertId}-title`;
  const messageId = `${alertId}-message`;
  const descriptionId = description ? `${alertId}-description` : undefined;

  // Animiertes Schließen
  const handleClose = () => {
    if (onClose) {
      if (animated) {
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
          onClose();
        }, 300); // Animation-Dauer
      } else {
        setIsVisible(false);
        onClose();
      }
    }
  };

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

  // Stil-Varianten basierend auf dem Typ und der Variante
  const getTypeStyles = () => {
    const baseStyles = {
      success: {
        background: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-300 dark:border-green-800',
        titleColor: 'text-green-800 dark:text-green-300',
        textColor: 'text-green-700 dark:text-green-400',
        filledBg: 'bg-green-500 dark:bg-green-600',
        filledText: 'text-white dark:text-white',
        subtleBg: 'bg-green-100 dark:bg-green-900/30',
        icon: (
          <svg
            className="w-5 h-5 text-green-500"
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        ),
        filledIcon: (
          <svg
            className="w-5 h-5 text-white"
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        ),
        ariaLive: 'polite',
      },
      error: {
        background: 'bg-red-50 dark:bg-red-900/20',
        border: 'border-red-300 dark:border-red-800',
        titleColor: 'text-red-800 dark:text-red-300',
        textColor: 'text-red-700 dark:text-red-400',
        filledBg: 'bg-red-500 dark:bg-red-600',
        filledText: 'text-white dark:text-white',
        subtleBg: 'bg-red-100 dark:bg-red-900/30',
        icon: (
          <svg
            className="w-5 h-5 text-red-500"
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        ),
        filledIcon: (
          <svg
            className="w-5 h-5 text-white"
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        ),
        ariaLive: 'assertive',
      },
      warning: {
        background: 'bg-yellow-50 dark:bg-yellow-900/20',
        border: 'border-yellow-300 dark:border-yellow-800',
        titleColor: 'text-yellow-800 dark:text-yellow-300',
        textColor: 'text-yellow-700 dark:text-yellow-400',
        filledBg: 'bg-yellow-500 dark:bg-yellow-600',
        filledText: 'text-white dark:text-white',
        subtleBg: 'bg-yellow-100 dark:bg-yellow-900/30',
        icon: (
          <svg
            className="w-5 h-5 text-yellow-500"
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
        ),
        filledIcon: (
          <svg
            className="w-5 h-5 text-white"
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
        ),
        ariaLive: 'polite',
      },
      info: {
        background: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-300 dark:border-blue-800',
        titleColor: 'text-blue-800 dark:text-blue-300',
        textColor: 'text-blue-700 dark:text-blue-400',
        filledBg: 'bg-blue-500 dark:bg-blue-600',
        filledText: 'text-white dark:text-white',
        subtleBg: 'bg-blue-100 dark:bg-blue-900/30',
        icon: (
          <svg
            className="w-5 h-5 text-blue-500"
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        ),
        filledIcon: (
          <svg
            className="w-5 h-5 text-white"
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        ),
        ariaLive: 'polite',
      },
    };

    const typeStyle = baseStyles[type];

    // Varianten-spezifische Stile
    switch (variant) {
      case 'outline':
        return {
          background: 'bg-transparent',
          border: typeStyle.border,
          titleColor: typeStyle.titleColor,
          textColor: typeStyle.textColor,
          icon: typeStyle.icon,
          ariaLive: typeStyle.ariaLive,
        };
      case 'filled':
        return {
          background: typeStyle.filledBg,
          border: 'border-transparent',
          titleColor: typeStyle.filledText,
          textColor: typeStyle.filledText,
          icon: typeStyle.filledIcon,
          ariaLive: typeStyle.ariaLive,
        };
      case 'subtle':
        return {
          background: typeStyle.subtleBg,
          border: 'border-transparent',
          titleColor: typeStyle.titleColor,
          textColor: typeStyle.textColor,
          icon: typeStyle.icon,
          ariaLive: typeStyle.ariaLive,
        };
      default:
        return {
          background: typeStyle.background,
          border: typeStyle.border,
          titleColor: typeStyle.titleColor,
          textColor: typeStyle.textColor,
          icon: typeStyle.icon,
          ariaLive: typeStyle.ariaLive,
        };
    }
  };

  const styles = getTypeStyles();

  // Animations-Klassen
  const getAnimationClasses = () => {
    if (!animated) return '';

    if (isExiting) {
      switch (animation) {
        case 'fade':
          return 'alert-animate-fadeOut';
        case 'slide-right':
          return 'alert-animate-slideOutRight';
        case 'slide-down':
          return 'alert-animate-slideOutDown';
        default:
          return 'alert-animate-fadeOut';
      }
    } else {
      switch (animation) {
        case 'fade':
          return 'alert-animate-fadeIn';
        case 'slide-right':
          return 'alert-animate-slideInRight';
        case 'slide-down':
          return 'alert-animate-slideInDown';
        default:
          return 'alert-animate-fadeIn';
      }
    }
  };

  // Keyboard-Handler für Schließen-Button
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && onClose) {
      onClose();
    }
  };

  // Button-Varianten für Aktions-Buttons
  const getButtonClasses = (buttonVariant: string = 'default') => {
    switch (buttonVariant) {
      case 'primary':
        return 'bg-primary-600 hover:bg-primary-700 text-white';
      case 'secondary':
        return 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200';
      default:
        return 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600';
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={alertRef}
      id={alertId}
      className={`${bordered ? 'border' : ''} ${rounded ? 'rounded-lg' : ''} ${shadow ? 'shadow-md' : ''} ${compact ? 'p-3' : 'p-4'} ${styles.background} ${bordered ? styles.border : ''} ${getAnimationClasses()} ${className}`}
      role="alert"
      aria-live={styles.ariaLive}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : messageId}
      data-type={type}
      data-variant={variant}
      tabIndex={autoFocus ? 0 : undefined}
      onKeyDown={handleKeyDown}
    >
      <div className="flex">
        {showIcon && <div className="flex-shrink-0">{styles.icon}</div>}
        <div className={`${showIcon ? 'ml-3' : ''} flex-1`}>
          {title && (
            <h3 id={titleId} className={`text-sm font-medium ${styles.titleColor}`}>
              {title}
            </h3>
          )}
          <div id={messageId} className={`text-sm ${styles.textColor} ${title ? 'mt-2' : ''}`}>
            {message}
          </div>
          {description && (
            <div id={descriptionId} className="sr-only">
              {description}
            </div>
          )}
          {children && <div className="mt-3">{children}</div>}

          {/* Aktions-Buttons */}
          {actions.length > 0 && (
            <div className={`flex ${actions.length > 1 ? 'justify-end space-x-2' : ''} mt-3`}>
              {actions.map((action, index) => (
                <button
                  key={index}
                  type="button"
                  className={`px-3 py-1.5 text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${getButtonClasses(action.variant)}`}
                  onClick={action.onClick}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {(closable || onClose) && (
          <button
            type="button"
            className={`ml-auto -mx-1.5 -my-1.5 ${variant === 'filled' ? 'text-white hover:bg-opacity-20' : `${styles.textColor} hover:bg-gray-100 dark:hover:bg-gray-800`} rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
            onClick={() => onClose && onClose()}
            aria-label="Schließen"
            data-testid="alert-close-button"
          >
            <span className="sr-only">Schließen</span>
            <svg
              className="w-5 h-5"
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
    </div>
  );
};

export default Alert;
