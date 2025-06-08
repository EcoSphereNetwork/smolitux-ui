// packages/@smolitux/core/src/components/Tabs/Tabs.tsx
import React, { useState, useEffect, useRef, createContext, useContext, useMemo } from 'react';
import './Tabs.css';

export type TabsVariant = 'line' | 'enclosed' | 'soft-rounded' | 'solid-rounded' | 'unstyled';
export type TabsColorScheme =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'neutral';
export type TabsSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TabsAlign = 'start' | 'center' | 'end';
export type TabsOrientation = 'horizontal' | 'vertical';

export interface TabsContextProps {
  /** Aktiver Tab-Index */
  activeIndex: number;
  /** Aktiver Tab-Wert */
  activeValue: string;
  /** Zum Tab wechseln */
  setActiveIndex: (index: number) => void;
  /** Zum Tab mit Wert wechseln */
  setActiveValue: (value: string) => void;
  /** Variante der Tabs */
  variant: TabsVariant;
  /** Farbschema der Tabs */
  colorScheme: TabsColorScheme;
  /** Größe der Tabs */
  size: TabsSize;
  /** Ausrichtung der Tabs */
  align: TabsAlign;
  /** Orientierung der Tabs */
  orientation: TabsOrientation;
  /** Sind die Tabs deaktiviert? */
  isDisabled: boolean;
  /** Sind die Tabs manuell? */
  isManual: boolean;
  /** ID für die Tabs-Komponente */
  id: string;
  /** Lazy-Loading für Tab-Panels */
  isLazy: boolean;
  /** Animationen aktivieren */
  animated: boolean;
  /** Tastaturnavigation */
  keyboardNavigation: 'horizontal' | 'vertical' | 'both' | 'none';
  /** Lokalisierungsobjekt */
  i18n: {
    tabSelected: string;
    tabDisabled: string;
  };
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabsContext must be used within a TabsProvider');
  }
  return context;
};

export interface TabsProps {
  /** Kinder-Elemente (Tab, TabList, TabPanels) */
  children: React.ReactNode;
  /** Standardmäßig aktiver Tab-Index */
  defaultIndex?: number;
  /** Aktiver Tab-Index (kontrollierter Modus) */
  index?: number;
  /** Callback bei Tab-Wechsel */
  onChange?: (index: number) => void;
  /** Variante der Tabs */
  variant?: TabsVariant;
  /** Farbschema der Tabs */
  colorScheme?: TabsColorScheme;
  /** Größe der Tabs */
  size?: TabsSize;
  /** Ausrichtung der Tabs */
  align?: TabsAlign;
  /** Orientierung der Tabs */
  orientation?: TabsOrientation;
  /** Sind die Tabs deaktiviert? */
  isDisabled?: boolean;
  /** Sind die Tabs manuell? (Keine automatische Aktivierung bei Hover) */
  isManual?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** ID für die Tabs-Komponente */
  id?: string;
  /** Lazy-Loading für Tab-Panels */
  isLazy?: boolean;
  /** Animationen aktivieren */
  animated?: boolean;
  /** Automatische Fokussierung des aktiven Tabs */
  autoFocus?: boolean;
  /** Tastaturnavigation deaktivieren */
  keyboardNavigation?: 'horizontal' | 'vertical' | 'both' | 'none';
  /** Lokalisierungsobjekt */
  i18n?: {
    /** Text für Screenreader, wenn ein Tab ausgewählt wird */
    tabSelected?: string;
    /** Text für Screenreader, wenn ein Tab deaktiviert ist */
    tabDisabled?: string;
  };
}

/**
 * Tabs-Komponente für tabulare Inhalte
 *
 * @example
 * ```tsx
 * <Tabs>
 *   <TabList>
 *     <Tab>Tab 1</Tab>
 *     <Tab>Tab 2</Tab>
 *   </TabList>
 *   <TabPanels>
 *     <TabPanel>Inhalt 1</TabPanel>
 *     <TabPanel>Inhalt 2</TabPanel>
 *   </TabPanels>
 * </Tabs>
 * ```
 */
