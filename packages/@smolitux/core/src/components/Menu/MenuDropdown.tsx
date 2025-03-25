// packages/@smolitux/core/src/components/Menu/MenuDropdown.tsx
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Menu from './Menu';

export interface MenuDropdownProps {
  /** Trigger-Element, das das Dropdown aktiviert */
  trigger: React.ReactElement;
  /** Menu-Inhalt */
  children: React.ReactNode;
  /** Ist das Dropdown geöffnet (kontrollierter Modus) */
  isOpen?: boolean;
  /** Callback beim Öffnen/Schließen */
  onOpenChange?: (isOpen: boolean) => void;
  /** Position des Dropdowns relativ zum Trigger */
  placement?: 'bottom-start' | 'bottom-end' | 'bottom' | 'top-start' | 'top-end' | 'top' | 'right' | 'left';
  /** Offset vom Trigger (in px) */
  offset?: number;
  /** Beim Auswählen eines Items automatisch schließen */
  closeOnSelect?: boolean;
  /** Bei Klick außerhalb schließen */
  closeOnClickOutside?: boolean;
  /** Bei ESC schließen */
  closeOnEscape?: boolean;
  /** Portal-Element für das Dropdown (optional) */
  portalTo?: HTMLElement | null;
  /** Z-Index des Dropdowns */
  zIndex?: number;
  /** Verzögerung bevor das Dropdown geöffnet wird (in ms) */
  openDelay?: number;
  /** Verzögerung bevor das Dropdown geschlossen wird (in ms) */
  closeDelay?: number;
  /** Maximale Breite des Dropdowns */
  maxWidth?: number | string;
  /** Minimale Breite des Dropdowns (Standard: gleiche Breite wie Trigger) */
  minWidth?: number | string;
}

/**
 * MenuDropdown-Komponente für Dropdown-Menüs
 * 
 * @example
 * ```tsx
 * <MenuDropdown 
 *   trigger={<Button>Options</Button>}
 * >
 *   <MenuItem id="edit">Edit</MenuItem>
 *   <MenuItem id="delete">Delete</MenuItem>
 * </MenuDropdown>
 * ```
 */
