import React from 'react';
import { render } from '@testing-library/react';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import { MenuDivider } from '../MenuDivider';
import { MenuDropdown } from '../MenuDropdown';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('Menu Snapshots', () => {
  it('renders default menu correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders horizontal menu correctly', () => {
    const { asFragment } = render(
      <Menu direction="horizontal">
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with different variants correctly', () => {
    const variants = ['default', 'primary', 'secondary', 'minimal'];
    
    const fragments = variants.map(variant => {
      const { asFragment } = render(
        <Menu variant={variant as any}>
          <MenuItem id="item1">Item 1</MenuItem>
          <MenuItem id="item2">Item 2</MenuItem>
        </Menu>
      );
      return { variant, fragment: asFragment() };
    });
    
    fragments.forEach(({ variant, fragment }) => {
      expect(fragment).toMatchSnapshot(`Menu with variant ${variant}`);
    });
  });

  it('renders with fullWidth correctly', () => {
    const { asFragment } = render(
      <Menu fullWidth>
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with divider correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuDivider />
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with labeled divider correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuDivider label="Section" />
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu items with icons correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1" icon={<span>🔍</span>}>Search</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders disabled menu items correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1">Enabled</MenuItem>
        <MenuItem id="item2" disabled>Disabled</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders active menu items correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1">Normal</MenuItem>
        <MenuItem id="item2" active>Active</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu items with shortcuts correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1" shortcut="Ctrl+S">Save</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu items with badges correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1" badge={<span>New</span>}>Item</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu items with right icons correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1" rightIcon={<span>→</span>}>Item</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu items as links correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1" href="/page">Link Item</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu dropdown correctly', () => {
    const { asFragment } = render(
      <MenuDropdown 
        trigger={<button>Open Menu</button>}
      >
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </MenuDropdown>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu dropdown with different placements correctly', () => {
    const placements = ['bottom', 'top', 'left', 'right', 'bottom-start', 'bottom-end'];
    
    const fragments = placements.map(placement => {
      const { asFragment } = render(
        <MenuDropdown 
          trigger={<button>Open Menu</button>}
          placement={placement as any}
        >
          <MenuItem id="item1">Item 1</MenuItem>
          <MenuItem id="item2">Item 2</MenuItem>
        </MenuDropdown>
      );
      return { placement, fragment: asFragment() };
    });
    
    fragments.forEach(({ placement, fragment }) => {
      expect(fragment).toMatchSnapshot(`Menu dropdown with placement ${placement}`);
    });
  });

  it('renders menu with submenu correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuItem 
          id="item2" 
          submenu={
            <Menu>
              <MenuItem id="sub1">Submenu Item 1</MenuItem>
              <MenuItem id="sub2">Submenu Item 2</MenuItem>
            </Menu>
          }
          rightIcon={<span>▶</span>}
        >
          Has Submenu
        </MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu with different divider variants correctly', () => {
    const variants = ['solid', 'dashed', 'dotted'];
    
    const fragments = variants.map(variant => {
      const { asFragment } = render(
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
          <MenuDivider variant={variant as any} />
          <MenuItem id="item2">Item 2</MenuItem>
        </Menu>
      );
      return { variant, fragment: asFragment() };
    });
    
    fragments.forEach(({ variant, fragment }) => {
      expect(fragment).toMatchSnapshot(`Menu with ${variant} divider`);
    });
  });

  it('renders menu with different divider paddings correctly', () => {
    const paddings = ['sm', 'md', 'lg', 'none'];
    
    const fragments = paddings.map(padding => {
      const { asFragment } = render(
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
          <MenuDivider padding={padding as any} />
          <MenuItem id="item2">Item 2</MenuItem>
        </Menu>
      );
      return { padding, fragment: asFragment() };
    });
    
    fragments.forEach(({ padding, fragment }) => {
      expect(fragment).toMatchSnapshot(`Menu with divider padding ${padding}`);
    });
  });
});