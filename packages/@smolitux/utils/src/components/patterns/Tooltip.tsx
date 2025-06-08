import React, { useState, useRef, useEffect } from 'react';
import { Box } from '../primitives/Box';

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
  /** Content to display in the tooltip */
  content: React.ReactNode;
  /** Children element that triggers the tooltip */
  children: React.ReactElement;
  /** Placement of the tooltip */
  placement?: TooltipPlacement;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
  /** Delay before showing the tooltip (in ms) */
  showDelay?: number;
  /** Delay before hiding the tooltip (in ms) */
  hideDelay?: number;
  /** Whether to show an arrow */
  hasArrow?: boolean;
  /** Whether the tooltip is always open */
  isOpen?: boolean;
  /** Default open state */
  defaultIsOpen?: boolean;
  /** Callback when the tooltip opens */
  onOpen?: () => void;
  /** Callback when the tooltip closes */
  onClose?: () => void;
  /** Additional class name for the tooltip */
  tooltipClassName?: string;
  /** Additional class name for the arrow */
  arrowClassName?: string;
  /** Additional class name */
  className?: string;
  /** Additional styles for the tooltip */
  tooltipStyle?: React.CSSProperties;
  /** Offset from the reference element (in px) */
  offset?: number;
  /** Whether to close the tooltip when clicking outside */
  closeOnClick?: boolean;
  /** Whether to close the tooltip when pressing escape */
  closeOnEsc?: boolean;
}

