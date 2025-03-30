// packages/@smolitux/core/src/components/Dropdown/DropdownToggleA11y.tsx
import React, { useRef, useEffect } from 'react';
import { useDropdownA11yContext } from './Dropdown.a11y';

export interface DropdownToggleA11yProps extends React.HTMLAttributes<HTMLButtonElement> {
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
  /** ARIA-Label für den Button */
  'aria-label'?: string;
  /** ARIA-Beschreibung für den Button */
  'aria-description'?: string;
}

/**
 * Barrierefreie DropdownToggle-Komponente für den Trigger eines Dropdowns
 * 
 * @example
 * ```tsx
 * <DropdownToggleA11y>Options</DropdownToggleA11y>
 * ```
 */
export const DropdownToggleA11y = React.forwardRef<HTMLButtonElement, DropdownToggleA11yProps>(({
  children,
  icon,
  rightIcon,
  variant = 'default',
  size = 'md',
  isDisabled = false,
  fullWidth = false,
  'aria-label': ariaLabel,
  'aria-description': ariaDescription,
  className = '',
  onClick,
  onKeyDown,
  ...rest
}, ref) => {
  const {
    isOpen,
    setIsOpen,
    triggerRef,
    dropdownId,
    menuId,
    setActiveItemIndex,
    isDisabled: dropdownDisabled,
    firstNonDisabledIndex,
    itemRefs
  } = useDropdownA11yContext();
  
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  
  // Kombiniere den externen ref mit unserem internen ref
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(buttonRef.current);
      } else {
        ref.current = buttonRef.current;
      }
    }
    
    // Setze den triggerRef für den Dropdown-Context
    if (buttonRef.current) {
      triggerRef.current = buttonRef.current;
    }
  }, [ref, triggerRef]);
  
  // Größen-spezifische Klassen
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-2.5'
  };
  
  // Varianten-spezifische Klassen
  const variantClasses = {
    default: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700',
    primary: 'bg-primary-600 text-white border border-primary-600 hover:bg-primary-700 focus:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-800',
    secondary: 'bg-gray-200 text-gray-700 border border-gray-200 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-600',
    outline: 'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700',
    ghost: 'bg-transparent text-gray-700 border-0 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-200 dark:hover:bg-gray-700'
  };
  
  // Basis-Klassen
  const baseClasses = [
    'inline-flex items-center justify-center',
    'font-medium rounded-md',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'transition-colors duration-200',
    sizeClasses[size],
    variantClasses[variant],
    fullWidth ? 'w-full' : '',
    (isDisabled || dropdownDisabled) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    className
  ].filter(Boolean).join(' ');
  
  // Pfeil-Icon basierend auf dem Status
  const arrowIcon = (
    <svg 
      className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
  
  // Handler für Klick-Events
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled || dropdownDisabled) {
      event.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(event);
    }
    
    setIsOpen(!isOpen);
  };
  
  // Handler für Tastatur-Events
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (isDisabled || dropdownDisabled) {
      return;
    }
    
    if (onKeyDown) {
      onKeyDown(event);
    }
    
    switch (event.key) {
      case 'ArrowDown':
      case 'Down':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (firstNonDisabledIndex !== null) {
          setActiveItemIndex(firstNonDisabledIndex);
          itemRefs.current[firstNonDisabledIndex]?.focus();
        }
        break;
      case 'ArrowUp':
      case 'Up':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
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
      className={baseClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isDisabled || dropdownDisabled}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={isOpen ? menuId : undefined}
      aria-label={ariaLabel}
      aria-describedby={ariaDescription ? `${dropdownId}-description` : undefined}
      data-testid="dropdown-toggle"
      {...rest}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      {rightIcon ? <span className="ml-2">{rightIcon}</span> : arrowIcon}
      {ariaDescription && (
        <span id={`${dropdownId}-description`} className="sr-only">
          {ariaDescription}
        </span>
      )}
    </button>
  );
});

DropdownToggleA11y.displayName = 'DropdownToggleA11y';

export default DropdownToggleA11y;