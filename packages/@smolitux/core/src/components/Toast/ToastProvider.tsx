// packages/@smolitux/core/src/components/Toast/ToastProvider.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
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
  children
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Toast hinzufügen
  const addToast = useCallback((props: Omit<ToastProps, 'onClose' | 'isOpen'>): string => {
    const id = `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    setToasts(prevToasts => {
      // Bei Überschreitung des Limits die ältesten entfernen
      const newToasts = [...prevToasts, { ...props, id }];
      if (newToasts.length > limit) {
        return newToasts.slice(newToasts.length - limit);
      }
      return newToasts;
    });
    
    return id;
  }, [limit]);

  // Toast entfernen
  const removeToast = useCallback((id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  // Alle Toasts entfernen
  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, removeAllToasts }}>
      {children}
      
      {/* Toast-Container */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          isOpen={true}
          position={toast.position || position}
          onClose={() => removeToast(toast.id)}
          {...toast}
        />
      ))}
    </ToastContext.Provider>
  );
};

/**
 * Hook für den Zugriff auf Toast-Funktionen
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { addToast } = useToast();
 *   
 *   const handleClick = () => {
 *     addToast({
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
  return context;
};

// Hilfsfunktionen für verschiedene Toast-Typen
export const useToastMethods = () => {
  const { addToast } = useToast();
  
  return {
    success: (message: string, props?: Omit<ToastProps, 'type' | 'message' | 'onClose' | 'isOpen'>) => 
      addToast({ type: 'success', message, ...props }),
      
    error: (message: string, props?: Omit<ToastProps, 'type' | 'message' | 'onClose' | 'isOpen'>) => 
      addToast({ type: 'error', message, ...props }),
      
    warning: (message: string, props?: Omit<ToastProps, 'type' | 'message' | 'onClose' | 'isOpen'>) => 
      addToast({ type: 'warning', message, ...props }),
      
    info: (message: string, props?: Omit<ToastProps, 'type' | 'message' | 'onClose' | 'isOpen'>) => 
      addToast({ type: 'info', message, ...props })
  };
};

export default ToastProvider;
