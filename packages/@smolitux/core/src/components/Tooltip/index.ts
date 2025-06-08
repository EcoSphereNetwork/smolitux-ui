import { Tooltip as BaseTooltip, type TooltipProps } from './Tooltip';
import { default as TooltipA11y, type TooltipA11yProps } from './Tooltip.a11y';

// Erweitere Tooltip um die A11y-Komponente
const Tooltip = Object.assign(BaseTooltip, {
  A11y: TooltipA11y,
});

// Exportiere Komponenten und Typen
export { Tooltip };
export type { TooltipProps, TooltipA11yProps };

// Fuer Abwaertskompatibilitaet mit dem bestehenden Export
export default Tooltip;
