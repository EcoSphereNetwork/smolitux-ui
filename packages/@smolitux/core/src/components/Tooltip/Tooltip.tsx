import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
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
  const triggerRef = useRef<HTMLElement | null>(null) as React.MutableRefObject<HTMLElement | null>;
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Expose the tooltip DOM node to parent components
  useImperativeHandle(ref, () => tooltipRef.current!);


  // Generate unique ID for accessibility
  const tooltipId = id || `tooltip-${Math.random().toString(36).substring(2, 10)}`;

  // Calculate tooltip position
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - 10;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + 10;
        break;
      case 'bottom':
        top = triggerRect.bottom + 10;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left - tooltipRect.width - 10;
        break;
    }

    // Ensure tooltip stays within viewport
    if (left < 0) left = 0;
    if (top < 0) top = 0;
    if (left + tooltipRect.width > window.innerWidth) {
      left = window.innerWidth - tooltipRect.width;
    }
    if (top + tooltipRect.height > window.innerHeight) {
      top = window.innerHeight - tooltipRect.height;
    }

    setTooltipPosition({ top, left });
  };

  // Show tooltip
  const showTooltip = () => {
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
  };

  // Hide tooltip
  const hideTooltip = () => {
    // Clear any existing timeouts
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }

    // Set timeout to hide tooltip
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

  // Update position when window is resized
  useEffect(() => {
    if (!isVisible) return;

    const handleResize = () => calculatePosition();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible]);

  // Clone trigger element with event listeners
  const child = children as React.ReactElement & {
    ref?: React.Ref<HTMLElement>
  };
  const triggerElement = React.cloneElement(child, {
      ref: (node: HTMLElement | null) => {
      if (node) {
        triggerRef.current = node;
      }

      // Forward ref if the original element has one
      const originalRef = child.ref as
        | ((instance: HTMLElement | null) => void)
        | React.RefObject<HTMLElement>
        | null
        | undefined;
      if (typeof originalRef === 'function') {
        originalRef(node);
      }
      // Wir vermeiden die direkte Zuweisung zu ref.current, da es ein readonly property sein könnte
    },
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

  return (
    <>
      {triggerElement}

      {/* Tooltip - only render when visible */}
      {isVisible && (
        <div
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          className={`fixed z-50 p-2 text-sm rounded-md shadow-md transition-opacity duration-150 tooltip tooltip-${position} ${className}`}
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
              className="absolute w-0 h-0"
              style={{
                ...(position === 'top' && {
                  borderTop: '5px solid currentColor',
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  bottom: '-5px',
                }),
                ...(position === 'right' && {
                  borderRight: '5px solid currentColor',
                  borderTop: '5px solid transparent',
                  borderBottom: '5px solid transparent',
                  left: '-5px',
                }),
                ...(position === 'bottom' && {
                  borderBottom: '5px solid currentColor',
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  top: '-5px',
                }),
                ...(position === 'left' && {
                  borderLeft: '5px solid currentColor',
                  borderTop: '5px solid transparent',
                  borderBottom: '5px solid transparent',
                  right: '-5px',
                }),
              }}
            />
          )}
        </div>
      )}
    </>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
