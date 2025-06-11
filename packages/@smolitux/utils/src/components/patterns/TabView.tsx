import React, { useState, useEffect, forwardRef } from 'react';
import { Box } from '../primitives/Box';
import { Flex } from '../primitives/Flex';

export interface TabItem {
  /** Unique identifier for the tab */
  id: string;
  /** Display label for the tab */
  label: React.ReactNode;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Icon to display before the label */
  icon?: React.ReactNode;
  /** Content to display when the tab is active */
  content?: React.ReactNode;
}

export interface TabViewProps {
  /** Array of tab items */
  tabs: TabItem[];
  /** ID of the active tab */
  activeTab?: string;
  /** Callback when a tab is changed */
  onChange?: (tabId: string) => void;
  /** Orientation of the tabs */
  orientation?: 'horizontal' | 'vertical';
  /** Size of the tabs */
  size?: 'sm' | 'md' | 'lg';
  /** Variant of the tabs */
  variant?: 'line' | 'enclosed' | 'soft-rounded' | 'solid-rounded' | 'unstyled';
  /** Whether to fit the tabs to the container width */
  isFitted?: boolean;
  /** Whether to lazy load tab content */
  isLazy?: boolean;
  /** Whether to manually control the active tab */
  isManual?: boolean;
  /** Additional class name for the tab list */
  tabListClassName?: string;
  /** Additional class name for the tab panels */
  tabPanelsClassName?: string;
  /** Additional class name for the active tab */
  activeTabClassName?: string;
  /** Additional class name for the inactive tabs */
  inactiveTabClassName?: string;
  /** Additional class name */
  className?: string;
  /** Children elements (alternative to tabs with content) */
  children?: React.ReactNode;
}

/**
 * TabView component for displaying content in tabs.
 * It supports different orientations, sizes, and variants.
 */
export const TabView = forwardRef<HTMLDivElement, TabViewProps>(({ 
  tabs,
  activeTab: controlledActiveTab,
  onChange,
  orientation = 'horizontal',
  size = 'md',
  variant = 'line',
  isFitted = false,
  isLazy = true,
  isManual = false,
  tabListClassName = '',
  tabPanelsClassName = '',
  activeTabClassName = '',
  inactiveTabClassName = '',
  className = '',
  children,
}, ref) => {
  // State for the active tab
  const [activeTab, setActiveTab] = useState<string>(
    controlledActiveTab || (tabs.length > 0 ? tabs[0].id : '')
  );

  // Update active tab when controlled value changes
  useEffect(() => {
    if (controlledActiveTab !== undefined) {
      setActiveTab(controlledActiveTab);
    }
  }, [controlledActiveTab]);

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    if (!isManual) {
      setActiveTab(tabId);
    }
    if (onChange) {
      onChange(tabId);
    }
  };

  // Size styles
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { fontSize: '0.875rem', padding: '0.5rem 1rem' },
    md: { fontSize: '1rem', padding: '0.75rem 1.5rem' },
    lg: { fontSize: '1.125rem', padding: '1rem 2rem' },
  };

  // Variant styles
  const getVariantStyles = (variant: string, isActive: boolean): React.CSSProperties => {
    switch (variant) {
      case 'line':
        return {
          borderBottom: isActive ? '2px solid #3b82f6' : '2px solid transparent',
          color: isActive ? '#3b82f6' : 'inherit',
        };
      case 'enclosed':
        return {
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: isActive ? '#3b82f6' : 'transparent',
          borderBottomColor: isActive ? 'transparent' : '#e5e7eb',
          borderTopLeftRadius: '0.375rem',
          borderTopRightRadius: '0.375rem',
          marginBottom: '-1px',
          color: isActive ? '#3b82f6' : 'inherit',
          backgroundColor: isActive ? 'white' : 'transparent',
        };
      case 'soft-rounded':
        return {
          borderRadius: '0.375rem',
          backgroundColor: isActive ? '#3b82f6' : 'transparent',
          color: isActive ? 'white' : 'inherit',
        };
      case 'solid-rounded':
        return {
          borderRadius: '9999px',
          backgroundColor: isActive ? '#3b82f6' : 'transparent',
          color: isActive ? 'white' : 'inherit',
        };
      case 'unstyled':
      default:
        return {
          color: isActive ? '#3b82f6' : 'inherit',
        };
    }
  };

  // Orientation styles
  const orientationStyles: Record<string, React.CSSProperties> = {
    horizontal: {
      flexDirection: 'row',
      borderBottom: variant === 'enclosed' ? '1px solid #e5e7eb' : 'none',
    },
    vertical: {
      flexDirection: 'column',
      borderRight: variant === 'enclosed' ? '1px solid #e5e7eb' : 'none',
    },
  };

  // Render tab list
  const renderTabList = () => {
    return (
      <Flex
        className={`tab-list ${tabListClassName}`}
        style={orientationStyles[orientation]}
        role="tablist"
        aria-orientation={orientation}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const baseTabStyle: React.CSSProperties = {
            cursor: tab.disabled ? 'not-allowed' : 'pointer',
            opacity: tab.disabled ? 0.6 : 1,
            fontWeight: isActive ? 500 : 400,
            ...sizeStyles[size],
            ...getVariantStyles(variant, isActive),
          };

          if (isFitted) {
            baseTabStyle.flex = 1;
            baseTabStyle.textAlign = 'center';
          }

          return (
            <Box
              key={tab.id}
              className={`tab ${isActive ? activeTabClassName : inactiveTabClassName}`}
              style={baseTabStyle}
              role="tab"
              aria-selected={isActive}
              aria-disabled={tab.disabled}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => !tab.disabled && handleTabChange(tab.id)}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
            </Box>
          );
        })}
      </Flex>
    );
  };

  // Render tab panels
  const renderTabPanels = () => {
    return (
      <Box className={`tab-panels ${tabPanelsClassName}`}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          // Skip rendering inactive tabs if lazy loading is enabled
          if (isLazy && !isActive) return null;

          return (
            <Box
              key={tab.id}
              className="tab-panel"
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
              id={`panel-${tab.id}`}
              hidden={!isActive}
              tabIndex={0}
            >
              {tab.content}
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box ref={ref} className={`tab-view ${className}`}>
      {renderTabList()}
      {renderTabPanels()}
      {children}
    </Box>
  );
});

TabView.displayName = 'TabView';
