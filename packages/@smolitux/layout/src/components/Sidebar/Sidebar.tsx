// packages/@smolitux/layout/src/components/Sidebar/Sidebar.tsx
import React, { useState, useEffect, forwardRef } from 'react';
import { useTheme } from '@smolitux/theme';
import { breakpoints } from '@smolitux/utils/styling';

export interface SidebarItem {
  /** Eindeutige ID des Items */
  id: string;
  /** Angezeigter Text */
  label: string;
  /** Icon für das Item (React-Node) */
  icon?: React.ReactNode;
  /** Link-Ziel */
  href?: string;
  /** Ist das Item aktiv? */
  active?: boolean;
  /** Ist das Item deaktiviert? */
  disabled?: boolean;
  /** Untermenü-Items */
  children?: SidebarItem[];
  /** Callback bei Klick */
  onClick?: () => void;
  /** Badge-Text oder -Zahl */
  badge?: string | number;
  /** Badge-Farbe */
  badgeColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

export interface SidebarProps {
  /** Navigation-Items */
  items: SidebarItem[];
  /** Titel der Sidebar */
  title?: React.ReactNode;
  /** Logo der Sidebar */
  logo?: React.ReactNode;
  /** Ist die Sidebar eingeklappt? */
  collapsed?: boolean;
  /** Callback bei Änderung des Collapse-Status */
  onCollapseChange?: (collapsed: boolean) => void;
  /** Zusätzliche HTML-Attribute */
  htmlProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>;
  /** Callback bei Auswahl eines Items */
  onSelect?: (item: SidebarItem) => void;
  /** Position der Sidebar */
  position?: 'left' | 'right';
  /** Feste Sidebar (nicht scrollbar) */
  fixed?: boolean;
  /** Variante der Sidebar */
  variant?: 'default' | 'light' | 'dark' | 'transparent';
  /** Breite der Sidebar (ausgeklappt) */
  width?: string | number;
  /** Breite der Sidebar (eingeklappt) */
  collapsedWidth?: string | number;
  /** Responsive Verhalten aktivieren */
  responsive?: boolean;
  /** Breakpoint ab dem die Sidebar automatisch einklappt */
  collapseBreakpoint?: keyof typeof breakpoints | number;
  /** Footer-Inhalt */
  footer?: React.ReactNode;
}

/**
 * Sidebar-Komponente für Navigation
 * 
 * @example
 * ```tsx
 * <Sidebar
 *   items={[
 *     { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
 *     { id: 'profile', label: 'Profile', icon: <UserIcon /> },
 *     { id: 'settings', label: 'Settings', icon: <SettingsIcon /> }
 *   ]}
 *   title="My App"
 * />
 * ```
 */
export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({
  items,
  title,
  logo,
  collapsed = false,
  onCollapseChange,
  onSelect,
  position = 'left',
  fixed = true,
  variant = 'default',
  width = 240,
  collapsedWidth = 64,
  responsive = false,
  collapseBreakpoint = 'md',
  footer,
  className = '',
  ...rest
}, ref) => {
  const { themeMode } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    if (!responsive) return;
    const bp = typeof collapseBreakpoint === 'number'
      ? collapseBreakpoint
      : parseInt(breakpoints[collapseBreakpoint], 10);
    const handle = () => {
      const shouldCollapse = window.innerWidth < bp;
      setIsCollapsed(shouldCollapse ? true : collapsed);
    };
    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, [responsive, collapseBreakpoint, collapsed]);
  
  // Synchronisiere externen und internen Collapse-Status
  useEffect(() => {
    setIsCollapsed(collapsed);
  }, [collapsed]);
  
