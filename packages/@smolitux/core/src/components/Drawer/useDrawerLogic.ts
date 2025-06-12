import { useCallback, useEffect, useState } from 'react';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export interface UseDrawerLogicOptions {
  defaultOpen?: boolean;
  placement?: DrawerPlacement;
  trapFocus?: boolean;
  closeOnEsc?: boolean;
  hasOverlay?: boolean;
}

export interface DrawerLogic {
  isOpen: boolean;
  placement: DrawerPlacement;
  trapFocus: boolean;
  hasOverlay: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useDrawerLogic = (
  options: UseDrawerLogicOptions = {}
): DrawerLogic => {
  const {
    defaultOpen = false,
    placement = 'right',
    trapFocus = true,
    closeOnEsc = true,
    hasOverlay = true,
  } = options;

  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((o) => !o), []);

  useEffect(() => {
    if (!closeOnEsc) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [closeOnEsc]);

  return {
    isOpen,
    placement,
    trapFocus,
    hasOverlay,
    open,
    close,
    toggle,
  };
};
