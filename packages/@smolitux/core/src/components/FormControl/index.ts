// packages/@smolitux/core/src/components/FormControl/index.ts
import { FormControl as BaseFormControl, useFormControl } from './FormControl';
import { FormControlA11y } from './FormControl.a11y';

export type { FormControlProps } from './FormControl';
export type {
  FormControlContextType,
  FormControlSize,
  FormControlVariant,
  FormControlLabelPosition,
} from './FormControl.a11y';

// Erweitere FormControl um die A11y-Komponente
export const FormControl = Object.assign(BaseFormControl, {
  A11y: FormControlA11y,
});

// Exportiere den useFormControl-Hook
export { useFormControl };

// Fuer Abwaertskompatibilitaet mit dem bestehenden Export
export default FormControl;
