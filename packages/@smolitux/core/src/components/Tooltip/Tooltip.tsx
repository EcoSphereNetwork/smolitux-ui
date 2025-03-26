import React, { useState, useRef, useEffect } from 'react';

export interface TooltipProps {
  /** Tooltip-Inhalt */
  content: React.ReactNode;
  /** Das Element, das mit dem Tooltip versehen werden soll */
  children: React.ReactElement;
  /** Position des Tooltips */
  position?: 'top' | 'right' | 'bottom' | 'left';
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
}

/**
 * Tooltip-Komponente für Hilfetexte
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
  hideDelay = 100,
  maxWidth = 250,
  className = '',
  disabled = false,
  arrow = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
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
    
    switch (position) {
      case 'top':
        top = triggerRect.top + scrollTop - tooltipRect.height - 10;
        left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (tooltipRect.width / 2);
        arrowTop = tooltipRect.height;
        arrowLeft = tooltipRect.width / 2;
        break;
      case 'right':
        top = triggerRect.top + scrollTop + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.right + scrollLeft + 10;
        arrowTop = tooltipRect.height / 2;
        arrowLeft = -5;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollTop + 10;
        left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (tooltipRect.width / 2);
        arrowTop = -5;
        arrowLeft = tooltipRect.width / 2;
        break;
      case 'left':
        top = triggerRect.top + scrollTop + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.left + scrollLeft - tooltipRect.width - 10;
        arrowTop = tooltipRect.height / 2;
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
    if (disabled) return;
    
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
    }, delay);
  };
  
  const hideTooltip = () => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, hideDelay);
  };
  
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
    }
  });
  
  return (
    <>
      {triggerElement}
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            fixed z-50 p-2 text-sm text-white rounded shadow-md
            bg-gray-800 dark:bg-gray-700
            tooltip tooltip-${position} tooltip-content
            ${className}
          `}
          style={{ 
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth
          }}
          role="tooltip"
        >
          {content}
          
          {arrow && (
            <div
              data-testid="tooltip-arrow"
              className="absolute w-0 h-0 text-gray-800 dark:text-gray-700"
              style={{
                ...getArrowStyle(),
                top: arrowPosition.top === 0 ? getArrowStyle().top : arrowPosition.top,
                left: arrowPosition.left === 0 ? getArrowStyle().left : arrowPosition.left,
                right: getArrowStyle().right
              }}
            ></div>
          )}
        </div>
      )}
    </>
  );
};

export default Tooltip;
