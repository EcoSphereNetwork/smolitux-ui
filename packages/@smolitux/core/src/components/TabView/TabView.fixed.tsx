import React, { useState, useEffect, useRef } from 'react';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  badgeColor?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
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
}

/**
 * TabView-Komponente zur Organisation von Inhalten in Registerkarten
 */
export const TabView: React.FC<TabViewProps> = ({
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
}) => {
  // Support both controlled and uncontrolled mode
  const isControlled = controlledActiveTabId !== undefined;
  const [uncontrolledActiveTabId, setUncontrolledActiveTabId] = useState(
    defaultTabId || (tabs.length > 0 ? tabs[0].id : '')
  );

  // Get active tab ID from either controlled or uncontrolled state
  const activeTabId = isControlled ? controlledActiveTabId : uncontrolledActiveTabId;

  // Tab scroll container reference for horizontal scrolling
  const tabsRef = useRef<HTMLDivElement>(null);

  // Track which tabs have been rendered (for lazy loading)
  const [renderedTabs, setRenderedTabs] = useState<Set<string>>(
    new Set(lazy ? [activeTabId] : tabs.map(tab => tab.id))
  );

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    if (tabId === activeTabId) return;

    // If not controlled, update internal state
    if (!isControlled) {
      setUncontrolledActiveTabId(tabId);
    }

    // Mark tab as rendered for lazy loading
    if (lazy) {
      setRenderedTabs(prev => new Set([...prev, tabId]));
    }

    // Notify parent if callback provided
    if (onTabChange) {
      onTabChange(tabId);
    }
    
    // Support for onChange alias
    if (onChange) {
      onChange(tabId);
    }
  };

  // Ensure the active tab is visible (scroll into view)
  useEffect(() => {
    if (tabsRef.current && position !== 'left' && position !== 'right') {
      const tabsContainer = tabsRef.current;
      const activeTab = tabsContainer.querySelector(`[data-tab-id="${activeTabId}"]`) as HTMLElement;

      if (activeTab) {
        const containerRect = tabsContainer.getBoundingClientRect();
        const tabRect = activeTab.getBoundingClientRect();

        if (tabRect.left < containerRect.left) {
          tabsContainer.scrollLeft -= (containerRect.left - tabRect.left);
        } else if (tabRect.right > containerRect.right) {
          tabsContainer.scrollLeft += (tabRect.right - containerRect.right);
        }
      }
    }
  }, [activeTabId, position]);

  // On first mount, ensure default tab is in rendered tabs set
  useEffect(() => {
    if (lazy && activeTabId && !renderedTabs.has(activeTabId)) {
      setRenderedTabs(prev => new Set([...prev, activeTabId]));
    }
  }, [lazy, activeTabId, renderedTabs]);

  // Size classes for tabs
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-3',
  };

  // Get variant-specific classes for the tabs container
  const getTabsContainerClasses = () => {
    const baseClasses = `${position === 'left' || position === 'right' ? 'flex-col' : 'flex-row'} flex`;

    const variantClasses = {
      default: 'border-b border-gray-200 dark:border-gray-700',
      pills: 'space-x-1',
      buttons: 'p-1 bg-gray-100 dark:bg-gray-800 rounded-lg',
      underline: 'border-b border-gray-200 dark:border-gray-700',
      minimal: '',
    };

    const positionClasses = {
      top: '',
      bottom: 'border-t border-b-0',
      left: 'border-r border-b-0',
      right: 'border-l border-b-0',
    };

    return `${baseClasses} ${variantClasses[variant]} ${position === 'top' || variant !== 'default' ? '' : positionClasses[position]}`;
  };

  // Get variant-specific classes for individual tabs
  const getTabClasses = (isActive: boolean, isDisabled: boolean) => {
    const baseClasses = `
      ${sizeClasses[tabSize]}
      ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      ${fullWidth ? 'flex-1 text-center' : ''}
      group
      flex items-center justify-center whitespace-nowrap
      transition-all duration-200
    `;

    const variantActiveClasses = {
      default: isActive
        ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 border-b-2 border-transparent',
      pills: isActive
        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 rounded-full'
        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full',
      buttons: isActive
        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm rounded-md'
        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md',
      underline: isActive
        ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 border-transparent',
      minimal: isActive
        ? 'text-primary-600 dark:text-primary-400 font-medium'
        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
    };

    return `${baseClasses} ${variantActiveClasses[variant]}`;
  };

  // Classes for badge colors
  const getBadgeClasses = (color: TabItem['badgeColor'] = 'default') => {
    const classes = {
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
      success: 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300',
      warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300',
      danger: 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300',
      info: 'bg-info-100 text-info-800 dark:bg-info-900/30 dark:text-info-300',
    };

    return `ml-2 px-2 py-0.5 text-xs rounded-full ${classes[color]}`;
  };

  // Render the tabs
  const renderTabs = () => {
    return (
      <div
        ref={tabsRef}
        className={`${getTabsContainerClasses()} ${centered && position !== 'left' && position !== 'right' ? 'justify-center' : ''} ${tabsClassName} ${position === 'left' || position === 'right' ? 'h-full' : 'w-full'} overflow-x-auto`}
        role="tablist"
      >
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tab"
            aria-selected={activeTabId === tab.id}
            aria-controls={`panel-${tab.id}`}
            data-tab-id={tab.id}
            className={getTabClasses(activeTabId === tab.id, !!tab.disabled)}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                !tab.disabled && handleTabChange(tab.id);
              }
            }}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge && (
              <span className={getBadgeClasses(tab.badgeColor)}>
                {tab.badge}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render the content
  const renderContent = () => {
    if (!showContent) return null;

    return (
      <div className={`tab-content ${contentClassName}`}>
        {tabs.map((tab) => {
          // Skip unrendered tabs when lazy loading
          if (lazy && !renderedTabs.has(tab.id)) {
            return null;
          }

          return (
            <div
              key={tab.id}
              id={`panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={tab.id}
              className={`${activeTabId === tab.id ? 'block' : 'hidden'}`}
            >
              {tab.content}
            </div>
          );
        })}
      </div>
    );
  };

  // Layout the tabs and content based on position
  return (
    <div className={`w-full ${position === 'left' || position === 'right' ? 'flex' : ''} ${className}`} style={style}>
      {position === 'top' && (
        <>
          {renderTabs()}
          {renderContent()}
        </>
      )}

      {position === 'bottom' && (
        <>
          {renderContent()}
          {renderTabs()}
        </>
      )}

      {position === 'left' && (
        <>
          <div className="mr-4">{renderTabs()}</div>
          <div className="flex-1">{renderContent()}</div>
        </>
      )}

      {position === 'right' && (
        <>
          <div className="flex-1">{renderContent()}</div>
          <div className="ml-4">{renderTabs()}</div>
        </>
      )}
    </div>
  );
};

export default TabView;