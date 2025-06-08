import { default as BaseGrid, Grid as OriginalGrid, type GridProps } from './Grid';
import { default as GridA11y, type GridA11yProps } from './Grid.a11y';

// Erweitere Grid um die A11y-Komponente
const Grid = Object.assign(OriginalGrid, {
  A11y: GridA11y,
});

// Exportiere Komponenten und Typen
export { Grid };
export type { GridProps, GridA11yProps };

// Fuer Abwaertskompatibilitaet mit dem bestehenden Export
export default Grid;
