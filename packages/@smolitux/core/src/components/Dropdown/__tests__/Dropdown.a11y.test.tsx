// packages/@smolitux/core/src/components/Dropdown/__tests__/Dropdown.a11y.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, DropdownDivider } from '../';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('Dropdown Accessibility', () => {
  const menuItems = [
    { label: 'Profile', value: 'profile' },
    { label: 'Settings', value: 'settings' },
    { label: 'Help', value: 'help' },
    { label: 'Logout', value: 'logout' }
  ];

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Dropdown>
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          {menuItems.map(item => (
            <DropdownItem key={item.value} value={item.value}>
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
    
    // Öffne das Dropdown für den Test
    const toggle = screen.getByText('Menu');
    fireEvent.click(toggle);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes on toggle button', () => {
    render(
      <Dropdown>
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem value="item">Item</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    const toggle = screen.getByText('Menu');
    expect(toggle).toHaveAttribute('aria-haspopup', 'menu');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    
    // Nach dem Öffnen sollte aria-expanded auf true gesetzt sein
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAttribute('aria-controls');
  });

  it('should have proper ARIA attributes on menu', () => {
    render(
      <Dropdown isOpen={true}>
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem value="item">Item</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    const menu = screen.getByRole('menu');
    expect(menu).toHaveAttribute('aria-orientation', 'vertical');
    expect(menu).toHaveAttribute('aria-labelledby');
  });

  it('should have proper ARIA attributes on menu items', () => {
    render(
      <Dropdown isOpen={true}>
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem value="item1">Item 1</DropdownItem>
          <DropdownItem value="item2" isDisabled>Item 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    const item1 = screen.getByText('Item 1');
    const item2 = screen.getByText('Item 2');
    
    expect(item1).toHaveAttribute('role', 'menuitem');
    expect(item1).toHaveAttribute('tabIndex', '0');
    
    expect(item2).toHaveAttribute('role', 'menuitem');
    expect(item2).toHaveAttribute('aria-disabled', 'true');
    expect(item2).toHaveAttribute('tabIndex', '-1');
  });

  it('should support keyboard navigation', async () => {
    render(
      <Dropdown>
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          {menuItems.map(item => (
            <DropdownItem key={item.value} value={item.value}>
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
    
    const toggle = screen.getByText('Menu');
    
    // Öffnen mit Enter
    fireEvent.keyDown(toggle, { key: 'Enter' });
    await waitFor(() => {
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });
    
    // Schließen mit Escape
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    });
    
    // Öffnen mit ArrowDown und erstes Element fokussieren
    fireEvent.keyDown(toggle, { key: 'ArrowDown' });
    await waitFor(() => {
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });
    
    // Navigieren mit Pfeiltasten
    const profileItem = screen.getByText('Profile');
    fireEvent.keyDown(profileItem, { key: 'ArrowDown' });
    
    // Auswählen mit Enter
    const settingsItem = screen.getByText('Settings');
    fireEvent.keyDown(settingsItem, { key: 'Enter' });
    
    // Dropdown sollte geschlossen sein
    await waitFor(() => {
      expect(screen.queryByText('Settings')).not.toBeInTheDocument();
    });
  });

  it('should support screen reader descriptions', () => {
    render(
      <Dropdown isOpen={true}>
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem 
            value="delete" 
            description="Permanently delete this item"
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    const deleteItem = screen.getByText('Delete');
    expect(screen.getByText(', Permanently delete this item')).toHaveClass('sr-only');
  });

  it('should handle focus correctly when opened and closed', async () => {
    render(
      <Dropdown>
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          {menuItems.map(item => (
            <DropdownItem key={item.value} value={item.value}>
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
    
    const toggle = screen.getByText('Menu');
    toggle.focus();
    expect(document.activeElement).toBe(toggle);
    
    // Öffnen des Dropdowns
    fireEvent.keyDown(toggle, { key: 'ArrowDown' });
    
    // Erstes Item sollte fokussiert sein
    await waitFor(() => {
      const profileItem = screen.getByText('Profile');
      expect(document.activeElement).toBe(profileItem);
    });
    
    // Schließen mit Escape
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'Escape' });
    
    // Fokus sollte zurück zum Toggle gehen
    await waitFor(() => {
      expect(document.activeElement).toBe(toggle);
    });
  });

  it('should mark dividers correctly for screen readers', () => {
    render(
      <Dropdown isOpen={true}>
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem value="item1">Item 1</DropdownItem>
          <DropdownDivider />
          <DropdownItem value="item2">Item 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    const divider = screen.getByTestId('dropdown-divider');
    expect(divider).toHaveAttribute('role', 'separator');
    expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
  });
});