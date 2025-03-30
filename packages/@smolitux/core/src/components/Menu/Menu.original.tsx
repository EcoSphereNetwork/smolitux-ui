// packages/@smolitux/core/src/components/Menu/Menu.tsx
import React, { useState, useRef, useEffect, createContext, useContext } from 'react';

// Menu-Context für Dropdown-Zustände
type MenuContextType = {
  activeItemIndex: number | null;
  registerItem: (id: string) => number;
  setActiveItemIndex: (index: number | null) => void;
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
export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(({
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
  ...rest
}, ref) => {
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const itemsMap = useRef(new Map<string, number>());
  const itemsCounter = useRef(0);
  
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
    secondary: 'bg-secondary-50 dark:bg-secondary-900/20 text-secondary-800 dark:text-secondary-300',
    minimal: 'bg-transparent text-current'
  };
  
  // Richtungs-spezifische Klassen
  const directionClasses = {
    horizontal: 'flex flex-row',
    vertical: 'flex flex-col'
  };
  
  // Größen-spezifische Klassen
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
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
    className
  ].filter(Boolean).join(' ');
  
  return (
    <MenuContext.Provider
      value={{ 
        activeItemIndex, 
        registerItem, 
        setActiveItemIndex 
      }}
    >
      <div
        ref={ref}
        role="menu"
        className={classes}
        {...rest}
      >
        {children}
      </div>
    </MenuContext.Provider>
  );
});

Menu.displayName = 'Menu';

export default Menu;
