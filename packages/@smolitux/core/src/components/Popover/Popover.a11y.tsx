// packages/@smolitux/core/src/components/Popover/Popover.a11y.tsx
import React, { useState, useRef, useEffect, useId } from 'react';

export type PopoverPlacement =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end';

export interface PopoverProps {
  /** Inhalt des Popovers */
  content: React.ReactNode;
  /** Trigger-Element */
  children: React.ReactElement;
  /** Position des Popovers */
  placement?: PopoverPlacement;
  /** Ist der Popover offen? (kontrollierter Modus) */
  isOpen?: boolean;
  /** Standard-Offenstatus (unkontrollierter Modus) */
  defaultOpen?: boolean;
  /** Callback beim Öffnen/Schließen */
  onOpenChange?: (isOpen: boolean) => void;
  /** Trigger-Ereignis */
  trigger?: 'click' | 'hover' | 'focus' | 'manual';
  /** Verzögerung vor dem Anzeigen (in ms) */
  openDelay?: number;
  /** Verzögerung vor dem Verstecken (in ms) */
  closeDelay?: number;
  /** Automatisch schließen, wenn außerhalb geklickt wird */
  closeOnClickOutside?: boolean;
  /** Automatisch schließen, wenn ESC gedrückt wird */
  closeOnEsc?: boolean;
  /** Pfeil anzeigen */
  showArrow?: boolean;
  /** Offset vom Trigger-Element (in px) */
  offset?: number;
  /** Maximale Breite des Popovers */
  maxWidth?: number | string;
  /** Titel des Popovers */
  title?: React.ReactNode;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** z-Index für den Popover */
  zIndex?: number;
  /** ARIA-Label für den Popover */
  ariaLabel?: string;
  /** ARIA-Labelledby für den Popover */
  ariaLabelledby?: string;
  /** ARIA-Describedby für den Popover */
  ariaDescribedby?: string;
  /** ARIA-Modal für den Popover */
  ariaModal?: boolean;
  /** ARIA-Live für den Popover */
  ariaLive?: 'polite' | 'assertive' | 'off';
  /** ARIA-Atomic für den Popover */
  ariaAtomic?: boolean;
  /** ARIA-Relevant für den Popover */
  ariaRelevant?: string;
  /** ARIA-Hidden für den Popover */
  ariaHidden?: boolean;
  /** ARIA-Expanded für den Trigger */
  ariaExpanded?: boolean;
  /** ARIA-Haspopup für den Trigger */
  ariaHaspopup?: boolean | 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid';
  /** ARIA-Controls für den Trigger */
  ariaControls?: string;
  /** ARIA-Owns für den Trigger */
  ariaOwns?: string;
  /** ARIA-Pressed für den Trigger */
  ariaPressed?: boolean;
  /** ARIA-Busy für den Popover */
  ariaBusy?: boolean;
  /** ARIA-Disabled für den Popover */
  ariaDisabled?: boolean;
  /** ARIA-Keyshortcuts für den Popover */
  ariaKeyshortcuts?: string;
  /** ARIA-Roledescription für den Popover */
  ariaRoledescription?: string;
  /** Rolle für den Popover */
  role?: string;
  /** Ob der Fokus beim Öffnen auf den Popover gesetzt werden soll */
  autoFocus?: boolean;
  /** Ob der Fokus beim Schließen auf den Trigger zurückgesetzt werden soll */
  returnFocus?: boolean;
  /** Ob der Fokus im Popover gefangen werden soll */
  trapFocus?: boolean;
  /** Ob der Popover eine Tastaturnavigation haben soll */
  keyboardNavigation?: boolean;
  /** Ob der Popover eine Screenreader-Unterstützung haben soll */
  screenReaderSupport?: boolean;
  /** Ob der Popover eine Beschreibung haben soll */
  description?: string;
  /** Ob der Popover eine Live-Region haben soll */
  liveRegion?: boolean;
  /** Ob der Popover eine Ankündigung haben soll */
  announce?: boolean;
}

/**
 * Barrierefreie Popover-Komponente für kontextuelle Informationen
 *
 * @example
 * ```tsx
 * <PopoverA11y
 *   content="Details zu diesem Element"
 *   ariaLabel="Mehr Informationen"
 * >
 *   <Button>Mehr Info</Button>
 * </PopoverA11y>
 * ```
 */
