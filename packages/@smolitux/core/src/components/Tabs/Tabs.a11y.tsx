// packages/@smolitux/core/src/components/Tabs/Tabs.a11y.tsx
import React, { useRef, useEffect } from 'react';
import {
  Tabs as BaseTabs,
  TabList as BaseTabList,
  Tab as BaseTab,
  TabPanels as BaseTabPanels,
  TabPanel as BaseTabPanel,
} from './Tabs';
import type { TabsProps, TabListProps, TabProps, TabPanelsProps, TabPanelProps } from './Tabs';

export interface TabsA11yProps extends TabsProps {
  /** Beschreibung der Tabs für Screenreader */
  description?: string;
  /** Zusätzliche ARIA-Attribute */
  ariaLabel?: string;
  /** Zusätzliche ARIA-Attribute */
  ariaLabelledby?: string;
  /** Zusätzliche ARIA-Attribute */
  ariaDescribedby?: string;
  /** Ankündigung bei Tab-Wechsel */
  announceTabChange?: boolean;
  /** Benutzerdefinierte Ankündigung bei Tab-Wechsel */
  tabChangeAnnouncement?: string;
  /** Live-Region-Politeness */
  liveRegionPoliteness?: 'polite' | 'assertive' | 'off';
}

export interface TabListA11yProps extends TabListProps {
  /** Beschreibung der TabList für Screenreader */
  description?: string;
  /** Zusätzliche ARIA-Attribute */
  ariaLabel?: string;
  /** Zusätzliche ARIA-Attribute */
  ariaLabelledby?: string;
  /** Zusätzliche ARIA-Attribute */
  ariaDescribedby?: string;
}

export interface TabA11yProps extends TabProps {
  /** Beschreibung des Tabs für Screenreader */
  description?: string;
  /** Zusätzliche ARIA-Attribute */
  ariaLabel?: string;
  /** Zusätzliche ARIA-Attribute */
  ariaLabelledby?: string;
  /** Zusätzliche ARIA-Attribute */
  ariaDescribedby?: string;
}

export interface TabPanelsA11yProps extends TabPanelsProps {
  /** Beschreibung der TabPanels für Screenreader */
  description?: string;
  /** Zusätzliche ARIA-Attribute */
  ariaLabel?: string;
  /** Zusätzliche ARIA-Attribute */
  ariaLabelledby?: string;
  /** Zusätzliche ARIA-Attribute */
  ariaDescribedby?: string;
}

export interface TabPanelA11yProps extends TabPanelProps {
  /** Beschreibung des TabPanels für Screenreader */
  description?: string;
  /** Zusätzliche ARIA-Attribute */
  ariaLabel?: string;
  /** Zusätzliche ARIA-Attribute */
  ariaLabelledby?: string;
  /** Zusätzliche ARIA-Attribute */
  ariaDescribedby?: string;
}

export const TabsA11y: React.FC<TabsA11yProps> = ({
  children,
  description,
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  announceTabChange = true,
  tabChangeAnnouncement,
  liveRegionPoliteness = 'polite',
  onChange,
  i18n,
  ...rest
}) => {
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const [lastActiveIndex, setLastActiveIndex] = React.useState<number | null>(null);

  const handleChange = (index: number) => {
    setLastActiveIndex(index);
    if (onChange) {
      onChange(index);
    }
  };

  // Ankündigung bei Tab-Wechsel
  useEffect(() => {
    if (announceTabChange && lastActiveIndex !== null && liveRegionRef.current) {
      const announcement =
        tabChangeAnnouncement ||
        `${i18n?.tabSelected || 'Tab'} ${lastActiveIndex + 1} ${i18n?.tabSelected || 'ausgewählt'}`;
      liveRegionRef.current.textContent = announcement;
    }
  }, [lastActiveIndex, announceTabChange, tabChangeAnnouncement, i18n]);

  const mergedI18n = {
    tabSelected: 'ausgewählt',
    tabDisabled: 'deaktiviert',
    ...i18n,
  };

  return (
    <div className="tabs-a11y-wrapper">
      {description && <div className="sr-only">{description}</div>}
      <div
        ref={liveRegionRef}
        aria-live={liveRegionPoliteness}
        aria-atomic="true"
        className="sr-only"
      />
      <BaseTabs
        onChange={handleChange}
        i18n={mergedI18n}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        {...rest}
      >
        {children}
      </BaseTabs>
    </div>
  );
};

export const TabListA11y: React.FC<TabListA11yProps> = ({
  children,
  description,
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  ...rest
}) => {
  return (
    <>
      {description && <div className="sr-only">{description}</div>}
      <BaseTabList
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        {...rest}
      >
        {children}
      </BaseTabList>
    </>
  );
};

export const TabA11y: React.FC<TabA11yProps> = ({
  children,
  description,
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  ...rest
}) => {
  return (
    <BaseTab
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      {...rest}
    >
      {children}
      {description && <span className="sr-only">{description}</span>}
    </BaseTab>
  );
};

export const TabPanelsA11y: React.FC<TabPanelsA11yProps> = ({
  children,
  description,
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  ...rest
}) => {
  return (
    <>
      {description && <div className="sr-only">{description}</div>}
      <BaseTabPanels
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        {...rest}
      >
        {children}
      </BaseTabPanels>
    </>
  );
};

export const TabPanelA11y: React.FC<TabPanelA11yProps> = ({
  children,
  description,
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  ...rest
}) => {
  return (
    <BaseTabPanel
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      {...rest}
    >
      {description && <div className="sr-only">{description}</div>}
      {children}
    </BaseTabPanel>
  );
};

// Exportiere die Komponenten als Namespace
export const Tabs = {
  A11y: TabsA11y,
  List: TabListA11y,
  Tab: TabA11y,
  Panels: TabPanelsA11y,
  Panel: TabPanelA11y,
};

export default Tabs;
