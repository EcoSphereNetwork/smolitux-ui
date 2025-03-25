// packages/@smolitux/core/src/components/Alert/Alert.tsx
import React from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertProps {
  /** Typ der Benachrichtigung */
  type: AlertType;
  /** Titel der Benachrichtigung */
  title?: string;
  /** Nachrichtentext */
  message: string;
  /** Callback zum Schließen der Benachrichtigung */
  onClose?: () => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Icon anzeigen */
  showIcon?: boolean;
  /** Schließbar machen */
  closable?: boolean;
}

/**
 * Alert-Komponente für Feedback und Benachrichtigungen
 */
export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onClose,
  className = '',
  showIcon = true,
  closable = false
}) => {
  // Stil-Varianten basierend auf dem Typ
  const typeStyles = {
    success: {
      background: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-300 dark:border-green-800',
      titleColor: 'text-green-800 dark:text-green-300',
      textColor: 'text-green-700 dark:text-green-400',
      icon: (
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    error: {
      background: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-300 dark:border-red-800',
      titleColor: 'text-red-800 dark:text-red-300',
      textColor: 'text-red-700 dark:text-red-400',
      icon: (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    warning: {
      background: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-300 dark:border-yellow-800',
      titleColor: 'text-yellow-800 dark:text-yellow-300',
      textColor: 'text-yellow-700 dark:text-yellow-400',
      icon: (
        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      )
    },
    info: {
      background: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-300 dark:border-blue-800',
      titleColor: 'text-blue-800 dark:text-blue-300',
      textColor: 'text-blue-700 dark:text-blue-400',
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    }
  };

  const styles = typeStyles[type];

  return (
    <div className={`p-4 border rounded-lg ${styles.background} ${styles.border} ${className}`} role="alert">
      <div className="flex">
        {showIcon && (
          <div className="flex-shrink-0">
            {styles.icon}
          </div>
        )}
        <div className={`${showIcon ? 'ml-3' : ''} flex-1`}>
          {title && (
            <h3 className={`text-sm font-medium ${styles.titleColor}`}>{title}</h3>
          )}
          <div className={`text-sm ${styles.textColor} ${title ? 'mt-2' : ''}`}>
            {message}
          </div>
        </div>
        {(closable || onClose) && (
          <button
            type="button"
            className={`ml-auto -mx-1.5 -my-1.5 ${styles.textColor} hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-1.5`}
            onClick={onClose}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

// packages/@smolitux/core/src/components/Badge/Badge.tsx
import React from 'react';

export interface BadgeProps {
  /** Anzeigetext */
  children: React.ReactNode;
  /** Variante der Badge */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  /** Größe der Badge */
  size?: 'sm' | 'md' | 'lg'; 
  /** Abgerundeter Stil */
  rounded?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Optional Icon */
  icon?: React.ReactNode;
}

/**
 * Badge-Komponente zum Anzeigen von Status oder Kennzeichnungen
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  className = '',
  icon
}) => {
  // Varianten-spezifische Klassen
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
  };

  // Größen-spezifische Klassen
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2.5 py-0.5',
    lg: 'text-sm px-3 py-1'
  };

  // Form-Klassen
  const roundedClass = rounded ? 'rounded-full' : 'rounded-md';

  // Kombinierte Klassen
  const badgeClasses = [
    'inline-flex items-center font-medium',
    variantClasses[variant],
    sizeClasses[size],
    roundedClass,
    className
  ].join(' ');

  return (
    <span className={badgeClasses}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};

// packages/@smolitux/core/src/components/Tabs/Tabs.tsx
import React, { useState, ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  /** Array der Tab-Elemente */
  tabs: TabItem[];
  /** ID des initial aktiven Tabs */
  defaultTabId?: string;
  /** ID des aktuell aktiven Tabs (kontrollierter Modus) */
  activeTabId?: string;
  /** Callback bei Tab-Wechsel */
  onTabChange?: (tabId: string) => void;
  /** Visuelle Variante */
  variant?: 'default' | 'pills' | 'underline';
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** CSS-Klassen für Tab-Leiste */
  tabsClassName?: string;
  /** CSS-Klassen für Inhaltsbereich */
  contentClassName?: string;
}

/**
 * Tabs-Komponente zur Organisation von Inhalten in Registerkarten
 */
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  activeTabId: controlledActiveTabId,
  onTabChange,
  variant = 'default',
  className = '',
  tabsClassName = '',
  contentClassName = '',
}) => {
  // Unterstützung für kontrollierten und unkontrollierten Modus
  const isControlled = controlledActiveTabId !== undefined;
  const [uncontrolledActiveTabId, setUncontrolledActiveTabId] = useState(
    defaultTabId || (tabs.length > 0 ? tabs[0].id : '')
  );
  
  // Aktive Tab-ID aus kontrolliertem oder unkontrolliertem Zustand
  const activeTabId = isControlled ? controlledActiveTabId : uncontrolledActiveTabId;
  
  // Tab-Wechsel-Handler
  const handleTabChange = (tabId: string) => {
    if (tabId === activeTabId) return;
    
    // Wenn nicht kontrolliert, internen Zustand aktualisieren
    if (!isControlled) {
      setUncontrolledActiveTabId(tabId);
    }
    
    // Callback benachrichtigen, wenn vorhanden
    if (onTabChange) {
      onTabChange(tabId);
    }
  };
  
  // Varianten-spezifische Klassen für die Tab-Leiste
  const variantClasses = {
    default: 'border-b border-gray-200 dark:border-gray-700',
    pills: 'space-x-1',
    underline: 'border-b border-gray-200 dark:border-gray-700',
  };
  
  // Varianten-spezifische Klassen für einzelne Tabs im aktiven/inaktiven Zustand
  const getTabClasses = (isActive: boolean, isDisabled: boolean) => {
    const baseClasses = [
      'py-2 px-4 text-sm font-medium',
      isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      'transition-all duration-200'
    ];
    
    const variantActiveClasses = {
      default: isActive 
        ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400' 
        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 border-b-2 border-transparent',
      pills: isActive 
        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 rounded-md' 
        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md',
      underline: isActive 
        ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400 -mb-px' 
        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 border-transparent',
    };
    
    return [...baseClasses, variantActiveClasses[variant]].join(' ');
  };
  
  return (
    <div className={`w-full ${className}`}>
      {/* Tab-Leiste */}
      <div className={`flex ${variantClasses[variant]} ${tabsClassName}`} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTabId === tab.id}
            aria-controls={`panel-${tab.id}`}
            className={getTabClasses(activeTabId === tab.id, !!tab.disabled)}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                !tab.disabled && handleTabChange(tab.id);
              }
            }}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      
      {/* Tab-Inhaltsbereich */}
      <div className={`tab-content mt-4 ${contentClassName}`}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={tab.id}
            className={`${activeTabId === tab.id ? 'block' : 'hidden'}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

// packages/@smolitux/core/src/components/Spinner/Spinner.tsx
import React from 'react';

export interface SpinnerProps {
  /** Größe des Spinners */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Farbe des Spinners */
  color?: 'primary' | 'secondary' | 'gray' | 'white';
  /** Anzeigetext */
  text?: string;
  /** Als Overlay über den gesamten Inhalt */
  fullScreen?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * Spinner-Komponente zum Anzeigen von Ladeständen
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  text,
  fullScreen = false,
  className = ''
}) => {
  // Größen-spezifische Klassen
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };
  
  // Farben-spezifische Klassen
  const colorClasses = {
    primary: 'text-primary-600 dark:text-primary-400',
    secondary: 'text-secondary-600 dark:text-secondary-400',
    gray: 'text-gray-600 dark:text-gray-400',
    white: 'text-white'
  };
  
  // Der eigentliche Spinner
  const spinnerElement = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg 
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        ></circle>
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {text && <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{text}</p>}
    </div>
  );
  
  // Vollbild-Overlay
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/75 dark:bg-gray-900/75 z-50">
        {spinnerElement}
      </div>
    );
  }
  
  return spinnerElement;
};

// packages/@smolitux/core/src/components/Modal/Modal.tsx
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

// packages/@smolitux/core/src/components/Avatar/Avatar.tsx
import React from 'react';

export interface AvatarProps {
  /** Bildquelle URL */
  src?: string;
  /** Ausweichtext, wenn Bild nicht geladen werden kann */
  alt?: string;
  /** Größe des Avatars */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Platzhaltername (für Avatar ohne Bild) */
  name?: string;
  /** Rahmen hinzufügen */
  bordered?: boolean;
  /** Rahmenfarbe */
  borderColor?: string;
  /** Status */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * Avatar-Komponente für Benutzer oder Profilbilder
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  name,
  bordered = false,
  borderColor,
  status,
  className = ''
}) => {
  // Größen-spezifische Klassen
  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-12 w-12 text-base',
    lg: 'h-16 w-16 text-lg',
    xl: 'h-20 w-20 text-xl'
  };
  
  // Status-spezifische Klassen
  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500'
  };
  
  // Generiere Initialen aus dem Namen
  const getInitials = () => {
    if (!name) return '';
    
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };
  
  // Bestimme Hintergrundfarbe für Platzhalter basierend auf dem Namen
  const getBackgroundColor = () => {
    if (!name) return 'bg-gray-300 dark:bg-gray-600';
    
    // Einfache Hash-Funktion für Namen
    const hash = name.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    // Liste von Farben
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 
      'bg-yellow-500', 'bg-purple-500', 'bg-pink-500',
      'bg-indigo-500', 'bg-teal-500'
    ];
    
    return colors[hash % colors.length];
  };
  
  // Basis-Klassen für den Avatar
  const avatarClasses = [
    'relative rounded-full flex items-center justify-center overflow-hidden',
    sizeClasses[size],
    bordered ? 'border-2' : '',
    borderColor ? `border-${borderColor}` : 'border-white dark:border-gray-800',
    className
  ].join(' ');
  
  return (
    <div className={avatarClasses}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="h-full w-full object-cover" 
          onError={(e) => {
            // Fallback wenn Bild nicht geladen werden kann
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <div className={`h-full w-full flex items-center justify-center text-white ${getBackgroundColor()}`}>
          {getInitials()}
        </div>
      )}
      
      {/* Status-Indikator */}
