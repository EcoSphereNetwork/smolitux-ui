import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import './Tooltip.css';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  /** Content to display in the tooltip */
  content: React.ReactNode;
  /** The element that triggers the tooltip */
  children: React.ReactElement;
  /** Position of the tooltip relative to the trigger */
  position?: TooltipPosition;
  /** Delay before showing the tooltip (in ms) */
  delay?: number;
  /** Delay before hiding the tooltip (in ms) */
  hideDelay?: number;
  /** Maximum width of the tooltip */
  maxWidth?: number;
  /** Additional CSS classes */
  className?: string;
  /** Disables the tooltip */
  disabled?: boolean;
  /** Show arrow */
  arrow?: boolean;
  /** ID for accessibility */
  id?: string;
}

/**
 * Tooltip component that displays additional information when hovering over an element
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      position = 'top',
      delay = 0,
      hideDelay = 0,
      maxWidth = 250,
      className = '',
      disabled = false,
      arrow = true,
      id,
    },
    ref
  ) => {
    // State
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

    // Refs
    const triggerRef = useRef<HTMLElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    // Expose the tooltip DOM node to parent components
    useImperativeHandle(ref, () => tooltipRef.current!);

    // Generate unique ID for accessibility
    const tooltipId = id || `tooltip-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Calculate tooltip position
    const calculatePosition = useCallback(() => {
      if (!triggerRef.current || !tooltipRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const arrowSize = arrow ? 10 : 0;

      let top = 0;
      let left = 0;

      switch (position) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - arrowSize;
          left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          break;
        case 'right':
          top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = triggerRect.right + arrowSize;
          break;
        case 'bottom':
          top = triggerRect.bottom + arrowSize;
          left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          break;
        case 'left':
          top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = triggerRect.left - tooltipRect.width - arrowSize;
          break;
      }

      // Ensure tooltip stays within viewport
      const padding = 10;
      if (left < padding) left = padding;
      if (top < padding) top = padding;
      
      const maxLeft = window.innerWidth - tooltipRect.width - padding;
      const maxTop = window.innerHeight - tooltipRect.height - padding;
      
      if (left > maxLeft) left = maxLeft;
      if (top > maxTop) top = maxTop;

      setTooltipPosition({ top, left });
    }, [position, arrow]);

    // Show tooltip
    const showTooltip = useCallback(() => {
      if (disabled) return;

      // Clear any existing timeouts
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }

      // Set timeout to show tooltip
      showTimeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        // Calculate position after tooltip is visible
        setTimeout(calculatePosition, 0);
      }, delay);
    }, [disabled, delay, calculatePosition]);

    // Hide tooltip
    const hideTooltip = useCallback(() => {
      // Clear any existing timeouts
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
        showTimeoutRef.current = null;
      }

      // Set timeout to hide tooltip
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, hideDelay);
    }, [hideDelay]);

    // Clean up timeouts on unmount
    useEffect(() => {
      return () => {
        if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      };
    }, []);

    // Update position when window is resized
    useEffect(() => {
      if (!isVisible) return;

      const handleResize = () => calculatePosition();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [isVisible, calculatePosition]);

    // Helper function to handle refs properly
    const handleRef = useCallback((node: HTMLElement | null) => {
      triggerRef.current = node;

      // Forward ref if the original element has one
      const originalRef = (children as any).ref;
      if (originalRef) {
        if (typeof originalRef === 'function') {
          originalRef(node);
        } else if (originalRef && typeof originalRef === 'object' && 'current' in originalRef) {
          (originalRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      }
    }, [children]);

    // Clone trigger element with event listeners
    const triggerElement = React.cloneElement(children, {
      ref: handleRef,
      onMouseEnter: (e: React.MouseEvent) => {
        showTooltip();
        if (children.props.onMouseEnter) children.props.onMouseEnter(e);
      },
      onMouseLeave: (e: React.MouseEvent) => {
        hideTooltip();
        if (children.props.onMouseLeave) children.props.onMouseLeave(e);
      },
      onFocus: (e: React.FocusEvent) => {
        showTooltip();
        if (children.props.onFocus) children.props.onFocus(e);
      },
      onBlur: (e: React.FocusEvent) => {
        hideTooltip();
        if (children.props.onBlur) children.props.onBlur(e);
      },
      'aria-describedby': isVisible ? tooltipId : undefined,
    });

    // Get arrow styles
    const getArrowStyles = () => {
      const arrowStyles: React.CSSProperties = {
        position: 'absolute',
        width: 0,
        height: 0,
      };

      switch (position) {
        case 'top':
          return {
            ...arrowStyles,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid #374151', // Default dark color
            bottom: '-5px',
            left: '50%',
            transform: 'translateX(-50%)',
          };
        case 'right':
          return {
            ...arrowStyles,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderRight: '5px solid #374151',
            left: '-5px',
            top: '50%',
            transform: 'translateY(-50%)',
          };
        case 'bottom':
          return {
            ...arrowStyles,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderBottom: '5px solid #374151',
            top: '-5px',
            left: '50%',
            transform: 'translateX(-50%)',
          };
        case 'left':
          return {
            ...arrowStyles,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderLeft: '5px solid #374151',
            right: '-5px',
            top: '50%',
            transform: 'translateY(-50%)',
          };
        default:
          return arrowStyles;
      }
    };

    return (
      <>
        {triggerElement}

        {/* Tooltip - only render when visible */}
        {isVisible && (
          <div
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            className={`fixed z-50 p-2 text-sm text-white bg-gray-700 rounded-md shadow-lg transition-opacity duration-150 ${className}`}
            style={{
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              maxWidth: `${maxWidth}px`,
            }}
            data-testid="tooltip"
          >
            {content}

            {arrow && (
              <div
                data-testid="tooltip-arrow"
                style={getArrowStyles()}
              />
            )}
          </div>
        )}
      </>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;