// packages/@smolitux/core/src/components/Dropdown/DropdownMenu.tsx
import React, { useRef, useEffect } from 'react';
import { useDropdownContext } from './Dropdown';

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
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
}

/**
 * DropdownMenu-Komponente für den Inhalt eines Dropdowns
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownItem value="edit">Edit</DropdownItem>
 *   <DropdownItem value="delete">Delete</DropdownItem>
 * </DropdownMenu>
 * ```
 */
export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      children,
      maxHeight,
      minWidth,
      maxWidth,
      variant = 'default',
      size = 'md',
      'aria-label': ariaLabel,
      className = '',
      ...rest
    },
    ref
  ) => {
    const { isOpen, dropdownId, activeItemIndex, setActiveItemIndex, triggerRef } =
      useDropdownContext();

    const menuRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLElement | null)[]>([]);

    // Varianten-spezifische Klassen
    const variantClasses = {
      default: 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200',
      primary: 'bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300',
      secondary:
        'bg-secondary-50 dark:bg-secondary-900/20 text-secondary-800 dark:text-secondary-300',
    };

    // Größen-spezifische Klassen
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    // CSS-Klassen zusammenstellen
    const classes = [
      // Basis-Klassen
      'rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden',
      'absolute z-10 mt-1',

      // Variante
      variantClasses[variant],

      // Größe
      sizeClasses[size],

      // Benutzerdefinierte Klassen
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Inline-Styles für Dimensionen
    const style: React.CSSProperties = {
      ...rest.style,
    };

    if (maxHeight) style.maxHeight = maxHeight;
    if (minWidth) style.minWidth = minWidth;
    if (maxWidth) style.maxWidth = maxWidth;

    // Tastatur-Navigation
    useEffect(() => {
      if (!isOpen || !menuRef.current) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (!itemsRef.current.length) return;

        switch (e.key) {
          case 'ArrowDown':
          case 'Down': // Für ältere Browser
            e.preventDefault();
            setActiveItemIndex((prev) => {
              const nextIndex = prev === null ? 0 : (prev + 1) % itemsRef.current.length;
              const nextItem = itemsRef.current[nextIndex];
              if (nextItem) nextItem.focus();
              return nextIndex;
            });
            break;
          case 'ArrowUp':
          case 'Up': // Für ältere Browser
            e.preventDefault();
            setActiveItemIndex((prev) => {
              const nextIndex =
                prev === null
                  ? itemsRef.current.length - 1
                  : (prev - 1 + itemsRef.current.length) % itemsRef.current.length;
              const nextItem = itemsRef.current[nextIndex];
              if (nextItem) nextItem.focus();
              return nextIndex;
            });
            break;
          case 'Home':
            e.preventDefault();
            if (itemsRef.current[0]) {
              itemsRef.current[0].focus();
              setActiveItemIndex(0);
            }
            break;
          case 'End':
            e.preventDefault();
            const lastIndex = itemsRef.current.length - 1;
            if (itemsRef.current[lastIndex]) {
              itemsRef.current[lastIndex].focus();
              setActiveItemIndex(lastIndex);
            }
            break;
          case 'Tab':
            // Wenn Tab gedrückt wird, schließen wir das Dropdown nicht,
            // sondern lassen die normale Tab-Navigation zu
            break;
          default:
            // Buchstaben-Navigation
            if (e.key.length === 1 && /[a-z0-9]/i.test(e.key)) {
              const char = e.key.toLowerCase();
              // Suche nach einem Item, das mit diesem Buchstaben beginnt
              const items = Array.from(
                menuRef.current?.querySelectorAll('[role="menuitem"]') || []
              );
              const index = items.findIndex((item, idx) => {
                // Beginne die Suche nach dem aktuellen Index
                const startIdx =
                  activeItemIndex !== null ? (activeItemIndex + 1) % items.length : 0;
                const adjustedIdx = (startIdx + idx) % items.length;
                const text = item.textContent?.toLowerCase() || '';
                return text.startsWith(char);
              });

              if (index !== -1) {
                const adjustedIndex =
                  activeItemIndex !== null ? (activeItemIndex + 1 + index) % items.length : index;
                const item = itemsRef.current[adjustedIndex];
                if (item) {
                  item.focus();
                  setActiveItemIndex(adjustedIndex);
                }
              }
            }
            break;
        }
      };

      menuRef.current.addEventListener('keydown', handleKeyDown);
      return () => {
        menuRef.current?.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen, activeItemIndex, setActiveItemIndex]);

    // Fokus auf das erste Item setzen, wenn das Menü geöffnet wird
    useEffect(() => {
      if (isOpen && activeItemIndex === 0 && itemsRef.current[0]) {
        // Kurze Verzögerung, um sicherzustellen, dass das DOM aktualisiert wurde
        setTimeout(() => {
          itemsRef.current[0]?.focus();
        }, 0);
      }
    }, [isOpen, activeItemIndex]);

    // Kinder-Elemente mit Refs versehen
    const childrenWithRefs = React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;

      return React.cloneElement(child, {
        ref: (el: HTMLElement | null) => {
          itemsRef.current[index] = el;

          // Original-Ref weiterleiten
          const originalRef = (child as any).ref;
          if (originalRef) {
            if (typeof originalRef === 'function') {
              originalRef(el);
            } else if (originalRef.hasOwnProperty('current')) {
              originalRef.current = el;
            }
          }
        },
      });
    });

    if (!isOpen) return null;

    return (
      <div
        ref={menuRef}
        id={`${dropdownId}-menu`}
        className={classes}
        style={style}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby={`${dropdownId}-toggle`}
        aria-label={ariaLabel}
        tabIndex={-1}
        {...rest}
      >
        {childrenWithRefs}
      </div>
    );
  }
);

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