export const PopoverA11y: React.FC<PopoverProps> = ({
  content,
  children,
  placement = 'bottom',
  isOpen: controlledIsOpen,
  defaultOpen = false,
  onOpenChange,
  trigger = 'click',
  openDelay = 0,
  closeDelay = 0,
  closeOnClickOutside = true,
  closeOnEsc = true,
  showArrow = true,
  offset = 8,
  maxWidth = 'none',
  title,
  className = '',
  zIndex = 10,
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  ariaModal = false,
  ariaLive = 'polite',
  ariaAtomic = true,
  ariaRelevant,
  ariaHidden,
  ariaExpanded,
  ariaHaspopup = true,
  ariaControls,
  ariaOwns,
  ariaPressed,
  ariaBusy,
  ariaDisabled,
  ariaKeyshortcuts,
  ariaRoledescription,
  role = 'tooltip',
  autoFocus = false,
  returnFocus = true,
  trapFocus = false,
  keyboardNavigation = true,
  screenReaderSupport = true,
  description,
  liveRegion = true,
  announce = true,
}) => {
  // Generiere eindeutige IDs für ARIA-Attribute
  const uniqueId = useId();
  const popoverId = ariaControls || `popover-${uniqueId}`;
  const titleId = `popover-title-${uniqueId}`;
  const descriptionId = `popover-description-${uniqueId}`;

  // State für den Popover
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [announceMessage, setAnnounceMessage] = useState('');

  // Refs
  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const firstFocusableElementRef = useRef<HTMLElement | null>(null);
  const lastFocusableElementRef = useRef<HTMLElement | null>(null);

  // Verwende den kontrollierten Wert, wenn er vorhanden ist
  const isOpenState = controlledIsOpen !== undefined ? controlledIsOpen : isOpen;

  // Aktualisiere den State, wenn sich der kontrollierte Wert ändert
  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen]);

  // Öffne den Popover
  const open = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }

    if (openDelay > 0) {
      openTimeoutRef.current = setTimeout(() => {
        setIsOpen(true);
        if (onOpenChange) onOpenChange(true);

        // Ankündige das Öffnen für Screenreader
        if (announce) {
          setAnnounceMessage('Popover geöffnet');
        }
      }, openDelay);
    } else {
      setIsOpen(true);
      if (onOpenChange) onOpenChange(true);

      // Ankündige das Öffnen für Screenreader
      if (announce) {
        setAnnounceMessage('Popover geöffnet');
      }
    }
  };

  // Schließe den Popover
  const close = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    if (closeDelay > 0) {
      closeTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
        if (onOpenChange) onOpenChange(false);

        // Ankündige das Schließen für Screenreader
        if (announce) {
          setAnnounceMessage('Popover geschlossen');
        }

        // Setze den Fokus zurück auf den Trigger
        if (returnFocus && triggerRef.current && document.activeElement !== triggerRef.current) {
          triggerRef.current.focus();
        }
      }, closeDelay);
    } else {
      setIsOpen(false);
      if (onOpenChange) onOpenChange(false);

      // Ankündige das Schließen für Screenreader
      if (announce) {
        setAnnounceMessage('Popover geschlossen');
      }

      // Setze den Fokus zurück auf den Trigger
      if (returnFocus && triggerRef.current && document.activeElement !== triggerRef.current) {
        triggerRef.current.focus();
      }
    }
  };

  // Toggle den Popover
  const toggle = () => {
    if (isOpenState) {
      close();
    } else {
      open();
    }
  };

  // Berechne die Position des Popovers
  const calculatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = triggerRect.top - popoverRect.height - offset + scrollTop;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2 + scrollLeft;
        break;
      case 'top-start':
        top = triggerRect.top - popoverRect.height - offset + scrollTop;
        left = triggerRect.left + scrollLeft;
        break;
      case 'top-end':
        top = triggerRect.top - popoverRect.height - offset + scrollTop;
        left = triggerRect.right - popoverRect.width + scrollLeft;
        break;
      case 'bottom':
        top = triggerRect.bottom + offset + scrollTop;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2 + scrollLeft;
        break;
      case 'bottom-start':
        top = triggerRect.bottom + offset + scrollTop;
        left = triggerRect.left + scrollLeft;
        break;
      case 'bottom-end':
        top = triggerRect.bottom + offset + scrollTop;
        left = triggerRect.right - popoverRect.width + scrollLeft;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2 + scrollTop;
        left = triggerRect.left - popoverRect.width - offset + scrollLeft;
        break;
      case 'left-start':
        top = triggerRect.top + scrollTop;
        left = triggerRect.left - popoverRect.width - offset + scrollLeft;
        break;
      case 'left-end':
        top = triggerRect.bottom - popoverRect.height + scrollTop;
        left = triggerRect.left - popoverRect.width - offset + scrollLeft;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2 + scrollTop;
        left = triggerRect.right + offset + scrollLeft;
        break;
      case 'right-start':
        top = triggerRect.top + scrollTop;
        left = triggerRect.right + offset + scrollLeft;
        break;
      case 'right-end':
        top = triggerRect.bottom - popoverRect.height + scrollTop;
        left = triggerRect.right + offset + scrollLeft;
        break;
      default:
        top = triggerRect.bottom + offset + scrollTop;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2 + scrollLeft;
    }

    // Stelle sicher, dass der Popover im Viewport bleibt
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 0) {
      left = 0;
    } else if (left + popoverRect.width > viewportWidth) {
      left = viewportWidth - popoverRect.width;
    }

    if (top < 0) {
      top = 0;
    } else if (top + popoverRect.height > viewportHeight + scrollTop) {
      top = viewportHeight + scrollTop - popoverRect.height;
    }

    setPopoverPosition({ top, left });
  };

  // Finde alle fokussierbaren Elemente im Popover
  const getFocusableElements = () => {
    if (!popoverRef.current) return [];

    return Array.from(
      popoverRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];
  };

  // Setze den Fokus auf das erste fokussierbare Element im Popover
  const focusFirstElement = () => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      firstFocusableElementRef.current = focusableElements[0];
      lastFocusableElementRef.current = focusableElements[focusableElements.length - 1];
      focusableElements[0].focus();
    } else if (popoverRef.current) {
      popoverRef.current.focus();
    }
  };

  // Behandle Escape-Taste
  useEffect(() => {
    if (!isOpenState || !closeOnEsc) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpenState, closeOnEsc]);

  // Behandle Klick außerhalb
  useEffect(() => {
    if (!isOpenState || !closeOnClickOutside) return;

    const handleClick = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpenState, closeOnClickOutside]);

  // Behandle Fokus-Trap
  useEffect(() => {
    if (!isOpenState || !trapFocus) return;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (!firstFocusableElementRef.current || !lastFocusableElementRef.current) {
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
          firstFocusableElementRef.current = focusableElements[0];
          lastFocusableElementRef.current = focusableElements[focusableElements.length - 1];
        } else {
          return;
        }
      }

      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElementRef.current) {
          event.preventDefault();
          lastFocusableElementRef.current?.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElementRef.current) {
          event.preventDefault();
          firstFocusableElementRef.current?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpenState, trapFocus]);

  // Berechne die Position des Popovers, wenn er geöffnet wird
  useEffect(() => {
    if (isOpenState) {
      // Speichere das aktuelle fokussierte Element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Berechne die Position
      calculatePosition();

      // Setze den Fokus auf den Popover oder das erste fokussierbare Element
      if (autoFocus) {
        setTimeout(() => {
          focusFirstElement();
        }, 0);
      }
    }
  }, [isOpenState]);

  // Aktualisiere die Position bei Resize und Scroll
  useEffect(() => {
    if (!isOpenState) return;

    const handleResize = () => calculatePosition();
    const handleScroll = () => calculatePosition();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpenState]);

  // Rendere die Beschreibung für Screenreader
  const renderDescription = () => {
    if (!description || !screenReaderSupport) return null;

    return (
      <div className="sr-only" id={descriptionId}>
        {description}
      </div>
    );
  };

  // Rendere die Live-Region für Ankündigungen
  const renderLiveRegion = () => {
    if (!liveRegion || !screenReaderSupport) return null;

    return (
      <div
        aria-live={ariaLive}
        aria-atomic={ariaAtomic}
        aria-relevant={ariaRelevant}
        className="sr-only"
      >
        {announceMessage}
      </div>
    );
  };

  // Rendere den Pfeil
  const renderArrow = () => {
    if (!showArrow) return null;

    let arrowStyle: React.CSSProperties = {
      position: 'absolute',
      width: '10px',
      height: '10px',
      background: 'inherit',
      borderStyle: 'solid',
      borderWidth: '1px',
      transform: 'rotate(45deg)',
    };

    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        arrowStyle = {
          ...arrowStyle,
          bottom: '-6px',
          borderColor: 'transparent #e5e7eb #e5e7eb transparent',
          borderTopColor: 'transparent',
          borderLeftColor: 'transparent',
        };
        break;
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        arrowStyle = {
          ...arrowStyle,
          top: '-6px',
          borderColor: '#e5e7eb transparent transparent #e5e7eb',
          borderBottomColor: 'transparent',
          borderRightColor: 'transparent',
        };
        break;
      case 'left':
      case 'left-start':
      case 'left-end':
        arrowStyle = {
          ...arrowStyle,
          right: '-6px',
          borderColor: '#e5e7eb #e5e7eb transparent transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
        };
        break;
      case 'right':
      case 'right-start':
      case 'right-end':
        arrowStyle = {
          ...arrowStyle,
          left: '-6px',
          borderColor: 'transparent transparent #e5e7eb #e5e7eb',
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
        };
        break;
    }

    // Positioniere den Pfeil horizontal
    if (placement === 'top' || placement === 'bottom') {
      arrowStyle.left = 'calc(50% - 5px)';
    } else if (placement === 'top-start' || placement === 'bottom-start') {
      arrowStyle.left = '16px';
    } else if (placement === 'top-end' || placement === 'bottom-end') {
      arrowStyle.right = '16px';
    }

    // Positioniere den Pfeil vertikal
    if (placement === 'left' || placement === 'right') {
      arrowStyle.top = 'calc(50% - 5px)';
    } else if (placement === 'left-start' || placement === 'right-start') {
      arrowStyle.top = '16px';
    } else if (placement === 'left-end' || placement === 'right-end') {
      arrowStyle.bottom = '16px';
    }

    return <div style={arrowStyle} aria-hidden="true" data-testid="Popover.a11y" />;
  };

  // Hole die Props für den Trigger
  const getTriggerProps = () => {
    const triggerProps: unknown = {
      ref: (node: unknown) => {
        triggerRef.current = node;

        // Wenn das Kind ein Ref hat, setze es
        const { ref } = children as any;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      'aria-describedby': isOpenState ? popoverId : undefined,
      'aria-expanded': ariaExpanded !== undefined ? ariaExpanded : isOpenState,
      'aria-haspopup': ariaHaspopup,
      'aria-controls': isOpenState ? popoverId : undefined,
      'aria-owns': ariaOwns,
      'aria-pressed': ariaPressed,
    };

    if (trigger === 'click' || trigger === 'manual') {
      triggerProps.onClick = (event: React.MouseEvent) => {
        if (trigger === 'click') {
          toggle();
        }

        // Rufe den ursprünglichen onClick-Handler auf, wenn vorhanden
        if (children.props.onClick) {
          children.props.onClick(event);
        }
      };
    }

    if (trigger === 'hover' || trigger === 'focus') {
      triggerProps.onMouseEnter = (event: React.MouseEvent) => {
        if (trigger === 'hover') {
          open();
        }

        // Rufe den ursprünglichen onMouseEnter-Handler auf, wenn vorhanden
        if (children.props.onMouseEnter) {
          children.props.onMouseEnter(event);
        }
      };

      triggerProps.onMouseLeave = (event: React.MouseEvent) => {
        if (trigger === 'hover') {
          close();
        }

        // Rufe den ursprünglichen onMouseLeave-Handler auf, wenn vorhanden
        if (children.props.onMouseLeave) {
          children.props.onMouseLeave(event);
        }
      };
    }

    if (trigger === 'focus') {
      triggerProps.onFocus = (event: React.FocusEvent) => {
        open();

        // Rufe den ursprünglichen onFocus-Handler auf, wenn vorhanden
        if (children.props.onFocus) {
          children.props.onFocus(event);
        }
      };

      triggerProps.onBlur = (event: React.FocusEvent) => {
        // Schließe nur, wenn der Fokus nicht auf den Popover geht
        if (!popoverRef.current?.contains(event.relatedTarget as Node)) {
          close();
        }

        // Rufe den ursprünglichen onBlur-Handler auf, wenn vorhanden
        if (children.props.onBlur) {
          children.props.onBlur(event);
        }
      };
    }

    return triggerProps;
  };

  // Klone das Trigger-Element mit den zusätzlichen Props
  const triggerElement = React.cloneElement(children, getTriggerProps());

  return (
    <>
      {renderDescription()}
      {renderLiveRegion()}
      {triggerElement}

      {isOpenState && (
        <div
          ref={popoverRef}
          id={popoverId}
          role={role}
          className={`
            absolute z-${zIndex} bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-700 
            rounded-md shadow-md p-4
            ${className}
          `}
          style={{
            top: popoverPosition.top,
            left: popoverPosition.left,
            maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
          }}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby || (title ? titleId : undefined)}
          aria-describedby={ariaDescribedby || (description ? descriptionId : undefined)}
          aria-modal={ariaModal}
          aria-hidden={ariaHidden}
          aria-live={ariaLive}
          aria-atomic={ariaAtomic}
          aria-relevant={ariaRelevant}
          aria-busy={ariaBusy}
          aria-disabled={ariaDisabled}
          aria-keyshortcuts={ariaKeyshortcuts}
          aria-roledescription={ariaRoledescription}
          tabIndex={-1}
        >
          {title && (
            <div id={titleId} className="font-bold mb-2">
              {title}
            </div>
          )}

          <div>{content}</div>

          {renderArrow()}
        </div>
      )}
    </>
  );
};

export default PopoverA11y;