export const MenuDropdown: React.FC<MenuDropdownProps> = ({
  trigger,
  children,
  isOpen: controlledIsOpen,
  onOpenChange,
  placement = 'bottom-start',
  offset = 8,
  closeOnSelect = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  portalTo = null,
  zIndex = 50,
  openDelay = 0,
  closeDelay = 0,
  maxWidth = 'auto',
  minWidth = 'trigger',
}) => {
  // State für das Dropdown
  const [isOpen, setIsOpen] = useState(controlledIsOpen || false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Das Dropdown wird durch externe Props oder internen State gesteuert
  const isControlled = controlledIsOpen !== undefined;
  const dropdownIsOpen = isControlled ? controlledIsOpen : isOpen;
  
  // State-Änderungen propagieren
  const updateOpenState = (newIsOpen: boolean) => {
    if (!isControlled) {
      setIsOpen(newIsOpen);
    }
    if (onOpenChange) {
      onOpenChange(newIsOpen);
    }
  };
  
  // Position des Dropdowns berechnen
  const calculatePosition = () => {
    if (!triggerRef.current || !dropdownRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    // Viewport-Dimensionen
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Default-Position
    let top = 0;
    let left = 0;
    
    // Position basierend auf Placement berechnen
    switch (placement) {
      case 'bottom-start':
        top = triggerRect.bottom + scrollTop + offset;
        left = triggerRect.left + scrollLeft;
        break;
      case 'bottom-end':
        top = triggerRect.bottom + scrollTop + offset;
        left = triggerRect.right + scrollLeft - dropdownRect.width;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollTop + offset;
        left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (dropdownRect.width / 2);
        break;
      case 'top-start':
        top = triggerRect.top + scrollTop - dropdownRect.height - offset;
        left = triggerRect.left + scrollLeft;
        break;
      case 'top-end':
        top = triggerRect.top + scrollTop - dropdownRect.height - offset;
        left = triggerRect.right + scrollLeft - dropdownRect.width;
        break;
      case 'top':
        top = triggerRect.top + scrollTop - dropdownRect.height - offset;
        left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (dropdownRect.width / 2);
        break;
      case 'right':
        top = triggerRect.top + scrollTop + (triggerRect.height / 2) - (dropdownRect.height / 2);
        left = triggerRect.right + scrollLeft + offset;
        break;
      case 'left':
        top = triggerRect.top + scrollTop + (triggerRect.height / 2) - (dropdownRect.height / 2);
        left = triggerRect.left + scrollLeft - dropdownRect.width - offset;
        break;
      default:
        break;
    }
    
    // Sicherstellen, dass das Dropdown im Viewport bleibt
    if (left < 10) left = 10;
    if (left + dropdownRect.width > viewportWidth - 10) {
      left = viewportWidth - dropdownRect.width - 10;
    }
    
    if (top < 10) top = 10;
    if (top + dropdownRect.height > viewportHeight + scrollTop - 10) {
      // Falls nicht genug Platz unten, oben positionieren
      top = triggerRect.top + scrollTop - dropdownRect.height - offset;
    }
    
    setPosition({ top, left });
  };
  
  // Dropdown öffnen und positionieren
  const openDropdown = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    
    if (openDelay > 0) {
      openTimeoutRef.current = setTimeout(() => {
        updateOpenState(true);
        // In der nächsten Frame-Aktualisierung Position berechnen
        requestAnimationFrame(calculatePosition);
      }, openDelay);
    } else {
      updateOpenState(true);
      // In der nächsten Frame-Aktualisierung Position berechnen
      requestAnimationFrame(calculatePosition);
    }
  };
  
  // Dropdown schließen
  const closeDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    
    if (closeDelay > 0) {
      closeTimeoutRef.current = setTimeout(() => {
        updateOpenState(false);
      }, closeDelay);
    } else {
      updateOpenState(false);
    }
  };
  
  // Dropdown umschalten
  const toggleDropdown = () => {
    if (dropdownIsOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };
  
  // Trigger-Element klonen und Refs/Handler hinzufügen
  const triggerElement = React.cloneElement(trigger, {
    ref: (el: HTMLElement | null) => {
      // Die Ref an das ursprüngliche Element weiterleiten
      const originalRef = (trigger as any).ref;
      if (originalRef && typeof originalRef === 'function') {
        originalRef(el);
      } else if (originalRef && typeof originalRef === 'object' && 'current' in originalRef) {
        (originalRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }
      triggerRef.current = el;
    },
    onClick: (e: React.MouseEvent) => {
      toggleDropdown();
      
      // Den ursprünglichen onClick-Handler aufrufen
      if (trigger.props.onClick) {
        trigger.props.onClick(e);
      }
    },
  });
  
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
  }, [dropdownIsOpen, closeOnClickOutside]);
  
  // Bei ESC-Taste schließen
  useEffect(() => {
    if (!closeOnEscape || !dropdownIsOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDropdown();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [dropdownIsOpen, closeOnEscape]);
  
  // Bei Fenstergröße neu positionieren
  useEffect(() => {
    if (!dropdownIsOpen) return;
    
    const handleResize = () => calculatePosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dropdownIsOpen]);
  
  // Timeouts aufräumen
  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);
  
  // Style für Dropdown-Breite
  const getDropdownStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {
      position: 'fixed',
      top: position.top,
      left: position.left,
      zIndex,
    };
    
    if (maxWidth !== 'auto') {
      style.maxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
    }
    
    if (minWidth === 'trigger' && triggerRef.current) {
      style.minWidth = `${triggerRef.current.offsetWidth}px`;
    } else if (minWidth !== 'trigger') {
      style.minWidth = typeof minWidth === 'number' ? `${minWidth}px` : minWidth;
    }
    
    return style;
  };
  
  // Dropdown-Inhalt rendern
  const renderDropdown = () => {
    const dropdown = (
      <div
        ref={dropdownRef}
        className="rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
        style={getDropdownStyle()}
      >
        <Menu closeOnSelect={closeOnSelect} onItemSelect={closeOnSelect ? closeDropdown : undefined}>
          {children}
        </Menu>
      </div>
    );
    
    // In Portal rendern, falls angegeben
    if (portalTo) {
      return ReactDOM.createPortal(dropdown, portalTo);
    }
    
    return dropdown;
  };
  
  return (
    <>
      {triggerElement}
      {dropdownIsOpen && renderDropdown()}
    </>
  );
};

export default MenuDropdown;
