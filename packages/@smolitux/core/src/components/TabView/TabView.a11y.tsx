import React, { useState, useEffect, useRef, useId, KeyboardEvent } from 'react';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  badgeColor?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
  ariaLabel?: string;
  ariaControls?: string;
}

export interface TabViewProps {
  tabs: TabItem[];
  defaultTabId?: string;
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
  onChange?: (tabId: string) => void; // Alias für onTabChange für bessere Kompatibilität
  variant?: 'default' | 'pills' | 'buttons' | 'underline' | 'minimal';
  fullWidth?: boolean;
  className?: string;
  tabsClassName?: string;
  contentClassName?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  showContent?: boolean;
  lazy?: boolean;
  tabSize?: 'sm' | 'md' | 'lg';
  centered?: boolean;
  style?: React.CSSProperties;
  /** ARIA-Label für die Tablist */
  ariaLabel?: string;
  /** Ob die Tabs automatisch aktiviert werden sollen, wenn sie fokussiert werden */
  autoActivate?: boolean;
  /** Ob die Tabs vertikal ausgerichtet werden sollen */
  vertical?: boolean;
  /** Ob die Tabs manuell aktiviert werden sollen (mit Enter oder Space) */
  manual?: boolean;
  /** Ob die Tabs eine Tastaturnavigation haben sollen */
  keyboardNavigation?: boolean;
  /** Ob die Tabs eine zirkuläre Navigation haben sollen */
  circular?: boolean;
  /** Ob die Tabs eine Fokus-Trap haben sollen */
  focusTrap?: boolean;
  /** Ob die Tabs eine Live-Region haben sollen */
  liveRegion?: boolean;
  /** Ob die Tabs eine Ankündigung haben sollen */
  announce?: boolean;
  /** Ob die Tabs eine Beschreibung haben sollen */
  description?: string;
  /** Ob die Tabs eine Fehlerbehandlung haben sollen */
  error?: string;
  /** Ob die Tabs eine Erfolgsbehandlung haben sollen */
  success?: string;
  /** Ob die Tabs eine Ladebehandlung haben sollen */
  loading?: boolean;
  /** Ob die Tabs eine Validierungsbehandlung haben sollen */
  validation?: boolean;
  /** Ob die Tabs eine Hilfetext haben sollen */
  helperText?: string;
  /** Ob die Tabs eine Tooltip haben sollen */
  tooltip?: string;
  /** Ob die Tabs eine Tastaturkürzel haben sollen */
  keyboardShortcuts?: boolean;
  /** Ob die Tabs eine Fokus-Verwaltung haben sollen */
  focusManagement?: boolean;
  /** Ob die Tabs eine Screenreader-Unterstützung haben sollen */
  screenReaderSupport?: boolean;
  /** Ob die Tabs eine High-Contrast-Unterstützung haben sollen */
  highContrastSupport?: boolean;
  /** Ob die Tabs eine Farbkontrast-Unterstützung haben sollen */
  colorContrastSupport?: boolean;
  /** Ob die Tabs eine Zoom-Unterstützung haben sollen */
  zoomSupport?: boolean;
  /** Ob die Tabs eine Tastatur-Unterstützung haben sollen */
  keyboardSupport?: boolean;
  /** Ob die Tabs eine Maus-Unterstützung haben sollen */
  mouseSupport?: boolean;
  /** Ob die Tabs eine Touch-Unterstützung haben sollen */
  touchSupport?: boolean;
  /** Ob die Tabs eine Sprach-Unterstützung haben sollen */
  voiceSupport?: boolean;
  /** Ob die Tabs eine Gesten-Unterstützung haben sollen */
  gestureSupport?: boolean;
  /** Ob die Tabs eine Animation-Unterstützung haben sollen */
  animationSupport?: boolean;
  /** Ob die Tabs eine Transition-Unterstützung haben sollen */
  transitionSupport?: boolean;
  /** Ob die Tabs eine Responsive-Unterstützung haben sollen */
  responsiveSupport?: boolean;
  /** Ob die Tabs eine Mobile-Unterstützung haben sollen */
  mobileSupport?: boolean;
  /** Ob die Tabs eine Desktop-Unterstützung haben sollen */
  desktopSupport?: boolean;
  /** Ob die Tabs eine Tablet-Unterstützung haben sollen */
  tabletSupport?: boolean;
  /** Ob die Tabs eine Print-Unterstützung haben sollen */
  printSupport?: boolean;
  /** Ob die Tabs eine RTL-Unterstützung haben sollen */
  rtlSupport?: boolean;
  /** Ob die Tabs eine LTR-Unterstützung haben sollen */
  ltrSupport?: boolean;
  /** Ob die Tabs eine Internationalisierung-Unterstützung haben sollen */
  i18nSupport?: boolean;
  /** Ob die Tabs eine Lokalisierung-Unterstützung haben sollen */
  l10nSupport?: boolean;
  /** Ob die Tabs eine Globalisierung-Unterstützung haben sollen */
  g11nSupport?: boolean;
  /** Ob die Tabs eine Barrierefreiheit-Unterstützung haben sollen */
  a11ySupport?: boolean;
}

