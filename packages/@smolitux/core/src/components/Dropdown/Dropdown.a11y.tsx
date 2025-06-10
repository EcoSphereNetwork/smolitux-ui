// packages/@smolitux/core/src/components/Dropdown/Dropdown.a11y.tsx
import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useId,
} from 'react';
import ReactDOM from 'react-dom';

// Dropdown-Context für Zustände und Funktionen
type DropdownA11yContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeItemIndex: number | null;
  setActiveItemIndex: (index: number | null) => void;
  registerItem: (id: string) => number;
  triggerRef: React.RefObject<HTMLElement>;
  dropdownId: string;
  menuId: string;
  onSelect?: (value: string) => void;
  closeDropdown: () => void;
  itemRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  firstNonDisabledIndex: number | null;
  lastNonDisabledIndex: number | null;
  setFirstNonDisabledIndex: (index: number | null) => void;
  setLastNonDisabledIndex: (index: number | null) => void;
  isDisabled: boolean;
  returnFocusRef: React.RefObject<HTMLElement>;
};

const DropdownA11yContext = createContext<DropdownA11yContextType | undefined>(undefined);

// Hook für Dropdown-Context
export const useDropdownA11yContext = () => {
  const context = useContext(DropdownA11yContext);
  if (context === undefined) {
    throw new Error('useDropdownA11yContext must be used within a DropdownA11y component');
  }
  return context;
};

export interface DropdownA11yProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
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
  closeOnEsc?: boolean;
  /** Bei Item-Auswahl schließen */
  closeOnSelect?: boolean;
  /** Automatisch fokussieren beim Öffnen */
  autoFocus?: boolean;
  /** Fokus im Dropdown halten */
  trapFocus?: boolean;
  /** Fokus zurücksetzen beim Schließen */
  returnFocus?: boolean;
  /** Benutzerdefinierte ID */
  id?: string;
  /** ARIA-Label für das Dropdown */
  'aria-label'?: string;
  /** ARIA-Beschreibung für das Dropdown */
  'aria-description'?: string;
  /** Benutzerdefiniertes Portal-Element */
  portalContainer?: HTMLElement;
  /** Ob das Dropdown als Portal gerendert werden soll */
  usePortal?: boolean;
  /** Ob das Dropdown als "busy" markiert werden soll */
  busy?: boolean;
  /** Ob das Dropdown als "polite" oder "assertive" angekündigt werden soll */
  liveRegionPoliteness?: 'polite' | 'assertive' | 'off';
  /** Ob das Dropdown als "atomic" angekündigt werden soll */
  atomic?: boolean;
  /** Ob das Dropdown als "relevant" angekündigt werden soll */
  relevant?: 'additions' | 'removals' | 'text' | 'all';
  /** Ob das Dropdown beim Öffnen angekündigt werden soll */
  announceOnOpen?: boolean;
  /** Ob das Dropdown beim Schließen angekündigt werden soll */
  announceOnClose?: boolean;
  /** Text, der beim Öffnen angekündigt werden soll */
  openAnnouncement?: string;
  /** Text, der beim Schließen angekündigt werden soll */
  closeAnnouncement?: string;
}

/**
 * Barrierefreie Dropdown-Komponente
 *
 * @example
 * ```tsx
 * <DropdownA11y>
 *   <DropdownToggleA11y>Options</DropdownToggleA11y>
 *   <DropdownMenuA11y>
 *     <DropdownItemA11y value="edit">Edit</DropdownItemA11y>
 *     <DropdownItemA11y value="delete">Delete</DropdownItemA11y>
 *   </DropdownMenuA11y>
 * </DropdownA11y>
 * ```
 */