  // Umschalten des Collapse-Status
  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onCollapseChange) {
      onCollapseChange(newState);
    }
  };
  
  // Umschalten eines Submenüs
  const toggleSubmenu = (itemId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenSubmenu(openSubmenu === itemId ? null : itemId);
  };
  
  // Behandeln der Auswahl eines Items
  const handleItemClick = (item: SidebarItem, event: React.MouseEvent) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    
    if (item.children && item.children.length > 0) {
      toggleSubmenu(item.id, event);
    } else if (onSelect) {
      onSelect(item);
    }
    
    if (item.onClick) {
      item.onClick();
    }
  };
  
  // Varianten-spezifische Klassen
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-700',
    light: 'bg-gray-50 text-gray-800 border-r border-gray-200',
    dark: 'bg-gray-900 text-gray-200 border-r border-gray-800',
    transparent: 'bg-transparent text-current'
  };
  
  // CSS-Klassen zusammenstellen
  const classes = [
    // Basis-Klassen
    'flex flex-col',
    
    // Variante
    variantClasses[variant],
    
    // Position
    position === 'left' ? 'left-0' : 'right-0',
    
    // Fixierung
    fixed ? 'fixed top-0 bottom-0 z-40' : 'relative',
    
    // Transition für Animation
    'transition-all duration-300 ease-in-out',
    
    // Benutzerdefinierte Klassen
    className
  ].filter(Boolean).join(' ');
  
  // Styles für dynamische Werte (Breite)
  const dynamicStyles = {
    width: isCollapsed 
      ? typeof collapsedWidth === 'number' ? `${collapsedWidth}px` : collapsedWidth
      : typeof width === 'number' ? `${width}px` : width,
    minWidth: isCollapsed 
      ? typeof collapsedWidth === 'number' ? `${collapsedWidth}px` : collapsedWidth
      : typeof width === 'number' ? `${width}px` : width,
  };
  
  // Rendert ein einzelnes Navigations-Item
  const renderItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openSubmenu === item.id;
    
    // Item-Klassen basierend auf Status und Verschachtelung
    const itemClasses = [
      'flex items-center px-4 py-2',
      'text-sm cursor-pointer select-none',
      'transition-colors duration-200',
      level > 0 ? 'pl-8' : '',
      item.active 
        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' 
        : 'hover:bg-gray-100 dark:hover:bg-gray-700',
      item.disabled ? 'opacity-50 cursor-not-allowed' : '',
      item.className || ''
    ].filter(Boolean).join(' ');
    
    return (
      <div key={item.id} className="w-full">
        {/* Haupteintrag */}
        <div
          className={itemClasses}
          onClick={(e) => handleItemClick(item, e)}
          role="button"
          tabIndex={0}
        >
          {/* Icon */}
          {item.icon && (
            <div className="mr-3 flex-shrink-0">
              {item.icon}
            </div>
          )}
          
          {/* Label */}
          {!isCollapsed && (
            <div className="flex-grow truncate">
              {item.label}
            </div>
          )}
          
          {/* Badge */}
          {!isCollapsed && item.badge && (
            <div className={`
              ml-2 px-2 py-0.5 text-xs rounded-full
              ${getBadgeColorClass(item.badgeColor)}
            `}>
              {item.badge}
            </div>
          )}
          
          {/* Dropdown-Pfeil für Submenüs */}
          {!isCollapsed && hasChildren && (
            <div className="ml-2">
              <svg
                className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          )}
        </div>
        
        {/* Untermenü-Items */}
        {!isCollapsed && hasChildren && isOpen && (
          <div className="pl-4 pr-2 pb-2">
            {item.children!.map(child => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };
  
  // Hilfsfunktion für Badge-Farben
  const getBadgeColorClass = (color?: SidebarItem['badgeColor']) => {
    switch (color) {
      case 'primary':
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300';
      case 'secondary':
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300';
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'info':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  return (
    <div
      ref={ref}
      className={classes}
      style={dynamicStyles}
      {...rest}
    >
      {/* Header-Bereich */}
      {(logo || title) && (
        <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
          {/* Logo */}
          {logo && (
            <div className="flex-shrink-0">
              {logo}
            </div>
          )}
          
          {/* Titel */}
          {!isCollapsed && title && (
            <div className="ml-2 text-lg font-semibold truncate">
              {title}
            </div>
          )}
          
          {/* Collapse-Toggle (nur im Desktop-Modus) */}
          <div className="ml-auto">
            <button
              type="button"
              className="p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              onClick={toggleCollapse}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg
                className={`h-5 w-5 transition-transform ${position === 'left' ? (isCollapsed ? '' : 'transform rotate-180') : (isCollapsed ? 'transform rotate-180' : '')}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={position === 'left' 
                    ? "M15 19l-7-7 7-7" 
                    : "M9 5l7 7-7 7"}
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Hauptnavigation */}
      <div className="flex-1 overflow-y-auto py-2">
        {items.map(item => renderItem(item))}
      </div>
      
      {/* Footer-Bereich */}
      {footer && !isCollapsed && (
        <div className="mt-auto border-t border-gray-200 dark:border-gray-700 p-4">
          {footer}
        </div>
      )}
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
