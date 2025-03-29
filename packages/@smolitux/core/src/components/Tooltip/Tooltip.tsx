import React, { useState, useRef, useEffect } from 'react';

export type TooltipPlacement = 
  | 'top' 
  | 'top-start' 
  | 'top-end' 
  | 'right' 
  | 'right-start' 
  | 'right-end' 
  | 'bottom' 
  | 'bottom-start' 
  | 'bottom-end' 
  | 'left' 
  | 'left-start' 
  | 'left-end';

export interface TooltipProps {
  /** Tooltip-Inhalt */
  content: React.ReactNode;
  /** Das Element, das mit dem Tooltip versehen werden soll */
  children: React.ReactElement;
  /** Position des Tooltips */
  placement?: TooltipPlacement;
  /** Verzögerung vor dem Anzeigen (in ms) */
  delay?: number;
  /** Verzögerung vor dem Verstecken (in ms) */
  hideDelay?: number;
  /** Maximale Breite des Tooltips */
  maxWidth?: number | string;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Deaktiviert den Tooltip */
  disabled?: boolean;
  /** Pfeil anzeigen */
  arrow?: boolean;
  /** ID für Barrierefreiheit */
  id?: string;
  /** Ob der Tooltip immer sichtbar sein soll */
  isOpen?: boolean;
  /** Callback, wenn der Tooltip geöffnet wird */
  onOpen?: () => void;
  /** Callback, wenn der Tooltip geschlossen wird */
  onClose?: () => void;
  /** Ob der Tooltip beim Klicken auf das Trigger-Element umgeschaltet werden soll */
  isToggleable?: boolean;
  /** Ob der Tooltip beim Klicken außerhalb geschlossen werden soll */
  closeOnOutsideClick?: boolean;
  /** Ob der Tooltip beim Drücken der Escape-Taste geschlossen werden soll */
  closeOnEsc?: boolean;
  /** Ob der Tooltip beim Scrollen geschlossen werden soll */
  closeOnScroll?: boolean;
  /** Ob der Tooltip beim Klicken auf den Tooltip selbst geschlossen werden soll */
  closeOnTooltipClick?: boolean;
  /** Offset vom Trigger-Element */
  offset?: number;
  /** Hintergrundfarbe des Tooltips */
  backgroundColor?: string;
  /** Textfarbe des Tooltips */
  textColor?: string;
  /** Ob der Tooltip animiert werden soll */
  animated?: boolean;
  /** Ob der Tooltip einen Schatten haben soll */
  shadow?: boolean;
  /** Ob der Tooltip abgerundete Ecken haben soll */
  rounded?: boolean;
  /** Ob der Tooltip einen Rahmen haben soll */
  bordered?: boolean;
  /** Rahmenfarbe des Tooltips */
  borderColor?: string;
}