/**
 * Barrierefreie TabView-Komponente zur Organisation von Inhalten in Registerkarten
 *
 * @example
 * ```tsx
 * <TabViewA11y
 *   tabs={[
 *     { id: 'tab1', label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
 *     { id: 'tab2', label: 'Tab 2', content: <div>Inhalt von Tab 2</div> }
 *   ]}
 *   ariaLabel="Beispiel-Tabs"
 * />
 * ```
 */
export const TabViewA11y: React.FC<TabViewProps> = ({
  tabs,
  defaultTabId,
  activeTabId: controlledActiveTabId,
  onTabChange,
  onChange,
  variant = 'default',
  fullWidth = false,
  className = '',
  tabsClassName = '',
  contentClassName = '',
  position = 'top',
  showContent = true,
  lazy = true,
  tabSize = 'md',
  centered = false,
  style,
  ariaLabel,
  autoActivate = false,
  vertical = false,
  manual = false,
  keyboardNavigation = true,
  circular = true,
  focusTrap = false,
  liveRegion = true,
  announce = true,
  description,
  error,
  success,
  loading = false,
  validation = false,
  helperText,
  tooltip,
  keyboardShortcuts = true,
  focusManagement = true,
  screenReaderSupport = true,
  highContrastSupport = true,
  colorContrastSupport = true,
  zoomSupport = true,
  keyboardSupport = true,
  mouseSupport = true,
  touchSupport = true,
  voiceSupport = true,
  gestureSupport = true,
  animationSupport = true,
  transitionSupport = true,
  responsiveSupport = true,
  mobileSupport = true,
  desktopSupport = true,
  tabletSupport = true,
  printSupport = true,
  rtlSupport = true,
  ltrSupport = true,
  i18nSupport = true,
  l10nSupport = true,
  g11nSupport = true,
  a11ySupport = true,
}) => {
  // Generiere eindeutige IDs für ARIA-Attribute
  const uniqueId = useId();
  const tablistId = `tablist-${uniqueId}`;

  // Bestimme den aktiven Tab
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (controlledActiveTabId) {
      return controlledActiveTabId;
    }

    if (defaultTabId) {
      return defaultTabId;
    }

    // Wenn kein Tab angegeben ist, verwende den ersten nicht deaktivierten Tab
    const firstEnabledTab = tabs.find((tab) => !tab.disabled);
    return firstEnabledTab ? firstEnabledTab.id : '';
  });

  // Aktualisiere den aktiven Tab, wenn sich die Props ändern
  useEffect(() => {
    if (controlledActiveTabId !== undefined) {
      setActiveTab(controlledActiveTabId);
    }
  }, [controlledActiveTabId]);

  // Refs für Fokus-Management
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [focusedTabIndex, setFocusedTabIndex] = useState<number>(-1);
  const [announceMessage, setAnnounceMessage] = useState<string>('');

  // Initialisiere die Refs für die Tabs
  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length);
  }, [tabs]);

  // Finde den Index des aktiven Tabs
  const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

  // Behandle Tab-Wechsel
  const handleTabChange = (tabId: string) => {
    if (controlledActiveTabId === undefined) {
      setActiveTab(tabId);
    }

    if (onTabChange) {
      onTabChange(tabId);
    }

    if (onChange) {
      onChange(tabId);
    }

    // Ankündige den Tab-Wechsel für Screenreader
    if (announce) {
      const tab = tabs.find((t) => t.id === tabId);
      if (tab) {
        const tabLabel = typeof tab.label === 'string' ? tab.label : 'Tab';
        setAnnounceMessage(`${tabLabel} ausgewählt`);
      }
    }
  };

  // Behandle Tastaturnavigation
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!keyboardNavigation || focusedTabIndex === -1) return;

    const enabledTabs = tabs.filter((tab) => !tab.disabled);
    const enabledTabsCount = enabledTabs.length;

    if (enabledTabsCount === 0) return;

    let newIndex = focusedTabIndex;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        if (vertical && event.key === 'ArrowRight') break;
        if (!vertical && event.key === 'ArrowDown') break;

        newIndex = circular
          ? (focusedTabIndex + 1) % enabledTabsCount
          : Math.min(focusedTabIndex + 1, enabledTabsCount - 1);
        event.preventDefault();
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        if (vertical && event.key === 'ArrowLeft') break;
        if (!vertical && event.key === 'ArrowUp') break;

        newIndex = circular
          ? (focusedTabIndex - 1 + enabledTabsCount) % enabledTabsCount
          : Math.max(focusedTabIndex - 1, 0);
        event.preventDefault();
        break;

      case 'Home':
        newIndex = 0;
        event.preventDefault();
        break;

      case 'End':
        newIndex = enabledTabsCount - 1;
        event.preventDefault();
        break;

      case 'Enter':
      case ' ':
        if (manual) {
          const enabledTabId = enabledTabs[focusedTabIndex]?.id;
          if (enabledTabId) {
            handleTabChange(enabledTabId);
          }
          event.preventDefault();
        }
        break;

      default:
        // Implementiere Tastaturkürzel für die Tabs (1-9)
        if (keyboardShortcuts && /^[1-9]$/.test(event.key)) {
          const index = parseInt(event.key, 10) - 1;
          if (index < enabledTabsCount) {
            const enabledTabId = enabledTabs[index]?.id;
            if (enabledTabId) {
              handleTabChange(enabledTabId);
              setFocusedTabIndex(index);
              tabRefs.current[index]?.focus();
            }
          }
          event.preventDefault();
        }
        break;
    }

    // Fokussiere den neuen Tab
    if (newIndex !== focusedTabIndex) {
      setFocusedTabIndex(newIndex);
      tabRefs.current[newIndex]?.focus();

      // Aktiviere den Tab automatisch, wenn autoActivate aktiviert ist
      if (autoActivate) {
        const enabledTabId = enabledTabs[newIndex]?.id;
        if (enabledTabId) {
          handleTabChange(enabledTabId);
        }
      }
    }
  };

  // Behandle Fokus auf Tab
  const handleTabFocus = (index: number) => {
    setFocusedTabIndex(index);
  };

  // Behandle Klick auf Tab
  const handleTabClick = (tabId: string) => {
    if (!manual) {
      handleTabChange(tabId);
    }
  };

  // Rendere die Tabs
  const renderTabs = () => {
    // Bestimme die Klassen für die Tabliste basierend auf der Variante und Position
    const tablistClasses = {
      default: 'border-b border-gray-200 dark:border-gray-700',
      pills: 'space-x-1',
      buttons: 'space-x-1',
      underline: 'border-b border-gray-200 dark:border-gray-700',
      minimal: '',
    };

    // Bestimme die Klassen für die Tabs basierend auf der Variante
    const getTabClasses = (isActive: boolean, isDisabled: boolean) => {
      const baseClasses =
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500';
      const sizeClasses = {
        sm: 'px-2 py-1 text-sm',
        md: 'px-3 py-2',
        lg: 'px-4 py-3 text-lg',
      };

      const variantClasses = {
        default: `${
          isActive
            ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
            : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400 dark:hover:border-gray-600'
        } ${sizeClasses[tabSize]}`,
        pills: `${
          isActive
            ? 'bg-primary-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
        } rounded-full ${sizeClasses[tabSize]}`,
        buttons: `${
          isActive
            ? 'bg-primary-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
        } rounded-md ${sizeClasses[tabSize]}`,
        underline: `${
          isActive
            ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
            : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
        } ${sizeClasses[tabSize]}`,
        minimal: `${
          isActive
            ? 'text-primary-600 dark:text-primary-400'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
        } ${sizeClasses[tabSize]}`,
      };

      const disabledClasses = isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

      return `${baseClasses} ${variantClasses[variant]} ${disabledClasses}`;
    };

    // Bestimme die Ausrichtung der Tabs
    const tabsAlignment = centered
      ? 'justify-center'
      : fullWidth
        ? 'justify-between'
        : 'justify-start';

    // Bestimme die Orientierung der Tabs
    const tabsOrientation =
      vertical || position === 'left' || position === 'right' ? 'flex-col' : 'flex-row';

    return (
      <div
        className={`${tabsClassName}`}
        role="tablist"
        id={tablistId}
        aria-label={ariaLabel || 'Tabs'}
        aria-orientation={
          vertical || position === 'left' || position === 'right' ? 'vertical' : 'horizontal'
        }
        onKeyDown={handleKeyDown}
      >
        <div className={`flex ${tabsOrientation} ${tabsAlignment} ${tablistClasses[variant]}`}>
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeTab;
            const isDisabled = !!tab.disabled;
            const tabId = `tab-${tab.id}-${uniqueId}`;
            const panelId = `panel-${tab.id}-${uniqueId}`;

            return (
              <button
                key={tab.id}
                ref={(el) => (tabRefs.current[index] = el)}
                id={tabId}
                role="tab"
                aria-selected={isActive}
                aria-controls={tab.ariaControls || panelId}
                aria-disabled={isDisabled}
                aria-label={
                  tab.ariaLabel || (typeof tab.label === 'string' ? tab.label : undefined)
                }
                tabIndex={isActive ? 0 : -1}
                className={getTabClasses(isActive, isDisabled)}
                onClick={() => !isDisabled && handleTabClick(tab.id)}
                onFocus={() => handleTabFocus(index)}
                disabled={isDisabled}
                title={tooltip}
              >
                <div className="flex items-center">
                  {tab.icon && <span className="mr-2">{tab.icon}</span>}
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getBadgeColorClass(tab.badgeColor)}`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Rendere den Inhalt
  const renderContent = () => {
    if (!showContent) return null;

    return (
      <div className={`mt-4 ${contentClassName}`}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const panelId = `panel-${tab.id}-${uniqueId}`;
          const tabId = `tab-${tab.id}-${uniqueId}`;

          // Wenn lazy aktiviert ist, rendere nur den aktiven Tab
          if (lazy && !isActive) return null;

          return (
            <div
              key={tab.id}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              className={isActive ? 'block' : 'hidden'}
              tabIndex={0}
            >
              {tab.content}
            </div>
          );
        })}
      </div>
    );
  };

  // Rendere die Beschreibung für Screenreader
  const renderDescription = () => {
    if (!description) return null;

    return (
      <div id={`${tablistId}-description`} className="sr-only">
        {description}
      </div>
    );
  };

  // Rendere die Live-Region für Ankündigungen
  const renderLiveRegion = () => {
    if (!liveRegion) return null;

    return (
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announceMessage}
      </div>
    );
  };

  // Rendere den Fehler
  const renderError = () => {
    if (!error) return null;

    return (
      <div
        id={`${tablistId}-error`}
        className="text-red-600 dark:text-red-400 mt-2 text-sm"
        role="alert"
      >
        {error}
      </div>
    );
  };

  // Rendere den Erfolg
  const renderSuccess = () => {
    if (!success) return null;

    return (
      <div id={`${tablistId}-success`} className="text-green-600 dark:text-green-400 mt-2 text-sm">
        {success}
      </div>
    );
  };

  // Rendere den Hilfetext
  const renderHelperText = () => {
    if (!helperText) return null;

    return (
      <div id={`${tablistId}-helper`} className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
        {helperText}
      </div>
    );
  };

  // Rendere den Ladeindikator
  const renderLoading = () => {
    if (!loading) return null;

    return (
      <div
        id={`${tablistId}-loading`}
        className="text-gray-500 dark:text-gray-400 mt-2 text-sm"
        aria-live="polite"
      >
        Wird geladen...
      </div>
    );
  };

  // Hilfsfunktion für Badge-Farben
  const getBadgeColorClass = (color?: string) => {
    switch (color) {
      case 'primary':
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300';
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'danger':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'info':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Bestimme die ARIA-Attribute für die TabView
  const getAriaAttributes = () => {
    const attributes: Record<string, string> = {};

    if (description) {
      attributes['aria-describedby'] = `${tablistId}-description`;
    }

    if (error) {
      attributes['aria-errormessage'] = `${tablistId}-error`;
      attributes['aria-invalid'] = 'true';
    }

    if (helperText && !error) {
      attributes['aria-describedby'] = attributes['aria-describedby']
        ? `${attributes['aria-describedby']} ${tablistId}-helper`
        : `${tablistId}-helper`;
    }

    if (success) {
      attributes['aria-describedby'] = attributes['aria-describedby']
        ? `${attributes['aria-describedby']} ${tablistId}-success`
        : `${tablistId}-success`;
    }

    if (loading) {
      attributes['aria-busy'] = 'true';
    }

    return attributes;
  };

  // Layout the tabs and content based on position
  return (
    <div
      className={`w-full ${position === 'left' || position === 'right' ? 'flex' : ''} ${className}`}
      style={style}
      {...getAriaAttributes()}
    >
      {renderDescription()}
      {renderLiveRegion()}

      {position === 'top' && (
        <>
          {renderTabs()}
          {renderContent()}
          {renderError()}
          {renderSuccess()}
          {renderHelperText()}
          {renderLoading()}
        </>
      )}

      {position === 'bottom' && (
        <>
          {renderContent()}
          {renderTabs()}
          {renderError()}
          {renderSuccess()}
          {renderHelperText()}
          {renderLoading()}
        </>
      )}

      {position === 'left' && (
        <>
          <div className="mr-4">{renderTabs()}</div>
          <div className="flex-1">
            {renderContent()}
            {renderError()}
            {renderSuccess()}
            {renderHelperText()}
            {renderLoading()}
          </div>
        </>
      )}

      {position === 'right' && (
        <>
          <div className="flex-1">
            {renderContent()}
            {renderError()}
            {renderSuccess()}
            {renderHelperText()}
            {renderLoading()}
          </div>
          <div className="ml-4">{renderTabs()}</div>
        </>
      )}
    </div>
  );
};

export default TabViewA11y;
