// 🛠 FIXME [Codex]: Props nicht typisiert – Fehlerbehebung erforderlich
// packages/@smolitux/core/src/components/Menu/MenuItem.improved.tsx
import React, { useState, useEffect, useRef, useId } from 'react';
import { useMenuContext } from './Menu';

export interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Eindeutige ID für das MenuItem */
  id: string;
  /** Label des MenuItems */
  children: React.ReactNode;
  /** Icon links vom Label */
  icon?: React.ReactNode;
  /** Icon rechts vom Label (für Submenu-Anzeige) */
  rightIcon?: React.ReactNode;
  /** Ist das Item deaktiviert? */
  disabled?: boolean;
  /** Ist das Item aktiv? */
  active?: boolean;
  /** Callback beim Klick */
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
  /** Link, falls das Item ein Link ist */
  href?: string;
  /** Tastenkombination für das Item */
  shortcut?: string;
  /** Submenu-Items */
  submenu?: React.ReactNode;
  /** Ausrichtung des Submenus */
  submenuPosition?: 'right' | 'bottom';
  /** Badge für das Item */
  badge?: React.ReactNode;
  /** Beschreibung für das MenuItem (für Screenreader) */
  description?: string;
  /** Daten-Testid für Tests */
  'data-testid'?: string;
}

/**
 * MenuItem-Komponente für Menu-Einträge
 *
 * @example
 * ```tsx
 * <MenuItem id="save" icon={<SaveIcon />}>Save</MenuItem>
 * ```
 */
