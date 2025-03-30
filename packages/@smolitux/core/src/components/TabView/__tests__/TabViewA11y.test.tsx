import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { TabViewA11y } from '../TabView.a11y';

describe('TabViewA11y', () => {
  const tabs = [
    { id: 'tab1', label: 'Tab 1', content: <div>Content of Tab 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content of Tab 2</div> },
    { id: 'tab3', label: 'Tab 3', content: <div>Content of Tab 3</div>, disabled: true },
  ];

  it('renders correctly with default props', () => {
    render(<TabViewA11y tabs={tabs} />);
    
    // Check if all tabs are rendered
    expect(screen.getByRole('tab', { name: /tab 1/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /tab 2/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /tab 3/i })).toBeInTheDocument();
    
    // Check if the first tab is active by default
    expect(screen.getByRole('tab', { name: /tab 1/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /tab 2/i })).toHaveAttribute('aria-selected', 'false');
    
    // Check if the disabled tab has the correct attributes
    expect(screen.getByRole('tab', { name: /tab 3/i })).toHaveAttribute('aria-disabled', 'true');
    
    // Check if the content of the first tab is visible
    expect(screen.getByText('Content of Tab 1')).toBeInTheDocument();
    expect(screen.queryByText('Content of Tab 2')).not.toBeInTheDocument(); // Should be lazy-loaded
  });

  it('changes active tab when clicked', () => {
    render(<TabViewA11y tabs={tabs} />);
    
    // Click on the second tab
    fireEvent.click(screen.getByRole('tab', { name: /tab 2/i }));
    
    // Check if the second tab is now active
    expect(screen.getByRole('tab', { name: /tab 1/i })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tab', { name: /tab 2/i })).toHaveAttribute('aria-selected', 'true');
    
    // Check if the content of the second tab is visible
    expect(screen.queryByText('Content of Tab 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content of Tab 2')).toBeInTheDocument();
  });

  it('does not change tab when clicking on a disabled tab', () => {
    render(<TabViewA11y tabs={tabs} />);
    
    // Click on the disabled tab
    fireEvent.click(screen.getByRole('tab', { name: /tab 3/i }));
    
    // Check if the first tab is still active
    expect(screen.getByRole('tab', { name: /tab 1/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /tab 3/i })).toHaveAttribute('aria-selected', 'false');
    
    // Check if the content of the first tab is still visible
    expect(screen.getByText('Content of Tab 1')).toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
    render(<TabViewA11y tabs={tabs} />);
    
    // Focus on the first tab
    const firstTab = screen.getByRole('tab', { name: /tab 1/i });
    firstTab.focus();
    
    // Press right arrow to move to the second tab
    fireEvent.keyDown(firstTab, { key: 'ArrowRight' });
    
    // Check if the second tab is focused
    expect(document.activeElement).toBe(screen.getByRole('tab', { name: /tab 2/i }));
    
    // Press right arrow again to skip the disabled tab and wrap around to the first tab
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    
    // Check if the first tab is focused again (circular navigation)
    expect(document.activeElement).toBe(screen.getByRole('tab', { name: /tab 1/i }));
    
    // Press left arrow to move to the last enabled tab
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowLeft' });
    
    // Check if the second tab is focused
    expect(document.activeElement).toBe(screen.getByRole('tab', { name: /tab 2/i }));
    
    // Press Home to move to the first tab
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'Home' });
    
    // Check if the first tab is focused
    expect(document.activeElement).toBe(screen.getByRole('tab', { name: /tab 1/i }));
    
    // Press End to move to the last enabled tab
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'End' });
    
    // Check if the second tab is focused (since the third is disabled)
    expect(document.activeElement).toBe(screen.getByRole('tab', { name: /tab 2/i }));
  });

  it('calls onTabChange when tab is changed', () => {
    const handleTabChange = jest.fn();
    render(<TabViewA11y tabs={tabs} onTabChange={handleTabChange} />);
    
    // Click on the second tab
    fireEvent.click(screen.getByRole('tab', { name: /tab 2/i }));
    
    // Check if onTabChange was called with the correct tab id
    expect(handleTabChange).toHaveBeenCalledWith('tab2');
  });

  it('supports controlled mode', () => {
    const { rerender } = render(<TabViewA11y tabs={tabs} activeTabId="tab2" />);
    
    // Check if the second tab is active
    expect(screen.getByRole('tab', { name: /tab 1/i })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tab', { name: /tab 2/i })).toHaveAttribute('aria-selected', 'true');
    
    // Check if the content of the second tab is visible
    expect(screen.getByText('Content of Tab 2')).toBeInTheDocument();
    
    // Update the active tab
    rerender(<TabViewA11y tabs={tabs} activeTabId="tab1" />);
    
    // Check if the first tab is now active
    expect(screen.getByRole('tab', { name: /tab 1/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /tab 2/i })).toHaveAttribute('aria-selected', 'false');
    
    // Check if the content of the first tab is visible
    expect(screen.getByText('Content of Tab 1')).toBeInTheDocument();
  });

  it('supports different variants', () => {
    const { rerender } = render(<TabViewA11y tabs={tabs} variant="pills" />);
    
    // Check if the tabs have the correct classes for pills variant
    const firstTab = screen.getByRole('tab', { name: /tab 1/i });
    expect(firstTab.className).toContain('rounded-full');
    
    // Update the variant
    rerender(<TabViewA11y tabs={tabs} variant="underline" />);
    
    // Check if the tabs have the correct classes for underline variant
    expect(firstTab.className).toContain('border-b-2');
  });

  it('supports vertical orientation', () => {
    render(<TabViewA11y tabs={tabs} vertical />);
    
    // Check if the tablist has the correct orientation
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('supports different positions', () => {
    const { rerender } = render(<TabViewA11y tabs={tabs} position="bottom" />);
    
    // Check if the content is rendered before the tabs
    const tablist = screen.getByRole('tablist');
    const tabpanel = screen.getByRole('tabpanel');
    
    // In bottom position, the tabpanel should be rendered before the tablist in the DOM
    expect(tabpanel.compareDocumentPosition(tablist) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    
    // Update the position
    rerender(<TabViewA11y tabs={tabs} position="left" />);
    
    // Check if the tablist has the correct orientation
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('passes accessibility tests', async () => {
    const { container } = render(<TabViewA11y tabs={tabs} ariaLabel="Test Tabs" />);
    
    // Check if there are no accessibility violations
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});