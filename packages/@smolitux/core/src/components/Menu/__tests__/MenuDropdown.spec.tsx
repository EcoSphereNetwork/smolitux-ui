import React from 'react';
import { render } from '@testing-library/react';
import { MenuDropdown } from '../MenuDropdown';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('MenuDropdown Snapshots', () => {
  it('renders default menu dropdown correctly', () => {
    const { asFragment } = render(
      <MenuDropdown trigger={<button>Open Menu</button>}>
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
          <MenuItem id="item2">Item 2</MenuItem>
        </Menu>
      </MenuDropdown>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders open menu dropdown correctly', () => {
    const { asFragment } = render(
      <MenuDropdown trigger={<button>Open Menu</button>} isOpen={true}>
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
          <MenuItem id="item2">Item 2</MenuItem>
        </Menu>
      </MenuDropdown>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu dropdown with different placements correctly', () => {
    const placements = [
      'bottom-start', 'bottom-end', 'bottom', 
      'top-start', 'top-end', 'top', 
      'right', 'left'
    ];
    
    const fragments = placements.map(placement => {
      const { asFragment } = render(
        <MenuDropdown 
          trigger={<button>Open Menu</button>} 
          placement={placement as any}
          isOpen={true}
        >
          <Menu>
            <MenuItem id="item1">Item 1</MenuItem>
            <MenuItem id="item2">Item 2</MenuItem>
          </Menu>
        </MenuDropdown>
      );
      return { placement, fragment: asFragment() };
    });
    
    fragments.forEach(({ placement, fragment }) => {
      expect(fragment).toMatchSnapshot(`MenuDropdown with placement ${placement}`);
    });
  });

  it('renders menu dropdown with offset correctly', () => {
    const { asFragment } = render(
      <MenuDropdown 
        trigger={<button>Open Menu</button>} 
        offset={10}
        isOpen={true}
      >
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
          <MenuItem id="item2">Item 2</MenuItem>
        </Menu>
      </MenuDropdown>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu dropdown with zIndex correctly', () => {
    const { asFragment } = render(
      <MenuDropdown 
        trigger={<button>Open Menu</button>} 
        zIndex={1000}
        isOpen={true}
      >
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
          <MenuItem id="item2">Item 2</MenuItem>
        </Menu>
      </MenuDropdown>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu dropdown with custom trigger correctly', () => {
    const { asFragment } = render(
      <MenuDropdown 
        trigger={<button className="custom-trigger">Custom Trigger</button>}
        isOpen={true}
      >
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
          <MenuItem id="item2">Item 2</MenuItem>
        </Menu>
      </MenuDropdown>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu dropdown with complex menu correctly', () => {
    const { asFragment } = render(
      <MenuDropdown 
        trigger={<button>Open Menu</button>}
        isOpen={true}
      >
        <Menu>
          <MenuItem id="item1" icon={<span>🔍</span>}>Search</MenuItem>
          <MenuItem id="item2" rightIcon={<span>→</span>}>Navigate</MenuItem>
          <MenuItem id="item3" shortcut="Ctrl+S">Save</MenuItem>
          <MenuItem id="item4" badge={<span>New</span>}>Updates</MenuItem>
          <MenuItem id="item5" disabled>Disabled</MenuItem>
          <MenuItem id="item6" href="https://example.com">Link</MenuItem>
          <MenuItem 
            id="item7" 
            submenu={
              <Menu>
                <MenuItem id="sub1">Submenu Item 1</MenuItem>
                <MenuItem id="sub2">Submenu Item 2</MenuItem>
              </Menu>
            }
          >
            Submenu
          </MenuItem>
        </Menu>
      </MenuDropdown>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu dropdown with all features combined correctly', () => {
    const { asFragment } = render(
      <MenuDropdown 
        trigger={<button className="custom-trigger">Open Menu</button>}
        placement="bottom-start"
        offset={10}
        zIndex={1000}
        closeOnSelect={true}
        closeOnClickOutside={true}
        closeOnEscape={true}
        openDelay={200}
        closeDelay={200}
        isOpen={true}
      >
        <Menu variant="primary" direction="vertical" fullWidth>
          <MenuItem id="item1" icon={<span>🔍</span>} active>Item 1</MenuItem>
          <MenuItem id="item2" rightIcon={<span>→</span>} shortcut="Ctrl+S">Item 2</MenuItem>
          <MenuItem id="item3" badge={<span>New</span>} disabled>Item 3</MenuItem>
          <MenuItem id="item4" href="https://example.com">Item 4</MenuItem>
          <MenuItem 
            id="item5" 
            submenu={
              <Menu>
                <MenuItem id="sub1">Submenu Item 1</MenuItem>
                <MenuItem id="sub2">Submenu Item 2</MenuItem>
              </Menu>
            }
          >
            Item 5
          </MenuItem>
        </Menu>
      </MenuDropdown>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});