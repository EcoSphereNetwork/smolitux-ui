// packages/@smolitux/core/src/components/Dropdown/DropdownToggle.tsx
import React, { useRef, useEffect } from 'react';
import { useDropdownContext } from './Dropdown';

export interface DropdownToggleProps extends React.HTMLAttributes<HTMLButtonElement> {
  /** Inhalt des Toggle-Buttons */
  children: React.ReactNode;
  /** Icon links vom Label */
  icon?: React.ReactNode;
  /** Icon rechts vom Label */
  rightIcon?: React.ReactNode;
  /** Variante des Buttons */
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Größe des Buttons */
  size?: 'sm' | 'md' | 'lg';
  /** Ist der Button deaktiviert? */
  isDisabled?: boolean;
  /** Volle Breite */
  fullWidth?: boolean;
}

/**
 * DropdownToggle-Komponente für den Trigger eines Dropdowns
 *
 * @example
 * ```tsx
 * <DropdownToggle>Options</DropdownToggle>
 * ```
 */
export const DropdownToggle = React.forwardRef<HTMLButtonElement, DropdownToggleProps>(
  (
    {
      children,
      icon,
      rightIcon,
      variant = 'default',
      size = 'md',
      isDisabled = false,
      fullWidth = false,
      className = '',
      onClick,
      ...rest
    },
    ref
  ) => {
    const { isOpen, setIsOpen, triggerRef, dropdownId, setActiveItemIndex } = useDropdownContext();

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // Ref-Forwarding
    useEffect(() => {
      if (buttonRef.current) {
        // Ref an den übergeordneten Context weitergeben
        if (triggerRef) {
          (triggerRef as React.MutableRefObject<HTMLElement>).current = buttonRef.current;
        }

        // Ref an den Consumer weitergeben
        if (ref) {
          if (typeof ref === 'function') {
            ref(buttonRef.current);
          } else {
            (ref as React.MutableRefObject<HTMLButtonElement>).current = buttonRef.current;
          }
        }
      }
    }, [ref, triggerRef]);

    // Varianten-spezifische Klassen
    const variantClasses = {
      default:
        'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700',
      primary:
        'bg-primary-600 text-white border border-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:border-primary-700 dark:hover:bg-primary-800',
      secondary:
        'bg-secondary-600 text-white border border-secondary-600 hover:bg-secondary-700 dark:bg-secondary-700 dark:border-secondary-700 dark:hover:bg-secondary-800',
      outline:
        'bg-transparent text-gray-800 border border-gray-300 hover:bg-gray-50 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800',
      ghost:
        'bg-transparent text-gray-800 border-none hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800',
    };

    // Größen-spezifische Klassen
    const sizeClasses = {
      sm: 'text-xs py-1 px-2',
      md: 'text-sm py-2 px-3',
      lg: 'text-base py-2.5 px-4',
    };

    // CSS-Klassen zusammenstellen
    const classes = [
      // Basis-Klassen
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',

      // Variante
      variantClasses[variant],

      // Größe
      sizeClasses[size],

      // Status
      isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',

      // Weitere Optionen
      fullWidth ? 'w-full' : '',

      // Benutzerdefinierte Klassen
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Click-Handler
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }

      setIsOpen(!isOpen);

      // Wenn das Dropdown geöffnet wird, das erste Item aktivieren
      if (!isOpen) {
        setActiveItemIndex(0);
      }

      // Custom onClick-Handler aufrufen
      if (onClick) {
        onClick(e);
      }
    };

    // Tastatur-Handler
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (isDisabled) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'Down': // Für ältere Browser
          e.preventDefault();
          setIsOpen(true);
          setActiveItemIndex(0);
          break;
        case 'ArrowUp':
        case 'Up': // Für ältere Browser
          e.preventDefault();
          setIsOpen(true);
          setActiveItemIndex(-1); // Das letzte Item aktivieren
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          setIsOpen(!isOpen);
          break;
        default:
          break;
      }
    };

    return (
      <button
        ref={buttonRef}
        type="button"
        className={classes}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? `${dropdownId}-menu` : undefined}
        aria-disabled={isDisabled ? 'true' : 'false'}
        disabled={isDisabled}
        {...rest}
      >
        {/* Icon (links) */}
        {icon && <span className="mr-2">{icon}</span>}

        {/* Hauptinhalt */}
        <span>{children}</span>

        {/* Icon (rechts) oder Standard-Dropdown-Icon */}
        {rightIcon ? (
          <span className="ml-2">{rightIcon}</span>
        ) : (
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
    );
  }
);

DropdownToggle.displayName = 'DropdownToggle';

export default DropdownToggle;
