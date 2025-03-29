import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { TabViewA11y } from '../TabView.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

const mockTabs = [
  { id: 'tab1', label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
  { id: 'tab3', label: 'Tab 3', content: <div>Inhalt von Tab 3</div>, disabled: true }
];

describe('TabView Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TabViewA11y 
        tabs={mockTabs}
        ariaLabel="Test Tabs"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <TabViewA11y 
        tabs={mockTabs}
        ariaLabel="Test Tabs"
        description="Diese Tabs zeigen verschiedene Inhalte an"
      />
    );
    
    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveAttribute('aria-label', 'Test Tabs');
    expect(tablist).toHaveAttribute('aria-orientation', 'horizontal');
    
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('tabIndex', '0');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('tabIndex', '-1');
    expect(tabs[2]).toHaveAttribute('aria-disabled', 'true');
    
    const panels = screen.getAllByRole('tabpanel');
    expect(panels).toHaveLength(1); // Nur der aktive Tab wird gerendert (lazy loading)
    expect(panels[0]).toHaveAttribute('aria-labelledby', tabs[0].id);
    expect(panels[0]).toHaveAttribute('tabIndex', '0');
    
    // Überprüfe die Beschreibung
    const description = screen.getByText('Diese Tabs zeigen verschiedene Inhalte an');
    expect(description).toHaveClass('sr-only');
  });

  it('should handle keyboard navigation correctly', () => {
    render(
      <TabViewA11y 
        tabs={mockTabs}
        ariaLabel="Test Tabs"
      />
    );
    
    const tabs = screen.getAllByRole('tab');
    
    // Fokussiere den ersten Tab
    tabs[0].focus();
    expect(document.activeElement).toBe(tabs[0]);
    
    // Drücke die Pfeiltaste nach rechts
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
    expect(document.activeElement).toBe(tabs[1]);
    
    // Drücke die Pfeiltaste nach rechts erneut (überspringt den deaktivierten Tab)
    fireEvent.keyDown(tabs[1], { key: 'ArrowRight' });
    expect(document.activeElement).toBe(tabs[0]);
    
    // Drücke die Home-Taste
    fireEvent.keyDown(tabs[0], { key: 'Home' });
    expect(document.activeElement).toBe(tabs[0]);
    
    // Drücke die End-Taste
    fireEvent.keyDown(tabs[0], { key: 'End' });
    expect(document.activeElement).toBe(tabs[1]);
  });

  it('should handle tab activation correctly', () => {
    const handleTabChange = jest.fn();
    
    render(
      <TabViewA11y 
        tabs={mockTabs}
        ariaLabel="Test Tabs"
        onTabChange={handleTabChange}
      />
    );
    
    const tabs = screen.getAllByRole('tab');
    
    // Klicke auf den zweiten Tab
    fireEvent.click(tabs[1]);
    
    // Der onTabChange-Handler sollte aufgerufen worden sein
    expect(handleTabChange).toHaveBeenCalledWith('tab2');
    
    // Der zweite Tab sollte jetzt aktiv sein
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
    
    // Der zweite Tab-Panel sollte jetzt sichtbar sein
    const panels = screen.getAllByRole('tabpanel');
    expect(panels[0]).toHaveAttribute('aria-labelledby', tabs[1].id);
  });

  it('should handle manual activation correctly', () => {
    const handleTabChange = jest.fn();
    
    render(
      <TabViewA11y 
        tabs={mockTabs}
        ariaLabel="Test Tabs"
        onTabChange={handleTabChange}
        manual
      />
    );
    
    const tabs = screen.getAllByRole('tab');
    
    // Fokussiere den zweiten Tab
    tabs[1].focus();
    
    // Drücke die Leertaste
    fireEvent.keyDown(tabs[1], { key: ' ' });
    
    // Der onTabChange-Handler sollte aufgerufen worden sein
    expect(handleTabChange).toHaveBeenCalledWith('tab2');
  });

  it('should handle auto activation correctly', () => {
    const handleTabChange = jest.fn();
    
    render(
      <TabViewA11y 
        tabs={mockTabs}
        ariaLabel="Test Tabs"
        onTabChange={handleTabChange}
        autoActivate
      />
    );
    
    const tabs = screen.getAllByRole('tab');
    
    // Fokussiere den ersten Tab
    tabs[0].focus();
    
    // Drücke die Pfeiltaste nach rechts
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
    
    // Der onTabChange-Handler sollte aufgerufen worden sein
    expect(handleTabChange).toHaveBeenCalledWith('tab2');
  });

  it('should handle vertical orientation correctly', () => {
    render(
      <TabViewA11y 
        tabs={mockTabs}
        ariaLabel="Test Tabs"
        vertical
      />
    );
    
    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveAttribute('aria-orientation', 'vertical');
    
    const tabs = screen.getAllByRole('tab');
    
    // Fokussiere den ersten Tab
    tabs[0].focus();
    
    // Drücke die Pfeiltaste nach unten
    fireEvent.keyDown(tabs[0], { key: 'ArrowDown' });
    expect(document.activeElement).toBe(tabs[1]);
    
    // Drücke die Pfeiltaste nach oben
    fireEvent.keyDown(tabs[1], { key: 'ArrowUp' });
    expect(document.activeElement).toBe(tabs[0]);
  });

  it('should handle different positions correctly', () => {
    const { rerender } = render(
      <TabViewA11y 
        tabs={mockTabs}
        ariaLabel="Test Tabs"
        position="top"
      />
    );
    
    let tablist = screen.getByRole('tablist');
    expect(tablist).toHaveAttribute('aria-orientation', 'horizontal');
    
    rerender(
      <TabViewA11y 
        tabs={mockTabs}
        ariaLabel="Test Tabs"
        position="left"
      />
    );
    
    tablist = screen.getByRole('tablist');
    expect(tablist).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('should handle error state correctly', () => {
    render(
      <TabViewA11y 
        tabs={mockTabs}
        ariaLabel="Test Tabs"
        error="Es ist ein Fehler aufgetreten"
      />
    );
    
    const container = screen.getByRole('tablist').parentElement;
    expect(container).toHaveAttribute('aria-invalid', 'true');
    expect(container).toHaveAttribute('aria-errormessage');
    
    const error = screen.getByText('Es ist ein Fehler aufgetreten');
    expect(error).toHaveAttribute('role', 'alert');
  });

  it('should handle loading state correctly', () => {
    render(
      <TabViewA11y 
        tabs={mockTabs}
        ariaLabel="Test Tabs"
        loading
      />
    );
    
    const container = screen.getByRole('tablist').parentElement;
    expect(container).toHaveAttribute('aria-busy', 'true');
    
    const loading = screen.getByText('Wird geladen...');
    expect(loading).toHaveAttribute('aria-live', 'polite');
  });

  it('should handle helper text correctly', () => {
    render(
      <TabViewA11y 
        tabs={mockTabs}
        ariaLabel="Test Tabs"
        helperText="Wählen Sie einen Tab aus"
      />
    );
    
    const container = screen.getByRole('tablist').parentElement;
    expect(container).toHaveAttribute('aria-describedby');
    
    const helperText = screen.getByText('Wählen Sie einen Tab aus');
    expect(helperText).toBeInTheDocument();
  });

  it('should handle success state correctly', () => {
    render(
      <TabViewA11y 
        tabs={mockTabs}
        ariaLabel="Test Tabs"
        success="Die Aktion wurde erfolgreich ausgeführt"
      />
    );
    
    const container = screen.getByRole('tablist').parentElement;
    expect(container).toHaveAttribute('aria-describedby');
    
    const success = screen.getByText('Die Aktion wurde erfolgreich ausgeführt');
    expect(success).toBeInTheDocument();
  });

  it('should handle live region correctly', () => {
    render(
      <TabViewA11y 
        tabs={mockTabs}
        ariaLabel="Test Tabs"
        liveRegion
      />
    );
    
    const liveRegion = screen.getByRole('tablist').parentElement?.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion).toHaveClass('sr-only');
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
  });

  it('should handle keyboard shortcuts correctly', () => {
    const handleTabChange = jest.fn();
    
    render(
      <TabViewA11y 
        tabs={mockTabs}
        ariaLabel="Test Tabs"
        onTabChange={handleTabChange}
        keyboardShortcuts
      />
    );
    
    const tablist = screen.getByRole('tablist');
    
    // Drücke die Taste "2"
    fireEvent.keyDown(tablist, { key: '2' });
    
    // Der onTabChange-Handler sollte aufgerufen worden sein
    expect(handleTabChange).toHaveBeenCalledWith('tab2');
  });

  it('should handle different variants correctly', () => {
    const { rerender } = render(
      <TabViewA11y 
        tabs={mockTabs}
        ariaLabel="Test Tabs"
        variant="default"
      />
    );
    
    let tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveClass('border-b-2');
    
    rerender(
      <TabViewA11y 
        tabs={mockTabs}
        ariaLabel="Test Tabs"
        variant="pills"
      />
    );
    
    tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveClass('rounded-full');
  });

  it('should handle different sizes correctly', () => {
    const { rerender } = render(
      <TabViewA11y 
        tabs={mockTabs}
        ariaLabel="Test Tabs"
        tabSize="sm"
      />
    );
    
    let tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveClass('text-sm');
    
    rerender(
      <TabViewA11y 
        tabs={mockTabs}
        ariaLabel="Test Tabs"
        tabSize="lg"
      />
    );
    
    tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveClass('text-lg');
  });
});