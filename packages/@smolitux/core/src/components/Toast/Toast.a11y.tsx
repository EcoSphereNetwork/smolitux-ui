// packages/@smolitux/core/src/components/Toast/Toast.a11y.tsx
import React, { useEffect, useRef } from 'react';
import { ToastType } from './Toast';
import './Toast.css';

export interface ToastA11yProps {
  /** Eindeutige ID des Toasts */
  id: string;
  /** Typ des Toasts */
  type?: ToastType;
  /** Titel des Toasts */
  title?: React.ReactNode;
  /** Inhalt des Toasts */
  description?: React.ReactNode;
  /** Dauer in Millisekunden, nach der der Toast automatisch geschlossen wird (0 = kein automatisches Schließen) */
  duration?: number;
  /** Callback beim Schließen des Toasts */
  onClose?: () => void;
  /** Ist der Toast schließbar? */
  isClosable?: boolean;
  /** Ist der Toast persistent? */
  isPersistent?: boolean;
  /** Ist der Toast aktuell sichtbar? */
  isVisible?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Zusätzliche Styles */
  style?: React.CSSProperties;
  /** Icon für den Toast */
  icon?: React.ReactNode;
  /** Position des Icons */
  iconPosition?: 'left' | 'right';
  /** Aktion für den Toast */
  action?: React.ReactNode;
  /** ARIA-Label für den Toast */
  ariaLabel?: string;
  /** ARIA-Labelledby für den Toast */
  ariaLabelledby?: string;
  /** ARIA-Describedby für den Toast */
  ariaDescribedby?: string;
  /** ARIA-Live für den Toast */
  ariaLive?: 'polite' | 'assertive' | 'off';
  /** ARIA-Atomic für den Toast */
  ariaAtomic?: boolean;
  /** ARIA-Relevant für den Toast */
  ariaRelevant?: string;
  /** Rolle für den Toast */
  role?: string;
  /** Ob der Toast eine Live-Region sein soll */
  isLiveRegion?: boolean;
  /** Ob der Toast automatisch fokussiert werden soll */
  autoFocus?: boolean;
  /** Ob der Fokus beim Schließen zurückgesetzt werden soll */
  returnFocus?: boolean;
  /** Ob der Toast eine Tastaturnavigation haben soll */
  keyboardNavigation?: boolean;
  /** Ob der Toast eine Screenreader-Unterstützung haben soll */
  screenReaderSupport?: boolean;
  /** Ob der Toast eine Ankündigung haben soll */
  announce?: boolean;
  /** Format der Ankündigung */
  announceFormat?: string;
  /** Ob der Toast eine Beschreibung haben soll */
  hasDescription?: boolean;
  /** Ob der Toast eine Statusmeldung ist */
  isStatus?: boolean;
  /** Statustyp des Toasts */
  statusType?: 'success' | 'error' | 'warning' | 'info';
  /** Ob der Toast eine Warnung ist */
  isAlert?: boolean;
  /** Ob der Toast ein Dialog ist */
  isDialog?: boolean;
  /** Ob der Toast ein Modal ist */
  isModal?: boolean;
  /** Ob der Toast ein Banner ist */
  isBanner?: boolean;
  /** Ob der Toast ein Snackbar ist */
  isSnackbar?: boolean;
  /** Ob der Toast ein Notification ist */
  isNotification?: boolean;
  /** Ob der Toast ein Message ist */
  isMessage?: boolean;
  /** Ob der Toast ein Feedback ist */
  isFeedback?: boolean;
  /** Ob der Toast ein Hinweis ist */
  isHint?: boolean;
  /** Ob der Toast ein Tipp ist */
  isTip?: boolean;
  /** Ob der Toast ein Fehler ist */
  isError?: boolean;
  /** Ob der Toast eine Warnung ist */
  isWarning?: boolean;
  /** Ob der Toast eine Information ist */
  isInfo?: boolean;
  /** Ob der Toast ein Erfolg ist */
  isSuccess?: boolean;
  /** Ob der Toast eine Bestätigung ist */
  isConfirmation?: boolean;
  /** Ob der Toast eine Frage ist */
  isQuestion?: boolean;
  /** Ob der Toast eine Antwort ist */
  isAnswer?: boolean;
  /** Ob der Toast eine Nachricht ist */
  isMessage2?: boolean;
  /** Ob der Toast eine Benachrichtigung ist */
  isNotification2?: boolean;
  /** Ob der Toast ein Feedback ist */
  isFeedback2?: boolean;
  /** Ob der Toast ein Hinweis ist */
  isHint2?: boolean;
  /** Ob der Toast ein Tipp ist */
  isTip2?: boolean;
  /** Ob der Toast ein Fehler ist */
  isError2?: boolean;
  /** Ob der Toast eine Warnung ist */
  isWarning2?: boolean;
  /** Ob der Toast eine Information ist */
  isInfo2?: boolean;
  /** Ob der Toast ein Erfolg ist */
  isSuccess2?: boolean;
  /** Ob der Toast eine Bestätigung ist */
  isConfirmation2?: boolean;
  /** Ob der Toast eine Frage ist */
  isQuestion2?: boolean;
  /** Ob der Toast eine Antwort ist */
  isAnswer2?: boolean;
}

/**
 * Barrierefreie Toast-Komponente für Benachrichtigungen und Statusmeldungen
 *
 * @example
 * ```tsx
 * <ToastA11y
 *   id="toast-1"
 *   type="success"
 *   title="Erfolg"
 *   description="Die Aktion wurde erfolgreich ausgeführt."
 *   ariaLive="polite"
 * />
 * ```
 */
