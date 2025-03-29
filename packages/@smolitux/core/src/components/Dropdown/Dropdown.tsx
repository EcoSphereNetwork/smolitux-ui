// packages/@smolitux/core/src/components/Dropdown/Dropdown.tsx
import React, { useState, useRef, useEffect, createContext, useContext, useCallback } from 'react';
import ReactDOM from 'react-dom';

// Dropdown-Context für Zustände und Funktionen
type DropdownContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeItemIndex: number | null;
  setActiveItemIndex: (index: number | null) => void;
  registerItem: (id: string) => number;
  triggerRef: React.RefObject<HTMLElement>;
  dropdownId: string;
  onSelect?: (value: string) => void;
  closeDropdown: () => void;
};

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

// Hook für Dropdown-Context
export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (context === undefined) {
    throw new Error('useDropdownContext must be used within a Dropdown component');
  }
  return context;
};

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Kinder-Elemente (DropdownToggle, DropdownMenu) */
  children: React.ReactNode;
  /** Ist das Dropdown geöffnet (kontrollierter Modus) */
  isOpen?: boolean;
  /** Callback beim Öffnen/Schließen */
  onOpenChange?: (isOpen: boolean) => void;
  /** Callback beim Öffnen */
  onOpen?: () => void;
  /** Callback beim Schließen */
  onClose?: () => void;
  /** Callback bei Item-Auswahl */
  onSelect?: (value: string) => void;
  /** Position des Dropdowns relativ zum Trigger */
  placement?: 'bottom' | 'top' | 'left' | 'right';
  /** Größe des Dropdowns */
  size?: 'sm' | 'md' | 'lg';
  /** Ist das Dropdown deaktiviert? */
  isDisabled?: boolean;
  /** Bei Klick außerhalb schließen */
  closeOnClickOutside?: boolean;
  /** Bei ESC schließen */
  closeOnEscape?: boolean;
  /** Beim Auswählen eines Items automatisch schließen */
  closeOnSelect?: boolean;
  /** Eindeutige ID für das Dropdown (für ARIA) */
  id?: string;
  /** ARIA-Label für das Dropdown */
  'aria-label'?: string;
}

/**
 * Dropdown-Komponente für Dropdown-Menüs mit verbesserter Barrierefreiheit
 * 
 * @example
 * ```tsx
 * <Dropdown>
 *   <DropdownToggle>Options</DropdownToggle>
 *   <DropdownMenu>
 *     <DropdownItem value="edit">Edit</DropdownItem>
 *     <DropdownItem value="delete">Delete</DropdownItem>
 *   </DropdownMenu>
 * </Dropdown>
 * ```
 */
export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(({
  children,
  isOpen: controlledIsOpen,
  onOpenChange,
  onOpen,
  onClose,
  onSelect,
  placement = 'bottom',
  size = 'md',
  isDisabled = false,
  closeOnClickOutside = true,
  closeOnEscape = true,
  closeOnSelect = true,
  id: providedId,
  'aria-label': ariaLabel,
  className = '',
  ...rest
}, ref) => {
  // Generiere eine eindeutige ID, wenn keine bereitgestellt wurde
  const uniqueIdRef = useRef(`dropdown-${Math.random().toString(36).substr(2, 9)}`);
  const dropdownId = providedId || uniqueIdRef.current;
  
  // State für das Dropdown
  const [isOpen, setIsOpen] = useState(controlledIsOpen || false);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemsMap = useRef(new Map<string, number>());
  const itemsCounter = useRef(0);
  
  // Das Dropdown wird durch externe Props oder internen State gesteuert
  const isControlled = controlledIsOpen !== undefined;
  const dropdownIsOpen = isControlled ? controlledIsOpen : isOpen;
  
  // Registrieren eines neuen Items
  const registerItem = useCallback((id: string) => {
    if (!itemsMap.current.has(id)) {
      itemsMap.current.set(id, itemsCounter.current);
      return itemsCounter.current++;
    }
    return itemsMap.current.get(id)!;
  }, []);
  
  // State-Änderungen propagieren
  const updateOpenState = useCallback((newIsOpen: boolean) => {
    if (!isControlled) {
      setIsOpen(newIsOpen);
    }
    if (onOpenChange) {
      onOpenChange(newIsOpen);
    }
    
    if (newIsOpen) {
      if (onOpen) onOpen();
    } else {
      if (onClose) onClose();
      // Aktives Item zurücksetzen beim Schließen
      setActiveItemIndex(null);
    }
  }, [isControlled, onOpenChange, onOpen, onClose]);
  
  // Dropdown öffnen
  const openDropdown = useCallback(() => {
    if (isDisabled) return;
    updateOpenState(true);
  }, [isDisabled, updateOpenState]);
  
  // Dropdown schließen
  const closeDropdown = useCallback(() => {
    updateOpenState(false);
  }, [updateOpenState]);
  
  // Dropdown umschalten
  const toggleDropdown = useCallback(() => {
    if (isDisabled) return;
    updateOpenState(!dropdownIsOpen);
  }, [isDisabled, dropdownIsOpen, updateOpenState]);
  
  // Bei Klick außerhalb schließen
  useEffect(() => {
    if (!closeOnClickOutside || !dropdownIsOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current && 
        !triggerRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownIsOpen, closeOnClickOutside, closeDropdown]);
  
  // Bei ESC-Taste schließen
  useEffect(() => {
    if (!closeOnEscape || !dropdownIsOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDropdown();
        // Fokus zurück auf den Trigger setzen
        if (triggerRef.current) {
          triggerRef.current.focus();
        }
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [dropdownIsOpen, closeOnEscape, closeDropdown]);
  
  // Größen-spezifische Klassen
  const sizeClasses = {
    sm: 'dropdown-sm',
    md: 'dropdown-md',
    lg: 'dropdown-lg'
  };
  
  // CSS-Klassen zusammenstellen
  const classes = [
    'dropdown',
    sizeClasses[size],
    isDisabled ? 'dropdown-disabled' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <DropdownContext.Provider
      value={{
        isOpen: dropdownIsOpen,
        setIsOpen: updateOpenState,
        activeItemIndex,
        setActiveItemIndex,
        registerItem,
        triggerRef,
        dropdownId,
        onSelect,
        closeDropdown
      }}
    >
      <div
        ref={ref}
        id={dropdownId}
        className={classes}
        data-placement={placement}
        aria-label={ariaLabel}
        data-testid="dropdown"
        {...rest}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;