/**
 * Tooltip-Komponente für Hilfetexte
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  delay = 200,
  hideDelay = 100,
  maxWidth = 250,
  className = '',
  disabled = false,
  arrow = true,
  id,
  isOpen,
  onOpen,
  onClose,
  isToggleable = false,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  closeOnScroll = true,
  closeOnTooltipClick = false,
  offset = 10,
  backgroundColor,
  textColor,
  animated = true,
  shadow = true,
  rounded = true,
  bordered = false,
  borderColor,
}) => {
  // Für Abwärtskompatibilität
  const position = placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left';
  const alignment = placement.includes('-') ? placement.split('-')[1] : 'center';
  
  // Generiere eine eindeutige ID für Barrierefreiheit
  const uniqueId = id || `tooltip-${Math.random().toString(36).substring(2, 9)}`;
  
  // Zustand
  const [isVisible, setIsVisible] = useState(isOpen || false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0 });
  
  // Refs
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Aktualisiere den Zustand, wenn isOpen sich ändert
  useEffect(() => {
    if (isOpen !== undefined) {
      setIsVisible(isOpen);
      if (isOpen) {
        setTimeout(calculatePosition, 0);
      }
    }
  }, [isOpen]);
  
  // Positionierung des Tooltips und Pfeils berechnen
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    // Basisposition basierend auf der gewählten Position
    let top = 0;
    let left = 0;
    
    // Pfeilposition
    let arrowTop = 0;
    let arrowLeft = 0;
    
    // Berechne die Basisposition basierend auf der Hauptrichtung
    switch (position) {
      case 'top':
        top = triggerRect.top + scrollTop - tooltipRect.height - offset;
        
        // Horizontale Ausrichtung basierend auf dem Alignment
        if (alignment === 'start') {
          left = triggerRect.left + scrollLeft;
          arrowLeft = Math.min(triggerRect.width / 2, tooltipRect.width / 4);
        } else if (alignment === 'end') {
          left = triggerRect.right + scrollLeft - tooltipRect.width;
          arrowLeft = tooltipRect.width - Math.min(triggerRect.width / 2, tooltipRect.width / 4);
        } else { // center
          left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (tooltipRect.width / 2);
          arrowLeft = tooltipRect.width / 2;
        }
        
        arrowTop = tooltipRect.height;
        break;
        
      case 'right':
        left = triggerRect.right + scrollLeft + offset;
        
        // Vertikale Ausrichtung basierend auf dem Alignment
        if (alignment === 'start') {
          top = triggerRect.top + scrollTop;
          arrowTop = Math.min(triggerRect.height / 2, tooltipRect.height / 4);
        } else if (alignment === 'end') {
          top = triggerRect.bottom + scrollTop - tooltipRect.height;
          arrowTop = tooltipRect.height - Math.min(triggerRect.height / 2, tooltipRect.height / 4);
        } else { // center
          top = triggerRect.top + scrollTop + (triggerRect.height / 2) - (tooltipRect.height / 2);
          arrowTop = tooltipRect.height / 2;
        }
        
        arrowLeft = -5;
        break;
        
      case 'bottom':
        top = triggerRect.bottom + scrollTop + offset;
        
        // Horizontale Ausrichtung basierend auf dem Alignment
        if (alignment === 'start') {
          left = triggerRect.left + scrollLeft;
          arrowLeft = Math.min(triggerRect.width / 2, tooltipRect.width / 4);
        } else if (alignment === 'end') {
          left = triggerRect.right + scrollLeft - tooltipRect.width;
          arrowLeft = tooltipRect.width - Math.min(triggerRect.width / 2, tooltipRect.width / 4);
        } else { // center
          left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (tooltipRect.width / 2);
          arrowLeft = tooltipRect.width / 2;
        }
        
        arrowTop = -5;
        break;
        
      case 'left':
        left = triggerRect.left + scrollLeft - tooltipRect.width - offset;
        
        // Vertikale Ausrichtung basierend auf dem Alignment
        if (alignment === 'start') {
          top = triggerRect.top + scrollTop;
          arrowTop = Math.min(triggerRect.height / 2, tooltipRect.height / 4);
        } else if (alignment === 'end') {
          top = triggerRect.bottom + scrollTop - tooltipRect.height;
          arrowTop = tooltipRect.height - Math.min(triggerRect.height / 2, tooltipRect.height / 4);
        } else { // center
          top = triggerRect.top + scrollTop + (triggerRect.height / 2) - (tooltipRect.height / 2);
          arrowTop = tooltipRect.height / 2;
        }
        
        arrowLeft = tooltipRect.width;
        break;
    }
    
    // Stellen Sie sicher, dass der Tooltip im Viewport bleibt
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Horizontal anpassen
    if (left < 0) {
      arrowLeft = arrowLeft + left; // Pfeil entsprechend verschieben
      left = 10;
    } else if (left + tooltipRect.width > viewportWidth) {
      const overflow = left + tooltipRect.width - viewportWidth;
      arrowLeft = arrowLeft + overflow; // Pfeil entsprechend verschieben
      left = viewportWidth - tooltipRect.width - 10;
    }
    
    // Vertikal anpassen
    if (top < 0) {
      arrowTop = arrowTop + top; // Pfeil entsprechend verschieben
      top = 10;
    } else if (top + tooltipRect.height > viewportHeight + scrollTop) {
      const overflow = top + tooltipRect.height - (viewportHeight + scrollTop);
      arrowTop = arrowTop + overflow; // Pfeil entsprechend verschieben
      top = viewportHeight + scrollTop - tooltipRect.height - 10;
    }
    
    setTooltipPosition({ top, left });
    setArrowPosition({ top: arrowTop, left: arrowLeft });
  };
  
  // Show/Hide Logik mit Verzögerung
  const showTooltip = () => {
    if (disabled || (isOpen !== undefined)) return;
    
    // Clear any existing timers
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    
    // Set show timer
    showTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      // Erst berechnen, wenn der Tooltip sichtbar ist
      setTimeout(calculatePosition, 0);
      
      // Callback aufrufen
      if (onOpen) onOpen();
    }, delay);
  };
  
  const hideTooltip = () => {
    if (isOpen !== undefined) return;
    
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      
      // Callback aufrufen
      if (onClose) onClose();
    }, hideDelay);
  };
  
  // Toggle-Funktion für isToggleable
  const toggleTooltip = () => {
    if (isOpen !== undefined) return;
    
    if (isVisible) {
      hideTooltip();
    } else {
      showTooltip();
    }
  };
  
  // Escape-Taste zum Schließen
  useEffect(() => {
    if (!isVisible || !closeOnEsc) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideTooltip();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible, closeOnEsc]);
  
  // Klick außerhalb zum Schließen
  useEffect(() => {
    if (!isVisible || !closeOnOutsideClick) return;
    
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        tooltipRef.current && 
        !tooltipRef.current.contains(e.target as Node) &&
        triggerRef.current && 
        !triggerRef.current.contains(e.target as Node)
      ) {
        hideTooltip();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isVisible, closeOnOutsideClick]);
  
  // Scrollen zum Schließen
  useEffect(() => {
    if (!isVisible || !closeOnScroll) return;
    
    const handleScroll = () => {
      hideTooltip();
    };
    
    window.addEventListener('scroll', handleScroll, true);
    
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isVisible, closeOnScroll]);
  
  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);
  
  // Recalculate on window resize
  useEffect(() => {
    if (!isVisible) return;
    
    const handleResize = () => calculatePosition();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible]);
  
  // Pfeilrenderrichtung
  const getArrowStyle = () => {
    switch (position) {
      case 'top':
        return {
          borderTop: '5px solid currentColor',
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          bottom: '-5px'
        };
      case 'right':
        return {
          borderRight: '5px solid currentColor',
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent',
          left: '-5px'
        };
      case 'bottom':
        return {
          borderBottom: '5px solid currentColor',
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          top: '-5px'
        };
      case 'left':
        return {
          borderLeft: '5px solid currentColor',
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent',
          right: '-5px'
        };
    }
  };
  
  // Trigger-Element mit Event Listenern klonen
  const triggerElement = React.cloneElement(React.Children.only(children), {
    ref: (element: HTMLElement | null) => {
      // Ref vom Original beibehalten, wenn vorhanden
      const child = React.Children.only(children);
      if (React.isValidElement(child) && 'ref' in child) {
        const childRef = (child as any).ref;
        if (typeof childRef === 'function') {
          childRef(element);
        } else if (childRef && typeof childRef === 'object' && 'current' in childRef) {
          (childRef as React.MutableRefObject<HTMLElement | null>).current = element;
        }
      }
      if (triggerRef) {
        (triggerRef as React.MutableRefObject<HTMLElement | null>).current = element;
      }
    },
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      showTooltip();
      // Original-Handler beibehalten
      if (children.props.onMouseEnter) {
        children.props.onMouseEnter(e);
      }
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      hideTooltip();
      // Original-Handler beibehalten
      if (children.props.onMouseLeave) {
        children.props.onMouseLeave(e);
      }
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      showTooltip();
      // Original-Handler beibehalten
      if (children.props.onFocus) {
        children.props.onFocus(e);
      }
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      hideTooltip();
      // Original-Handler beibehalten
      if (children.props.onBlur) {
        children.props.onBlur(e);
      }
    },
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      // Wenn isToggleable aktiviert ist, Tooltip umschalten
      if (isToggleable) {
        toggleTooltip();
      }
      
      // Original-Handler beibehalten
      if (children.props.onClick) {
        children.props.onClick(e);
      }
    },
    // ARIA-Attribute für Barrierefreiheit
    'aria-describedby': isVisible ? uniqueId : undefined
  });
  
  // Berechne die Tooltip-Klassen
  const tooltipClasses = [
    'fixed z-50 p-2 text-sm',
    rounded ? 'rounded-md' : '',
    shadow ? 'shadow-md' : '',
    bordered ? 'border' : '',
    animated ? 'transition-opacity duration-150' : '',
    `tooltip tooltip-${position} tooltip-${placement}`,
    className
  ].filter(Boolean).join(' ');
  
  // Berechne die Tooltip-Styles
  const tooltipStyles: React.CSSProperties = {
    top: tooltipPosition.top,
    left: tooltipPosition.left,
    maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
    backgroundColor: backgroundColor || '',
    color: textColor || '',
    borderColor: borderColor || '',
    opacity: isVisible ? 1 : 0,
    pointerEvents: isVisible ? 'auto' : 'none'
  };
  
  return (
    <>
      {triggerElement}
      
      <div
        id={uniqueId}
        ref={tooltipRef}
        className={tooltipClasses}
        style={tooltipStyles}
        role="tooltip"
        aria-hidden={!isVisible}
        onClick={closeOnTooltipClick ? hideTooltip : undefined}
        data-testid="tooltip"
      >
        {content}
        
        {arrow && (
          <div
            data-testid="tooltip-arrow"
            className="absolute w-0 h-0"
            style={{
              ...getArrowStyle(),
              top: arrowPosition.top === 0 ? getArrowStyle().top : arrowPosition.top,
              left: arrowPosition.left === 0 ? getArrowStyle().left : arrowPosition.left,
              right: getArrowStyle().right,
              color: backgroundColor || ''
            }}
          ></div>
        )}
      </div>
    </>
  );
};

export default Tooltip;
