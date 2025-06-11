import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TabView } from '../TabView';

describe('TabView', () => {
  const tabs = [
    { id: 'tab1', label: 'Tab 1', content: <div>Content of Tab 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content of Tab 2</div> },
    { id: 'tab3', label: 'Tab 3', content: <div>Content of Tab 3</div> },
  ];

  it('renders tabs correctly', () => {
    render(<TabView tabs={tabs} activeTab="tab1" />);
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('renders active tab content', () => {
    render(<TabView tabs={tabs} activeTab="tab1" />);
    expect(screen.getByText('Content of Tab 1')).toBeInTheDocument();
    expect(screen.queryByText('Content of Tab 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content of Tab 3')).not.toBeInTheDocument();
  });

  it('changes active tab when clicked', () => {
    const handleChange = jest.fn();
    render(<TabView tabs={tabs} activeTab="tab1" onChange={handleChange} />);

    fireEvent.click(screen.getByText('Tab 2'));
    expect(handleChange).toHaveBeenCalledWith('tab2');
  });

  it('does not change tab when isManual=true', () => {
    const handleChange = jest.fn();
    render(<TabView tabs={tabs} activeTab="tab1" onChange={handleChange} isManual />);

    fireEvent.click(screen.getByText('Tab 2'));
    expect(handleChange).toHaveBeenCalledWith('tab2');
    // The active tab should still be tab1 because isManual=true
    expect(screen.getByText('Content of Tab 1')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<TabView tabs={tabs} activeTab="tab1" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies tabListClassName to the tab list', () => {
    const { container } = render(
      <TabView tabs={tabs} activeTab="tab1" tabListClassName="custom-tab-list" />
    );
    expect(container.querySelector('.tab-list')).toHaveClass('custom-tab-list');
  });

  it('applies tabPanelsClassName to the tab panels', () => {
    const { container } = render(
      <TabView tabs={tabs} activeTab="tab1" tabPanelsClassName="custom-tab-panels" />
    );
    expect(container.querySelector('.tab-panels')).toHaveClass('custom-tab-panels');
  });

  it('applies activeTabClassName to the active tab', () => {
    render(<TabView tabs={tabs} activeTab="tab1" activeTabClassName="custom-active-tab" />);
    const activeTab = screen.getByText('Tab 1').closest('.tab');
    expect(activeTab).toHaveClass('custom-active-tab');
  });

  it('applies inactiveTabClassName to inactive tabs', () => {
    render(<TabView tabs={tabs} activeTab="tab1" inactiveTabClassName="custom-inactive-tab" />);
    const inactiveTab = screen.getByText('Tab 2').closest('.tab');
    expect(inactiveTab).toHaveClass('custom-inactive-tab');
  });

  it('renders tabs with different orientations', () => {
    const { container: containerHorizontal } = render(
      <TabView tabs={tabs} activeTab="tab1" orientation="horizontal" />
    );
    expect(containerHorizontal.querySelector('.tab-list')).toHaveStyle('flex-direction: row');

    const { container: containerVertical } = render(
      <TabView tabs={tabs} activeTab="tab1" orientation="vertical" />
    );
    expect(containerVertical.querySelector('.tab-list')).toHaveStyle('flex-direction: column');
  });

  it('renders tabs with different sizes', () => {
    const { rerender } = render(<TabView tabs={tabs} activeTab="tab1" size="sm" />);
    const smallTab = screen.getByText('Tab 1').closest('.tab');
    expect(smallTab).toHaveStyle('font-size: 0.875rem');
    expect(smallTab).toHaveStyle('padding: 0.5rem 1rem');

    rerender(<TabView tabs={tabs} activeTab="tab1" size="md" />);
    const mediumTab = screen.getByText('Tab 1').closest('.tab');
    expect(mediumTab).toHaveStyle('font-size: 1rem');
    expect(mediumTab).toHaveStyle('padding: 0.75rem 1.5rem');

    rerender(<TabView tabs={tabs} activeTab="tab1" size="lg" />);
    const largeTab = screen.getByText('Tab 1').closest('.tab');
    expect(largeTab).toHaveStyle('font-size: 1.125rem');
    expect(largeTab).toHaveStyle('padding: 1rem 2rem');
  });

  it('renders tabs with different variants', () => {
    const { rerender } = render(<TabView tabs={tabs} activeTab="tab1" variant="line" />);
    const lineTab = screen.getByText('Tab 1').closest('.tab');
    expect(lineTab).toHaveStyle('border-bottom: 2px solid #3b82f6');

    rerender(<TabView tabs={tabs} activeTab="tab1" variant="enclosed" />);
    const enclosedTab = screen.getByText('Tab 1').closest('.tab');
    expect(enclosedTab).toHaveStyle('border-width: 1px');
    expect(enclosedTab).toHaveStyle('border-style: solid');
    expect(enclosedTab).toHaveStyle('border-color: #3b82f6');
    expect(enclosedTab).toHaveStyle('border-bottom-color: rgba(0, 0, 0, 0)');

    rerender(<TabView tabs={tabs} activeTab="tab1" variant="soft-rounded" />);
    const softRoundedTab = screen.getByText('Tab 1').closest('.tab');
    expect(softRoundedTab).toHaveStyle('border-radius: 0.375rem');
    expect(softRoundedTab).toHaveStyle('background-color: #3b82f6');
    expect(softRoundedTab).toHaveStyle('color: white');

    rerender(<TabView tabs={tabs} activeTab="tab1" variant="solid-rounded" />);
    const solidRoundedTab = screen.getByText('Tab 1').closest('.tab');
    expect(solidRoundedTab).toHaveStyle('border-radius: 9999px');
    expect(solidRoundedTab).toHaveStyle('background-color: #3b82f6');
    expect(solidRoundedTab).toHaveStyle('color: white');

    rerender(<TabView tabs={tabs} activeTab="tab1" variant="unstyled" />);
    const unstyledTab = screen.getByText('Tab 1').closest('.tab');
    expect(unstyledTab).toHaveStyle('color: #3b82f6');
  });

  it('renders fitted tabs when isFitted=true', () => {
    render(<TabView tabs={tabs} activeTab="tab1" isFitted />);
    const fittedTab = screen.getByText('Tab 1').closest('.tab');
    expect(fittedTab).toHaveStyle('flex: 1');
    expect(fittedTab).toHaveStyle('text-align: center');
  });

  it('renders disabled tabs correctly', () => {
    const disabledTabs = [
      { id: 'tab1', label: 'Tab 1', content: <div>Content of Tab 1</div> },
      { id: 'tab2', label: 'Tab 2', content: <div>Content of Tab 2</div>, disabled: true },
      { id: 'tab3', label: 'Tab 3', content: <div>Content of Tab 3</div> },
    ];

    const handleChange = jest.fn();
    render(<TabView tabs={disabledTabs} activeTab="tab1" onChange={handleChange} />);

    const disabledTab = screen.getByText('Tab 2').closest('.tab');
    expect(disabledTab).toHaveStyle('cursor: not-allowed');
    expect(disabledTab).toHaveStyle('opacity: 0.6');

    fireEvent.click(screen.getByText('Tab 2'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders tabs with icons', () => {
    const tabsWithIcons = [
      {
        id: 'tab1',
        label: 'Tab 1',
        content: <div>Content of Tab 1</div>,
        icon: <span data-testid="icon-1">Icon 1</span>,
      },
      {
        id: 'tab2',
        label: 'Tab 2',
        content: <div>Content of Tab 2</div>,
        icon: <span data-testid="icon-2">Icon 2</span>,
      },
    ];

    render(<TabView tabs={tabsWithIcons} activeTab="tab1" />);

    expect(screen.getByTestId('icon-1')).toBeInTheDocument();
    expect(screen.getByTestId('icon-2')).toBeInTheDocument();
  });
});
