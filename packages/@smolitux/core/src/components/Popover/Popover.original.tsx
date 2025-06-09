// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
// packages/@smolitux/core/src/components/Popover/Popover.tsx
import React, { useState, useRef, useEffect } from 'react';

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
}

/**
 * Popover-Komponente für kontextuelle Informationen
 *
 * @example
 * ```tsx
 * <Popover content="Details zu diesem Element">
 *   <Button>Mehr Info</Button>
 * </Popover>
 * ```
 */
export const Popover: React.FC<PopoverProps> = ({
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
  maxWidth = 320,
  title,
  className = '',
  zIndex = 50,
}) => {
  // State für unkontrollierten Modus
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultOpen);

  // Kontrollierter vs. unkontrollierter Modus
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  // Refs für DOM-Elemente
  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Refs für Timer
  const openTimerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Position des Popovers
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0 });

  // Helfer-Funktion zum Ändern des offenen Status
  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledIsOpen(nextOpen);
    }
    if (onOpenChange) {
      onOpenChange(nextOpen);
    }
  };

  // Popover öffnen mit Verzögerung
  const openPopover = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    if (openDelay > 0) {
      openTimerRef.current = setTimeout(() => {
        setOpen(true);
      }, openDelay);
    } else {
      setOpen(true);
    }
  };

  // Popover schließen mit Verzögerung
  const closePopover = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }

    if (closeDelay > 0) {
      closeTimerRef.current = setTimeout(() => {
        setOpen(false);
      }, closeDelay);
    } else {
      setOpen(false);
    }
  };

  // Popover-Status umschalten
  const togglePopover = () => {
    isOpen ? closePopover() : openPopover();
  };

  // Position des Popovers berechnen
  const calculatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // Viewport-Dimensionen
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Standardposition und Pfeilposition
    let top = 0;
    let left = 0;
    let arrowTop = 0;
    let arrowLeft = 0;

    // Position basierend auf Placement berechnen
    switch (placement) {
      case 'top':
        top = triggerRect.top + scrollTop - popoverRect.height - offset;
        left = triggerRect.left + scrollLeft + triggerRect.width / 2 - popoverRect.width / 2;
        arrowTop = popoverRect.height;
        arrowLeft = popoverRect.width / 2;
        break;
      case 'top-start':
        top = triggerRect.top + scrollTop - popoverRect.height - offset;
        left = triggerRect.left + scrollLeft;
        arrowTop = popoverRect.height;
        arrowLeft = Math.min(triggerRect.width / 2, 20);
        break;
      case 'top-end':
        top = triggerRect.top + scrollTop - popoverRect.height - offset;
        left = triggerRect.right + scrollLeft - popoverRect.width;
        arrowTop = popoverRect.height;
        arrowLeft = popoverRect.width - Math.min(triggerRect.width / 2, 20);
        break;
      case 'right':
        top = triggerRect.top + scrollTop + triggerRect.height / 2 - popoverRect.height / 2;
        left = triggerRect.right + scrollLeft + offset;
        arrowTop = popoverRect.height / 2;
        arrowLeft = -5;
        break;
      case 'right-start':
        top = triggerRect.top + scrollTop;
        left = triggerRect.right + scrollLeft + offset;
        arrowTop = Math.min(triggerRect.height / 2, 20);
        arrowLeft = -5;
        break;
      case 'right-end':
        top = triggerRect.bottom + scrollTop - popoverRect.height;
        left = triggerRect.right + scrollLeft + offset;
        arrowTop = popoverRect.height - Math.min(triggerRect.height / 2, 20);
        arrowLeft = -5;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollTop + offset;
        left = triggerRect.left + scrollLeft + triggerRect.width / 2 - popoverRect.width / 2;
        arrowTop = -5;
        arrowLeft = popoverRect.width / 2;
        break;
      case 'bottom-start':
        top = triggerRect.bottom + scrollTop + offset;
        left = triggerRect.left + scrollLeft;
        arrowTop = -5;
        arrowLeft = Math.min(triggerRect.width / 2, 20);
        break;
      case 'bottom-end':
        top = triggerRect.bottom + scrollTop + offset;
        left = triggerRect.right + scrollLeft - popoverRect.width;
        arrowTop = -5;
        arrowLeft = popoverRect.width - Math.min(triggerRect.width / 2, 20);
        break;
      case 'left':
        top = triggerRect.top + scrollTop + triggerRect.height / 2 - popoverRect.height / 2;
        left = triggerRect.left + scrollLeft - popoverRect.width - offset;
        arrowTop = popoverRect.height / 2;
        arrowLeft = popoverRect.width;
        break;
      case 'left-start':
        top = triggerRect.top + scrollTop;
        left = triggerRect.left + scrollLeft - popoverRect.width - offset;
        arrowTop = Math.min(triggerRect.height / 2, 20);
        arrowLeft = popoverRect.width;
        break;
      case 'left-end':
        top = triggerRect.bottom + scrollTop - popoverRect.height;
        left = triggerRect.left + scrollLeft - popoverRect.width - offset;
        arrowTop = popoverRect.height - Math.min(triggerRect.height / 2, 20);
        arrowLeft = popoverRect.width;
        break;
      default:
        break;
    }

    // Position innerhalb des Viewports halten
    if (left < 10) {
      arrowLeft += left - 10;
      left = 10;
    } else if (left + popoverRect.width > viewportWidth - 10) {
      const overflow = left + popoverRect.width - (viewportWidth - 10);
      arrowLeft += overflow;
      left -= overflow;
    }

    if (top < 10) {
      arrowTop += top - 10;
      top = 10;
    } else if (top + popoverRect.height > viewportHeight + scrollTop - 10) {
      // Wenn zu weit unten, oberhalb des Triggers anzeigen
      if (placement.startsWith('bottom')) {
        top = triggerRect.top + scrollTop - popoverRect.height - offset;
        arrowTop = popoverRect.height;
      } else {
        const overflow = top + popoverRect.height - (viewportHeight + scrollTop - 10);
        arrowTop += overflow;
        top -= overflow;
      }
    }

    setPopoverPosition({ top, left });
    setArrowPosition({ top: arrowTop, left: arrowLeft });
  };

  // ESC-Taste zum Schließen behandeln
  useEffect(() => {
    if (!closeOnEsc) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closePopover();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEsc]);

  // Klick außerhalb zum Schließen
  useEffect(() => {
    if (!closeOnClickOutside || !isOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        closePopover();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, closeOnClickOutside]);

  // Neuberechnung der Position, wenn sich die Größe ändert
  useEffect(() => {
    if (!isOpen) return;

    calculatePosition();

    const handleResize = () => calculatePosition();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
    };
  }, [isOpen]);

  // Aufräumen der Timer
  useEffect(() => {
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Position nach der ersten Renderung berechnen
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(calculatePosition);
    }
  }, [isOpen]);

  // Events für den Trigger basierend auf dem Trigger-Typ
  const getTriggerProps = () => {
    const commonProps = {
      ref: (el: Element | null) => {
        // Ref vom Original beibehalten, wenn vorhanden
        const child = React.Children.only(children);
        if (React.isValidElement(child)) {
          const originalRef = (child as any).ref;
          if (originalRef && typeof originalRef === 'function') {
            originalRef(el);
          } else if (originalRef && typeof originalRef === 'object' && 'current' in originalRef) {
            (originalRef as React.MutableRefObject<HTMLElement | null>).current = el as HTMLElement;
          }
        }
        if (triggerRef) {
          (triggerRef as React.MutableRefObject<HTMLElement | null>).current = el as HTMLElement;
        }
      },
    };

    if (trigger === 'manual') {
      return commonProps;
    }

    if (trigger === 'click') {
      return {
        ...commonProps,
        onClick: (e: React.MouseEvent) => {
          togglePopover();
          if (children.props.onClick) {
            children.props.onClick(e);
          }
        },
      };
    }

    if (trigger === 'hover') {
      return {
        ...commonProps,
        onMouseEnter: (e: React.MouseEvent) => {
          openPopover();
          if (children.props.onMouseEnter) {
            children.props.onMouseEnter(e);
          }
        },
        onMouseLeave: (e: React.MouseEvent) => {
          closePopover();
          if (children.props.onMouseLeave) {
            children.props.onMouseLeave(e);
          }
        },
      };
    }

    if (trigger === 'focus') {
      return {
        ...commonProps,
        onFocus: (e: React.FocusEvent) => {
          openPopover();
          if (children.props.onFocus) {
            children.props.onFocus(e);
          }
        },
        onBlur: (e: React.FocusEvent) => {
          closePopover();
          if (children.props.onBlur) {
            children.props.onBlur(e);
          }
        },
      };
    }

    return commonProps;
  };

  // Pfeilform basierend auf Placement
  const getArrowStyles = () => {
    // Basis-Styles
    const baseStyles: React.CSSProperties = {
      position: 'absolute',
      width: '10px',
      height: '10px',
      transform: 'rotate(45deg)',
      backgroundColor: 'inherit',
      border: 'inherit',
      zIndex: -1,
    };

    if (placement.startsWith('top')) {
      return {
        ...baseStyles,
        bottom: '-5px',
        borderBottom: '1px solid #e2e8f0',
        borderRight: '1px solid #e2e8f0',
        borderTop: 'none',
        borderLeft: 'none',
      };
    } else if (placement.startsWith('right')) {
      return {
        ...baseStyles,
        left: '-5px',
        borderLeft: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        borderTop: 'none',
        borderRight: 'none',
      };
    } else if (placement.startsWith('bottom')) {
      return {
        ...baseStyles,
        top: '-5px',
        borderTop: '1px solid #e2e8f0',
        borderLeft: '1px solid #e2e8f0',
        borderBottom: 'none',
        borderRight: 'none',
      };
    } else if (placement.startsWith('left')) {
      return {
        ...baseStyles,
        right: '-5px',
        borderRight: '1px solid #e2e8f0',
        borderTop: '1px solid #e2e8f0',
        borderBottom: 'none',
        borderLeft: 'none',
      };
    }

    return baseStyles;
  };

  // Trigger Element mit neuen Props klonen
  const triggerElement = React.cloneElement(React.Children.only(children), getTriggerProps());

  return (
    <>
      {triggerElement}

      {isOpen && (
        <div
          ref={popoverRef}
          role="tooltip"
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
        >
          {/* Title */}
          {title && (
            <div className="mb-2 font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              {title}
            </div>
          )}

          {/* Content */}
          <div>{content}</div>

          {/* Arrow */}
          {showArrow && (
            <div
              style={{
                ...getArrowStyles(),
                top: arrowPosition.top === 0 ? undefined : arrowPosition.top,
                left: arrowPosition.left === 0 ? undefined : arrowPosition.left,
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Popover;
