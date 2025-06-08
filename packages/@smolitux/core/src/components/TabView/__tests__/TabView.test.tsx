import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabView, Tab, TabPanel } from '../TabView';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('TabView', () => {
  test('renders correctly with default props', () => {
    render(
      <TabView>
        <Tab label="Tab 1">
          <TabPanel>Content 1</TabPanel>
        </Tab>
        <Tab label="Tab 2">
          <TabPanel>Content 2</TabPanel>
        </Tab>
        <Tab label="Tab 3">
          <TabPanel>Content 3</TabPanel>
        </Tab>
      </TabView>
    );

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();

    // By default, the first tab should be selected
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  test('changes active tab when clicked', async () => {
    render(
      <TabView>
        <Tab label="Tab 1">
          <TabPanel>Content 1</TabPanel>
        </Tab>
        <Tab label="Tab 2">
          <TabPanel>Content 2</TabPanel>
        </Tab>
        <Tab label="Tab 3">
          <TabPanel>Content 3</TabPanel>
        </Tab>
      </TabView>
    );

    // Initially, the first tab is active
    expect(screen.getByText('Content 1')).toBeInTheDocument();

    // Click on the second tab
    await userEvent.click(screen.getByText('Tab 2'));

    // Now the second tab should be active
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  test('renders with custom active tab', () => {
    render(
      <TabView defaultActiveTab={1}>
        <Tab label="Tab 1">
          <TabPanel>Content 1</TabPanel>
        </Tab>
        <Tab label="Tab 2">
          <TabPanel>Content 2</TabPanel>
        </Tab>
        <Tab label="Tab 3">
          <TabPanel>Content 3</TabPanel>
        </Tab>
      </TabView>
    );

    // The second tab (index 1) should be active
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  test('handles controlled active tab', async () => {
    const TestComponent = () => {
      const [activeTab, setActiveTab] = React.useState(0);

      return (
        <>
          <button onClick={() => setActiveTab(2)}>Set Tab 3</button>
          <TabView activeTab={activeTab} onTabChange={setActiveTab}>
            <Tab label="Tab 1">
              <TabPanel>Content 1</TabPanel>
            </Tab>
            <Tab label="Tab 2">
              <TabPanel>Content 2</TabPanel>
            </Tab>
            <Tab label="Tab 3">
              <TabPanel>Content 3</TabPanel>
            </Tab>
          </TabView>
        </>
      );
    };

    render(<TestComponent />);

    // Initially, the first tab is active
    expect(screen.getByText('Content 1')).toBeInTheDocument();

    // Click the button to set the third tab as active
    await userEvent.click(screen.getByText('Set Tab 3'));

    // Now the third tab should be active
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    expect(screen.getByText('Content 3')).toBeInTheDocument();

    // Click on the second tab
    await userEvent.click(screen.getByText('Tab 2'));

    // Now the second tab should be active
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  test('renders disabled tabs correctly', async () => {
    render(
      <TabView>
        <Tab label="Tab 1">
          <TabPanel>Content 1</TabPanel>
        </Tab>
        <Tab label="Tab 2" disabled>
          <TabPanel>Content 2</TabPanel>
        </Tab>
        <Tab label="Tab 3">
          <TabPanel>Content 3</TabPanel>
        </Tab>
      </TabView>
    );

    // The second tab should be disabled
    const tabs = screen.getAllByRole('tab');
    expect(tabs[1]).toHaveAttribute('aria-disabled', 'true');

    // Try to click the disabled tab
    await userEvent.click(screen.getByText('Tab 2'));

    // The first tab should still be active
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  test('renders with custom variant', () => {
    const { rerender } = render(
      <TabView variant="underlined">
        <Tab label="Tab 1">
          <TabPanel>Content 1</TabPanel>
        </Tab>
        <Tab label="Tab 2">
          <TabPanel>Content 2</TabPanel>
        </Tab>
      </TabView>
    );

    // Check for underlined variant classes
    expect(screen.getByRole('tablist')).toHaveClass('border-b');

    rerender(
      <TabView variant="enclosed">
        <Tab label="Tab 1">
          <TabPanel>Content 1</TabPanel>
        </Tab>
        <Tab label="Tab 2">
          <TabPanel>Content 2</TabPanel>
        </Tab>
      </TabView>
    );

    // Check for enclosed variant classes
    expect(screen.getByRole('tablist')).toHaveClass('border-b');
    expect(screen.getAllByRole('tab')[0]).toHaveClass('rounded-t-md');
  });

  test('renders with custom size', () => {
    const { rerender } = render(
      <TabView size="sm">
        <Tab label="Tab 1">
          <TabPanel>Content 1</TabPanel>
        </Tab>
        <Tab label="Tab 2">
          <TabPanel>Content 2</TabPanel>
        </Tab>
      </TabView>
    );

    // Check for small size classes
    expect(screen.getAllByRole('tab')[0]).toHaveClass('px-3 py-1.5 text-sm');

    rerender(
      <TabView size="md">
        <Tab label="Tab 1">
          <TabPanel>Content 1</TabPanel>
        </Tab>
        <Tab label="Tab 2">
          <TabPanel>Content 2</TabPanel>
        </Tab>
      </TabView>
    );

    // Check for medium size classes
    expect(screen.getAllByRole('tab')[0]).toHaveClass('px-4 py-2 text-base');

    rerender(
      <TabView size="lg">
        <Tab label="Tab 1">
          <TabPanel>Content 1</TabPanel>
        </Tab>
        <Tab label="Tab 2">
          <TabPanel>Content 2</TabPanel>
        </Tab>
      </TabView>
    );

    // Check for large size classes
    expect(screen.getAllByRole('tab')[0]).toHaveClass('px-6 py-3 text-lg');
  });

  test('renders with custom color scheme', () => {
    render(
      <TabView colorScheme="accent">
        <Tab label="Tab 1">
          <TabPanel>Content 1</TabPanel>
        </Tab>
        <Tab label="Tab 2">
          <TabPanel>Content 2</TabPanel>
        </Tab>
      </TabView>
    );

    // Check for accent color classes
    const activeTab = screen.getAllByRole('tab')[0];
    expect(activeTab).toHaveClass('text-accent-600');
  });

  test('renders with icons in tabs', () => {
    render(
      <TabView>
        <Tab label="Tab 1" icon={<span data-testid="icon-1">🏠</span>}>
          <TabPanel>Content 1</TabPanel>
        </Tab>
        <Tab label="Tab 2" icon={<span data-testid="icon-2">📝</span>}>
          <TabPanel>Content 2</TabPanel>
        </Tab>
      </TabView>
    );

    expect(screen.getByTestId('icon-1')).toBeInTheDocument();
    expect(screen.getByTestId('icon-2')).toBeInTheDocument();
  });

  test('renders with custom className', () => {
    render(
      <TabView className="custom-class">
        <Tab label="Tab 1">
          <TabPanel>Content 1</TabPanel>
        </Tab>
        <Tab label="Tab 2">
          <TabPanel>Content 2</TabPanel>
        </Tab>
      </TabView>
    );

    expect(screen.getByRole('tablist').parentElement).toHaveClass('custom-class');
  });

  test('supports keyboard navigation', async () => {
    render(
      <TabView>
        <Tab label="Tab 1">
          <TabPanel>Content 1</TabPanel>
        </Tab>
        <Tab label="Tab 2">
          <TabPanel>Content 2</TabPanel>
        </Tab>
        <Tab label="Tab 3">
          <TabPanel>Content 3</TabPanel>
        </Tab>
      </TabView>
    );

    // Focus the first tab
    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();

    // Press right arrow to move to the next tab
    fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(tabs[1]);

    // Press right arrow again to move to the last tab
    fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(tabs[2]);

    // Press left arrow to move back to the middle tab
    fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(tabs[1]);

    // Press Enter to select the tab
    fireEvent.keyDown(document.activeElement || document.body, { key: 'Enter' });
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });
});
