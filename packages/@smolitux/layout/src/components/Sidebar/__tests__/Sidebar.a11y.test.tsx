import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Sidebar } from '../';

// Erweitere Jest-Matcher um Barrierefreiheitspruefungen
expect.extend(toHaveNoViolations);

describe('Sidebar Accessibility', () => {
  // Test fuer die Standard-Sidebar-Komponente
  test('should not have accessibility violations with standard Sidebar', async () => {
    const { container } = render(
      <Sidebar
        items={[
          { id: 'home', label: 'Home' },
          { id: 'settings', label: 'Settings' }
        ]}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  // Test fuer die A11y-Version der Sidebar-Komponente
  test('should not have accessibility violations with A11y Sidebar', async () => {
    const { container } = render(
      <Sidebar.A11y
        items={[
          { id: 'home', label: 'Home' },
          { id: 'settings', label: 'Settings' }
        ]}
        ariaLabel="Hauptnavigation"
        isNavigation={true}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('should have proper ARIA attributes with A11y Sidebar', () => {
    render(
      <Sidebar.A11y
        items={[
          { id: 'home', label: 'Home' },
          { id: 'settings', label: 'Settings' }
        ]}
        ariaLabel="Hauptnavigation"
        isNavigation={true}
      />
    );
    
    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toHaveAttribute('aria-label', 'Hauptnavigation');
  });
  
  test('should handle different roles correctly', () => {
    const { rerender } = render(
      <Sidebar.A11y
        items={[
          { id: 'home', label: 'Home' },
          { id: 'settings', label: 'Settings' }
        ]}
        ariaLabel="Hauptnavigation"
        isNavigation={true}
      />
    );
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    
    rerender(
      <Sidebar.A11y
        items={[
          { id: 'home', label: 'Home' },
          { id: 'settings', label: 'Settings' }
        ]}
        ariaLabel="Komplementärer Bereich"
        isComplementary={true}
      />
    );
    
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    
    rerender(
      <Sidebar.A11y
        items={[
          { id: 'home', label: 'Home' },
          { id: 'settings', label: 'Settings' }
        ]}
        ariaLabel="Menü"
        isMenu={true}
      />
    );
    
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
  
  test('should handle collapse button correctly', () => {
    const handleCollapseChange = jest.fn();
    
    render(
      <Sidebar.A11y
        items={[
          { id: 'home', label: 'Home' },
          { id: 'settings', label: 'Settings' }
        ]}
        title="Sidebar"
        ariaLabel="Hauptnavigation"
        isNavigation={true}
        onCollapseChange={handleCollapseChange}
      />
    );
    
    const collapseButton = screen.getByRole('button', { name: 'Sidebar einklappen' });
    expect(collapseButton).toHaveAttribute('aria-expanded', 'true');
    expect(collapseButton).toHaveAttribute('aria-controls', 'sidebar-content');
    
    // Klicke auf den Collapse-Button
    fireEvent.click(collapseButton);
    
    // Callback sollte aufgerufen worden sein
    expect(handleCollapseChange).toHaveBeenCalledWith(true);
  });
  
  test('should handle item selection correctly', () => {
    const handleSelect = jest.fn();
    const handleItemClick = jest.fn();
    
    render(
      <Sidebar.A11y
        items={[
          { id: 'home', label: 'Home', onClick: handleItemClick },
          { id: 'settings', label: 'Settings' }
        ]}
        ariaLabel="Hauptnavigation"
        isNavigation={true}
        onSelect={handleSelect}
      />
    );
    
    const homeItem = screen.getByRole('button', { name: 'Home' });
    
    // Klicke auf das Item
    fireEvent.click(homeItem);
    
    // Callbacks sollten aufgerufen worden sein
    expect(handleItemClick).toHaveBeenCalled();
    expect(handleSelect).toHaveBeenCalledWith({ id: 'home', label: 'Home', onClick: handleItemClick });
  });
  
  test('should handle disabled items correctly', () => {
    const handleSelect = jest.fn();
    const handleItemClick = jest.fn();
    
    render(
      <Sidebar.A11y
        items={[
          { id: 'home', label: 'Home', onClick: handleItemClick, disabled: true },
          { id: 'settings', label: 'Settings' }
        ]}
        ariaLabel="Hauptnavigation"
        isNavigation={true}
        onSelect={handleSelect}
      />
    );
    
    const homeItem = screen.getByRole('button', { name: 'Home' });
    expect(homeItem).toBeDisabled();
    
    // Klicke auf das Item
    fireEvent.click(homeItem);
    
    // Callbacks sollten nicht aufgerufen worden sein
    expect(handleItemClick).not.toHaveBeenCalled();
    expect(handleSelect).not.toHaveBeenCalled();
  });
  
  test('should handle active items correctly', () => {
    render(
      <Sidebar.A11y
        items={[
          { id: 'home', label: 'Home', active: true },
          { id: 'settings', label: 'Settings' }
        ]}
        ariaLabel="Hauptnavigation"
        isNavigation={true}
        hasCurrent={true}
        current="page"
      />
    );
    
    const homeItem = screen.getByRole('button', { name: 'Home' });
    expect(homeItem).toHaveAttribute('aria-current', 'page');
    expect(homeItem).toHaveClass('sidebar-item-active');
  });
  
  test('should handle submenu items correctly', () => {
    render(
      <Sidebar.A11y
        items={[
          { 
            id: 'home', 
            label: 'Home', 
            active: true,
            children: [
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'profile', label: 'Profile' }
            ]
          },
          { id: 'settings', label: 'Settings' }
        ]}
        ariaLabel="Hauptnavigation"
        isNavigation={true}
      />
    );
    
    const homeItem = screen.getByRole('button', { name: 'Home' });
    expect(homeItem).toHaveAttribute('aria-haspopup', 'true');
    expect(homeItem).toHaveAttribute('aria-expanded', 'true');
    expect(homeItem).toHaveAttribute('aria-controls', 'home-submenu');
    
    // Submenu sollte sichtbar sein
    const submenu = screen.getByRole('menu', { name: 'Home Untermenü' });
    expect(submenu).toBeInTheDocument();
    expect(submenu).toHaveAttribute('id', 'home-submenu');
    
    // Submenu-Items sollten vorhanden sein
    expect(screen.getByRole('button', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Profile' })).toBeInTheDocument();
  });
  
  test('should handle link items correctly', () => {
    render(
      <Sidebar.A11y
        items={[
          { id: 'home', label: 'Home', href: '/' },
          { id: 'settings', label: 'Settings' }
        ]}
        ariaLabel="Hauptnavigation"
        isNavigation={true}
      />
    );
    
    const homeItem = screen.getByRole('link', { name: 'Home' });
    expect(homeItem).toHaveAttribute('href', '/');
  });
  
  test('should handle badge items correctly', () => {
    render(
      <Sidebar.A11y
        items={[
          { id: 'home', label: 'Home' },
          { id: 'notifications', label: 'Notifications', badge: 5, badgeColor: 'error' }
        ]}
        ariaLabel="Hauptnavigation"
        isNavigation={true}
      />
    );
    
    const notificationsItem = screen.getByRole('button', { name: 'Notifications' });
    const badge = notificationsItem.querySelector('.sidebar-item-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('sidebar-item-badge-error');
    expect(badge).toHaveTextContent('5');
  });
  
  test('should handle live region correctly', () => {
    render(
      <Sidebar.A11y
        items={[
          { id: 'home', label: 'Home' },
          { id: 'settings', label: 'Settings' }
        ]}
        ariaLabel="Statusmeldungen"
        isLiveRegion={true}
        liveRegionPoliteness="assertive"
        isAtomic={true}
        isRelevant={true}
        relevantType="additions"
        isBusy={true}
      />
    );
    
    const sidebar = screen.getByLabelText('Statusmeldungen');
    expect(sidebar).toHaveAttribute('aria-live', 'assertive');
    expect(sidebar).toHaveAttribute('aria-atomic', 'true');
    expect(sidebar).toHaveAttribute('aria-relevant', 'additions');
    expect(sidebar).toHaveAttribute('aria-busy', 'true');
  });
  
  test('should handle focusable sidebar correctly', () => {
    render(
      <Sidebar.A11y
        items={[
          { id: 'home', label: 'Home' },
          { id: 'settings', label: 'Settings' }
        ]}
        ariaLabel="Fokussierbare Sidebar"
        isFocusable={true}
        tabIndex={0}
      />
    );
    
    const sidebar = screen.getByLabelText('Fokussierbare Sidebar');
    expect(sidebar).toHaveAttribute('tabindex', '0');
  });
});