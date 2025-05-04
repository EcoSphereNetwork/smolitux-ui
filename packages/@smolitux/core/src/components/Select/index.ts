// packages/@smolitux/core/src/components/Select/index.ts
import { Select as BaseSelect } from './Select';
import { Option } from './Option';
import { SelectA11y } from './Select.a11y';

export type { SelectProps, SelectOption } from './Select';
export type { OptionProps } from './Option';
export type { SelectA11yProps } from './Select.a11y';

// Erweitere Select um die A11y-Komponente und Option
export const Select = Object.assign(BaseSelect, {
  A11y: SelectA11y,
  Option: Option
});

// Fuer Abwaertskompatibilitaet mit dem bestehenden Export
export default Select;
export { Option };