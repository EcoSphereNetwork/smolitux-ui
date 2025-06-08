import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import './TabView.css';

// TabView Context
interface TabViewContextType {
  activeTab: number;
  setActiveTab: (index: number) => void;
  variant: string;
  size: string;
  colorScheme: string;
}

const TabViewContext = createContext<TabViewContextType | undefined>(undefined);

// Tab Component
export interface TabProps {
  label: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

// TabPanel Component
export interface TabPanelProps {
  children: React.ReactNode;
}

export const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return <>{children}</>;
};

// TabView Component
export interface TabViewProps {
  children: React.ReactNode;
  defaultActiveTab?: number;
  activeTab?: number;
  onTabChange?: (index: number) => void;
  variant?: 'default' | 'enclosed' | 'underlined' | 'pills' | 'soft-rounded';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'primary' | 'secondary' | 'accent' | 'neutral';
  className?: string;
  contentClassName?: string;
  centered?: boolean;
  lazy?: boolean;
}

export const TabView: React.FC<TabViewProps> = ({
  children,
  defaultActiveTab = 0,
  activeTab: controlledActiveTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  colorScheme = 'primary',
  className = '',
  contentClassName = '',
  centered = false,
  lazy = true,
}) => {
  // Extract tabs and panels from children
  const tabs: React.ReactElement<TabProps>[] = [];
  const panels: React.ReactElement<TabPanelProps>[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === Tab) {
      const tabChild = child as React.ReactElement<TabProps>;
      tabs.push(tabChild);

      // Extract panel from tab's children
      React.Children.forEach(tabChild.props.children, (panelChild) => {
        if (React.isValidElement(panelChild) && panelChild.type === TabPanel) {
          panels.push(panelChild as React.ReactElement<TabPanelProps>);
        }
      });
    }
  });

  // State for active tab
  const isControlled = controlledActiveTab !== undefined;
  const [uncontrolledActiveTab, setUncontrolledActiveTab] = useState(defaultActiveTab);
  const activeTabIndex = isControlled ? controlledActiveTab : uncontrolledActiveTab;

  // Handle tab change
  const handleTabChange = (index: number) => {
    if (!isControlled) {
      setUncontrolledActiveTab(index);
    }
    if (onTabChange) {
      onTabChange(index);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      const nextTabElement = document.querySelectorAll('[role="tab"]')[nextIndex] as HTMLElement;
      nextTabElement?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      const prevTabElement = document.querySelectorAll('[role="tab"]')[prevIndex] as HTMLElement;
      prevTabElement?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTabChange(index);
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Variant classes
  const variantClasses = {
    default: '',
    enclosed: 'border-b',
    underlined: 'border-b',
    pills: '',
    'soft-rounded': '',
  };

  // Color classes
  const colorClasses = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    accent: 'text-accent-600',
    neutral: 'text-gray-600',
  };

  // Context value
  const contextValue: TabViewContextType = {
    activeTab: activeTabIndex,
    setActiveTab: handleTabChange,
    variant,
    size,
    colorScheme,
  };

  return (
    <TabViewContext.Provider value={contextValue}>
      <div className={`tab-view ${className}`}>
        <div
          className={`tab-list ${variantClasses[variant]} ${centered ? 'flex justify-center' : ''}`}
          role="tablist"
          aria-orientation="horizontal"
        >
          {tabs.map((tab, index) => {
            const isActive = index === activeTabIndex;
            const isDisabled = tab.props.disabled;

            return (
              <button
                key={index}
                role="tab"
                aria-selected={isActive}
                aria-disabled={isDisabled}
                aria-controls={`panel-${index}`}
                id={`tab-${index}`}
                tabIndex={isActive ? 0 : -1}
                className={`
                  tab-item
                  ${sizeClasses[size]}
                  ${isActive ? colorClasses[colorScheme] : 'text-gray-500'}
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  ${variant === 'enclosed' ? 'rounded-t-md' : ''}
                  ${isActive && variant === 'underlined' ? 'border-b-2 border-current -mb-px' : ''}
                  ${isActive && variant === 'enclosed' ? 'bg-white border-b-white' : ''}
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                `}
                onClick={() => !isDisabled && handleTabChange(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={isDisabled}
              >
                {tab.props.icon && <span className="mr-2">{tab.props.icon}</span>}
                {tab.props.label}
              </button>
            );
          })}
        </div>

        <div className={`tab-content ${contentClassName}`}>
          {panels.map((panel, index) => (
            <div
              key={index}
              role="tabpanel"
              id={`panel-${index}`}
              aria-labelledby={`tab-${index}`}
              hidden={index !== activeTabIndex}
              tabIndex={0}
              className="tab-panel p-4 focus:outline-none"
            >
              {(!lazy || index === activeTabIndex) && panel.props.children}
            </div>
          ))}
        </div>
      </div>
    </TabViewContext.Provider>
  );
};

export default TabView;
