// packages/@smolitux/core/src/components/Menu/__tests__/Menu.a11y.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MenuA11y } from '../Menu.a11y';
import { MenuItemA11y } from '../MenuItem.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('Menu Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <MenuA11y ariaLabel="Hauptnavigation">
        <MenuItemA11y id="home">Home</MenuItemA11y>
        <MenuItemA11y id="products">Products</MenuItemA11y>
        <MenuItemA11y id="about">About</MenuItemA11y>
      </MenuA11y>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <MenuA11y 
        ariaLabel="Hauptnavigation" 
        description="Navigieren Sie durch die Website"
        id="main-menu"
      >
        <MenuItemA11y id="home">Home</MenuItemA11y>
        <MenuItemA11y id="products">Products</MenuItemA11y>
        <MenuItemA11y id="about">About</MenuItemA11y>
      </MenuA11y>
    );
    
    const menu = screen.getByRole('menu');
    expect(menu).toHaveAttribute('id', 'main-menu');
    expect(menu).toHaveAttribute('aria-label', 'Hauptnavigation');
    expect(menu).toHaveAttribute('aria-describedby');
    expect(menu).toHaveAttribute('aria-orientation', 'vertical');
    
    const description = screen.getByText('Navigieren Sie durch die Website');
    expect(description).toHaveClass('sr-only');
    expect(description.id).toBe(menu.getAttribute('aria-describedby'));
    
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems).toHaveLength(3);
    
    // Überprüfe das erste MenuItem
    expect(menuItems[0]).toHaveAttribute('aria-selected', 'false');
    expect(menuItems[0]).toHaveAttribute('tabIndex', '-1');
  });

  it('should handle keyboard navigation correctly', () => {
    render(
      <MenuA11y ariaLabel="Hauptnavigation">
        <MenuItemA11y id="home">Home</MenuItemA11y>
        <MenuItemA11y id="products">Products</MenuItemA11y>
        <MenuItemA11y id="about">About</MenuItemA11y>
      </MenuA11y>
    );
    
    const menu = screen.getByRole('menu');
    const menuItems = screen.getAllByRole('menuitem');
    
    // Fokussiere das Menü
    fireEvent.focus(menu);
    
    // Drücke Pfeil nach unten, um das erste Element zu aktivieren
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(menuItems[0]).toHaveAttribute('aria-selected', 'true');
    expect(menuItems[0]).toHaveAttribute('tabIndex', '0');
    
    // Drücke Pfeil nach unten, um zum nächsten Element zu navigieren
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(menuItems[1]).toHaveAttribute('aria-selected', 'true');
    expect(menuItems[1]).toHaveAttribute('tabIndex', '0');
    
    // Drücke Home, um zum ersten Element zu navigieren
    fireEvent.keyDown(menu, { key: 'Home' });
    expect(menuItems[0]).toHaveAttribute('aria-selected', 'true');
    expect(menuItems[0]).toHaveAttribute('tabIndex', '0');
    
    // Drücke End, um zum letzten Element zu navigieren
    fireEvent.keyDown(menu, { key: 'End' });
    expect(menuItems[2]).toHaveAttribute('aria-selected', 'true');
    expect(menuItems[2]).toHaveAttribute('tabIndex', '0');
    
    // Drücke Escape, um die Auswahl aufzuheben
    fireEvent.keyDown(menu, { key: 'Escape' });
    expect(menuItems[0]).toHaveAttribute('aria-selected', 'false');
    expect(menuItems[1]).toHaveAttribute('aria-selected', 'false');
    expect(menuItems[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('should handle horizontal menu correctly', () => {
    render(
      <MenuA11y ariaLabel="Hauptnavigation" direction="horizontal">
        <MenuItemA11y id="home">Home</MenuItemA11y>
        <MenuItemA11y id="products">Products</MenuItemA11y>
        <MenuItemA11y id="about">About</MenuItemA11y>
      </MenuA11y>
    );
    
    const menu = screen.getByRole('menu');
    expect(menu).toHaveAttribute('aria-orientation', 'horizontal');
    
    const menuItems = screen.getAllByRole('menuitem');
    
    // Fokussiere das Menü
    fireEvent.focus(menu);
    
    // Drücke Pfeil nach rechts, um das erste Element zu aktivieren
    fireEvent.keyDown(menu, { key: 'ArrowRight' });
    expect(menuItems[0]).toHaveAttribute('aria-selected', 'true');
    
    // Drücke Pfeil nach rechts, um zum nächsten Element zu navigieren
    fireEvent.keyDown(menu, { key: 'ArrowRight' });
    expect(menuItems[1]).toHaveAttribute('aria-selected', 'true');
    
    // Drücke Pfeil nach links, um zum vorherigen Element zu navigieren
    fireEvent.keyDown(menu, { key: 'ArrowLeft' });
    expect(menuItems[0]).toHaveAttribute('aria-selected', 'true');
  });

  it('should handle submenu correctly', () => {
    render(
      <MenuA11y ariaLabel="Hauptnavigation">
        <MenuItemA11y id="home">Home</MenuItemA11y>
        <MenuItemA11y 
          id="products" 
          submenu={
            <>
              <MenuItemA11y id="product1">Product 1</MenuItemA11y>
              <MenuItemA11y id="product2">Product 2</MenuItemA11y>
            </>
          }
        >
          Products
        </MenuItemA11y>
        <MenuItemA11y id="about">About</MenuItemA11y>
      </MenuA11y>
    );
    
    const menu = screen.getByRole('menu');
    const menuItems = screen.getAllByRole('menuitem');
    
    // Überprüfe, ob das Produkt-Item die richtigen ARIA-Attribute hat
    expect(menuItems[1]).toHaveAttribute('aria-haspopup', 'true');
    expect(menuItems[1]).toHaveAttribute('aria-expanded', 'false');
    
    // Klicke auf das Produkt-Item, um das Untermenü zu öffnen
    fireEvent.click(menuItems[1]);
    
    // Überprüfe, ob das Untermenü geöffnet ist
    expect(menuItems[1]).toHaveAttribute('aria-expanded', 'true');
    
    // Überprüfe, ob das Untermenü die richtigen ARIA-Attribute hat
    const submenu = screen.getByRole('menu', { name: /untermenü für products/i });
    expect(submenu).toBeInTheDocument();
    
    // Überprüfe, ob die Untermenü-Items vorhanden sind
    expect(screen.getByRole('menuitem', { name: 'Product 1' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Product 2' })).toBeInTheDocument();
  });

  it('should handle disabled items correctly', () => {
    render(
      <MenuA11y ariaLabel="Hauptnavigation">
        <MenuItemA11y id="home">Home</MenuItemA11y>
        <MenuItemA11y id="products" disabled>Products</MenuItemA11y>
        <MenuItemA11y id="about">About</MenuItemA11y>
      </MenuA11y>
    );
    
    const menuItems = screen.getAllByRole('menuitem');
    
    // Überprüfe, ob das deaktivierte Item die richtigen ARIA-Attribute hat
    expect(menuItems[1]).toHaveAttribute('aria-disabled', 'true');
    
    // Klicke auf das deaktivierte Item
    fireEvent.click(menuItems[1]);
    
    // Es sollte nicht ausgewählt werden
    expect(menuItems[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('should handle item selection correctly', () => {
    const handleItemSelect = jest.fn();
    render(
      <MenuA11y 
        ariaLabel="Hauptnavigation" 
        onItemSelect={handleItemSelect}
        closeOnSelect
      >
        <MenuItemA11y id="home">Home</MenuItemA11y>
        <MenuItemA11y id="products">Products</MenuItemA11y>
        <MenuItemA11y id="about">About</MenuItemA11y>
      </MenuA11y>
    );
    
    const menuItems = screen.getAllByRole('menuitem');
    
    // Klicke auf ein Item
    fireEvent.click(menuItems[1]);
    
    // Überprüfe, ob der onItemSelect-Handler aufgerufen wurde
    expect(handleItemSelect).toHaveBeenCalledWith('products');
  });

  it('should handle item description correctly', () => {
    render(
      <MenuA11y ariaLabel="Hauptnavigation">
        <MenuItemA11y 
          id="home" 
          description="Zurück zur Startseite"
        >
          Home
        </MenuItemA11y>
        <MenuItemA11y id="products">Products</MenuItemA11y>
        <MenuItemA11y id="about">About</MenuItemA11y>
      </MenuA11y>
    );
    
    const menuItem = screen.getByRole('menuitem', { name: 'Home' });
    expect(menuItem).toHaveAttribute('aria-describedby');
    
    const description = screen.getByText('Zurück zur Startseite');
    expect(description).toHaveClass('sr-only');
    expect(description.id).toBe(menuItem.getAttribute('aria-describedby'));
  });
});