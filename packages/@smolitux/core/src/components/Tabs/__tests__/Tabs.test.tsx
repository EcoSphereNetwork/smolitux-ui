import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from './Tabs';
import { TabList } from './TabList';
import { Tab } from './Tab';
import { TabPanels } from './TabPanels';
import { TabPanel } from './TabPanel';

describe('Tabs', () => {
  const tabsData = [
    { id: 'tab1', label: 'Tab 1', content: 'Content for Tab 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Content for Tab 2' },
    { id: 'tab3', label: 'Tab 3', content: 'Content for Tab 3' }
  ];

  it('renders correctly with default props', () => {
    render(
      <Tabs>
        <TabList>
          {tabsData.map(tab => (
            <Tab key={tab.id}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabsData.map(tab => (
            <TabPanel key={tab.id}>{tab.content}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    );
    
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
    
    // Only the first tab panel should be visible by default
    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 3')).not.toBeInTheDocument();
  });

  it('switches tabs when clicked', () => {
    render(
      <Tabs>
        <TabList>
          {tabsData.map(tab => (
            <Tab key={tab.id}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabsData.map(tab => (
            <TabPanel key={tab.id}>{tab.content}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    );
    
    // Click on the second tab
    fireEvent.click(screen.getByText('Tab 2'));
    
    // Now the second tab panel should be visible
    expect(screen.queryByText('Content for Tab 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 3')).not.toBeInTheDocument();
    
    // Click on the third tab
    fireEvent.click(screen.getByText('Tab 3'));
    
    // Now the third tab panel should be visible
    expect(screen.queryByText('Content for Tab 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 2')).not.toBeInTheDocument();
    expect(screen.getByText('Content for Tab 3')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <Tabs className="custom-tabs">
        <TabList>
          <Tab>Tab 1</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
        </TabPanels>
      </Tabs>
    );
    
    const tabsContainer = screen.getByTestId('tabs-container');
    expect(tabsContainer).toHaveClass('custom-tabs');
  });

  it('renders with custom style', () => {
    const customStyle = { backgroundColor: 'lightblue', padding: '10px' };
    render(
      <Tabs style={customStyle}>
        <TabList>
          <Tab>Tab 1</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
        </TabPanels>
      </Tabs>
    );
    
    const tabsContainer = screen.getByTestId('tabs-container');
    expect(tabsContainer).toHaveStyle('background-color: lightblue');
    expect(tabsContainer).toHaveStyle('padding: 10px');
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Tabs variant="line">
        <TabList>
          <Tab>Tab 1</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
        </TabPanels>
      </Tabs>
    );
    
    let tabsContainer = screen.getByTestId('tabs-container');
    expect(tabsContainer).toHaveClass('tabs-line');
    
    rerender(
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Tab 1</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
        </TabPanels>
      </Tabs>
    );
    
    tabsContainer = screen.getByTestId('tabs-container');
    expect(tabsContainer).toHaveClass('tabs-enclosed');
    
    rerender(
      <Tabs variant="filled">
        <TabList>
          <Tab>Tab 1</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
        </TabPanels>
      </Tabs>
    );
    
    tabsContainer = screen.getByTestId('tabs-container');
    expect(tabsContainer).toHaveClass('tabs-filled');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Tabs size="sm">
        <TabList>
          <Tab>Tab 1</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
        </TabPanels>
      </Tabs>
    );
    
    let tabsContainer = screen.getByTestId('tabs-container');
    expect(tabsContainer).toHaveClass('tabs-sm');
    
    rerender(
      <Tabs size="md">
        <TabList>
          <Tab>Tab 1</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
        </TabPanels>
      </Tabs>
    );
    
    tabsContainer = screen.getByTestId('tabs-container');
    expect(tabsContainer).toHaveClass('tabs-md');
    
    rerender(
      <Tabs size="lg">
        <TabList>
          <Tab>Tab 1</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
        </TabPanels>
      </Tabs>
    );
    
    tabsContainer = screen.getByTestId('tabs-container');
    expect(tabsContainer).toHaveClass('tabs-lg');
  });

  it('renders with default index', () => {
    render(
      <Tabs defaultIndex={1}>
        <TabList>
          {tabsData.map(tab => (
            <Tab key={tab.id}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabsData.map(tab => (
            <TabPanel key={tab.id}>{tab.content}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    );
    
    // The second tab panel should be visible by default
    expect(screen.queryByText('Content for Tab 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 3')).not.toBeInTheDocument();
  });

  it('renders with controlled index', () => {
    const { rerender } = render(
      <Tabs index={0}>
        <TabList>
          {tabsData.map(tab => (
            <Tab key={tab.id}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabsData.map(tab => (
            <TabPanel key={tab.id}>{tab.content}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    );
    
    // The first tab panel should be visible
    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
    
    // Update the index prop
    rerender(
      <Tabs index={2}>
        <TabList>
          {tabsData.map(tab => (
            <Tab key={tab.id}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabsData.map(tab => (
            <TabPanel key={tab.id}>{tab.content}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    );
    
    // Now the third tab panel should be visible
    expect(screen.queryByText('Content for Tab 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 2')).not.toBeInTheDocument();
    expect(screen.getByText('Content for Tab 3')).toBeInTheDocument();
  });

  it('calls onChange when tab is changed', () => {
    const handleChange = jest.fn();
    render(
      <Tabs onChange={handleChange}>
        <TabList>
          {tabsData.map(tab => (
            <Tab key={tab.id}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabsData.map(tab => (
            <TabPanel key={tab.id}>{tab.content}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    );
    
    // Click on the second tab
    fireEvent.click(screen.getByText('Tab 2'));
    
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('renders with disabled tabs', () => {
    render(
      <Tabs>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab isDisabled>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
          <TabPanel>Content for Tab 2</TabPanel>
          <TabPanel>Content for Tab 3</TabPanel>
        </TabPanels>
      </Tabs>
    );
    
    const disabledTab = screen.getByText('Tab 2');
    expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
    
    // Clicking on the disabled tab should not change the active tab
    fireEvent.click(disabledTab);
    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
  });

  it('renders with orientation', () => {
    const { rerender } = render(
      <Tabs orientation="horizontal">
        <TabList>
          <Tab>Tab 1</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
        </TabPanels>
      </Tabs>
    );
    
    let tabsContainer = screen.getByTestId('tabs-container');
    expect(tabsContainer).toHaveClass('tabs-horizontal');
    
    rerender(
      <Tabs orientation="vertical">
        <TabList>
          <Tab>Tab 1</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
        </TabPanels>
      </Tabs>
    );
    
    tabsContainer = screen.getByTestId('tabs-container');
    expect(tabsContainer).toHaveClass('tabs-vertical');
  });

  it('renders with isFitted option', () => {
    render(
      <Tabs isFitted>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
          <TabPanel>Content for Tab 2</TabPanel>
        </TabPanels>
      </Tabs>
    );
    
    const tabList = screen.getByRole('tablist');
    expect(tabList).toHaveClass('tab-list-fitted');
  });

  it('renders with isLazy option', () => {
    render(
      <Tabs isLazy>
        <TabList>
          {tabsData.map(tab => (
            <Tab key={tab.id}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabsData.map(tab => (
            <TabPanel key={tab.id}>{tab.content}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    );
    
    // Only the first tab panel should be in the DOM
    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
    
    // Click on the second tab
    fireEvent.click(screen.getByText('Tab 2'));
    
    // Now the second tab panel should be in the DOM
    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
    
    // But the third tab panel should still not be in the DOM
    expect(screen.queryByText('Content for Tab 3')).not.toBeInTheDocument();
  });

  it('renders with aria attributes', () => {
    render(
      <Tabs aria-label="Navigation tabs">
        <TabList>
          <Tab>Tab 1</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
        </TabPanels>
      </Tabs>
    );
    
    const tabsContainer = screen.getByTestId('tabs-container');
    expect(tabsContainer).toHaveAttribute('aria-label', 'Navigation tabs');
  });

  it('supports keyboard navigation', () => {
    render(
      <Tabs>
        <TabList>
          {tabsData.map(tab => (
            <Tab key={tab.id}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabsData.map(tab => (
            <TabPanel key={tab.id}>{tab.content}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    );
    
    // Focus on the first tab
    const firstTab = screen.getByText('Tab 1');
    firstTab.focus();
    
    // Press right arrow key to move to the next tab
    fireEvent.keyDown(firstTab, { key: 'ArrowRight' });
    
    // The second tab should now be active
    expect(screen.getByText('Tab 2')).toHaveFocus();
    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
    
    // Press right arrow key again to move to the third tab
    fireEvent.keyDown(screen.getByText('Tab 2'), { key: 'ArrowRight' });
    
    // The third tab should now be active
    expect(screen.getByText('Tab 3')).toHaveFocus();
    expect(screen.getByText('Content for Tab 3')).toBeInTheDocument();
    
    // Press left arrow key to move back to the second tab
    fireEvent.keyDown(screen.getByText('Tab 3'), { key: 'ArrowLeft' });
    
    // The second tab should now be active again
    expect(screen.getByText('Tab 2')).toHaveFocus();
    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
  });
});