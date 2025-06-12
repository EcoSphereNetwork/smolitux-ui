import React, { forwardRef, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useDrawerLogic, type DrawerPlacement } from './useDrawerLogic';
import './Drawer.css';

export interface DrawerProps {
  /** Controlled open state */
  isOpen?: boolean;
  /** Initial open state when uncontrolled */
  defaultOpen?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Drawer position */
  placement?: DrawerPlacement;
  /** Trap focus inside the drawer */
  trapFocus?: boolean;
  /** Close on Escape key */
  closeOnEsc?: boolean;
  /** Show overlay behind drawer */
  hasOverlay?: boolean;
  /** Width for left/right placement */
  width?: string | number;
  /** Height for top/bottom placement */
  height?: string | number;
  /** Additional className */
  className?: string;
  /** Accessible label if no header text */
  ariaLabel?: string;
  /** Accessible description */
  ariaDescription?: string;
  children: React.ReactNode;
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      isOpen,
      defaultOpen,
      onOpenChange,
      placement = 'right',
      trapFocus = true,
      closeOnEsc = true,
      hasOverlay = true,
      width,
      height,
      className,
      ariaLabel,
      ariaDescription,
      children,
      ...rest
    },
    ref
  ) => {
    const logic = useDrawerLogic({
      defaultOpen: isOpen ?? defaultOpen,
      placement,
      trapFocus,
      closeOnEsc,
      hasOverlay,
    });

    const { open, close } = logic;

    // sync controlled prop
    useEffect(() => {
      if (isOpen === undefined) return;
      if (isOpen) open();
      else close();
    }, [isOpen, open, close]);

    // notify changes when uncontrolled
    useEffect(() => {
      if (isOpen !== undefined) return;
      onOpenChange?.(logic.isOpen);
    }, [logic.isOpen, isOpen, onOpenChange]);

    const drawerRef = useRef<HTMLDivElement | null>(null);
    // merge refs
    const setRef = (node: HTMLDivElement | null) => {
      drawerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    // simple focus management
    useEffect(() => {
      if (!logic.trapFocus || !logic.isOpen) return;
      const el = drawerRef.current;
      if (!el) return;
      const focusable = el.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    }, [logic.trapFocus, logic.isOpen]);

    if (!logic.isOpen) return null;

    const style: React.CSSProperties = {};
    if (placement === 'left' || placement === 'right') {
      if (width) style.width = typeof width === 'number' ? `${width}px` : width;
    } else {
      if (height) style.height = typeof height === 'number' ? `${height}px` : height;
    }

    return (
      <>
        {logic.hasOverlay && (
          <div
            className="smolitux-drawer-overlay"
            data-testid="drawer-overlay"
            onClick={() => {
              close();
              onOpenChange?.(false);
            }}
          />
        )}
        <div
          ref={setRef}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          aria-describedby={ariaDescription ? 'drawer-description' : undefined}
          className={clsx(
            'smolitux-drawer smolitux-drawer--open',
            `smolitux-drawer--${placement}`,
            className
          )}
          style={style}
          {...rest}
        >
          {ariaDescription && (
            <div id="drawer-description" className="sr-only">
              {ariaDescription}
            </div>
          )}
          {children}
        </div>
      </>
    );
  }
);

Drawer.displayName = 'Drawer';

export default Drawer;
export type { DrawerPlacement } from './useDrawerLogic';
