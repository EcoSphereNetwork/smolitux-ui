// packages/@smolitux/core/src/components/Tabs/Tabs.tsx
import React, { useState, useEffect, useRef, createContext, useContext, useMemo } from 'react';
import './Tabs.css';

export type TabsVariant = 'line' | 'enclosed' | 'soft-rounded' | 'solid-rounded' | 'unstyled';
export type TabsColorScheme = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
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
  className = ''
}) => {
  const [activeIndex, setActiveIndexState] = useState(index ?? defaultIndex);
  const [activeValue, setActiveValue] = useState('');

  // Wenn der Index von außen gesteuert wird
  useEffect(() => {
    if (index !== undefined) {
      setActiveIndexState(index);
    }
  }, [index]);

  const setActiveIndex = (newIndex: number) => {
    if (isDisabled) return;
    
    if (index === undefined) {
      setActiveIndexState(newIndex);
    }
    
    onChange?.(newIndex);
  };

  const contextValue = useMemo(() => ({
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
    isManual
  }), [activeIndex, activeValue, variant, colorScheme, size, align, orientation, isDisabled, isManual]);

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
          ${className}
        `}
        data-orientation={orientation}
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
export const TabList: React.FC<TabListProps> = ({
  children,
  className = '',
  ...rest
}) => {
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
    isManual
  } = useTabsContext();
  const ref = useRef<HTMLButtonElement>(null);
  const index = useRef(-1);

  // Finde den Index dieses Tabs
  useEffect(() => {
    if (ref.current) {
      const parent = ref.current.parentElement;
      if (parent) {
        const tabs = Array.from(parent.children).filter(
          child => child.getAttribute('role') === 'tab'
        );
        index.current = tabs.indexOf(ref.current);
      }
    }
  }, []);

  const isActive = index.current === activeIndex;
  const isDisabled = tabsIsDisabled || tabIsDisabled;

  const handleClick = () => {
    if (!isDisabled) {
      setActiveIndex(index.current);
      if (value) {
        setActiveValue(value);
      }
    }
  };

  return (
    <button
      ref={ref}
      role="tab"
      aria-selected={isActive}
      aria-disabled={isDisabled}
      tabIndex={isActive ? 0 : -1}
      className={`
        smolitux-tab
        ${isActive ? 'smolitux-tab--active' : ''}
        ${isDisabled ? 'smolitux-tab--disabled' : ''}
        ${className}
      `}
      onClick={handleClick}
      disabled={isDisabled}
      data-value={value}
      {...rest}
    >
      {leftIcon && <span className="smolitux-tab-icon smolitux-tab-icon--left">{leftIcon}</span>}
      <span className="smolitux-tab-text">{children}</span>
      {rightIcon && <span className="smolitux-tab-icon smolitux-tab-icon--right">{rightIcon}</span>}
    </button>
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
export const TabPanels: React.FC<TabPanelsProps> = ({
  children,
  className = '',
  ...rest
}) => {
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
export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  className = '',
  ...rest
}) => {
  const { activeIndex } = useTabsContext();
  const ref = useRef<HTMLDivElement>(null);
  const index = useRef(-1);

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

  const isActive = index.current === activeIndex;

  return (
    <div
      ref={ref}
      role="tabpanel"
      aria-hidden={!isActive}
      tabIndex={isActive ? 0 : -1}
      className={`
        smolitux-tab-panel
        ${isActive ? 'smolitux-tab-panel--active' : 'smolitux-tab-panel--inactive'}
        ${className}
      `}
      {...rest}
    >
      {isActive && children}
    </div>
  );
};

export default Tabs;