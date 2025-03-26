import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from './Dropdown';
import { DropdownToggle } from './DropdownToggle';
import { DropdownMenu } from './DropdownMenu';
import { DropdownItem } from './DropdownItem';
import { DropdownDivider } from './DropdownDivider';

describe('Dropdown', () => {
  const menuItems = [
    { label: 'Profile', value: 'profile' },
    { label: 'Settings', value: 'settings' },
    { label: 'Help', value: 'help' },
    { label: 'Logout', value: 'logout' }
  ];

  it('renders correctly with default props', () => {
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
    
    expect(screen.getByText('Menu')).toBeInTheDocument();
    
    // Menu should be closed by default
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
    expect(screen.queryByText('Help')).not.toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('opens menu when toggle is clicked', () => {
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
    fireEvent.click(toggle);
    
    // Menu should be open
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('closes menu when an item is clicked', () => {
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
    
    // Open the menu
    const toggle = screen.getByText('Menu');
    fireEvent.click(toggle);
    
    // Click on an item
    const profileItem = screen.getByText('Profile');
    fireEvent.click(profileItem);
    
    // Menu should be closed
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
    expect(screen.queryByText('Help')).not.toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('calls onSelect when an item is clicked', () => {
    const handleSelect = jest.fn();
    render(
      <Dropdown onSelect={handleSelect}>
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
    
    // Open the menu
    const toggle = screen.getByText('Menu');
    fireEvent.click(toggle);
    
    // Click on an item
    const settingsItem = screen.getByText('Settings');
    fireEvent.click(settingsItem);
    
    expect(handleSelect).toHaveBeenCalledWith('settings');
  });

  it('renders with isOpen prop', () => {
    render(
      <Dropdown isOpen={true}>
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
    
    // Menu should be open
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls onOpen when menu is opened', () => {
    const handleOpen = jest.fn();
    render(
      <Dropdown onOpen={handleOpen}>
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
    fireEvent.click(toggle);
    
    expect(handleOpen).toHaveBeenCalled();
  });

  it('calls onClose when menu is closed', () => {
    const handleClose = jest.fn();
    render(
      <Dropdown isOpen={true} onClose={handleClose}>
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
    
    // Click outside to close the menu
    fireEvent.mouseDown(document.body);
    
    expect(handleClose).toHaveBeenCalled();
  });

  it('renders with custom className', () => {
    render(
      <Dropdown className="custom-dropdown">
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Item</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toHaveClass('custom-dropdown');
  });

  it('renders with custom style', () => {
    const customStyle = { width: '200px', margin: '10px' };
    render(
      <Dropdown style={customStyle}>
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Item</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toHaveStyle('width: 200px');
    expect(dropdown).toHaveStyle('margin: 10px');
  });

  it('renders with different placements', () => {
    const { rerender } = render(
      <Dropdown placement="bottom">
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Item</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    let dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toHaveAttribute('data-placement', 'bottom');
    
    rerender(
      <Dropdown placement="top">
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Item</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toHaveAttribute('data-placement', 'top');
    
    rerender(
      <Dropdown placement="left">
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Item</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toHaveAttribute('data-placement', 'left');
    
    rerender(
      <Dropdown placement="right">
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Item</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toHaveAttribute('data-placement', 'right');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Dropdown size="sm">
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Item</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    let dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toHaveClass('dropdown-sm');
    
    rerender(
      <Dropdown size="md">
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Item</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toHaveClass('dropdown-md');
    
    rerender(
      <Dropdown size="lg">
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Item</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toHaveClass('dropdown-lg');
  });

  it('renders with disabled state', () => {
    render(
      <Dropdown isDisabled>
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Item</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    const toggle = screen.getByText('Menu');
    expect(toggle).toHaveAttribute('aria-disabled', 'true');
    
    // Clicking on the disabled toggle should not open the menu
    fireEvent.click(toggle);
    expect(screen.queryByText('Item')).not.toBeInTheDocument();
  });

  it('renders with disabled items', () => {
    render(
      <Dropdown>
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Enabled Item</DropdownItem>
          <DropdownItem isDisabled>Disabled Item</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    // Open the menu
    const toggle = screen.getByText('Menu');
    fireEvent.click(toggle);
    
    const disabledItem = screen.getByText('Disabled Item');
    expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders with dividers', () => {
    render(
      <Dropdown>
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Item 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    // Open the menu
    const toggle = screen.getByText('Menu');
    fireEvent.click(toggle);
    
    expect(screen.getByTestId('dropdown-divider')).toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
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
    
    // Open the menu
    const toggle = screen.getByText('Menu');
    fireEvent.click(toggle);
    
    // Press down arrow key to navigate to the first item
    fireEvent.keyDown(toggle, { key: 'ArrowDown' });
    
    // The first item should have focus
    expect(screen.getByText('Profile')).toHaveFocus();
    
    // Press down arrow key to navigate to the second item
    fireEvent.keyDown(screen.getByText('Profile'), { key: 'ArrowDown' });
    
    // The second item should have focus
    expect(screen.getByText('Settings')).toHaveFocus();
    
    // Press up arrow key to navigate back to the first item
    fireEvent.keyDown(screen.getByText('Settings'), { key: 'ArrowUp' });
    
    // The first item should have focus again
    expect(screen.getByText('Profile')).toHaveFocus();
    
    // Press Escape key to close the menu
    fireEvent.keyDown(screen.getByText('Profile'), { key: 'Escape' });
    
    // Menu should be closed
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });

  it('closes when clicking outside', () => {
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
    
    // Open the menu
    const toggle = screen.getByText('Menu');
    fireEvent.click(toggle);
    
    // Menu should be open
    expect(screen.getByText('Profile')).toBeInTheDocument();
    
    // Click outside
    fireEvent.mouseDown(document.body);
    
    // Menu should be closed
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });

  it('renders with aria attributes', () => {
    render(
      <Dropdown aria-label="User menu">
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Item</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toHaveAttribute('aria-label', 'User menu');
  });
});