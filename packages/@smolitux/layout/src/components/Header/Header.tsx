// packages/@smolitux/layout/src/components/Header/Header.tsx
import React, { forwardRef } from 'react';
import { useTheme } from '@smolitux/theme';

export interface HeaderProps {
  /** Titel im Header */
  title?: React.ReactNode;
  /** Logo des Headers */
  logo?: React.ReactNode;
  /** Aktionen auf der rechten Seite */
  actions?: React.ReactNode;
  /** Variante des Headers */
  variant?: 'default' | 'transparent' | 'colored';
  /** Farbe für die farbige Variante */
  color?: 'primary' | 'secondary';
  /** Fester Header (immer am oberen Bildschirmrand) */
  fixed?: boolean;
  /** Höhe des Headers */
  height?: 'sm' | 'md' | 'lg';
  /** Shadow unter dem Header */
  shadow?: boolean;
  /** Rand unter dem Header */
  border?: boolean;
  /** Sidebar-Toggle-Button anzeigen */
  showSidebarToggle?: boolean;
  /** Callback für den Sidebar-Toggle */
  onSidebarToggle?: () => void;
}

/**
 * Header-Komponente für Anwendungen
 * 
 * @example
 * ```tsx
 * <Header 
 *   title="Meine App"
 *   actions={<Button>Login</Button>}
 * />
 * ```
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(({
  title,
  logo,
  actions,
  variant = 'default',
  color = 'primary',
  fixed = false,
  height = 'md',
  shadow = true,
  border = true,
  showSidebarToggle = false,
  onSidebarToggle,
  className = '',
  children,
  ...rest
}, ref) => {
  const { themeMode } = useTheme();
  
  // Varianten-spezifische Klassen
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200',
    transparent: 'bg-transparent text-current',
    colored: color === 'primary' 
      ? 'bg-primary-600 text-white' 
      : 'bg-secondary-600 text-white'
  };
  
  // Höhen-Klassen
  const heightClasses = {
    sm: 'h-12',
    md: 'h-16',
    lg: 'h-20'
  };
  
  // CSS-Klassen zusammenstellen
  const classes = [
    // Basis-Klassen
    'flex items-center px-4',
    
    // Variante
    variantClasses[variant],
    
    // Höhe
    heightClasses[height],
    
    // Fixierung
    fixed ? 'fixed top-0 left-0 right-0 z-50' : 'relative',
    
    // Schatten
    shadow ? 'shadow-md' : '',
    
    // Rand
    border ? 'border-b border-gray-200 dark:border-gray-700' : '',
    
    // Benutzerdefinierte Klassen
    className
  ].filter(Boolean).join(' ');
  
  return (
    <header
      ref={ref}
      className={classes}
      {...rest}
    >
      {/* Sidebar-Toggle */}
      {showSidebarToggle && (
        <button
          type="button"
          className="p-2 mr-3 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
          onClick={onSidebarToggle}
          aria-label="Toggle sidebar"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
      
      {/* Logo */}
      {logo && (
        <div className="flex-shrink-0 mr-4">
          {logo}
        </div>
      )}
      
      {/* Titel */}
      {title && (
        <div className="text-lg font-semibold truncate">
          {title}
        </div>
      )}
      
      {/* Kinder-Elemente (in der Mitte) */}
      {children && (
        <div className="flex-grow mx-4">
          {children}
        </div>
      )}
      
      {/* Aktionen (rechts) */}
      {actions && (
        <div className="ml-auto flex items-center">
          {actions}
        </div>
      )}
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
