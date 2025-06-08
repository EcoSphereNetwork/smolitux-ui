import { Switch as BaseSwitch } from './Switch';
import type { SwitchProps, SwitchSize, SwitchVariant, SwitchColorScheme } from './Switch';
import { default as SwitchA11y } from './Switch.a11y';
import type { SwitchA11yProps } from './Switch.a11y';

// Erweitere Switch um die A11y-Komponente
const Switch = Object.assign(BaseSwitch, {
  A11y: SwitchA11y,
});

// Exportiere Komponenten und Typen
export { Switch };
export type { SwitchProps, SwitchSize, SwitchVariant, SwitchColorScheme, SwitchA11yProps };

// Für Abwärtskompatibilität mit dem bestehenden Export
export default Switch;
