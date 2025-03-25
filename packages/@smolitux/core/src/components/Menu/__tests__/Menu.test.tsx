import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import { MenuDivider } from '../MenuDivider';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('Menu', () => {
  it('renders correctly with default props', () => {
    render(
      <Menu>
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem')).toHaveLength(2);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Menu variant="default">
        <MenuItem id="item1">Item 1</MenuItem>
      </Menu>
    );
    
    let menu = screen.getByRole('menu');
    expect(menu).toHaveClass('bg-white');
    
    rerender(
      <Menu variant="primary">
        <MenuItem id="item1">Item 1</MenuItem>
      </Menu>
    );
    
    menu = screen.getByRole('menu');
    expect(menu).toHaveClass('bg-primary-50');
    
    rerender(
      <Menu variant="secondary">
        <MenuItem id="item1">Item 1</MenuItem>
      </Menu>
    );
    
    menu = screen.getByRole('menu');
    expect(menu).toHaveClass('bg-secondary-50');
    
    rerender(
      <Menu variant="minimal">
        <MenuItem id="item1">Item 1</MenuItem>
      </Menu>
    );
    
    menu = screen.getByRole('menu');
    expect(menu).toHaveClass('bg-transparent');
  });

  it('renders with different directions', () => {
    const { rerender } = render(
      <Menu direction="vertical">
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    
    let menu = screen.getByRole('menu');
    expect(menu).toHaveClass('flex-col');
    
    rerender(
      <Menu direction="horizontal">
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    
    menu = screen.getByRole('menu');
    expect(menu).toHaveClass('flex-row');
  });

  it('renders with fullWidth', () => {
    render(
      <Menu fullWidth>
        <MenuItem id="item1">Item 1</MenuItem>
      </Menu>
    );
    
    const menu = screen.getByRole('menu');
    expect(menu).toHaveClass('w-full');
  });

  it('renders with custom className', () => {
    render(
      <Menu className="custom-menu">
        <MenuItem id="item1">Item 1</MenuItem>
      </Menu>
    );
    
    const menu = screen.getByRole('menu');
    expect(menu).toHaveClass('custom-menu');
  });

  it('handles keyboard navigation', () => {
    render(
      <Menu>
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
        <MenuItem id="item3">Item 3</MenuItem>
      </Menu>
    );
    
    const menu = screen.getByRole('menu');
    
    // Focus the menu
    fireEvent.focus(menu);
    
    // Press down arrow to navigate to first item
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(screen.getByText('Item 1').closest('li')).toHaveClass('active');
    
    // Press down arrow again to navigate to second item
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(screen.getByText('Item 2').closest('li')).toHaveClass('active');
    
    // Press up arrow to navigate back to first item
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(screen.getByText('Item 1').closest('li')).toHaveClass('active');
    
    // Press End to navigate to last item
    fireEvent.keyDown(menu, { key: 'End' });
    expect(screen.getByText('Item 3').closest('li')).toHaveClass('active');
    
    // Press Home to navigate to first item
    fireEvent.keyDown(menu, { key: 'Home' });
    expect(screen.getByText('Item 1').closest('li')).toHaveClass('active');
  });

  it('handles click on menu items', () => {
    const handleClick = jest.fn();
    
    render(
      <Menu>
        <MenuItem id="item1" onClick={handleClick}>Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    
    const item1 = screen.getByText('Item 1');
    fireEvent.click(item1);
    
    expect(handleClick).toHaveBeenCalled();
  });

  it('does not call onClick for disabled items', () => {
    const handleClick = jest.fn();
    
    render(
      <Menu>
        <MenuItem id="item1" disabled onClick={handleClick}>Item 1</MenuItem>
      </Menu>
    );
    
    const item1 = screen.getByText('Item 1');
    fireEvent.click(item1);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders menu dividers correctly', () => {
    render(
      <Menu>
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuDivider />
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('renders menu dividers with labels', () => {
    render(
      <Menu>
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuDivider label="Section" />
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    
    expect(screen.getByText('Section')).toBeInTheDocument();
  });

  it('renders menu items with icons', () => {
    render(
      <Menu>
        <MenuItem id="item1" icon={<span data-testid="icon">🔍</span>}>Item 1</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders menu items with right icons', () => {
    render(
      <Menu>
        <MenuItem id="item1" rightIcon={<span data-testid="right-icon">→</span>}>Item 1</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('renders menu items with shortcuts', () => {
    render(
      <Menu>
        <MenuItem id="item1" shortcut="Ctrl+S">Item 1</MenuItem>
      </Menu>
    );
    
    expect(screen.getByText('Ctrl+S')).toBeInTheDocument();
  });

  it('renders menu items with badges', () => {
    render(
      <Menu>
        <MenuItem id="item1" badge={<span data-testid="badge">New</span>}>Item 1</MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('badge')).toBeInTheDocument();
  });

  it('renders active menu items', () => {
    render(
      <Menu>
        <MenuItem id="item1" active>Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    
    const item1 = screen.getByText('Item 1').closest('li');
    expect(item1).toHaveClass('active');
    
    const item2 = screen.getByText('Item 2').closest('li');
    expect(item2).not.toHaveClass('active');
  });

  it('renders menu items with href as links', () => {
    render(
      <Menu>
        <MenuItem id="item1" href="https://example.com">Item 1</MenuItem>
      </Menu>
    );
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});