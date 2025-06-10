// packages/@smolitux/core/src/components/Toast/ToastProvider.a11y.tsx
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { ToastA11y, ToastA11yProps } from './Toast.a11y';
import { ToastType } from './Toast';

// Definiere den Typ für die Toast-Optionen
export interface ToastOptionsA11y extends Omit<ToastA11yProps, 'id'> {
  id?: string;
}

// Definiere den Typ für die Toast-Methoden
export interface ToastMethodsA11y {
  show: (options: ToastOptionsA11y) => string;
  update: (id: string, options: Partial<ToastOptionsA11y>) => void;
  close: (id: string) => void;
  closeAll: () => void;
  isActive: (id: string) => boolean;
}

// Definiere den Typ für den Toast-Kontext
export interface ToastContextA11y {
  toasts: ToastA11yProps[];
  methods: ToastMethodsA11y;
}

// Erstelle den Toast-Kontext
const ToastContext = createContext<ToastContextA11y | undefined>(undefined);

// Definiere die Props für den ToastProvider
export interface ToastProviderA11yProps {
  /** Die Kinder des Providers */
  children: React.ReactNode;
  /** Die maximale Anzahl an Toasts, die gleichzeitig angezeigt werden können */
  maxToasts?: number;
  /** Die Position der Toasts */
  position?: 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-right' | 'bottom-left';
  /** Der Abstand zwischen den Toasts */
  spacing?: number;
  /** Die Standarddauer für Toasts */
  defaultDuration?: number;
  /** Die Standardrolle für Toasts */
  defaultRole?: string;
  /** Die Standard-ARIA-Live-Region für Toasts */
  defaultAriaLive?: 'polite' | 'assertive' | 'off';
  /** Ob Toasts standardmäßig schließbar sein sollen */
  defaultIsClosable?: boolean;
  /** Ob Toasts standardmäßig persistent sein sollen */
  defaultIsPersistent?: boolean;
  /** Ob Toasts standardmäßig eine Live-Region sein sollen */
  defaultIsLiveRegion?: boolean;
  /** Ob Toasts standardmäßig automatisch fokussiert werden sollen */
  defaultAutoFocus?: boolean;
  /** Ob der Fokus beim Schließen standardmäßig zurückgesetzt werden soll */
  defaultReturnFocus?: boolean;
  /** Ob Toasts standardmäßig eine Tastaturnavigation haben sollen */
  defaultKeyboardNavigation?: boolean;
  /** Ob Toasts standardmäßig eine Screenreader-Unterstützung haben sollen */
  defaultScreenReaderSupport?: boolean;
  /** Ob Toasts standardmäßig eine Ankündigung haben sollen */
  defaultAnnounce?: boolean;
  /** Das Standardformat für Ankündigungen */
  defaultAnnounceFormat?: string;
  /** Zusätzliche CSS-Klassen für den Container */
  containerClassName?: string;
  /** Zusätzliche Styles für den Container */
  containerStyle?: React.CSSProperties;
  /** Ob der Container eine Rolle haben soll */
  containerRole?: string;
  /** Ob der Container eine ARIA-Live-Region sein soll */
  containerAriaLive?: 'polite' | 'assertive' | 'off';
  /** Ob der Container ARIA-Atomic sein soll */
  containerAriaAtomic?: boolean;
  /** Ob der Container ARIA-Relevant sein soll */
  containerAriaRelevant?: string;
  /** Ob der Container eine Screenreader-Unterstützung haben soll */
  containerScreenReaderSupport?: boolean;
  /** Ob der Container eine Ankündigung haben soll */
  containerAnnounce?: boolean;
  /** Das Format für Ankündigungen des Containers */
  containerAnnounceFormat?: string;
  /** Ob der Container eine Tastaturnavigation haben soll */
  containerKeyboardNavigation?: boolean;
  /** Ob der Container eine Fokusreihenfolge haben soll */
  containerFocusOrder?: boolean;
  /** Ob der Container eine Fokusgruppe sein soll */
  containerFocusGroup?: boolean;
  /** Ob der Container eine Fokusgrenze sein soll */
  containerFocusBoundary?: boolean;
  /** Ob der Container eine Fokusrückkehr haben soll */
  containerFocusReturn?: boolean;
  /** Ob der Container eine Fokuswiederherstellung haben soll */
  containerFocusRestore?: boolean;
  /** Ob der Container eine Fokusverschiebung haben soll */
  containerFocusShift?: boolean;
  /** Ob der Container eine Fokusrotation haben soll */
  containerFocusRotation?: boolean;
  /** Ob der Container eine Fokusumkehrung haben soll */
  containerFocusReverse?: boolean;
  /** Ob der Container eine Fokusumleitung haben soll */
  containerFocusRedirect?: boolean;
  /** Ob der Container eine Fokusumleitung haben soll */
  containerFocusRedirection?: boolean;
}

/**
 * Barrierefreier Toast-Provider für die Verwaltung von Toasts
 *
 * @example
 * ```tsx
 * <ToastProviderA11y>
 *   <App />
 * </ToastProviderA11y>
 * ```
 */
