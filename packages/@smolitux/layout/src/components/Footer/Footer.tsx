// packages/@smolitux/layout/src/components/Footer/Footer.tsx
import React, { forwardRef } from 'react';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Copyright-Text */
  copyright?: React.ReactNode;
  /** Logo im Footer */
  logo?: React.ReactNode;
  /** Links im Footer */
  links?: React.ReactNode;
  /** Variante des Footers */
  variant?: 'default' | 'minimal' | 'colored';
  /** Farbe für die farbige Variante */
  color?: 'primary' | 'secondary';
  /** Fester Footer (immer am unteren Bildschirmrand) */
  fixed?: boolean;
  /** Höhe des Footers */
  height?: 'sm' | 'md' | 'lg';
  /** Rand über dem Footer */
  border?: boolean;
}

/**
 * Footer-Komponente für Anwendungen
 * 
 * @example
 * ```tsx
 * <Footer 
 *   copyright="© 2025 My Company"
 *   links={<a href="/impressum">Impressum</a>}
 * />
 * ```
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(({
  copyright,
  logo,
  links,
  variant = 'default',
  color = 'primary',
  fixed = false,
  height = 'md',
  border = true,
  className = '',
  children,
  ...rest
}, ref) => {
  // Varianten-spezifische Klassen
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300',
    minimal: 'bg-transparent text-current',
    colored: color === 'primary' 
      ? 'bg-primary-600 text-white' 
      : 'bg-secondary-600 text-white'
  };
  
  // Höhen-Klassen
  const heightClasses = {
    sm: 'py-2',
    md: 'py-4',
    lg: 'py-6'
  };
  
  // CSS-Klassen zusammenstellen
  const classes = [
    // Basis-Klassen
    'w-full px-4',
    
    // Variante
    variantClasses[variant],
    
    // Höhe
    heightClasses[height],
    
    // Fixierung
    fixed ? 'fixed bottom-0 left-0 right-0 z-40' : 'relative',
    
    // Rand
    border ? 'border-t border-gray-200 dark:border-gray-700' : '',
    
    // Benutzerdefinierte Klassen
    className
  ].filter(Boolean).join(' ');
  
  return (
    <footer
      ref={ref}
      className={classes}
      {...rest}
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Logo und Copyright */}
        <div className="flex items-center mb-4 md:mb-0">
          {logo && (
            <div className="flex-shrink-0 mr-4">
              {logo}
            </div>
          )}
          
          {copyright && (
            <div className="text-sm">
              {copyright}
            </div>
          )}
        </div>
        
        {/* Kinder-Elemente (in der Mitte) */}
        {children && (
          <div className="mb-4 md:mb-0 md:mx-4">
            {children}
          </div>
        )}
        
        {/* Links (rechts) */}
        {links && (
          <div className="flex items-center space-x-4 text-sm">
            {links}
          </div>
        )}
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
