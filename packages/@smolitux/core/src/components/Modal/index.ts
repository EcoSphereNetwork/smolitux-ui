// packages/@smolitux/core/src/components/Modal/index.ts
import { Modal as BaseModal } from './Modal';
import { ModalA11y } from './Modal.a11y';

export type { ModalProps } from './Modal';
export type { ModalA11yProps } from './Modal.a11y';

// Erweitere Modal um die A11y-Komponente
export const Modal = Object.assign(BaseModal, {
  A11y: ModalA11y,
});

// Fuer Abwaertskompatibilitaet mit dem bestehenden Export
export default Modal;

// Fuer Abwaertskompatibilitaet mit dem bestehenden Export der A11y-Version
export { ModalA11y as ModalAccessible } from './Modal.a11y';