export const Tabs: React.FC<TabsProps> = ({
  children,
  defaultIndex = 0,
  index,
  onChange,
  variant = 'line',
  colorScheme = 'primary',
  size = 'md',
  align = 'start',
  orientation = 'horizontal',
  isDisabled = false,
  isManual = false,
  className = '',
  id,
  isLazy = false,
  animated = true,
  autoFocus = true,
  keyboardNavigation = 'both',
  i18n = {
    tabSelected: 'Tab ausgewählt',
    tabDisabled: 'Tab deaktiviert',
  },
}) => {
  const [activeIndex, setActiveIndexState] = useState(index ?? defaultIndex);
  const [activeValue, setActiveValue] = useState('');
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const tabsId = useMemo(() => id || `tabs-${Math.random().toString(36).substr(2, 9)}`, [id]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Wenn der Index von außen gesteuert wird
  useEffect(() => {
    if (index !== undefined) {
      setActiveIndexState(index);
    }
  }, [index]);

  // Automatische Fokussierung des aktiven Tabs
  useEffect(() => {
    if (autoFocus && activeIndex >= 0 && tabRefs.current[activeIndex]) {
      tabRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex, autoFocus]);

  const setActiveIndex = (newIndex: number) => {
    if (isDisabled) return;

    if (index === undefined) {
      setActiveIndexState(newIndex);
    }

    onChange?.(newIndex);
  };

  // Tastaturnavigation
  const handleKeyDown = (event: React.KeyboardEvent, tabIndex: number) => {
    if (isDisabled || keyboardNavigation === 'none') return;

    const isHorizontalNav = keyboardNavigation === 'horizontal' || keyboardNavigation === 'both';
    const isVerticalNav = keyboardNavigation === 'vertical' || keyboardNavigation === 'both';
    const isHorizontal = orientation === 'horizontal';

    const tabCount = tabRefs.current.filter(Boolean).length;
    let nextIndex = tabIndex;

    switch (event.key) {
      case 'ArrowRight':
        if (isHorizontalNav && isHorizontal) {
          nextIndex = (tabIndex + 1) % tabCount;
          event.preventDefault();
        }
        break;
      case 'ArrowLeft':
        if (isHorizontalNav && isHorizontal) {
          nextIndex = (tabIndex - 1 + tabCount) % tabCount;
          event.preventDefault();
        }
        break;
      case 'ArrowDown':
        if (isVerticalNav && (!isHorizontal || !isHorizontalNav)) {
          nextIndex = (tabIndex + 1) % tabCount;
          event.preventDefault();
        }
        break;
      case 'ArrowUp':
        if (isVerticalNav && (!isHorizontal || !isHorizontalNav)) {
          nextIndex = (tabIndex - 1 + tabCount) % tabCount;
          event.preventDefault();
        }
        break;
      case 'Home':
        nextIndex = 0;
        event.preventDefault();
        break;
      case 'End':
        nextIndex = tabCount - 1;
        event.preventDefault();
        break;
      default:
        return;
    }

    if (nextIndex !== tabIndex) {
      tabRefs.current[nextIndex]?.focus();
      setFocusedIndex(nextIndex);

      if (!isManual) {
        setActiveIndex(nextIndex);
      }
    }
  };

  const contextValue = useMemo(
    () => ({
      activeIndex,
      activeValue,
      setActiveIndex,
      setActiveValue,
      variant,
      colorScheme,
      size,
      align,
      orientation,
      isDisabled,
      isManual,
      id: tabsId,
      isLazy,
      animated,
      keyboardNavigation,
      i18n: {
        tabSelected: i18n.tabSelected || 'Tab ausgewählt',
        tabDisabled: i18n.tabDisabled || 'Tab deaktiviert',
      },
      handleKeyDown,
      tabRefs,
      focusedIndex,
      setFocusedIndex,
    }),
    [
      activeIndex,
      activeValue,
      variant,
      colorScheme,
      size,
      align,
      orientation,
      isDisabled,
      isManual,
      tabsId,
      isLazy,
      animated,
      keyboardNavigation,
      i18n,
      focusedIndex,
    ]
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        className={`
          smolitux-tabs 
          smolitux-tabs--${variant} 
          smolitux-tabs--${colorScheme}
          smolitux-tabs--${size}
          smolitux-tabs--${orientation}
          ${isDisabled ? 'smolitux-tabs--disabled' : ''}
          ${animated ? 'smolitux-tabs--animated' : ''}
          ${className}
        `}
        data-orientation={orientation}
        id={tabsId}
        data-testid="smolitux-tabs"
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Kinder-Elemente (Tab) */
  children: React.ReactNode;
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * TabList-Komponente für die Tab-Buttons
 */
export const TabList: React.FC<TabListProps> = ({ children, className = '', ...rest }) => {
  const { align, orientation } = useTabsContext();

  return (
    <div
      className={`
        smolitux-tab-list 
        smolitux-tab-list--${align}
        smolitux-tab-list--${orientation}
        ${className}
      `}
      role="tablist"
      aria-orientation={orientation}
      {...rest}
    >
      {children}
    </div>
  );
};

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Inhalt des Tabs */
  children: React.ReactNode;
  /** Ist der Tab deaktiviert? */
  isDisabled?: boolean;
  /** Wert des Tabs (für programmatische Aktivierung) */
  value?: string;
  /** Icon vor dem Text */
  leftIcon?: React.ReactNode;
  /** Icon nach dem Text */
  rightIcon?: React.ReactNode;
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * Tab-Komponente für einen einzelnen Tab-Button
 */
export const Tab: React.FC<TabProps> = ({
  children,
  isDisabled: tabIsDisabled = false,
  value,
  leftIcon,
  rightIcon,
  className = '',
  ...rest
}) => {
  const {
    activeIndex,
    setActiveIndex,
    setActiveValue,
    isDisabled: tabsIsDisabled,
    isManual,
    id,
    handleKeyDown,
    tabRefs,
    i18n,
  } = useTabsContext();
  const ref = useRef<HTMLButtonElement>(null);
  const index = useRef(-1);
  const [liveText, setLiveText] = useState<string | null>(null);

  // Finde den Index dieses Tabs und speichere die Referenz
  useEffect(() => {
    if (ref.current) {
      const parent = ref.current.parentElement;
      if (parent) {
        const tabs = Array.from(parent.children).filter(
          (child) => child.getAttribute('role') === 'tab'
        );
        index.current = tabs.indexOf(ref.current);

        // Speichere die Referenz im Array
        if (tabRefs.current && index.current !== -1) {
          tabRefs.current[index.current] = ref.current;
        }
      }
    }

    return () => {
      // Entferne die Referenz beim Unmount
      if (index.current !== -1 && tabRefs.current) {
        tabRefs.current[index.current] = null;
      }
    };
  }, [tabRefs]);

  const isActive = index.current === activeIndex;
  const isDisabled = tabsIsDisabled || tabIsDisabled;
  const tabId = `${id}-tab-${index.current}`;
  const panelId = `${id}-panel-${index.current}`;

  const handleClick = () => {
    if (!isDisabled) {
      setActiveIndex(index.current);
      if (value) {
        setActiveValue(value);
      }

      // Setze Live-Text für Screenreader
      setLiveText(i18n.tabSelected);
      setTimeout(() => setLiveText(null), 1000);
    }
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    handleKeyDown(event, index.current);
  };

  return (
    <>
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        aria-disabled={isDisabled}
        aria-controls={panelId}
        id={tabId}
        tabIndex={isActive ? 0 : -1}
        className={`
          smolitux-tab
          ${isActive ? 'smolitux-tab--active' : ''}
          ${isDisabled ? 'smolitux-tab--disabled' : ''}
          ${className}
        `}
        onClick={handleClick}
        onKeyDown={handleTabKeyDown}
        disabled={isDisabled}
        data-value={value}
        data-testid={`tab-${index.current}`}
        {...rest}
      >
        {leftIcon && <span className="smolitux-tab-icon smolitux-tab-icon--left">{leftIcon}</span>}
        <span className="smolitux-tab-text">{children}</span>
        {rightIcon && (
          <span className="smolitux-tab-icon smolitux-tab-icon--right">{rightIcon}</span>
        )}
      </button>
      {liveText && (
        <div className="sr-only" aria-live="polite">
          {liveText}
        </div>
      )}
    </>
  );
};

export interface TabPanelsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Kinder-Elemente (TabPanel) */
  children: React.ReactNode;
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * TabPanels-Komponente für die Tab-Inhalte
 */
export const TabPanels: React.FC<TabPanelsProps> = ({ children, className = '', ...rest }) => {
  return (
    <div className={`smolitux-tab-panels ${className}`} {...rest}>
      {children}
    </div>
  );
};

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Inhalt des Panels */
  children: React.ReactNode;
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * TabPanel-Komponente für einen einzelnen Tab-Inhalt
 */
export const TabPanel: React.FC<TabPanelProps> = ({ children, className = '', ...rest }) => {
  const { activeIndex, id, isLazy, animated } = useTabsContext();
  const ref = useRef<HTMLDivElement>(null);
  const index = useRef(-1);
  const [hasBeenRendered, setHasBeenRendered] = useState(false);

  // Finde den Index dieses Panels
  useEffect(() => {
    if (ref.current) {
      const parent = ref.current.parentElement;
      if (parent) {
        const panels = Array.from(parent.children);
        index.current = panels.indexOf(ref.current);
      }
    }
  }, []);

  // Markiere Panel als gerendert, wenn es aktiv ist
  useEffect(() => {
    if (index.current === activeIndex && !hasBeenRendered) {
      setHasBeenRendered(true);
    }
  }, [activeIndex, hasBeenRendered]);

  const isActive = index.current === activeIndex;
  const panelId = `${id}-panel-${index.current}`;
  const tabId = `${id}-tab-${index.current}`;

  // Bestimme, ob der Inhalt gerendert werden soll
  const shouldRenderContent = isActive || !isLazy || hasBeenRendered;

  return (
    <div
      ref={ref}
      role="tabpanel"
      aria-hidden={!isActive}
      aria-labelledby={tabId}
      id={panelId}
      tabIndex={isActive ? 0 : -1}
      className={`
        smolitux-tab-panel
        ${isActive ? 'smolitux-tab-panel--active' : 'smolitux-tab-panel--inactive'}
        ${animated ? 'smolitux-tab-panel--animated' : ''}
        ${className}
      `}
      data-testid={`tab-panel-${index.current}`}
      {...rest}
    >
      {shouldRenderContent && (
        <div
          className={`
            smolitux-tab-panel-content
            ${animated && isActive ? 'smolitux-tab-panel-content--enter' : ''}
            ${animated && !isActive ? 'smolitux-tab-panel-content--exit' : ''}
          `}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Tabs;
