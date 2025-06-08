// packages/@smolitux/core/src/components/Dropdown/DropdownItemA11y.tsx
import React, { useRef, useEffect } from 'react';
import { useDropdownA11yContext } from './Dropdown.a11y';

export interface DropdownItemA11yProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Inhalt des Items */
  children: React.ReactNode;
  /** Wert des Items (für onSelect) */
  value: string;
  /** Icon links vom Label */
  icon?: React.ReactNode;
  /** Icon rechts vom Label */
  rightIcon?: React.ReactNode;
  /** Ist das Item deaktiviert? */
  isDisabled?: boolean;
  /** Ist das Item aktiv? */
  isActive?: boolean;
  /** Callback beim Klick */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Link, falls das Item ein Link ist */
  href?: string;
  /** Tastenkombination für das Item */
  shortcut?: string;
  /** Badge für das Item */
  badge?: React.ReactNode;
  /** Beschreibung für Screenreader */
  description?: string;
  /** ARIA-Label für das Item */
  'aria-label'?: string;
}

/**
 * Barrierefreie DropdownItem-Komponente für Einträge in einem Dropdown
 *
 * @example
 * ```tsx
 * <DropdownItemA11y value="edit" icon={<EditIcon />}>Edit</DropdownItemA11y>
 * ```
 */
export const DropdownItemA11y = React.forwardRef<HTMLDivElement, DropdownItemA11yProps>(
  (
    {
      children,
      value,
      icon,
      rightIcon,
      isDisabled = false,
      isActive = false,
      onClick,
      href,
      shortcut,
      badge,
      description,
      'aria-label': ariaLabel,
      className = '',
      onKeyDown,
      ...rest
    },
    ref
  ) => {
    const { activeItemIndex, setActiveItemIndex, registerItem, onSelect, closeDropdown, itemRefs } =
      useDropdownA11yContext();

    const itemRef = useRef<HTMLDivElement | null>(null);
    const itemIndex = useRef<number>(-1);

    // Registriere das Item beim Dropdown
    useEffect(() => {
      itemIndex.current = registerItem(value);

      // Speichere die Referenz im itemRefs-Array
      return () => {
        if (itemRefs.current[itemIndex.current] === itemRef.current) {
          itemRefs.current[itemIndex.current] = null;
        }
      };
    }, [registerItem, value, itemRefs]);

    // Aktualisiere die Referenz im itemRefs-Array
    useEffect(() => {
      if (itemIndex.current >= 0) {
        itemRefs.current[itemIndex.current] = itemRef.current;
      }
    }, [itemRefs]);

    // Kombiniere den externen ref mit unserem internen ref
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(itemRef.current);
        } else {
          ref.current = itemRef.current;
        }
      }
    }, [ref]);

    // Basis-Klassen
    const baseClasses = [
      'flex items-center px-4 py-2',
      'text-gray-700 dark:text-gray-200',
      'hover:bg-gray-100 dark:hover:bg-gray-700',
      'focus:bg-gray-100 dark:focus:bg-gray-700',
      'focus:outline-none',
      'transition-colors duration-150',
      isActive ? 'bg-gray-100 dark:bg-gray-700' : '',
      isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Handler für Klick-Events
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }

      if (onClick) {
        onClick(event);
      }

      if (onSelect) {
        onSelect(value);
      }

      closeDropdown();
    };

    // Handler für Tastatur-Events
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (isDisabled) {
        return;
      }

      if (onKeyDown) {
        onKeyDown(event);
      }

      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (onSelect) {
            onSelect(value);
          }
          closeDropdown();
          break;
        default:
          break;
      }
    };

    // Wenn das Item ein Link ist, rendere es als Anchor-Element
    if (href) {
      return (
        <a
          ref={itemRef as React.RefObject<HTMLAnchorElement>}
          href={isDisabled ? undefined : href}
          className={baseClasses}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="menuitem"
          tabIndex={isDisabled ? -1 : 0}
          aria-disabled={isDisabled ? 'true' : undefined}
          data-testid="dropdown-item"
          {...rest}
        >
          {icon && <span className="mr-2">{icon}</span>}
          <span>{children}</span>
          {description && <span className="sr-only">, {description}</span>}
          {shortcut && (
            <span className="ml-auto pl-4 text-xs text-gray-500 dark:text-gray-400">
              {shortcut}
            </span>
          )}
          {badge && <span className="ml-auto pl-2">{badge}</span>}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </a>
      );
    }

    // Standard-Rendering als Div-Element
    return (
      <div
        ref={itemRef}
        className={baseClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="menuitem"
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled ? 'true' : undefined}
        aria-label={ariaLabel}
        data-testid="dropdown-item"
        {...rest}
      >
        {icon && <span className="mr-2">{icon}</span>}
        <span>{children}</span>
        {description && <span className="sr-only">, {description}</span>}
        {shortcut && (
          <span className="ml-auto pl-4 text-xs text-gray-500 dark:text-gray-400">{shortcut}</span>
        )}
        {badge && <span className="ml-auto pl-2">{badge}</span>}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </div>
    );
  }
);

DropdownItemA11y.displayName = 'DropdownItemA11y';

export default DropdownItemA11y;
