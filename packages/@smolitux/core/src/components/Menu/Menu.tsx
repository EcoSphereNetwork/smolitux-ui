// packages/@smolitux/core/src/components/Menu/Menu.improved.tsx
import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useId,
} from 'react';

// Versuche den Theme-Import, mit Fallback für Tests und Entwicklung
let useTheme: () => { themeMode: string; colors?: Record<string, unknown> };
try {
  useTheme = require('@smolitux/theme').useTheme;
} catch (e) {
  // Fallback für Tests und Entwicklung
  useTheme = () => ({ themeMode: 'light', colors: { primary: { 500: '#3182ce' } } });
}

// Menu-Context für Dropdown-Zustände
type MenuContextType = {
  activeItemIndex: number | null;
  registerItem: (id: string) => number;
  setActiveItemIndex: (index: number | null) => void;
  menuId: string;
  orientation: 'horizontal' | 'vertical';
  onItemSelect?: (itemId: string) => void;
  closeOnSelect?: boolean;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Hook für Menu-Context
export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenuContext must be used within a Menu component');
  }
  return context;
};

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Kinder-Elemente (MenuItems) */
  children: React.ReactNode;
  /** Variante des Menus */
  variant?: 'default' | 'primary' | 'secondary' | 'minimal';
  /** Ausrichtung des Menus */
  direction?: 'horizontal' | 'vertical';
  /** Volle Breite */
  fullWidth?: boolean;
  /** Eingerückte Items (für verschachtelte Menus) */
  indented?: boolean;
  /** Größe des Menus */
  size?: 'sm' | 'md' | 'lg';
  /** Aktiviertes Item (kontrollierter Modus) */
  activeItem?: string | null;
  /** Beim Auswählen eines Items das Menu schließen */
  closeOnSelect?: boolean;
  /** Callback bei Item-Auswahl */
  onItemSelect?: (itemId: string) => void;
  /** ARIA-Label für das Menu */
  ariaLabel?: string;
  /** Beschreibung für das Menu (für Screenreader) */
  description?: string;
  /** Daten-Testid für Tests */
  'data-testid'?: string;
}

/**
 * Menu-Komponente für Navigationsmenüs und Dropdown-Menus
 *
 * @example
 * ```tsx
 * <Menu>
 *   <MenuItem id="home">Home</MenuItem>
 *   <MenuItem id="products">Products</MenuItem>
 *   <MenuItem id="about">About</MenuItem>
 * </Menu>
 * ```
 */
export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      children,
      variant = 'default',
      direction = 'vertical',
      fullWidth = false,
      indented = false,
      size = 'md',
      activeItem,
      closeOnSelect = true,
      onItemSelect,
      className = '',
      ariaLabel,
      description,
      'data-testid': dataTestId = 'menu',
      ...rest
    },
    ref
  ) => {
    // Theme-Werte
    const { themeMode } = useTheme();
    const isDarkMode = themeMode === 'dark';

    // Generiere eindeutige IDs für ARIA-Attribute
    const uniqueId = useId();
    const menuId = rest.id || `menu-${uniqueId}`;
    const descriptionId = description ? `description-${menuId}` : undefined;

    const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
    const itemsMap = useRef(new Map<string, number>());
    const itemsCounter = useRef(0);
    const menuRef = useRef<HTMLDivElement | null>(null) as React.MutableRefObject<HTMLDivElement | null>;

    // Registrieren eines neuen Items
    const registerItem = (id: string) => {
      if (!itemsMap.current.has(id)) {
        itemsMap.current.set(id, itemsCounter.current);
        return itemsCounter.current++;
      }
      return itemsMap.current.get(id)!;
    };

    // Varianten-spezifische Klassen
    const variantClasses = {
      default: 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200',
      primary: 'bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300',
      secondary:
        'bg-secondary-50 dark:bg-secondary-900/20 text-secondary-800 dark:text-secondary-300',
      minimal: 'bg-transparent text-current',
    };

    // Richtungs-spezifische Klassen
    const directionClasses = {
      horizontal: 'flex flex-row',
      vertical: 'flex flex-col',
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
      'rounded-md overflow-hidden',

      // Variante
      variantClasses[variant],

      // Richtung
      directionClasses[direction],

      // Größe
      sizeClasses[size],

      // Weitere Optionen
      fullWidth ? 'w-full' : '',

      // Benutzerdefinierte Klassen
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Tastaturnavigation
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        const itemCount = itemsCounter.current;
        if (itemCount === 0) return;

        let newIndex = activeItemIndex;
        const isHorizontal = direction === 'horizontal';

        switch (event.key) {
          case 'ArrowDown':
            if (isHorizontal) {
              // Öffne Submenu oder wähle erstes Item
              if (activeItemIndex === null) {
                newIndex = 0;
              }
            } else {
              // Nächstes Item
              newIndex = activeItemIndex === null ? 0 : (activeItemIndex + 1) % itemCount;
            }
            event.preventDefault();
            break;
          case 'ArrowUp':
            if (isHorizontal) {
              // Schließe Submenu
            } else {
              // Vorheriges Item
              newIndex =
                activeItemIndex === null
                  ? itemCount - 1
                  : (activeItemIndex - 1 + itemCount) % itemCount;
            }
            event.preventDefault();
            break;
          case 'ArrowRight':
            if (isHorizontal) {
              // Nächstes Item
              newIndex = activeItemIndex === null ? 0 : (activeItemIndex + 1) % itemCount;
            } else {
              // Öffne Submenu
            }
            event.preventDefault();
            break;
          case 'ArrowLeft':
            if (isHorizontal) {
              // Vorheriges Item
              newIndex =
                activeItemIndex === null
                  ? itemCount - 1
                  : (activeItemIndex - 1 + itemCount) % itemCount;
            } else {
              // Schließe Submenu
            }
            event.preventDefault();
            break;
          case 'Home':
            newIndex = 0;
            event.preventDefault();
            break;
          case 'End':
            newIndex = itemCount - 1;
            event.preventDefault();
            break;
          case 'Escape':
            // Schließe Menu oder Submenu
            setActiveItemIndex(null);
            event.preventDefault();
            break;
        }

        if (newIndex !== activeItemIndex) {
          setActiveItemIndex(newIndex);

          // Fokussiere das Item
          const menuElement = menuRef.current;
          if (menuElement) {
            const items = menuElement.querySelectorAll('[role="menuitem"]');
            if (newIndex !== null && newIndex >= 0 && newIndex < items.length) {
              (items[newIndex] as HTMLElement).focus();
            }
          }
        }
      },
      [activeItemIndex, direction]
    );

    // Rendere die versteckte Beschreibung
    const renderDescription = () => {
      if (!description) return null;

      return (
        <div id={descriptionId} className="sr-only" data-testid={`${dataTestId}-description`}>
          {description}
        </div>
      );
    };

    return (
      <>
        {renderDescription()}
        <MenuContext.Provider
          value={{
            activeItemIndex,
            registerItem,
            setActiveItemIndex,
            menuId,
            orientation: direction,
            onItemSelect,
            closeOnSelect,
          }}
        >
          <div
            ref={(node) => {
              // Kombiniere den externen Ref mit unserem internen Ref
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
              }
              if (node) {
                menuRef.current = node;
              }
            }}
            role="menu"
            id={menuId}
            className={classes}
            aria-orientation={direction}
            aria-label={ariaLabel}
            aria-describedby={descriptionId}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            data-testid={dataTestId}
            {...rest}
          >
            {children}
          </div>
        </MenuContext.Provider>
      </>
    );
  }
);

Menu.displayName = 'Menu';

export default Menu;
