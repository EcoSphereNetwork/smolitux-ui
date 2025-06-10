import { Button as BaseButton } from './Button';
import { A11yButton } from './Button.a11y';

export type { ButtonProps } from './Button';

// Definiere die Typen, die in der Button-Komponente verwendet werden
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonShape = 'rounded' | 'square' | 'pill';
export type { A11yButtonProps } from './Button.a11y';

/**
 * Button-Komponente mit integrierter A11y-Version.
 * Export sowohl als named als auch als default export.
 */
export const Button = Object.assign(BaseButton, { A11y: A11yButton });
export { A11yButton as ButtonA11y } from './Button.a11y';
export default Button;
