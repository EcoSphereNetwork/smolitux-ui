// packages/@smolitux/core/src/components/Tabs/index.ts
import { 
  Tabs as BaseTabs, 
  TabList, 
  Tab, 
  TabPanels, 
  TabPanel,
  useTabsContext
} from './Tabs';
import { 
  Tabs as TabsA11y
} from './Tabs.a11y';

export type { 
  TabsProps, 
  TabListProps, 
  TabProps, 
  TabPanelsProps, 
  TabPanelProps,
  TabsVariant,
  TabsColorScheme,
  TabsSize,
  TabsAlign,
  TabsOrientation,
  TabsContextProps
} from './Tabs';

export type {
  TabsA11yProps,
  TabListA11yProps,
  TabA11yProps,
  TabPanelsA11yProps,
  TabPanelA11yProps
} from './Tabs.a11y';

// Erweitere Tabs um die A11y-Komponente
export const Tabs = Object.assign(BaseTabs, {
  List: TabList,
  Tab: Tab,
  Panels: TabPanels,
  Panel: TabPanel,
  A11y: TabsA11y
});

// Exportiere den Context-Hook
export { useTabsContext };

// Fuer Abwaertskompatibilitaet mit dem bestehenden Export
export default Tabs;
export { TabList, Tab, TabPanels, TabPanel };