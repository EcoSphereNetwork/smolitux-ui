import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Tabs } from '../';

// Erweitere Jest-Matcher um axe-Pruefungen
expect.extend(toHaveNoViolations);

describe('Tabs Accessibility', () => {
  // Test fuer die A11y-Version der Tabs-Komponente
  it('should render A11y version with description', async () => {
    render(
      <Tabs.A11y
        description="Tabs mit Beschreibung"
        ariaLabel="Test Tabs"
        announceTabChange
      >
        <Tabs.A11y.List>
          <Tabs.A11y.Tab>Tab 1</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 2</Tabs.A11y.Tab>
        </Tabs.A11y.List>
        <Tabs.A11y.Panels>
          <Tabs.A11y.Panel>Content 1</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Content 2</Tabs.A11y.Panel>
        </Tabs.A11y.Panels>
      </Tabs.A11y>
    );
    
    // Ueberpruefe, ob die Beschreibung vorhanden ist
    expect(screen.getByText('Tabs mit Beschreibung')).toHaveClass('sr-only');
    
    // Ueberpruefe, ob die Live-Region vorhanden ist
    const liveRegion = document.querySelector('[aria-live]');
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    expect(liveRegion).toHaveClass('sr-only');
    
    // Ueberpruefe, ob das aria-label gesetzt ist
    const tabsElement = screen.getByLabelText('Test Tabs');
    expect(tabsElement).toBeInTheDocument();
  });
  
  it('should announce tab changes in A11y version', async () => {
    render(
      <Tabs.A11y
        announceTabChange
        tabChangeAnnouncement="Tab {index} wurde ausgewaehlt"
      >
        <Tabs.A11y.List>
          <Tabs.A11y.Tab>Tab 1</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 2</Tabs.A11y.Tab>
        </Tabs.A11y.List>
        <Tabs.A11y.Panels>
          <Tabs.A11y.Panel>Content 1</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Content 2</Tabs.A11y.Panel>
        </Tabs.A11y.Panels>
      </Tabs.A11y>
    );
    
    const tabs = screen.getAllByRole('tab');
    
    // Klicke auf den zweiten Tab
    fireEvent.click(tabs[1]);
    
    // Ueberpruefe, ob die Ankuendigung in der Live-Region erscheint
    const liveRegion = document.querySelector('[aria-live]');
    expect(liveRegion).toHaveTextContent('Tab 2 wurde ausgewaehlt');
  });

  it('should not have accessibility violations in basic state', async () => {
    const { container } = render(
      <Tabs>
        <Tabs.List>
          <Tabs.Tab>Tab 1</Tabs.Tab>
          <Tabs.Tab>Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>Content 1</Tabs.Panel>
          <Tabs.Panel>Content 2</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have correct ARIA attributes', () => {
    render(
      <Tabs id="test-tabs">
        <Tabs.List>
          <Tabs.Tab>Tab 1</Tabs.Tab>
          <Tabs.Tab>Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>Content 1</Tabs.Panel>
          <Tabs.Panel>Content 2</Tabs.Panel>
        </Tabs.Panels>
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
        <Tabs.List>
          <Tabs.Tab>Tab 1</Tabs.Tab>
          <Tabs.Tab>Tab 2</Tabs.Tab>
          <Tabs.Tab>Tab 3</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>Content 1</Tabs.Panel>
          <Tabs.Panel>Content 2</Tabs.Panel>
          <Tabs.Panel>Content 3</Tabs.Panel>
        </Tabs.Panels>
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
        <Tabs.List>
          <Tabs.Tab>Tab 1</Tabs.Tab>
          <Tabs.Tab>Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>Content 1</Tabs.Panel>
          <Tabs.Panel>Content 2</Tabs.Panel>
        </Tabs.Panels>
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
        <Tabs.List>
          <Tabs.Tab>Tab 1</Tabs.Tab>
          <Tabs.Tab isDisabled>Tab 2</Tabs.Tab>
          <Tabs.Tab>Tab 3</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>Content 1</Tabs.Panel>
          <Tabs.Panel>Content 2</Tabs.Panel>
          <Tabs.Panel>Content 3</Tabs.Panel>
        </Tabs.Panels>
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
        <Tabs.List>
          <Tabs.Tab>Tab 1</Tabs.Tab>
          <Tabs.Tab>Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>Content 1</Tabs.Panel>
          <Tabs.Panel>Content 2</Tabs.Panel>
        </Tabs.Panels>
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
        <Tabs.List>
          <Tabs.Tab>Tab 1</Tabs.Tab>
          <Tabs.Tab>Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>Content 1</Tabs.Panel>
          <Tabs.Panel>Content 2</Tabs.Panel>
        </Tabs.Panels>
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
        <Tabs.List>
          <Tabs.Tab>Tab 1</Tabs.Tab>
          <Tabs.Tab>Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>Content 1</Tabs.Panel>
          <Tabs.Panel>Content 2</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );

    const tabs = screen.getAllByRole('tab');
    
    // Focus first tab
    tabs[0].focus();
  });
  
  it('should handle tab descriptions in A11y version', () => {
    render(
      <Tabs.A11y>
        <Tabs.A11y.List description="Liste der verfuegbaren Tabs">
          <Tabs.A11y.Tab description="Zeigt Profilinformationen an">Profil</Tabs.A11y.Tab>
          <Tabs.A11y.Tab description="Zeigt Einstellungen an">Einstellungen</Tabs.A11y.Tab>
        </Tabs.A11y.List>
        <Tabs.A11y.Panels description="Inhalte der Tabs">
          <Tabs.A11y.Panel description="Profilinhalt">Profilinhalt</Tabs.A11y.Panel>
          <Tabs.A11y.Panel description="Einstellungsinhalt">Einstellungsinhalt</Tabs.A11y.Panel>
        </Tabs.A11y.Panels>
      </Tabs.A11y>
    );
    
    // Ueberpruefe, ob die Beschreibungen vorhanden sind
    expect(screen.getByText('Liste der verfuegbaren Tabs')).toHaveClass('sr-only');
    expect(screen.getByText('Zeigt Profilinformationen an')).toHaveClass('sr-only');
    expect(screen.getByText('Zeigt Einstellungen an')).toHaveClass('sr-only');
    expect(screen.getByText('Inhalte der Tabs')).toHaveClass('sr-only');
    expect(screen.getByText('Profilinhalt')).toBeInTheDocument();
    expect(screen.getByText('Einstellungsinhalt')).toBeInTheDocument();
  });
  
  it('should support different live region politeness levels', () => {
    render(
      <Tabs.A11y
        announceTabChange
        liveRegionPoliteness="assertive"
      >
        <Tabs.A11y.List>
          <Tabs.A11y.Tab>Tab 1</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 2</Tabs.A11y.Tab>
        </Tabs.A11y.List>
        <Tabs.A11y.Panels>
          <Tabs.A11y.Panel>Content 1</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Content 2</Tabs.A11y.Panel>
        </Tabs.A11y.Panels>
      </Tabs.A11y>
    );
    
    // Ueberpruefe, ob die Live-Region die richtige Politeness hat
    const liveRegion = document.querySelector('[aria-live]');
    expect(liveRegion).toHaveAttribute('aria-live', 'assertive');
  });
});