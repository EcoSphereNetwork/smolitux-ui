// packages/@smolitux/core/src/components/Popover/index.ts
import { default as BasePopover, type PopoverProps, type PopoverPlacement } from './Popover';
import { PopoverA11y } from './Popover.a11y';
import type { PopoverProps as PopoverA11yProps } from './Popover.a11y';

// Erweitere Popover um die A11y-Komponente
export const Popover = Object.assign(BasePopover, {
  A11y: PopoverA11y,
});

// Exportiere Typen
export type { PopoverProps, PopoverPlacement, PopoverA11yProps };

// Fuer Abwaertskompatibilitaet mit dem bestehenden Export
export default Popover;
