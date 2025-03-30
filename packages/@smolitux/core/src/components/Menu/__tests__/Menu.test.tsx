// packages/@smolitux/core/src/components/Menu/__tests__/Menu.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';

describe('Menu', () => {
  it('renders correctly with default props', () => {
    const { container } = render(
      <Menu>
        <MenuItem id="home">Home</MenuItem>
        <MenuItem id="products">Products</MenuItem>
        <MenuItem id="about">About</MenuItem>
      </Menu>
    );
    
    expect(container).toBeInTheDocument();
    expect(screen.getByTestId('menu')).toBeInTheDocument();
    expect(screen.getByTestId('menu-item-home')).toBeInTheDocument();
    expect(screen.getByTestId('menu-item-products')).toBeInTheDocument();
    expect(screen.getByTestId('menu-item-about')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <Menu className="custom-class">
        <MenuItem id="home">Home</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu')).toHaveClass('custom-class');
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Menu variant="primary">
        <MenuItem id="home">Home</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu')).toHaveClass('bg-primary-50');
    
    rerender(
      <Menu variant="secondary">
        <MenuItem id="home">Home</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu')).toHaveClass('bg-secondary-50');
    
    rerender(
      <Menu variant="minimal">
        <MenuItem id="home">Home</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu')).toHaveClass('bg-transparent');
  });

  it('renders with different directions', () => {
    const { rerender } = render(
      <Menu direction="horizontal">
        <MenuItem id="home">Home</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu')).toHaveClass('flex-row');
    
    rerender(
      <Menu direction="vertical">
        <MenuItem id="home">Home</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu')).toHaveClass('flex-col');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Menu size="sm">
        <MenuItem id="home">Home</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu')).toHaveClass('text-xs');
    
    rerender(
      <Menu size="md">
        <MenuItem id="home">Home</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu')).toHaveClass('text-sm');
    
    rerender(
      <Menu size="lg">
        <MenuItem id="home">Home</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu')).toHaveClass('text-base');
  });

  it('renders with fullWidth', () => {
    render(
      <Menu fullWidth>
        <MenuItem id="home">Home</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu')).toHaveClass('w-full');
  });

  it('handles item selection', () => {
    const handleItemSelect = jest.fn();
    
    render(
      <Menu onItemSelect={handleItemSelect}>
        <MenuItem id="home">Home</MenuItem>
        <MenuItem id="products">Products</MenuItem>
      </Menu>
    );
    
    fireEvent.click(screen.getByTestId('menu-item-home'));
    expect(handleItemSelect).toHaveBeenCalledWith('home');
  });

  it('handles keyboard navigation', () => {
    render(
      <Menu>
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
  });

  it('renders with description', () => {
    render(
      <Menu description="Hauptnavigation">
        <MenuItem id="home">Home</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu-description')).toHaveTextContent('Hauptnavigation');
  });

  it('renders with ariaLabel', () => {
    render(
      <Menu ariaLabel="Hauptnavigation">
        <MenuItem id="home">Home</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu')).toHaveAttribute('aria-label', 'Hauptnavigation');
  });
});

describe('MenuItem', () => {
  it('renders correctly with default props', () => {
    render(
      <Menu>
        <MenuItem id="home">Home</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu-item-home')).toBeInTheDocument();
    expect(screen.getByTestId('menu-item-home-content')).toHaveTextContent('Home');
  });

  it('renders with icon', () => {
    render(
      <Menu>
        <MenuItem id="home" icon={<span>🏠</span>}>Home</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu-item-home-icon')).toBeInTheDocument();
  });

  it('renders with shortcut', () => {
    render(
      <Menu>
        <MenuItem id="home" shortcut="Ctrl+H">Home</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu-item-home-shortcut')).toHaveTextContent('Ctrl+H');
  });

  it('renders with badge', () => {
    render(
      <Menu>
        <MenuItem id="home" badge="New">Home</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu-item-home-badge')).toHaveTextContent('New');
  });

  it('renders as disabled', () => {
    render(
      <Menu>
        <MenuItem id="home" disabled>Home</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu-item-home')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByTestId('menu-item-home')).toHaveClass('opacity-50');
  });

  it('renders with submenu', () => {
    render(
      <Menu>
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
    
    // Submenu sollte initial nicht sichtbar sein
    expect(screen.queryByTestId('menu-item-products-submenu')).not.toBeInTheDocument();
    
    // Klicke auf das Item, um das Submenu zu öffnen
    fireEvent.click(screen.getByTestId('menu-item-products'));
    
    // Submenu sollte jetzt sichtbar sein
    expect(screen.getByTestId('menu-item-products-submenu')).toBeInTheDocument();
    expect(screen.getByTestId('menu-item-product1')).toBeInTheDocument();
    expect(screen.getByTestId('menu-item-product2')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(
      <Menu>
        <MenuItem id="home" description="Zur Startseite navigieren">Home</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('menu-item-home-description')).toHaveTextContent('Zur Startseite navigieren');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    
    render(
      <Menu>
        <MenuItem id="home" onClick={handleClick}>Home</MenuItem>
      </Menu>
    );
    
    fireEvent.click(screen.getByTestId('menu-item-home'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('handles keyboard events', () => {
    const handleClick = jest.fn();
    
    render(
      <Menu>
        <MenuItem id="home" onClick={handleClick}>Home</MenuItem>
      </Menu>
    );
    
    const menuItem = screen.getByTestId('menu-item-home');
    
    // Drücke Enter, um das Item auszuwählen
    fireEvent.keyDown(menuItem, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalled();
    
    // Setze den Mock zurück
    handleClick.mockClear();
    
    // Drücke Leertaste, um das Item auszuwählen
    fireEvent.keyDown(menuItem, { key: ' ' });
    expect(handleClick).toHaveBeenCalled();
  });
});