export const ToastA11y: React.FC<ToastA11yProps> = ({
  id,
  type = 'info',
  title,
  description,
  duration = 5000,
  onClose,
  isClosable = true,
  isPersistent = false,
  isVisible = true,
  className = '',
  style,
  icon,
  iconPosition = 'left',
  action,
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  ariaLive = 'polite',
  ariaAtomic = true,
  ariaRelevant,
  role = 'alert',
  isLiveRegion = true,
  autoFocus = false,
  returnFocus = true,
  keyboardNavigation = true,
  screenReaderSupport = true,
  announce = true,
  announceFormat,
  hasDescription = !!description,
  isStatus = false,
  statusType,
  isAlert = role === 'alert',
  isDialog = false,
  isModal = false,
  isBanner = false,
  isSnackbar = false,
  isNotification = false,
  isMessage = false,
  isFeedback = false,
  isHint = false,
  isTip = false,
  isError = type === 'error',
  isWarning = type === 'warning',
  isInfo = type === 'info',
  isSuccess = type === 'success',
  isConfirmation = false,
  isQuestion = false,
  isAnswer = false,
  isMessage2 = false,
  isNotification2 = false,
  isFeedback2 = false,
  isHint2 = false,
  isTip2 = false,
  isError2 = false,
  isWarning2 = false,
  isInfo2 = false,
  isSuccess2 = false,
  isConfirmation2 = false,
  isQuestion2 = false,
  isAnswer2 = false,
}) => {
  // Refs
  const toastRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Bestimme die Rolle basierend auf den Eigenschaften
  const determineRole = () => {
    if (isAlert) return 'alert';
    if (isStatus) return 'status';
    if (isDialog) return 'dialog';
    if (isBanner) return 'banner';
    if (isSnackbar || isNotification) return 'log';
    return role;
  };

  // Bestimme die ARIA-Live-Region basierend auf den Eigenschaften
  const determineAriaLive = () => {
    if (isError || isWarning) return 'assertive';
    if (isInfo || isSuccess) return 'polite';
    return ariaLive;
  };

  // Bestimme die CSS-Klassen basierend auf den Eigenschaften
  const determineClasses = () => {
    const baseClasses = [
      'toast',
      `toast-${type}`,
      isVisible ? 'toast-visible' : 'toast-hidden',
      className,
    ];

    return baseClasses.filter(Boolean).join(' ');
  };

  // Bestimme das Icon basierend auf dem Typ
  const determineIcon = () => {
    if (icon) return icon;

    switch (type) {
      case 'success':
        return <span aria-hidden="true">✓</span>;
      case 'error':
        return <span aria-hidden="true">✕</span>;
      case 'warning':
        return <span aria-hidden="true">⚠</span>;
      case 'info':
        return <span aria-hidden="true">ℹ</span>;
      default:
        return null;
    }
  };

  // Bestimme das Ankündigungsformat basierend auf den Eigenschaften
  const determineAnnounceFormat = () => {
    if (announceFormat) return announceFormat;

    if (title && description) {
      return `${title}: ${description}`;
    } else if (title) {
      return `${title}`;
    } else if (description) {
      return `${description}`;
    }

    return '';
  };

  // Effekt für das automatische Schließen
  useEffect(() => {
    if (!isPersistent && duration > 0 && isVisible) {
      timerRef.current = setTimeout(() => {
        if (onClose) onClose();
      }, duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, isPersistent, isVisible, onClose]);

  // Effekt für den Fokus
  useEffect(() => {
    if (isVisible && autoFocus && toastRef.current) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      toastRef.current.focus();
    }

    return () => {
      if (!isVisible && returnFocus && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isVisible, autoFocus, returnFocus]);

  // Effekt für die Tastaturnavigation
  useEffect(() => {
    if (!isVisible || !keyboardNavigation) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isClosable) {
        if (onClose) onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, keyboardNavigation, isClosable, onClose]);

  // Rendere den Toast
  return (
    <div
      ref={toastRef}
      id={id}
      className={determineClasses()}
      style={style}
      role={determineRole()}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby || (title ? `${id}-title` : undefined)}
      aria-describedby={ariaDescribedby || (description ? `${id}-description` : undefined)}
      aria-live={isLiveRegion ? determineAriaLive() : undefined}
      aria-atomic={isLiveRegion ? ariaAtomic : undefined}
      aria-relevant={isLiveRegion ? ariaRelevant : undefined}
      tabIndex={autoFocus ? 0 : -1}
    >
      <div className="toast-content">
        {icon && iconPosition === 'left' && (
          <div className="toast-icon" aria-hidden="true">
            {determineIcon()}
          </div>
        )}

        <div className="toast-body">
          {title && (
            <div id={`${id}-title`} className="toast-title">
              {title}
            </div>
          )}

          {description && (
            <div id={`${id}-description`} className="toast-description">
              {description}
            </div>
          )}

          {action && <div className="toast-action">{action}</div>}
        </div>

        {icon && iconPosition === 'right' && (
          <div className="toast-icon" aria-hidden="true">
            {determineIcon()}
          </div>
        )}

        {isClosable && (
          <button
            className="toast-close-button"
            onClick={onClose}
            aria-label="Schließen"
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
        )}
      </div>

      {/* Screenreader-Ankündigung */}
      {screenReaderSupport && announce && (
        <div className="sr-only" aria-live={determineAriaLive()} aria-atomic="true">
          {determineAnnounceFormat()}
        </div>
      )}
    </div>
  );
};

export default ToastA11y;
