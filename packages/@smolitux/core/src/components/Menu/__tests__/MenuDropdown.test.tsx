import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MenuDropdown } from '../MenuDropdown';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('MenuDropdown', () => {
  it('renders correctly with default props', () => {
    render(
      <MenuDropdown trigger={<button>Open Menu</button>}>
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
          <MenuItem id="item2">Item 2</MenuItem>
        </Menu>
      </MenuDropdown>
    );
    
    expect(screen.getByText('Open Menu')).toBeInTheDocument();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens dropdown when trigger is clicked', () => {
    render(
      <MenuDropdown trigger={<button>Open Menu</button>}>
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
          <MenuItem id="item2">Item 2</MenuItem>
        </Menu>
      </MenuDropdown>
    );
    
    const trigger = screen.getByText('Open Menu');
    fireEvent.click(trigger);
    
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', async () => {
    render(
      <div>
        <MenuDropdown trigger={<button>Open Menu</button>} closeOnClickOutside>
          <Menu>
            <MenuItem id="item1">Item 1</MenuItem>
          </Menu>
        </MenuDropdown>
        <div data-testid="outside">Outside</div>
      </div>
    );
    
    const trigger = screen.getByText('Open Menu');
    fireEvent.click(trigger);
    
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    const outside = screen.getByTestId('outside');
    fireEvent.mouseDown(outside);
    
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('closes dropdown when pressing Escape', async () => {
    render(
      <MenuDropdown trigger={<button>Open Menu</button>} closeOnEscape>
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
        </Menu>
      </MenuDropdown>
    );
    
    const trigger = screen.getByText('Open Menu');
    fireEvent.click(trigger);
    
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('closes dropdown when selecting an item if closeOnSelect is true', async () => {
    render(
      <MenuDropdown trigger={<button>Open Menu</button>} closeOnSelect>
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
        </Menu>
      </MenuDropdown>
    );
    
    const trigger = screen.getByText('Open Menu');
    fireEvent.click(trigger);
    
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    const item = screen.getByText('Item 1');
    fireEvent.click(item);
    
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('does not close dropdown when selecting an item if closeOnSelect is false', async () => {
    render(
      <MenuDropdown trigger={<button>Open Menu</button>} closeOnSelect={false}>
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
        </Menu>
      </MenuDropdown>
    );
    
    const trigger = screen.getByText('Open Menu');
    fireEvent.click(trigger);
    
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    const item = screen.getByText('Item 1');
    fireEvent.click(item);
    
    // Wait a bit to ensure the dropdown doesn't close
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('calls onOpenChange when dropdown opens and closes', () => {
    const handleOpenChange = jest.fn();
    
    render(
      <MenuDropdown 
        trigger={<button>Open Menu</button>} 
        onOpenChange={handleOpenChange}
      >
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
        </Menu>
      </MenuDropdown>
    );
    
    const trigger = screen.getByText('Open Menu');
    
    // Open dropdown
    fireEvent.click(trigger);
    expect(handleOpenChange).toHaveBeenCalledWith(true);
    
    // Close dropdown
    fireEvent.click(trigger);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('works in controlled mode with isOpen prop', () => {
    const { rerender } = render(
      <MenuDropdown 
        trigger={<button>Open Menu</button>} 
        isOpen={false}
      >
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
        </Menu>
      </MenuDropdown>
    );
    
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    
    rerender(
      <MenuDropdown 
        trigger={<button>Open Menu</button>} 
        isOpen={true}
      >
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
        </Menu>
      </MenuDropdown>
    );
    
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('renders with different placements', () => {
    const placements = [
      'bottom-start', 'bottom-end', 'bottom', 
      'top-start', 'top-end', 'top', 
      'right', 'left'
    ];
    
    placements.forEach(placement => {
      const { unmount } = render(
        <MenuDropdown 
          trigger={<button>Open Menu</button>} 
          placement={placement as any}
          isOpen={true}
        >
          <Menu>
            <MenuItem id="item1">Item 1</MenuItem>
          </Menu>
        </MenuDropdown>
      );
      
      const dropdown = screen.getByRole('menu').parentElement;
      expect(dropdown).toHaveAttribute('data-placement', placement);
      
      unmount();
    });
  });

  it('applies offset correctly', () => {
    render(
      <MenuDropdown 
        trigger={<button>Open Menu</button>} 
        offset={10}
        isOpen={true}
      >
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
        </Menu>
      </MenuDropdown>
    );
    
    const dropdown = screen.getByRole('menu').parentElement;
    expect(dropdown).toHaveStyle('--offset: 10px');
  });

  it('applies zIndex correctly', () => {
    render(
      <MenuDropdown 
        trigger={<button>Open Menu</button>} 
        zIndex={1000}
        isOpen={true}
      >
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
        </Menu>
      </MenuDropdown>
    );
    
    const dropdown = screen.getByRole('menu').parentElement;
    expect(dropdown).toHaveStyle('z-index: 1000');
  });

  it('opens with delay when openDelay is set', async () => {
    jest.useFakeTimers();
    
    render(
      <MenuDropdown 
        trigger={<button>Open Menu</button>} 
        openDelay={200}
      >
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
        </Menu>
      </MenuDropdown>
    );
    
    const trigger = screen.getByText('Open Menu');
    fireEvent.click(trigger);
    
    // Menu should not be visible immediately
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    
    // Advance timers
    jest.advanceTimersByTime(200);
    
    // Now menu should be visible
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    jest.useRealTimers();
  });

  it('closes with delay when closeDelay is set', async () => {
    jest.useFakeTimers();
    
    render(
      <MenuDropdown 
        trigger={<button>Open Menu</button>} 
        closeDelay={200}
        closeOnClickOutside
      >
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
        </Menu>
      </MenuDropdown>
    );
    
    // Open the menu
    const trigger = screen.getByText('Open Menu');
    fireEvent.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    // Click outside to close
    fireEvent.mouseDown(document.body);
    
    // Menu should still be visible
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    // Advance timers
    jest.advanceTimersByTime(200);
    
    // Now menu should be closed
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    
    jest.useRealTimers();
  });
});