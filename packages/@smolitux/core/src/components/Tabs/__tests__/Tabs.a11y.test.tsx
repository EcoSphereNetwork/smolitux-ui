import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { a11y } from '@smolitux/testing';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../Tabs';

describe('Tabs Accessibility', () => {
  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(
      <Tabs>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content 1</TabPanel>
          <TabPanel>Content 2</TabPanel>
        </TabPanels>
      </Tabs>
    );
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes', () => {
    render(
      <Tabs id="test-tabs">
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content 1</TabPanel>
          <TabPanel>Content 2</TabPanel>
        </TabPanels>
      </Tabs>
    );

    // TabList should have correct role and orientation
    const tabList = screen.getByRole('tablist');
    expect(tabList).toHaveAttribute('aria-orientation', 'horizontal');

    // First tab should be selected by default
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');

    // Tabs should have correct tabindex
    expect(tabs[0]).toHaveAttribute('tabIndex', '0');
    expect(tabs[1]).toHaveAttribute('tabIndex', '-1');

    // Tabs should control panels
    expect(tabs[0]).toHaveAttribute('aria-controls', 'test-tabs-panel-0');
    expect(tabs[1]).toHaveAttribute('aria-controls', 'test-tabs-panel-1');

    // Panels should have correct attributes
    const panels = screen.getAllByRole('tabpanel');
    expect(panels[0]).toHaveAttribute('aria-hidden', 'false');
    expect(panels[1]).toHaveAttribute('aria-hidden', 'true');
    expect(panels[0]).toHaveAttribute('aria-labelledby', 'test-tabs-tab-0');
    expect(panels[1]).toHaveAttribute('aria-labelledby', 'test-tabs-tab-1');
  });

  it('should support keyboard navigation', () => {
    render(
      <Tabs>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content 1</TabPanel>
          <TabPanel>Content 2</TabPanel>
          <TabPanel>Content 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    const tabs = screen.getAllByRole('tab');
    
    // Focus first tab
    tabs[0].focus();
    expect(document.activeElement).toBe(tabs[0]);
    
    // Navigate with arrow right
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(tabs[1]);
    
    // Navigate with arrow right again
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(tabs[2]);
    
    // Navigate with arrow right should cycle back to first tab
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(tabs[0]);
    
    // Navigate with arrow left should go to last tab
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(tabs[2]);
    
    // Home key should go to first tab
    fireEvent.keyDown(document.activeElement!, { key: 'Home' });
    expect(document.activeElement).toBe(tabs[0]);
    
    // End key should go to last tab
    fireEvent.keyDown(document.activeElement!, { key: 'End' });
    expect(document.activeElement).toBe(tabs[2]);
  });

  it('should support vertical orientation', () => {
    render(
      <Tabs orientation="vertical">
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content 1</TabPanel>
          <TabPanel>Content 2</TabPanel>
        </TabPanels>
      </Tabs>
    );

    const tabList = screen.getByRole('tablist');
    expect(tabList).toHaveAttribute('aria-orientation', 'vertical');

    const tabs = screen.getAllByRole('tab');
    
    // Focus first tab
    tabs[0].focus();
    
    // Navigate with arrow down (vertical)
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(tabs[1]);
    
    // Navigate with arrow up (vertical)
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(tabs[0]);
  });

  it('should handle disabled tabs correctly', () => {
    render(
      <Tabs>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab isDisabled>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content 1</TabPanel>
          <TabPanel>Content 2</TabPanel>
          <TabPanel>Content 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    const tabs = screen.getAllByRole('tab');
    
    // Second tab should be disabled
    expect(tabs[1]).toHaveAttribute('aria-disabled', 'true');
    expect(tabs[1]).toBeDisabled();
    
    // Click on disabled tab should not change selection
    fireEvent.click(tabs[1]);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    
    // Keyboard navigation should skip disabled tabs
    tabs[0].focus();
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' });
    // Should skip tab 2 and go to tab 3
    expect(document.activeElement).toBe(tabs[2]);
  });

  it('should support manual activation', () => {
    render(
      <Tabs isManual>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content 1</TabPanel>
          <TabPanel>Content 2</TabPanel>
        </TabPanels>
      </Tabs>
    );

    const tabs = screen.getAllByRole('tab');
    
    // Focus first tab
    tabs[0].focus();
    
    // Navigate with arrow right
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' });
    
    // Second tab should be focused but not selected
    expect(document.activeElement).toBe(tabs[1]);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    
    // Press Enter to select the tab
    fireEvent.keyDown(document.activeElement!, { key: 'Enter' });
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('should support custom keyboard navigation settings', () => {
    render(
      <Tabs keyboardNavigation="horizontal">
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content 1</TabPanel>
          <TabPanel>Content 2</TabPanel>
        </TabPanels>
      </Tabs>
    );

    const tabs = screen.getAllByRole('tab');
    
    // Focus first tab
    tabs[0].focus();
    
    // Horizontal navigation should work
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(tabs[1]);
    
    // Vertical navigation should not work
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(tabs[1]); // No change
  });

  it('should have visible focus indicators', () => {
    render(
      <Tabs>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content 1</TabPanel>
          <TabPanel>Content 2</TabPanel>
        </TabPanels>
      </Tabs>
    );

    const tabs = screen.getAllByRole('tab');
    
    // Focus first tab
    tabs[0].focus();
    
    // Check for visible focus indicator
    expect(a11y.hasVisibleFocusIndicator(tabs[0])).toBe(true);
  });
});