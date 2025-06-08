// packages/@smolitux/core/src/components/Dialog/index.ts
import { Dialog as BaseDialog } from './Dialog';
import { A11yDialog } from './Dialog.a11y';

export type { DialogProps } from './Dialog';
export type { A11yDialogProps } from './Dialog.a11y';

// Erweitere Dialog um die A11y-Komponente
export const Dialog = Object.assign(BaseDialog, {
  A11y: A11yDialog,
});

// Fuer Abwaertskompatibilitaet mit dem bestehenden Export
export default Dialog;
