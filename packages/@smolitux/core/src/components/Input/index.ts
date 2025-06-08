// packages/@smolitux/core/src/components/Input/index.ts
import { Input as BaseInput } from './Input';
import { InputA11y } from './Input.a11y';

export type { InputProps, InputSize, InputVariant, InputType } from './Input';

// Erweitere Input um die A11y-Komponente
export const Input = Object.assign(BaseInput, {
  A11y: InputA11y,
});

// Fuer Abwaertskompatibilitaet mit dem bestehenden Export
export default Input;
