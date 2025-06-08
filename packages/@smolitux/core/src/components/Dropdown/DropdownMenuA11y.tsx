// packages/@smolitux/core/src/components/Dropdown/DropdownMenuA11y.tsx
import React, { useRef, useEffect, useState, Children, isValidElement, cloneElement } from 'react';
import { useDropdownA11yContext } from './Dropdown.a11y';
import { DropdownItemA11yProps } from './DropdownItemA11y';

export interface DropdownMenuA11yProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Kinder-Elemente (DropdownItems) */
  children: React.ReactNode;
  /** Maximale Höhe des Menüs (in px) */
  maxHeight?: number;
  /** Minimale Breite des Menüs (in px) */
  minWidth?: number;
  /** Maximale Breite des Menüs (in px) */
  maxWidth?: number;
  /** Variante des Menüs */
  variant?: 'default' | 'primary' | 'secondary';
  /** Größe des Menüs */
  size?: 'sm' | 'md' | 'lg';
  /** ARIA-Label für das Menü */
  'aria-label'?: string;
  /** ARIA-Beschreibung für das Menü */
  'aria-description'?: string;
}

/**
 * Barrierefreie DropdownMenu-Komponente für den Inhalt eines Dropdowns
 *
 * @example
 * ```tsx
 * <DropdownMenuA11y>
 *   <DropdownItemA11y value="edit">Edit</DropdownItemA11y>
 *   <DropdownItemA11y value="delete">Delete</DropdownItemA11y>
 * </DropdownMenuA11y>
 * ```
 */
export const DropdownMenuA11y = React.forwardRef<HTMLDivElement, DropdownMenuA11yProps>(
  (
    {
      children,
      maxHeight,
      minWidth,
      maxWidth,
      variant = 'default',
      size = 'md',
      'aria-label': ariaLabel,
      'aria-description': ariaDescription,
      className = '',
      ...rest
    },
    ref
  ) => {
    const {
      isOpen,
      dropdownId,
      menuId,
      activeItemIndex,
      setActiveItemIndex,
      triggerRef,
      itemRefs,
      setFirstNonDisabledIndex,
      setLastNonDisabledIndex,
    } = useDropdownA11yContext();

    const menuRef = useRef<HTMLDivElement>(null);
    const [menuItems, setMenuItems] = useState<React.ReactNode[]>([]);

    // Kombiniere den externen ref mit unserem internen ref
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(menuRef.current);
        } else {
          ref.current = menuRef.current;
        }
      }
    }, [ref]);

    // Extrahiere die Menüelemente und finde das erste und letzte nicht deaktivierte Element
    useEffect(() => {
      const items: React.ReactNode[] = [];
      let firstNonDisabled: number | null = null;
      let lastNonDisabled: number | null = null;

      Children.forEach(children, (child, index) => {
        if (isValidElement(child)) {
          items.push(child);

          // Prüfe, ob es sich um ein DropdownItem handelt und ob es nicht deaktiviert ist
          const props = child.props as Partial<DropdownItemA11yProps>;
          if (props.value && !props.isDisabled) {
            if (firstNonDisabled === null) {
              firstNonDisabled = index;
            }
            lastNonDisabled = index;
          }
        }
      });

      setMenuItems(items);
      setFirstNonDisabledIndex(firstNonDisabled);
      setLastNonDisabledIndex(lastNonDisabled);
    }, [children, setFirstNonDisabledIndex, setLastNonDisabledIndex]);

    // Größen-spezifische Klassen
    const sizeClasses = {
      sm: 'text-xs py-1',
      md: 'text-sm py-1',
      lg: 'text-base py-2',
    };

    // Varianten-spezifische Klassen
    const variantClasses = {
      default: 'bg-white border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700',
      primary:
        'bg-primary-50 border border-primary-200 shadow-lg dark:bg-primary-900 dark:border-primary-800',
      secondary:
        'bg-gray-50 border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700',
    };

    // Basis-Klassen
    const baseClasses = [
      'absolute z-10 mt-1 rounded-md',
      'focus:outline-none',
      'overflow-hidden',
      sizeClasses[size],
      variantClasses[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Positionierung basierend auf dem Trigger-Element
    const getPositionStyles = () => {
      if (!triggerRef.current) {
        return {};
      }

      const triggerRect = triggerRef.current.getBoundingClientRect();

      return {
        minWidth: minWidth || triggerRect.width,
        maxWidth: maxWidth || 'auto',
        maxHeight: maxHeight || 'auto',
      };
    };

    // Handler für Tastatur-Navigation
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
        case 'Down':
          event.preventDefault();
          if (activeItemIndex === null && menuItems.length > 0) {
            setActiveItemIndex(0);
            itemRefs.current[0]?.focus();
          } else if (activeItemIndex !== null && activeItemIndex < menuItems.length - 1) {
            setActiveItemIndex(activeItemIndex + 1);
            itemRefs.current[activeItemIndex + 1]?.focus();
          }
          break;
        case 'ArrowUp':
        case 'Up':
          event.preventDefault();
          if (activeItemIndex === null && menuItems.length > 0) {
            setActiveItemIndex(menuItems.length - 1);
            itemRefs.current[menuItems.length - 1]?.focus();
          } else if (activeItemIndex !== null && activeItemIndex > 0) {
            setActiveItemIndex(activeItemIndex - 1);
            itemRefs.current[activeItemIndex - 1]?.focus();
          }
          break;
        case 'Home':
          event.preventDefault();
          if (menuItems.length > 0) {
            setActiveItemIndex(0);
            itemRefs.current[0]?.focus();
          }
          break;
        case 'End':
          event.preventDefault();
          if (menuItems.length > 0) {
            setActiveItemIndex(menuItems.length - 1);
            itemRefs.current[menuItems.length - 1]?.focus();
          }
          break;
        default:
          break;
      }
    };

    // Wenn das Dropdown nicht geöffnet ist, rendere nichts
    if (!isOpen) {
      return null;
    }

    return (
      <div
        ref={menuRef}
        id={menuId}
        className={baseClasses}
        style={getPositionStyles()}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby={`${dropdownId}-toggle`}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        data-testid="dropdown-menu"
        {...rest}
      >
        {ariaDescription && (
          <span id={`${menuId}-description`} className="sr-only">
            {ariaDescription}
          </span>
        )}
        {menuItems}
      </div>
    );
  }
);

DropdownMenuA11y.displayName = 'DropdownMenuA11y';

export default DropdownMenuA11y;
