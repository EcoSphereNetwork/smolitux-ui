// packages/@smolitux/core/src/components/RadioGroup/index.ts
import { RadioGroup as BaseRadioGroup } from './RadioGroup';
import type { RadioOption, RadioGroupProps } from './RadioGroup';
import { default as Radio } from './Radio';
import type { RadioProps } from './RadioProps';
import { default as RadioGroupA11y } from './RadioGroup.a11y';
import type { RadioGroupA11yProps } from './RadioGroup.a11y';

// Erweitere RadioGroup um die A11y-Komponente
const RadioGroup = Object.assign(BaseRadioGroup, {
  A11y: RadioGroupA11y,
});

// Exportiere Komponenten und Typen
export { RadioGroup, Radio };
export type { RadioOption, RadioGroupProps, RadioProps, RadioGroupA11yProps };

// Fuer Abwaertskompatibilitaet
export default RadioGroup;