export const DropdownA11y = React.forwardRef<HTMLDivElement, DropdownA11yProps>(
  (
    {
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
      closeOnEsc = true,
      closeOnSelect = true,
      autoFocus = true,
      trapFocus = true,
      returnFocus = true,
      id,
      'aria-label': ariaLabel,
      'aria-description': ariaDescription,
      portalContainer,
      usePortal = false,
      busy = false,
      liveRegionPoliteness = 'polite',
      atomic = true,
      relevant,
      announceOnOpen = true,
      announceOnClose = true,
      openAnnouncement,
      closeAnnouncement,
      className = '',
      ...rest
    },
    ref
  ) => {
    // Generiere eindeutige IDs für ARIA-Attribute
    const uniqueId = useId();
    const dropdownId = id || `dropdown-${uniqueId}`;
    const menuId = `${dropdownId}-menu`;
    const liveRegionId = `${dropdownId}-live-region`;

    // State für uncontrolled mode
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
    const [firstNonDisabledIndex, setFirstNonDisabledIndex] = useState<number | null>(null);
    const [lastNonDisabledIndex, setLastNonDisabledIndex] = useState<number | null>(null);
    const [announceMessage, setAnnounceMessage] = useState<string>('');
    const [isClosing, setIsClosing] = useState(false);

    // Refs
    const triggerRef = useRef<HTMLElement>(null);
    const returnFocusRef = useRef<HTMLElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLElement | null)[]>([]);
    const itemIds = useRef<string[]>([]);

    // Bestimme, ob wir controlled oder uncontrolled sind
    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

    // Funktion zum Registrieren von Items
    const registerItem = useCallback((id: string) => {
      const index = itemIds.current.length;
      itemIds.current.push(id);
      return index;
    }, []);

    // Funktion zum Schließen des Dropdowns
    const closeDropdown = useCallback(() => {
      if (!isControlled) {
        setInternalIsOpen(false);
      }

      if (onOpenChange) {
        onOpenChange(false);
      }

      if (onClose) {
        onClose();
      }

      setActiveItemIndex(null);
      setIsClosing(true);
    }, [isControlled, onOpenChange, onClose]);

    // Funktion zum Öffnen des Dropdowns
    const openDropdown = useCallback(() => {
      if (isDisabled) return;

      if (!isControlled) {
        setInternalIsOpen(true);
      }

      if (onOpenChange) {
        onOpenChange(true);
      }

      if (onOpen) {
        onOpen();
      }

      // Setze den aktiven Index auf das erste nicht deaktivierte Item
      if (firstNonDisabledIndex !== null && autoFocus) {
        setActiveItemIndex(firstNonDisabledIndex);
      }
    }, [isDisabled, isControlled, onOpenChange, onOpen, firstNonDisabledIndex, autoFocus]);

    // Effekt für Klick außerhalb
    useEffect(() => {
      if (!isOpen || !closeOnClickOutside) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          closeDropdown();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen, closeOnClickOutside, closeDropdown]);

    // Effekt für ESC-Taste
    useEffect(() => {
      if (!isOpen || !closeOnEsc) return;

      const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeDropdown();

          // Fokus zurück zum Trigger setzen
          if (returnFocus && triggerRef.current) {
            triggerRef.current.focus();
          }
        }
      };

      document.addEventListener('keydown', handleEscKey);

      return () => {
        document.removeEventListener('keydown', handleEscKey);
      };
    }, [isOpen, closeOnEsc, closeDropdown, returnFocus]);

    // Effekt für Fokus-Management
    useEffect(() => {
      if (!isOpen) return;

      // Speichere das aktive Element, um den Fokus später zurückzusetzen
      if (document.activeElement instanceof HTMLElement) {
        returnFocusRef.current = document.activeElement;
      }

      // Fokussiere das erste nicht deaktivierte Item, wenn autoFocus aktiviert ist
      if (autoFocus && firstNonDisabledIndex !== null && itemRefs.current[firstNonDisabledIndex]) {
        setTimeout(() => {
          if (itemRefs.current[firstNonDisabledIndex]) {
            itemRefs.current[firstNonDisabledIndex]?.focus();
          }
        }, 0);
      }
    }, [isOpen, autoFocus, firstNonDisabledIndex]);

    // Effekt für Fokus-Rückgabe beim Schließen
    useEffect(() => {
      if (isOpen || !isClosing || !returnFocus) return;

      if (returnFocusRef.current) {
        returnFocusRef.current.focus();
      } else if (triggerRef.current) {
        triggerRef.current.focus();
      }

      setIsClosing(false);
    }, [isOpen, isClosing, returnFocus]);

    // Effekt für Ankündigungen
    useEffect(() => {
      if (isOpen && announceOnOpen) {
        const message = openAnnouncement || `Dropdown geöffnet: ${ariaLabel || 'Menü'}`;
        setAnnounceMessage(message);
      } else if (!isOpen && announceOnClose && isClosing) {
        const message = closeAnnouncement || `Dropdown geschlossen: ${ariaLabel || 'Menü'}`;
        setAnnounceMessage(message);
      }
    }, [
      isOpen,
      announceOnOpen,
      announceOnClose,
      openAnnouncement,
      closeAnnouncement,
      ariaLabel,
      isClosing,
    ]);

    // Rendere die Live-Region für Ankündigungen
    const renderLiveRegion = () => {
      return (
        <div id={liveRegionId} className="sr-only-container">
          <div
            aria-live={liveRegionPoliteness}
            aria-atomic={atomic}
            aria-relevant={relevant}
            className="sr-only"
          >
            {announceMessage}
          </div>
        </div>
      );
    };

    // Context-Wert
    const contextValue: DropdownA11yContextType = {
      isOpen,
      setIsOpen: isControlled ? onOpenChange || (() => {}) : setInternalIsOpen,
      activeItemIndex,
      setActiveItemIndex,
      registerItem,
      triggerRef,
      dropdownId,
      menuId,
      onSelect,
      closeDropdown,
      itemRefs,
      firstNonDisabledIndex,
      lastNonDisabledIndex,
      setFirstNonDisabledIndex,
      setLastNonDisabledIndex,
      isDisabled,
      returnFocusRef,
    };

    return (
      <DropdownA11yContext.Provider value={contextValue}>
        <div
          ref={ref}
          id={dropdownId}
          className={`relative inline-block ${className}`}
          aria-busy={busy ? 'true' : undefined}
          data-testid="dropdown-container"
          {...rest}
        >
          {renderLiveRegion()}
          {children}
        </div>
      </DropdownA11yContext.Provider>
    );
  }
);

DropdownA11y.displayName = 'DropdownA11y';

export default DropdownA11y;
