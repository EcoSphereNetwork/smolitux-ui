export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize, ButtonShape } from './Button';
export { A11yButton } from './Button.a11y';
export type { A11yButtonProps } from './Button.a11y';

// Fur Abwartskompatibilitat mit dem bestehenden Export
export { Button as default } from './Button';

// Erweitere Button um A11y-Komponente
Button.A11y = A11yButton;
