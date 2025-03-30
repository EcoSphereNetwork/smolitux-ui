// packages/@smolitux/core/src/components/Menu/__tests__/Menu.a11y.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('Menu Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Menu ariaLabel="Hauptnavigation">
        <MenuItem id="home">Home</MenuItem>
        <MenuItem id="products">Products</MenuItem>
        <MenuItem id="about">About</MenuItem>
      </Menu>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <Menu ariaLabel="Hauptnavigation" description="Navigationsmenü für die Hauptseiten">
        <MenuItem id="home">Home</MenuItem>
        <MenuItem id="products">Products</MenuItem>
      </Menu>
    );
    
    const menu = screen.getByTestId('menu');
    expect(menu).toHaveAttribute('role', 'menu');
    expect(menu).toHaveAttribute('aria-label', 'Hauptnavigation');
    expect(menu).toHaveAttribute('aria-orientation', 'vertical');
    expect(menu).toHaveAttribute('tabIndex', '0');
    
    const description = screen.getByTestId('menu-description');
    expect(description).toHaveTextContent('Navigationsmenü für die Hauptseiten');
    expect(menu).toHaveAttribute('aria-describedby', description.id);
    
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems).toHaveLength(2);
    
    const homeItem = screen.getByTestId('menu-item-home');
    expect(homeItem).toHaveAttribute('role', 'menuitem');
    expect(homeItem).toHaveAttribute('tabIndex', '-1');
    expect(homeItem).toHaveAttribute('aria-disabled', 'false');
  });

  it('should handle keyboard navigation correctly', () => {
    render(
      <Menu ariaLabel="Hauptnavigation">
        <MenuItem id="home">Home</MenuItem>
        <MenuItem id="products">Products</MenuItem>
        <MenuItem id="about">About</MenuItem>
      </Menu>
    );
    
    const menu = screen.getByTestId('menu');
    
    // Fokussiere das Menu
    menu.focus();
    
    // Drücke Pfeil nach unten, um das erste Item zu fokussieren
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(screen.getByTestId('menu-item-home'));
    
    // Drücke Pfeil nach unten, um zum nächsten Item zu navigieren
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(screen.getByTestId('menu-item-products'));
    
    // Drücke Pfeil nach oben, um zum vorherigen Item zu navigieren
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(screen.getByTestId('menu-item-home'));
    
    // Drücke Home, um zum ersten Item zu navigieren
    fireEvent.keyDown(menu, { key: 'End' });
    expect(document.activeElement).toBe(screen.getByTestId('menu-item-about'));
    
    // Drücke End, um zum letzten Item zu navigieren
    fireEvent.keyDown(menu, { key: 'Home' });
    expect(document.activeElement).toBe(screen.getByTestId('menu-item-home'));
    
    // Drücke Escape, um die Fokussierung zurückzusetzen
    fireEvent.keyDown(menu, { key: 'Escape' });
  });

  it('should handle horizontal menu correctly', () => {
    render(
      <Menu ariaLabel="Hauptnavigation" direction="horizontal">
        <MenuItem id="home">Home</MenuItem>
        <MenuItem id="products">Products</MenuItem>
        <MenuItem id="about">About</MenuItem>
      </Menu>
    );
    
    const menu = screen.getByTestId('menu');
    expect(menu).toHaveAttribute('aria-orientation', 'horizontal');
    
    // Fokussiere das Menu
    menu.focus();
    
    // Drücke Pfeil nach rechts, um das erste Item zu fokussieren
    fireEvent.keyDown(menu, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(screen.getByTestId('menu-item-home'));
    
    // Drücke Pfeil nach rechts, um zum nächsten Item zu navigieren
    fireEvent.keyDown(menu, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(screen.getByTestId('menu-item-products'));
    
    // Drücke Pfeil nach links, um zum vorherigen Item zu navigieren
    fireEvent.keyDown(menu, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(screen.getByTestId('menu-item-home'));
  });

  it('should handle submenu correctly', () => {
    render(
      <Menu ariaLabel="Hauptnavigation">
        <MenuItem 
          id="products" 
          submenu={
            <>
              <MenuItem id="product1">Product 1</MenuItem>
              <MenuItem id="product2">Product 2</MenuItem>
            </>
          }
        >
          Products
        </MenuItem>
      </Menu>
    );
    
    const productsItem = screen.getByTestId('menu-item-products');
    expect(productsItem).toHaveAttribute('aria-haspopup', 'true');
    expect(productsItem).toHaveAttribute('aria-expanded', 'false');
    
    // Klicke auf das Item, um das Submenu zu öffnen
    fireEvent.click(productsItem);
    
    expect(productsItem).toHaveAttribute('aria-expanded', 'true');
    const submenu = screen.getByTestId('menu-item-products-submenu');
    expect(submenu).toBeInTheDocument();
    expect(submenu).toHaveAttribute('role', 'menu');
  });

  it('should handle disabled items correctly', () => {
    render(
      <Menu ariaLabel="Hauptnavigation">
        <MenuItem id="home" disabled>Home</MenuItem>
      </Menu>
    );
    
    const homeItem = screen.getByTestId('menu-item-home');
    expect(homeItem).toHaveAttribute('aria-disabled', 'true');
    expect(homeItem).toHaveClass('opacity-50');
    expect(homeItem).toHaveClass('cursor-not-allowed');
    
    // Klicken auf ein deaktiviertes Item sollte keine Aktion auslösen
    const onClick = jest.fn();
    
    render(
      <Menu ariaLabel="Hauptnavigation">
        <MenuItem id="disabled-item" disabled onClick={onClick}>Disabled Item</MenuItem>
      </Menu>
    );
    
    const disabledItem = screen.getByTestId('menu-item-disabled-item');
    fireEvent.click(disabledItem);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should handle item selection correctly', () => {
    const handleItemSelect = jest.fn();
    
    render(
      <Menu ariaLabel="Hauptnavigation" onItemSelect={handleItemSelect}>
        <MenuItem id="home">Home</MenuItem>
      </Menu>
    );
    
    const homeItem = screen.getByTestId('menu-item-home');
    
    fireEvent.click(homeItem);
    expect(handleItemSelect).toHaveBeenCalledWith('home');
    expect(homeItem).toHaveAttribute('aria-current', 'page');
  });

  it('should handle item description correctly', () => {
    render(
      <Menu ariaLabel="Hauptnavigation">
        <MenuItem id="home" description="Zur Startseite navigieren">Home</MenuItem>
      </Menu>
    );
    
    const homeItem = screen.getByTestId('menu-item-home');
    const description = screen.getByTestId('menu-item-home-description');
    
    expect(description).toHaveTextContent('Zur Startseite navigieren');
    expect(homeItem).toHaveAttribute('aria-describedby', description.id);
  });
});