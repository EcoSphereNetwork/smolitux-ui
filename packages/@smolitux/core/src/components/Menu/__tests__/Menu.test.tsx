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
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByRole('menu')).toHaveClass('flex flex-col');
  });

  it('renders with horizontal direction', () => {
    render(
      <Menu direction="horizontal">
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    
    expect(screen.getByRole('menu')).toHaveClass('flex-row');
  });

  it('renders with vertical direction', () => {
    render(
      <Menu direction="vertical">
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    
    expect(screen.getByRole('menu')).toHaveClass('flex-col');
  });

  it('renders with fullWidth prop', () => {
    render(
      <Menu fullWidth>
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    
    expect(screen.getByRole('menu')).toHaveClass('w-full');
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Menu variant="primary">
        <MenuItem id="item1">Item 1</MenuItem>
      </Menu>
    );
    
    expect(screen.getByRole('menu')).toHaveClass('bg-primary-50');
    
    rerender(
      <Menu variant="secondary">
        <MenuItem id="item1">Item 1</MenuItem>
      </Menu>
    );
    
    expect(screen.getByRole('menu')).toHaveClass('bg-secondary-50');
    
    rerender(
      <Menu variant="minimal">
        <MenuItem id="item1">Item 1</MenuItem>
      </Menu>
    );
    
    expect(screen.getByRole('menu')).toHaveClass('bg-transparent');
  });

  it('renders with custom className', () => {
    render(
      <Menu className="custom-class">
        <MenuItem id="item1">Item 1</MenuItem>
      </Menu>
    );
    
    expect(screen.getByRole('menu')).toHaveClass('custom-class');
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
    expect(screen.getByText('Item 1').closest('li')).toHaveClass('bg-gray-100');
    
    // Press down arrow again to navigate to second item
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(screen.getByText('Item 2').closest('li')).toHaveClass('bg-gray-100');
    
    // Press up arrow to navigate back to first item
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(screen.getByText('Item 1').closest('li')).toHaveClass('bg-gray-100');
    
    // Press End to navigate to last item
    fireEvent.keyDown(menu, { key: 'End' });
    expect(screen.getByText('Item 3').closest('li')).toHaveClass('bg-gray-100');
    
    // Press Home to navigate to first item
    fireEvent.keyDown(menu, { key: 'Home' });
    expect(screen.getByText('Item 1').closest('li')).toHaveClass('bg-gray-100');
  });

  it('renders with divider', () => {
    render(
      <Menu>
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuDivider />
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('renders with labeled divider', () => {
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
        <MenuItem id="item1" icon={<span data-testid="icon">🔍</span>}>
          Search
        </MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('renders disabled menu items', () => {
    render(
      <Menu>
        <MenuItem id="item1">Enabled</MenuItem>
        <MenuItem id="item2" disabled>Disabled</MenuItem>
      </Menu>
    );
    
    const disabledItem = screen.getByText('Disabled').closest('li');
    expect(disabledItem).toHaveClass('opacity-50');
    expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders active menu items', () => {
    render(
      <Menu>
        <MenuItem id="item1">Normal</MenuItem>
        <MenuItem id="item2" active>Active</MenuItem>
      </Menu>
    );
    
    const activeItem = screen.getByText('Active').closest('li');
    expect(activeItem).toHaveClass('bg-gray-100');
    expect(activeItem).toHaveAttribute('aria-current', 'true');
  });

  it('calls onClick when menu item is clicked', () => {
    const handleClick = jest.fn();
    
    render(
      <Menu>
        <MenuItem id="item1" onClick={handleClick}>Clickable</MenuItem>
      </Menu>
    );
    
    fireEvent.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled menu item is clicked', () => {
    const handleClick = jest.fn();
    
    render(
      <Menu>
        <MenuItem id="item1" onClick={handleClick} disabled>Disabled</MenuItem>
      </Menu>
    );
    
    fireEvent.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders menu items with shortcuts', () => {
    render(
      <Menu>
        <MenuItem id="item1" shortcut="Ctrl+S">Save</MenuItem>
      </Menu>
    );
    
    expect(screen.getByText('Ctrl+S')).toBeInTheDocument();
  });

  it('renders menu items with badges', () => {
    render(
      <Menu>
        <MenuItem id="item1" badge={<span data-testid="badge">New</span>}>
          Item
        </MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('badge')).toBeInTheDocument();
  });

  it('renders menu items with right icons', () => {
    render(
      <Menu>
        <MenuItem id="item1" rightIcon={<span data-testid="right-icon">→</span>}>
          Item
        </MenuItem>
      </Menu>
    );
    
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('renders menu items as links when href is provided', () => {
    render(
      <Menu>
        <MenuItem id="item1" href="/page">Link Item</MenuItem>
      </Menu>
    );
    
    const link = screen.getByText('Link Item').closest('a');
    expect(link).toHaveAttribute('href', '/page');
  });
});