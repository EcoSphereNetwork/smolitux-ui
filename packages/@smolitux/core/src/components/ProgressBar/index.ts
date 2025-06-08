// packages/@smolitux/core/src/components/ProgressBar/index.ts
import { default as BaseProgressBar, type ProgressBarProps } from './ProgressBar';
import { default as ProgressBarA11y, type ProgressBarA11yProps } from './ProgressBar.a11y';

// Erweitere ProgressBar um die A11y-Komponente
export const ProgressBar = Object.assign(BaseProgressBar, {
  A11y: ProgressBarA11y,
});

// Exportiere Typen
export type { ProgressBarProps, ProgressBarA11yProps };

// Fuer Abwaertskompatibilitaet mit dem bestehenden Export
export default ProgressBar;
