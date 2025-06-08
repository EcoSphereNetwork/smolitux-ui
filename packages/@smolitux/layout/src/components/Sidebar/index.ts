// packages/@smolitux/layout/src/components/Sidebar/index.ts
import { default as BaseSidebar, type SidebarProps, type SidebarItem } from './Sidebar';
import { default as SidebarA11y, type SidebarA11yProps } from './Sidebar.a11y';

// Erweitere Sidebar um die A11y-Komponente
const Sidebar = Object.assign(BaseSidebar, {
  A11y: SidebarA11y,
});

// Exportiere Komponenten und Typen
export { Sidebar };
export type { SidebarProps, SidebarItem, SidebarA11yProps };

// Fuer Abwaertskompatibilitaet mit dem bestehenden Export
export default Sidebar;
