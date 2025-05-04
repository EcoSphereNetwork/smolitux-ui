// packages/@smolitux/core/src/components/Drawer/index.ts
import { Drawer as BaseDrawer, DrawerProps, DrawerPlacement } from './Drawer';
import { A11yDrawer } from './Drawer.a11y';

export type { DrawerProps, DrawerPlacement } from './Drawer';
export type { A11yDrawerProps } from './Drawer.a11y';

// Erweitere Drawer um die A11y-Komponente
export const Drawer = Object.assign(BaseDrawer, {
  A11y: A11yDrawer
});

// Fuer Abwaertskompatibilitaet mit dem bestehenden Export
export default Drawer;