export const ToastProviderA11y: React.FC<ToastProviderA11yProps> = ({
  children,
  maxToasts = 10,
  position = 'bottom-right',
  spacing = 8,
  defaultDuration = 5000,
  defaultRole = 'alert',
  defaultAriaLive = 'polite',
  defaultIsClosable = true,
  defaultIsPersistent = false,
  defaultIsLiveRegion = true,
  defaultAutoFocus = false,
  defaultReturnFocus = true,
  defaultKeyboardNavigation = true,
  defaultScreenReaderSupport = true,
  defaultAnnounce = true,
  defaultAnnounceFormat,
  containerClassName = '',
  containerStyle,
  containerRole = 'region',
  containerAriaLive,
  containerAriaAtomic = true,
  containerAriaRelevant,
  containerScreenReaderSupport = true,
  containerAnnounce = false,
  containerAnnounceFormat,
  containerKeyboardNavigation = true,
  containerFocusOrder = false,
  containerFocusGroup = false,
  containerFocusBoundary = false,
  containerFocusReturn = false,
  containerFocusRestore = false,
  containerFocusShift = false,
  containerFocusRotation = false,
  containerFocusReverse = false,
  containerFocusRedirect = false,
  containerFocusRedirection = false,
}) => {
  // State für die Toasts
  const [toasts, setToasts] = useState<ToastA11yProps[]>([]);

  // Generiere eine eindeutige ID
  const generateId = useCallback(() => {
    return `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }, []);

  // Zeige einen Toast an
  const show = useCallback(
    (options: ToastOptionsA11y): string => {
      const id = options.id || generateId();

      setToasts((prevToasts) => {
        // Begrenze die Anzahl der Toasts
        const limitedToasts = [...prevToasts];
        if (limitedToasts.length >= maxToasts) {
          limitedToasts.shift();
        }

        // Füge den neuen Toast hinzu
        return [
          ...limitedToasts,
          {
            id,
            duration: defaultDuration,
            isClosable: defaultIsClosable,
            isPersistent: defaultIsPersistent,
            role: defaultRole,
            ariaLive: defaultAriaLive,
            isLiveRegion: defaultIsLiveRegion,
            autoFocus: defaultAutoFocus,
            returnFocus: defaultReturnFocus,
            keyboardNavigation: defaultKeyboardNavigation,
            screenReaderSupport: defaultScreenReaderSupport,
            announce: defaultAnnounce,
            announceFormat: defaultAnnounceFormat,
            isVisible: true,
            ...options,
          },
        ];
      });

      return id;
    },
    [
      generateId,
      maxToasts,
      defaultDuration,
      defaultIsClosable,
      defaultIsPersistent,
      defaultRole,
      defaultAriaLive,
      defaultIsLiveRegion,
      defaultAutoFocus,
      defaultReturnFocus,
      defaultKeyboardNavigation,
      defaultScreenReaderSupport,
      defaultAnnounce,
      defaultAnnounceFormat,
    ]
  );

  // Aktualisiere einen Toast
  const update = useCallback((id: string, options: Partial<ToastOptionsA11y>) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) => (toast.id === id ? { ...toast, ...options } : toast))
    );
  }, []);

  // Schließe einen Toast
  const close = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  // Schließe alle Toasts
  const closeAll = useCallback(() => {
    setToasts([]);
  }, []);

  // Prüfe, ob ein Toast aktiv ist
  const isActive = useCallback(
    (id: string) => {
      return toasts.some((toast) => toast.id === id);
    },
    [toasts]
  );

  // Erstelle die Toast-Methoden
  const methods = useMemo<ToastMethodsA11y>(
    () => ({
      show,
      update,
      close,
      closeAll,
      isActive,
    }),
    [show, update, close, closeAll, isActive]
  );

  // Erstelle den Kontext-Wert
  const contextValue = useMemo<ToastContextA11y>(
    () => ({
      toasts,
      methods,
    }),
    [toasts, methods]
  );

  // Bestimme die CSS-Klassen für den Container
  const containerClasses = ['toast-container', `toast-container-${position}`, containerClassName]
    .filter(Boolean)
    .join(' ');

  // Rendere den Provider
  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      <div
        className={containerClasses}
        style={
          {
            ...containerStyle,
            '--toast-spacing': `${spacing}px`,
          } as React.CSSProperties
        }
        role={containerRole}
        aria-live={containerAriaLive}
        aria-atomic={containerAriaAtomic}
        aria-relevant={containerAriaRelevant as any}
      >
        {toasts.map((toast) => (
          <ToastA11y key={toast.id} {...toast} onClose={() => close(toast.id)} />
        ))}

        {/* Screenreader-Ankündigung für den Container */}
        {containerScreenReaderSupport && containerAnnounce && (
          <div className="sr-only" aria-live={containerAriaLive || 'polite'} aria-atomic="true">
            {containerAnnounceFormat || `${toasts.length} Benachrichtigungen`}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
};

/**
 * Hook zum Zugriff auf die Toast-Methoden
 *
 * @example
 * ```tsx
 * const toast = useToastA11y();
 * toast.show({ title: 'Erfolg', description: 'Die Aktion wurde erfolgreich ausgeführt.', type: 'success' });
 * ```
 */
export const useToastA11y = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToastA11y must be used within a ToastProviderA11y');
  }

  return context.methods;
};

/**
 * Hook zum Zugriff auf die Toast-Methoden und Toasts
 *
 * @example
 * ```tsx
 * const { toasts, methods } = useToastContextA11y();
 * ```
 */
export const useToastContextA11y = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToastContextA11y must be used within a ToastProviderA11y');
  }

  return context;
};

export default ToastProviderA11y;
