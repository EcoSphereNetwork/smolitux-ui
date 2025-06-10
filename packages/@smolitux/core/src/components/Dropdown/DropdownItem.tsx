// 🛠 FIXME [Codex]: Props nicht typisiert – Fehlerbehebung erforderlich
// packages/@smolitux/core/src/components/Dropdown/DropdownItem.tsx
import React, { useRef, useEffect } from 'react';
import { useDropdownContext } from './Dropdown';

export interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Inhalt des Items */
  children: React.ReactNode;
  /** Wert des Items (für onSelect) */
  value?: string;
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
}

/**
 * DropdownItem-Komponente für Einträge in einem Dropdown
 *
 * @example
 * ```tsx
 * <DropdownItem value="edit" icon={<EditIcon />}>Edit</DropdownItem>
 * ```
 */
export const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
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
      className = '',
      ...rest
    },
    ref
  ) => {
    const { activeItemIndex, registerItem, onSelect, closeDropdown } = useDropdownContext();

    const itemRef = useRef<HTMLDivElement | null>(null);
    const itemIndex = registerItem(value);

    // Prüfen, ob dieses Item aktiv ist
    const isActiveItem = activeItemIndex === itemIndex || isActive;

    // Ref-Forwarding
    useEffect(() => {
      if (itemRef.current && ref) {
        if (typeof ref === 'function') {
          ref(itemRef.current);
        } else {
          (ref as React.MutableRefObject<HTMLDivElement>).current = itemRef.current;
        }
      }
    }, [ref]);

    // Click-Handler für das Item
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }

      // Custom onClick-Handler aufrufen
      if (onClick) {
        onClick(event);
      }

      // onSelect-Handler aufrufen
      if (onSelect) {
        onSelect(value);
      }

      // Dropdown schließen
      closeDropdown();
    };

    // Tastatur-Handler
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (isDisabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
          break;
        default:
          break;
      }
    };

    // CSS-Klassen zusammenstellen
    const classes = [
      // Basis-Klassen
      'flex items-center px-4 py-2 text-left w-full',
      'transition-colors duration-150',

      // Status-Klassen
      isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      isActiveItem
        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300'
        : 'hover:bg-gray-100 dark:hover:bg-gray-700',

      // Benutzerdefinierte Klassen
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Basis-Element definieren (Link oder div)
    const ItemComponent: unknown = href && !isDisabled ? 'a' : 'div';
    const itemProps = href && !isDisabled ? { href } : {};

    return (
      <ItemComponent
        ref={itemRef}
        role="menuitem"
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled ? 'true' : 'false'}
        aria-selected={isActiveItem}
        className={classes}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        data-value={value}
        aria-description={description}
        {...itemProps}
        {...rest}
      >
        {/* Icon (links) */}
        {icon && (
          <span className="mr-2 flex-shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}

        {/* Hauptinhalt */}
        <span className="flex-grow truncate">
          {children}
          {description && <span className="sr-only">, {description}</span>}
        </span>

        {/* Shortcut */}
        {shortcut && (
          <span
            className="ml-4 text-xs text-gray-400 dark:text-gray-500"
            aria-label={`Tastenkombination: ${shortcut}`}
          >
            {shortcut}
          </span>
        )}

        {/* Badge */}
        {badge && <span className="ml-2">{badge}</span>}

        {/* Rechtes Icon */}
        {rightIcon && (
          <span className="ml-2" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </ItemComponent>
    );
  }
);

DropdownItem.displayName = 'DropdownItem';

export default DropdownItem;