export const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>(
  (
    {
      id,
      children,
      icon,
      rightIcon,
      disabled = false,
      active = false,
      onClick,
      href,
      shortcut,
      submenu,
      submenuPosition = 'right',
      badge,
      description,
      className = '',
      'data-testid': dataTestId,
      ...rest
    },
    ref
  ) => {
    const {
      registerItem,
      activeItemIndex,
      setActiveItemIndex,
      menuId,
      orientation,
      onItemSelect,
      closeOnSelect,
    } = useMenuContext();

    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const itemIndex = registerItem(id);
    const itemRef = useRef<HTMLLIElement>(null);

    // Generiere eindeutige IDs für ARIA-Attribute
    const uniqueId = useId();
    const itemId = `menuitem-${id}-${uniqueId}`;
    const submenuId = submenu ? `submenu-${id}-${uniqueId}` : undefined;
    const descriptionId = description ? `description-${id}-${uniqueId}` : undefined;
    const testId = dataTestId || `menu-item-${id}`;

    // Prüfen, ob dieses Item aktiv ist
    const isActive = activeItemIndex === itemIndex || active;

    // Effekt für das Submenu-Handling
    useEffect(() => {
      if (activeItemIndex !== itemIndex) {
        setIsSubMenuOpen(false);
      }
    }, [activeItemIndex, itemIndex]);

    // Click-Handler für das Item
    const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      // Submenu umschalten
      if (submenu) {
        setIsSubMenuOpen(!isSubMenuOpen);
        setActiveItemIndex(isSubMenuOpen ? null : itemIndex);
      } else {
        setActiveItemIndex(itemIndex);

        // Callback für Item-Auswahl
        if (onItemSelect) {
          onItemSelect(id);
        }

        // Menu schließen, wenn closeOnSelect aktiviert ist
        if (closeOnSelect) {
          setTimeout(() => setActiveItemIndex(null), 100);
        }
      }

      // Custom onClick-Handler aufrufen
      if (onClick) {
        onClick(event);
      }
    };

    // Item-Klassen basierend auf Status
    const itemClasses = [
      'flex items-center px-3 py-2',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500',

      // Status-Klassen
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      isActive
        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300'
        : 'hover:bg-gray-100 dark:hover:bg-gray-700',

      // Benutzerdefinierte Klassen
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Basis-Element definieren (Link oder div)
    const ItemComponent: unknown = href && !disabled ? 'a' : 'li';
    const itemProps = href && !disabled ? { href } : {};

    // Rendere die versteckte Beschreibung
    const renderDescription = () => {
      if (!description) return null;

      return (
        <div id={descriptionId} className="sr-only" data-testid={`${testId}-description`}>
          {description}
        </div>
      );
    };

    return (
      <>
        {renderDescription()}
        <ItemComponent
          ref={(node: HTMLLIElement | null) => {
            // Kombiniere den externen Ref mit unserem internen Ref
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLLIElement | null>).current = node;
            }
            itemRef.current = node;
          }}
          id={itemId}
          role="menuitem"
          tabIndex={isActive ? 0 : -1}
          aria-disabled={disabled}
          aria-current={isActive ? 'page' : undefined}
          aria-haspopup={submenu ? true : undefined}
          aria-expanded={submenu ? isSubMenuOpen : undefined}
          aria-controls={submenuId}
          aria-describedby={descriptionId}
          className={itemClasses}
          onClick={handleClick}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick(e as any);
            } else if (
              e.key === 'ArrowRight' &&
              submenu &&
              submenuPosition === 'right' &&
              !isSubMenuOpen
            ) {
              e.preventDefault();
              setIsSubMenuOpen(true);
              setActiveItemIndex(itemIndex);
            } else if (
              e.key === 'ArrowLeft' &&
              submenu &&
              submenuPosition === 'right' &&
              isSubMenuOpen
            ) {
              e.preventDefault();
              setIsSubMenuOpen(false);
            } else if (
              e.key === 'ArrowDown' &&
              submenu &&
              submenuPosition === 'bottom' &&
              !isSubMenuOpen
            ) {
              e.preventDefault();
              setIsSubMenuOpen(true);
              setActiveItemIndex(itemIndex);
            } else if (
              e.key === 'ArrowUp' &&
              submenu &&
              submenuPosition === 'bottom' &&
              isSubMenuOpen
            ) {
              e.preventDefault();
              setIsSubMenuOpen(false);
            }
          }}
          data-testid={testId}
          {...itemProps}
          {...rest}
        >
          {/* Icon (links) */}
          {icon && (
            <span className="mr-2 flex-shrink-0" aria-hidden="true" data-testid={`${testId}-icon`}>
              {icon}
            </span>
          )}

          {/* Hauptinhalt */}
          <span className="flex-grow truncate" data-testid={`${testId}-content`}>
            {children}
          </span>

          {/* Shortcut */}
          {shortcut && (
            <span
              className="ml-4 text-xs text-gray-400 dark:text-gray-500"
              aria-label={`Tastenkombination: ${shortcut}`}
              data-testid={`${testId}-shortcut`}
            >
              {shortcut}
            </span>
          )}

          {/* Badge */}
          {badge && (
            <span
              className="ml-2"
              aria-label={`Badge: ${typeof badge === 'string' ? badge : 'Vorhanden'}`}
              data-testid={`${testId}-badge`}
            >
              {badge}
            </span>
          )}

          {/* Rechtes Icon (für Submenu) */}
          {submenu && (
            <span className="ml-2" aria-hidden="true" data-testid={`${testId}-submenu-icon`}>
              {rightIcon || (
                <svg
                  className={`h-4 w-4 transition-transform ${submenuPosition === 'bottom' ? (isSubMenuOpen ? 'rotate-180' : '') : isSubMenuOpen ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={submenuPosition === 'bottom' ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'}
                  />
                </svg>
              )}
            </span>
          )}
        </ItemComponent>

        {/* Submenu (wenn geöffnet) */}
        {submenu && isSubMenuOpen && (
          <div
            id={submenuId}
            className={`
            ${submenuPosition === 'right' ? 'ml-2' : 'mt-1'} 
            bg-white dark:bg-gray-800 
            rounded-md shadow-md
            border border-gray-200 dark:border-gray-700
          `}
            role="menu"
            aria-label={`Untermenü für ${typeof children === 'string' ? children : id}`}
            data-testid={`${testId}-submenu`}
          >
            {submenu}
          </div>
        )}
      </>
    );
  }
);

MenuItem.displayName = 'MenuItem';

export default MenuItem;
