// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
// packages/@smolitux/core/src/components/Toast/ToastProvider.improved.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode, useId } from 'react';
import { Toast, ToastProps, ToastType } from './Toast';

// Struktur für die Toast-Einträge
interface ToastItem extends Omit<ToastProps, 'onClose' | 'isOpen'> {
  id: string;
}

// Context-Interface
interface ToastContextType {
  addToast: (props: Omit<ToastProps, 'onClose' | 'isOpen'>) => string;
  removeToast: (id: string) => void;
  removeAllToasts: () => void;
  toasts: ToastItem[];
}

// Erstellen des Contexts
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast-Provider-Props
export interface ToastProviderProps {
  /** Limit für gleichzeitig angezeigte Toasts */
  limit?: number;
  /** Position aller Toasts */
  position?: ToastProps['position'];
  /** Kinder-Elemente */
  children: ReactNode;
  /** Daten-Testid für Tests */
  'data-testid'?: string;
}

/**
 * Provider für Toast-Benachrichtigungen
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <ToastProvider>
 *       <YourApp />
 *     </ToastProvider>
 *   );
 * }
 * ```
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({
  limit = 5,
  position = 'top-right',
  children,
  'data-testid': dataTestId = 'toast-provider',
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const providerId = useId();

  // Toast hinzufügen
  const addToast = useCallback(
    (props: Omit<ToastProps, 'onClose' | 'isOpen'>): string => {
      const id = `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      setToasts((prevToasts) => {
        // Bei Überschreitung des Limits die ältesten entfernen
        const newToasts = [...prevToasts, { ...props, id }];
        if (newToasts.length > limit) {
          return newToasts.slice(newToasts.length - limit);
        }
        return newToasts;
      });

      return id;
    },
    [limit]
  );

  // Toast entfernen
  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  // Alle Toasts entfernen
  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, removeAllToasts, toasts }}>
      {children}

      {/* Toast-Container */}
      <div
        id={`toast-container-${providerId}`}
        aria-live="polite"
        aria-atomic="true"
        className="toast-container"
        data-testid={dataTestId}
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            isOpen={true}
            position={toast.position || position}
            onClose={() => removeToast(toast.id)}
            data-testid={`${dataTestId}-toast-${toast.id}`}
            {...toast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

/**
 * Hook für den Zugriff auf Toast-Funktionen
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const toast = useToast();
 *
 *   const handleClick = () => {
 *     toast.show({
 *       type: 'success',
 *       title: 'Erfolg',
 *       message: 'Aktion erfolgreich durchgeführt'
 *     });
 *   };
 *
 *   return <Button onClick={handleClick}>Toast anzeigen</Button>;
 * }
 * ```
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  // Erweiterte API für einfachere Nutzung
  return {
    // Grundlegende Funktionen
    show: context.addToast,
    close: context.removeToast,
    closeAll: context.removeAllToasts,

    // Hilfsfunktionen für verschiedene Toast-Typen
    success: (
      message: string,
      props?: Omit<ToastProps, 'type' | 'message' | 'onClose' | 'isOpen'>
    ) => context.addToast({ type: 'success', message, ...props }),

    error: (message: string, props?: Omit<ToastProps, 'type' | 'message' | 'onClose' | 'isOpen'>) =>
      context.addToast({ type: 'error', message, ...props }),

    warning: (
      message: string,
      props?: Omit<ToastProps, 'type' | 'message' | 'onClose' | 'isOpen'>
    ) => context.addToast({ type: 'warning', message, ...props }),

    info: (message: string, props?: Omit<ToastProps, 'type' | 'message' | 'onClose' | 'isOpen'>) =>
      context.addToast({ type: 'info', message, ...props }),

    // Zugriff auf aktuelle Toasts
    toasts: context.toasts,
  };
};

export default ToastProvider;
