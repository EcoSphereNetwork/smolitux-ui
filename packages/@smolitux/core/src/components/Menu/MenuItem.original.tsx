// 🛠 FIXME [Codex]: Props nicht typisiert – Fehlerbehebung erforderlich
// packages/@smolitux/core/src/components/Menu/MenuItem.tsx
import React, { useState, useEffect } from 'react';
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
      className = '',
      ...rest
    },
    ref
  ) => {
    const { registerItem, activeItemIndex, setActiveItemIndex } = useMenuContext();
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const itemIndex = registerItem(id);

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

    return (
      <>
        <ItemComponent
          ref={ref}
          role="menuitem"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          className={itemClasses}
          onClick={handleClick}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick(e as any);
            }
          }}
          {...itemProps}
          {...rest}
        >
          {/* Icon (links) */}
          {icon && <span className="mr-2 flex-shrink-0">{icon}</span>}

          {/* Hauptinhalt */}
          <span className="flex-grow truncate">{children}</span>

          {/* Shortcut */}
          {shortcut && (
            <span className="ml-4 text-xs text-gray-400 dark:text-gray-500">{shortcut}</span>
          )}

          {/* Badge */}
          {badge && <span className="ml-2">{badge}</span>}

          {/* Rechtes Icon (für Submenu) */}
          {submenu && (
            <span className="ml-2">
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
            className={`
          ${submenuPosition === 'right' ? 'ml-2' : 'mt-1'} 
          bg-white dark:bg-gray-800 
          rounded-md shadow-md
          border border-gray-200 dark:border-gray-700
        `}
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