/**
 * Tooltip component for displaying additional information on hover.
 * It supports different placements, delays, and behaviors.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  disabled = false,
  showDelay = 0,
  hideDelay = 0,
  hasArrow = true,
  isOpen: controlledIsOpen,
  defaultIsOpen = false,
  onOpen,
  onClose,
  tooltipClassName = '',
  arrowClassName = '',
  className = '',
  tooltipStyle,
  offset = 8,
  closeOnClick = true,
  closeOnEsc = true,
}) => {
  // State for tooltip visibility
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0 });

  // Refs
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Use controlled state if provided
  const tooltipIsOpen = controlledIsOpen !== undefined ? controlledIsOpen : isOpen;

  // Calculate tooltip position
  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    let top = 0;
    let left = 0;
    let arrowTop = 0;
    let arrowLeft = 0;

    // Calculate position based on placement
    switch (placement) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - offset + scrollTop;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2 + scrollLeft;
        arrowTop = tooltipRect.height;
        arrowLeft = tooltipRect.width / 2 - 5; // 5 is half of arrow width
        break;
      case 'top-start':
        top = triggerRect.top - tooltipRect.height - offset + scrollTop;
        left = triggerRect.left + scrollLeft;
        arrowTop = tooltipRect.height;
        arrowLeft = Math.min(triggerRect.width / 2, 20);
        break;
      case 'top-end':
        top = triggerRect.top - tooltipRect.height - offset + scrollTop;
        left = triggerRect.right - tooltipRect.width + scrollLeft;
        arrowTop = tooltipRect.height;
        arrowLeft = tooltipRect.width - Math.min(triggerRect.width / 2, 20);
        break;
      case 'bottom':
        top = triggerRect.bottom + offset + scrollTop;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2 + scrollLeft;
        arrowTop = -10; // 10 is arrow height
        arrowLeft = tooltipRect.width / 2 - 5;
        break;
      case 'bottom-start':
        top = triggerRect.bottom + offset + scrollTop;
        left = triggerRect.left + scrollLeft;
        arrowTop = -10;
        arrowLeft = Math.min(triggerRect.width / 2, 20);
        break;
      case 'bottom-end':
        top = triggerRect.bottom + offset + scrollTop;
        left = triggerRect.right - tooltipRect.width + scrollLeft;
        arrowTop = -10;
        arrowLeft = tooltipRect.width - Math.min(triggerRect.width / 2, 20);
        break;
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2 + scrollTop;
        left = triggerRect.left - tooltipRect.width - offset + scrollLeft;
        arrowTop = tooltipRect.height / 2 - 5;
        arrowLeft = tooltipRect.width;
        break;
      case 'left-start':
        top = triggerRect.top + scrollTop;
        left = triggerRect.left - tooltipRect.width - offset + scrollLeft;
        arrowTop = Math.min(triggerRect.height / 2, 20);
        arrowLeft = tooltipRect.width;
        break;
      case 'left-end':
        top = triggerRect.bottom - tooltipRect.height + scrollTop;
        left = triggerRect.left - tooltipRect.width - offset + scrollLeft;
        arrowTop = tooltipRect.height - Math.min(triggerRect.height / 2, 20);
        arrowLeft = tooltipRect.width;
        break;
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2 + scrollTop;
        left = triggerRect.right + offset + scrollLeft;
        arrowTop = tooltipRect.height / 2 - 5;
        arrowLeft = -10;
        break;
      case 'right-start':
        top = triggerRect.top + scrollTop;
        left = triggerRect.right + offset + scrollLeft;
        arrowTop = Math.min(triggerRect.height / 2, 20);
        arrowLeft = -10;
        break;
      case 'right-end':
        top = triggerRect.bottom - tooltipRect.height + scrollTop;
        left = triggerRect.right + offset + scrollLeft;
        arrowTop = tooltipRect.height - Math.min(triggerRect.height / 2, 20);
        arrowLeft = -10;
        break;
      default:
        break;
    }

    // Ensure tooltip stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 0) {
      arrowLeft += left;
      left = 0;
    } else if (left + tooltipRect.width > viewportWidth) {
      const diff = left + tooltipRect.width - viewportWidth;
      arrowLeft += diff;
      left -= diff;
    }

    if (top < 0) {
      arrowTop += top;
      top = 0;
    } else if (top + tooltipRect.height > viewportHeight) {
      const diff = top + tooltipRect.height - viewportHeight;
      arrowTop += diff;
      top -= diff;
    }

    setPosition({ top, left });
    setArrowPosition({ top: arrowTop, left: arrowLeft });
  };

  // Handle showing the tooltip
  const handleShow = () => {
    if (disabled) return;

    // Clear any existing timeouts
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    if (showDelay > 0) {
      showTimeoutRef.current = setTimeout(() => {
        setIsOpen(true);
        if (onOpen) onOpen();
      }, showDelay);
    } else {
      setIsOpen(true);
      if (onOpen) onOpen();
    }
  };

  // Handle hiding the tooltip
  const handleHide = () => {
    if (disabled) return;

    // Clear any existing timeouts
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }

    if (hideDelay > 0) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
        if (onClose) onClose();
      }, hideDelay);
    } else {
      setIsOpen(false);
      if (onClose) onClose();
    }
  };

  // Handle click outside
  useEffect(() => {
    if (!tooltipIsOpen || !closeOnClick) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tooltipIsOpen, closeOnClick, onClose]);

  // Handle escape key
  useEffect(() => {
    if (!tooltipIsOpen || !closeOnEsc) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [tooltipIsOpen, closeOnEsc, onClose]);

  // Update position when tooltip is open
  useEffect(() => {
    if (!tooltipIsOpen) return;

    updatePosition();

    // Update position on resize and scroll
    const handleResize = () => updatePosition();
    const handleScroll = () => updatePosition();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tooltipIsOpen]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Clone the child element to add event handlers
  const trigger = React.cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: handleShow,
    onMouseLeave: handleHide,
    onFocus: handleShow,
    onBlur: handleHide,
    ...children.props,
  });

  // Arrow direction based on placement
  const getArrowStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      width: '10px',
      height: '10px',
      transform: 'rotate(45deg)',
      backgroundColor: 'inherit',
    };

    if (placement.startsWith('top')) {
      return {
        ...baseStyle,
        top: '100%',
        borderRight: '1px solid rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
      };
    } else if (placement.startsWith('bottom')) {
      return {
        ...baseStyle,
        bottom: '100%',
        borderLeft: '1px solid rgba(0,0,0,0.1)',
        borderTop: '1px solid rgba(0,0,0,0.1)',
      };
    } else if (placement.startsWith('left')) {
      return {
        ...baseStyle,
        left: '100%',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        borderRight: '1px solid rgba(0,0,0,0.1)',
      };
    } else if (placement.startsWith('right')) {
      return {
        ...baseStyle,
        right: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        borderLeft: '1px solid rgba(0,0,0,0.1)',
      };
    }

    return baseStyle;
  };

  return (
    <Box className={className}>
      {trigger}
      {tooltipIsOpen && (
        <Box
          ref={tooltipRef}
          className={`tooltip ${tooltipClassName}`}
          style={{
            position: 'absolute',
            zIndex: 1000,
            backgroundColor: 'white',
            color: 'black',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            maxWidth: '300px',
            border: '1px solid rgba(0,0,0,0.1)',
            top: `${position.top}px`,
            left: `${position.left}px`,
            ...tooltipStyle,
          }}
          role="tooltip"
        >
          {content}
          {hasArrow && (
            <Box
              className={`tooltip-arrow ${arrowClassName}`}
              style={{
                ...getArrowStyle(),
                top: `${arrowPosition.top}px`,
                left: `${arrowPosition.left}px`,
              }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

Tooltip.displayName = 'Tooltip';
